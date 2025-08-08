import { queue } from "../middlewares/bullmq.middleware.js";

const uploadFileController = async (req, res) => {
    try {
        const fileLocalPath = req.file?.path;
        console.log('File uploaded to:', fileLocalPath);
        if (!fileLocalPath) {
            return res.status(400).json({
                message: 'No file uploaded',
                success: false,
            })
        }
        await queue.add('process-pdf', JSON.stringify({
            fileName: req.file.originalname,
            filePath: fileLocalPath,
        }));
        return res.status(200).json({
            message: 'File uploaded successfully',
            success: true,
            filePath: fileLocalPath,
        });
    } catch (error) {
        throw new Error('Error uploading file: ' + error.message);
    }
}

export { uploadFileController };