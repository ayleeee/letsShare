var express=require('express');
var router = express.Router();
var File = require('../models/fileSchema');
var fs = require("fs");

router.get('/:uuid',async (req,res)=>{
    const fileDownload = await File.findOne({
        uuid:req.params.uuid
    })

    if(!fileDownload){
        return res.render('error',{message1:"ファイルが存在しません。",message2:"リンクをご確認お願いします。"})
    }

    const filePath = `${__dirname}/../${fileDownload.path}`;
    return res.download(filePath);
})

module.exports=router;