import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // Validasi user authentication di sini
      // const user = await authenticate(req);
      // if (!user) throw new Error("Unauthorized");
      
      return { userId: "placeholder" }; // Return metadata
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      // Save file info to database
      // await db.files.create({
      //   url: file.url,
      //   name: file.name,
      //   userId: metadata.userId
      // });
      
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
