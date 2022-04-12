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
        return res.render('error',{message:"ファイルが存在しません。"})
    }

    try{
        const filePath = `${__dirname}/../${fileViewer.path}`;
        res.end(fs.readFileSync(filePath,(err)=>{
            if(err){
                throw err;
            }
        }));
        }catch(err){
            console.log(err);
            return res.render('expired');
        }
})

module.exports=router;