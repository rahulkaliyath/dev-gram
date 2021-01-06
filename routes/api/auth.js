const express  = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route GET auth user details
// @Description Test api
// @access public
router.get('/',auth , async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err){
        res.status(500).json({msg: "Server Error", error: err.message});
    }
});

// @route POST login
// @Description Authenticate user and return jwt token
// @access public
router.post('/',[
    check('email', 'Give a valid email ID').isEmail(),
    check('password', 'password is required').exists()
],  async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const { email, password} = req.body;

    try{

        let user =await User.findOne({email});

        if (!user){
           return res.status(400).json({errors : [{ msg : 'Invalid Credentials'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if(!isMatch){
           return res.status(400).json({errors : [{ msg : 'Invalid Credentials'}]});
        }

        const payload = {
            user:{
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            config.get('jwtSecretKey'),
            {expiresIn : 36000}, 
            (err, token)=>{
                if(err) throw err;
                res.json({token});
            });
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Server Error");
    }

    
});


module.exports = router;