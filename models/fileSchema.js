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
    createdAt:{
        type:Date,
        expires:'60m',
        default:Date.now,
    }
});

module.exports=mongoose.model('File',fileSchema);
