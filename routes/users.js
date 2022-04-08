var express = require('express');
var router = express.Router();
var User = require('../models/userSchema');
var bodyPaser=require("body-parser");  

router.get('/sign-up',(req,res)=>{
  return res.render('users');
})
router.post('/sign-up',(req,res)=>{

  const email = req.body.email;
  const nickname = req.body.nickname;
  const password = req.body.password;

  const user = new User({
    email:email,
    nickname:nickname,
    password:password
  })

  user.save((err,result)=>{
    if(err) return res.json({success:false,err})
    return res.status(200).json({
      loginSuccess:true
    })
  })
})

router.get('/login',(req,res)=>{
  return res.render('login');
})

router.post('/login',async(req,res)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user){
    return res.json({
      loginSuccess:false,
      message:"E-mail doesn't exist",
    })
  }else{
    if(req.body.password==user.password){
      req.session.is_logined=true;
      req.session.email=user.email;
      req.session.nickname=user.nickname;
      req.session.save((err)=>{
        if(err) return res.json({
          message:"session failed",
        })
        return res.redirect('/users/login-complete');
      })
    }else{
      return res.json({
        messsage:"Wrong password",
      })
    }
  }
})

router.get('/login-complete',(req,res)=>{
  if(req.session.is_logined){
    res.render('login-complete',{nickname:req.session.nickname})
  }
})

router.get('/logout',(req,res)=>{
  if(req.session.is_logined){
    req.session.is_logined=false;
    req.session.destroy((err)=>{
      if(err) throw err;
      res.redirect('/users/login');
    })
  }else{
    res.status(404).send("Sign in Please!");
  }
})

module.exports = router;
