import multer from "multer";
import fs from "fs";
import path from "path";


const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, callback): void => {
        callback(null, "app_" + Date.now() + "." + file.mimetype.split("/")[1]);
    }
})

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

    public deleteImage(imageName: string): void {
        if (!imageName) return;
        const filePath: string = path.join("uploads", imageName);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
}

export const uploadImageService = new UploadImageService();