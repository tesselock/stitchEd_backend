const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

router.post('/register' , jsonParser, function(req , res){
    if(req.body.email != undefined){
        newUser = new User({
            username: req.body.username,
            email: req.body.email
        });
    }
    else{
        newUser = new User({
            username: req.body.username,
        })
    }

    User.register(newUser , req.body.password , function(err , user){
        if(err){
            return res.status(400).json({success:false , errors:err})
        }
        else{
            return res.status(200).json({sucess:true})
        }
    });
    
});

module.exports = router