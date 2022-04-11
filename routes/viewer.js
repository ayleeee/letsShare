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
        return res.json({
            message:"file doesn't exist",
        })
    }

    const filePath = `${__dirname}/../${fileViewer.path}`;
    res.writeHead(200);
    res.end(fs.readFileSync(filePath));

})

module.exports=router;