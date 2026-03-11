// middleware/uploadMiddleware.js
import multer from 'multer';

const storage = multer.memoryStorage(); // store image in memory
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
    },
});

export default upload;
