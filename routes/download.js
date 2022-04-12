var express=require('express');
var router = express.Router();
var File = require('../models/fileSchema');
var fs = require("fs");

router.get('/:uuid',async (req,res)=>{
    const fileDownload = await File.findOne({
        uuid:req.params.uuid
    })

    if(!fileDownload){
        return res.render('error',{message1:"ファイルが存在しません。"})
    }

    const filePath = `${__dirname}/../${fileDownload.path}`;
    res.download(filePath,(err)=>{
        if(err){
            console.log(err);
            return res.render('expired');
        }
    })
})

module.exports=router;