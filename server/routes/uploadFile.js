import { upload } from "../middlewares/multer.middleware.js";
import { Router } from 'express';
import { uploadFileController } from '../controllers/uploadFile.controller.js'

const router = Router();

router.route('/upload/pdf').post(upload.single('pdf'), uploadFileController)

export default router;