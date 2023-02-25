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


/// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};
const upload = multer({storage: storage, fileFilter: multerFilter,limits:{fileSize: 50000000,fieldSize: 25*1024*1024}});

export default upload;