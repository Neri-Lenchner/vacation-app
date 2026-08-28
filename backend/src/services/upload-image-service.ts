import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "vacations",
        allowed_formats: ["jpg", "jpeg", "png", "gif"]
    } as any
});

class UploadImageService {
    public upload = multer({
        storage,
        fileFilter(req, file, callback): void {
            const allowed: string[] = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
            if (allowed.includes(file.mimetype)) {
                callback(null, true);
            } else {
                callback(new Error("Invalid file type"));
            }
        }
    });

    public async deleteImage(imageUrl: string): Promise<void> {
        if (!imageUrl) return;
        const match: RegExpMatchArray | null = imageUrl.match(/\/upload\/v\d+\/(.+)\.[a-zA-Z0-9]+$/);
        if (!match) return;
        const publicId: string = match[1];
        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            console.error("Failed to delete image from Cloudinary:", error);
        }
    }
}

export const uploadImageService = new UploadImageService();
