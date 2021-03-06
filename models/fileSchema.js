const mongoose = require("mongoose");

const fileSchema=mongoose.Schema({
    filename:{
        type:String,
        required:true,
    },
    fileId:{
        type:String,
    },
    path:{
        type:String,
        required:true,
    },
    size:{
        type:Number,
        required:true,
    },
    uuid:{
        type:String,
        required:true
    },
});

fileSchema.index({createdAt: 1},{expireAfterSeconds: 3600});
module.exports=mongoose.model('File',fileSchema);
