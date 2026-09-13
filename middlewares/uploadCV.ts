// import multer from "multer";
// import AppError from "../utils/AppError.js";

// const uploadCV=multer({
// dest: "uploads/cvs/" ,
// limits: {
//     fileSize: 5 * 1024 * 1024,
//   } ,
// fileFilter:(req, file, cb) => {
//     if (file.mimetype !== "application/pdf") {
// return cb(
//   new AppError("Only PDF files are allowed", 400)
// );    }

//     cb(null, true);
//   },
// })
// export default uploadCV
import multer from "multer";
import AppError from "../utils/AppError.js";

const uploadDirectory =
  process.env.VERCEL === "1"
    ? "/tmp"
    : "uploads/cvs/";

const uploadCV = multer({
  dest: uploadDirectory,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(
        new AppError("Only PDF files are allowed", 400)
      );
    }

    cb(null, true);
  },
});

export default uploadCV;