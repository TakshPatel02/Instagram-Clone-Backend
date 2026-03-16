import imagekit from "../utils/imagekit.utils.js";

const uploadImage = async (fileBuffer, fileName) => {
    try {
        if (!fileBuffer) {
            throw new Error("No file buffer received for upload");
        }

        const fileData = Buffer.isBuffer(fileBuffer)
            ? fileBuffer.toString("base64")
            : fileBuffer;

        const response = await imagekit.files.upload({
            file: fileData,
            fileName: fileName,
        });

        return {
            url: response.url,
            fileId: response.fileId
        };

    } catch (err) {
        const reason = err?.message || "Unknown upload error";
        throw new Error(`Image upload failed: ${reason}`);
    }
}

export default uploadImage;