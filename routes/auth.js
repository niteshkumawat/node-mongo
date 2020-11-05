const router = require('express').Router();
const User = require('../models/User');
const {userValidation, loginValidation} = require('../validation');
const bcryptjs = require('bcryptjs');


router.post('/register', async (req, res)=>{
    //validate the user input
    const {error} = userValidation(req.body);
    if(error) return  res.status(400).send(error.details[0].message);
    
    //check if user is already in database
    const emailExists = await User.findOne({email:req.body.email}).exec();
    if(emailExists) return res.status(400).send("Email already exists!!");

    const salt = await bcryptjs.genSalt(3);
    const hashedPwd = await bcryptjs.hash(req.body.password, salt);

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPwd
    });

    try{
        const savedUser = await user.save();
        res.send(savedUser);

    }catch(err){
        res.status(400).send({message:err});
    }
});

router.post('/login',async(req, res)=>{
    //validate the input data
    const {error} = loginValidation(req.body);
    if(error) return  res.status(400).send(error.details[0].message);

    //check if user exist
    const user = await User.findOne({email:req.body.email}).exec();
    if(!user) return res.status(400).send("Email or password is wrong");

    //check for password
    const validPass = await bcryptjs.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Email or password is wrong");


    res.send(user);
})


module.exports = router;