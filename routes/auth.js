const router = require('express').Router();
const User = require('../models/User');
const {userValidation} = require('../validation');


router.post('/register', async (req, res)=>{
    //validate the user input
    const {error} = userValidation(req.body);
    if(error) return  res.status(400).send(error.details[0].message);
    
    //check if user is already in database
    const emailExists = User.findOne({email:req.body.email});
    if(emailExists) return res.status(400).send("Email already exists");

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    try{
        const savedUser = await user.save();
        res.send(savedUser);

    }catch(err){
        res.status(400).send({message:err});
    }
});

module.exports = router;