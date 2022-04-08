var express=require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var File = require('../models/fileSchema');
var uuid = require('uuid');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});

router.get('/',(req,res)=>{
    return res.render('home');
})

router.post('/',upload.single('myfile'),async(req,res)=>{
    const newfile = new File({
        filename:req.file.filename,
        uuid:uuid.v4(),
        path:req.file.path,
        size:req.file.size
    })

    const saved = await newfile.save();
    return res.status(200).json({
        file:`${process.env.BASE_URL}/downloads/${saved.uuid}`
    })
})



module.exports=router;

