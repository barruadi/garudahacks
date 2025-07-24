import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';
import FormData from 'form-data';

dotenv.config();

const CSM_3D_API_KEY = process.env.CSM_3D_API_KEY!;
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY!;

const removebgApi = 'https://api.remove.bg/v1.0/removebg';
const csmConvertImageApi = 'https://api.csm.ai/v3/sessions/';

// convert image to base64 data URL
function imageToDataUrl(filePath: string): string {
  const ext = path.extname(filePath).slice(1);
  const data = fs.readFileSync(filePath);
  const base64 = data.toString('base64');
  return `data:image/${ext};base64,${base64}`;
}

// remove background from image
async function removeBg(filename: string): Promise<void> {
  console.log("Removing background...");

  const formData = new FormData();
  formData.append('image_file', fs.createReadStream(filename));
  formData.append('size', 'auto');

  const headers = {
    'X-Api-Key': REMOVE_BG_API_KEY,
    ...formData.getHeaders()
  };

  try {
    const response = await axios.post(removebgApi, formData, { headers, responseType: 'arraybuffer' });
    fs.writeFileSync('no_bg.png', response.data);
    console.log("Done removing background.");
  } catch (error: any) {
    console.error("Error removing background:", error.response?.status, error.response?.data);
  }
}

// save GLB file from URL
async function saveGLBFile(glbUrl: string, filename = 'model.glb'): Promise<void> {
  try {
    const response = await axios.get(glbUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(filename, response.data);
    console.log("Download done!");

    // TO DO: API to add GLB path to database
  } catch (error) {
    console.error("Error downloading GLB file:", error);
  }
}

// download GLB model
async function download3DModel(sessionId: string, filename = 'model.glb', maxRetries = 20, delay = 10000): Promise<void> {
  const headers = {
    'Accept': 'application/json',
    'x-api-key': CSM_3D_API_KEY
  };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`Checking for GLB (attempt ${attempt})...`);

    try {
      const response = await axios.get(`${csmConvertImageApi}${sessionId}`, { headers });
      const result = response.data;

      const glbUrl = result?.output?.meshes?.[0]?.data?.glb_url;
      if (glbUrl) {
        console.log("GLB URL:", glbUrl);
        await saveGLBFile(glbUrl, `${sessionId}.glb`);
        return;
      }
    } catch (error) {
      console.error("Error checking GLB:", error);
    }

    console.log(`GLB not ready yet. Retrying in ${delay / 1000} seconds...`);
    await new Promise(res => setTimeout(res, delay));
  }

  console.log(`Gave up waiting for GLB URL after ${maxRetries} retries.`);
}

// main conversion logic
async function convertImage(filename: string): Promise<void> {
  await removeBg(filename);

  const payload = {
    type: 'image_to_3d',
    input: {
      image: imageToDataUrl('no_bg.png'),
      model: 'sculpt',
      settings: {
        geometry_model: 'base',
        texture_model: 'baked',
        topology: 'tris'
      }
    }
  };

  console.log("Payload:", JSON.stringify(payload, null, 2));

  const headers = {
    'x-api-key': CSM_3D_API_KEY,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.post(csmConvertImageApi, payload, { headers });
    const sessionId = response.data._id;
    console.log("Session ID:", sessionId);

    await download3DModel(sessionId);
  } catch (error: any) {
    console.error("Error converting image:", error.response?.status, error.response?.data);
  }
}

// use this to generate 3d model dari image (remove bg -> generate 3d -> download glb)
convertImage('Pagaruyung.jpg');
