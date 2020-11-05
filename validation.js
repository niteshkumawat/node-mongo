//Validation
const Joi = require('@hapi/joi');

const userValidation=(data)=>{
    const userValidator = Joi.object({
        name:Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(8).required()
    });
    
    return userValidator.validate(data);
};


const LoginValidation=(data)=>{
    const loginValidator = Joi.object({       
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(8).required()
    });
    
    return loginValidator.validate(data);
};

module.exports.userValidation = userValidation;
module.exports.loginValidation = LoginValidation;
