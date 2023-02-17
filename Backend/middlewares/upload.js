import multer from "multer";
//const upload = multer({dest:'./uploads'})

// Configuration for multer
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
      const fileName = file.originalname.split(' ').join('-')
        cb(null ,Date.now() +'-'+ fileName);
    }
});
const acceptedExtensions = ['.pdf']

// Multer Filter
const multerFilter = (req, file, cb) => {
    if (acceptedExtensions.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Not pdf!"), false);
    }
  };
const upload = multer({storage: storage, fileFilter: multerFilter});

export default upload;