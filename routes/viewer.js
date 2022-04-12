var express=require('express');
var router = express.Router();
var http=require('http')
var fs=require('fs')
var File = require('../models/fileSchema');

router.get('/:uuid',async (req,res)=>{
    const fileViewer = await File.findOne({
        uuid:req.params.uuid
    })

    if(!fileViewer){
        return res.render('error',{message1:"ファイルが存在しません。",message2:"リンクをご確認お願いします。"})
    }

    const filePath = `${__dirname}/../${fileViewer.path}`;
    res.writeHead(200);
    res.end(fs.readFileSync(filePath,(err)=>{
        if(err){
            res.render('error',{message:"Something went wrong"})
        }
    }));

})

module.exports=router;