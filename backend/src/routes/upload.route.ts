import { Hono } from 'hono';
import { UTApi } from "uploadthing/server";

import { convertImage } from '../utils/3DConverter';

const upload = new Hono();

// Initialize UploadThing API
const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN!,
});

// Custom upload endpoint dengan actual upload
upload.post('/', async (c) => {
  try {
    console.log('Received upload request');
    const body = await c.req.parseBody();
    const file = body.file as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }
    console.log('File received:', file.name, file.size, file.type);
    // Validasi file
    if (!file.type.startsWith('image/')) {
      return c.json({ error: 'Only images allowed' }, 400);
    }
    
    if (file.size > 4 * 1024 * 1024) { // 4MB
      return c.json({ error: 'File too large' }, 400);
    }
    console.log('File is valid, proceeding with upload');
    // Upload file ke UploadThing menggunakan UTApi
    const response = await utapi.uploadFiles([file]);
    console.log('Upload response:', response);
    if (!response[0]?.data) {
      throw new Error('Upload failed');
    }
    
    const uploadedFile = response[0].data;
    
    // Optional: Save to database
    // await db.files.create({
    //   key: uploadedFile.key,
    //   url: uploadedFile.url,
    //   name: uploadedFile.name,
    //   size: uploadedFile.size,
    //   type: file.type,
    // });
    
    return c.json({ 
      success: true,
      message: 'File uploaded successfully',
      file: {
        key: uploadedFile.key,
        url: uploadedFile.url,
        name: uploadedFile.name,
        size: uploadedFile.size,
        type: file.type
      }
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ 
      error: 'Upload failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

upload.post('/convert', async (c) => {
  try {
    const body = await c.req.json(); // ✅ ini yang cocok untuk Content-Type: application/json
    const filename = body.filename as string;

    if (!filename) {
      return c.json({ error: 'Filename is required' }, 400);
    }

    console.log('Starting conversion for:', filename);
    await convertImage(filename);

    return c.json({ 
      success: true,
      message: 'Image converted successfully',
      file: {
        url: body.outputUrl // pastikan convertImage mengembalikan outputUrl
      }
    });

  } catch (error) {
    console.error('Conversion error:', error);
    return c.json({ 
      error: 'Conversion failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});


export default upload;