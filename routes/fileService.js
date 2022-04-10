var express=require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var File = require('../models/fileSchema');
var uuid = require('uuid');
var nodemailer=require("nodemailer");

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

    return res.render('downloadSite',{file:`${process.env.BASE_URL}/downloads/${saved.uuid}`})
})

router.post('/mailing',(req,res)=>{
    var transport = nodemailer.createTransport({
        service:'gmail',
        host:'stmp.gmail.com',
        port :587,
        secure:false,
        auth:{
            user:process.env.FROMHERE,
            pass:process.env.HEREPASS,
        }
    })

    var sender = transport.sendMail({
        from : req.body.requester,
        to: req.body.recepient,
        subject:`${req.body.requester}`+"님이 보낸 메일을 확인해보세요!",
        html:`<h3> 안녕하세요. 파일 공유 서비스 letsShare 입니다</h3>
            <p> 본 메일은 ${req.body.requester} 님의 요청으로 이루어졌습니다.</p>
            <p> 모르는 이메일 주소라면 링크를 누르지 마세요.</p>
            <p> 링크는 1시간 동안 유효합니다.</p>
                <div>
                <p> 링크 : <a href=${req.body.result}>여기를 클릭하세요</a></p>
                <br>
                ${req.body.memo}
                </div>`,
    })

    return res.redirect('/');
})

module.exports=router;

