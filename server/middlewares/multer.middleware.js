import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (_, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (_, file, cb) {
        cb(null, file.originalname.split(".")[0].toLowerCase() + "-" + Date.now() + path.extname(file.originalname));
    }
})

export const upload = multer({ storage })