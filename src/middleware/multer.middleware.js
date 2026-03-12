import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
export { upload };

// Multer ek Node.js middleware hai jo multipart/form-data handle karta hai.

// Simple words me:
// ➡ Jab user file upload karta hai (image, pdf, resume)
// ➡ To Express by default file read nahi kar sakta
// ➡ Multer file ko handle karta hai
