var express=require('express');
var router = express.Router();
var http=require("http");
var multer = require('multer');
var path = require('path');
var File = require('../models/fileSchema');
var uuid = require('uuid');
var nodemailer=require("nodemailer");
var fs = require("fs");

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

    return res.render('downloadSite',{file:`${process.env.BASE_URL}/downloads/${saved.uuid}`,fileView:`${process.env.BASE_URL}/view/${saved.uuid}`})
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

    var sender = transport.sendMail ({
        from : req.body.requester,
        to: req.body.recipient,
        subject:`${req.body.requester}`+"さんが送ったメールをご確認ください!",
        html:`<h3> こんにちは。 ファイル共有サービス letsShare です。</h3>
            <p> 本メールは ${req.body.requester} さんの要求により行います。</p>
            <p> 知らないメールアドレスならリンクを押さないでください。</p>
            <p> リンクは１時間のみ有効です。</p>
                <div>
                <p>内容は <a href=${req.body.resultforView}>こちら</a>で確認できます</p>
                <p> ダウンロードリンク : ${req.body.result_text}</p>
                <br>
                <p> 以下は${req.body.requester}さんのメモです。</p>
                ${req.body.memo}
                </div>`,
    })

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write("<script>alert('メールを送りました！ホーム画面戻ります。')</script>");
    res.write("<script> window.location=\"/\"</script>")
})

module.exports=router;

