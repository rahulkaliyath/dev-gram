const express  = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route GET api/profile/me
// @Description get current users profile
// @access public
router.get('/me', auth , async (req, res) => {
    try {
        
        const profile = await Profile.findOne({ user :req.user.id}).populate('user',['name','avatar']);
        if(!profile){
          return  res.status(400).json({msg: "No profile for this user"});
        }
        
        res.json(profile);



    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Server Error"});
    }
});


// @route GET api/profile
// @Description get current users profile
// @access public
router.get('/' , async (req, res) => {
    try {
        
        const profile = await Profile.find().populate('user',['name','avatar']);

        if(!profile){
            res.status(400).json({msg: "No profiles found"});
        }
        
        res.json(profile);



    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Server Error"});
    }
});

// @route GET api/profile/user/user_id
// @Description get user_ids profile
// @access public
router.get('/user/:user_id' , async (req, res) => {
    try {
        
        const profile = await Profile.findOne({ user :req.params.user_id}).populate('user',['name','avatar']);
        
        if(!profile){
           return res.status(400).json({msg: "No profile for this user"});
        }
        
        res.json(profile);



    } catch (error) {
        if (error.kind == 'ObjectId'){
           return res.status(400).json({msg: "No profile for this user"});
        }
        res.status(500).json({error: "Server Error"});
    }
});


// @route POST api/profile
// @Description Delete User Profile from DB
// @access public
router.post('/', [
    auth,
    [
        check('status','status is requires').not().isEmpty(),
        check('skills', 'skills cannot be empty').not().isEmpty()
    ]
   ],
   async (req,res) => {
       const errors = validationResult(req);

       if(!errors.isEmpty()){
           res.status(400).json({ errors : errors.array()});
        }

        const {
            status,
            skills,
            company,
            website,
            location,
            bio,
            githubusername,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        const profileFields = {}

        profileFields.user = req.user.id

        
               
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(githubusername) profileFields.githubusername = githubusername;
        if(status) profileFields.status = status;
        if(skills) profileFields.skills = skills.split(',').map(skill => skill.trim());

        profileFields.social = {}

        if(youtube) profileFields.social.youtube = youtube;
        if(facebook) profileFields.social.facebook = facebook;
        if(twitter) profileFields.social.twitter = twitter;
        if(instagram) profileFields.social.instagram = instagram;
        if(linkedin) profileFields.social.linkedin = linkedin;

        try {

            let profile =await Profile.findOne({user : req.user.id});
           
            if(profile){
                       profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true, upsert: true, setDefaultsOnInsert: true }
                  );
                
              return  res.json(profile);
            }
            profile = new Profile(profileFields);

            await profile.save();

            res.json(profile);
            
        } catch (error) {
            res.status(500).json({error: error.message});
        }

   }
);

// @route DELETE api/profile
// @Description Delete User Profile from DB
// @access Private
router.delete('/', auth,  async (req,res) => {
      
    try {

        await Profile.findOneAndRemove({user : req.user.id});
        await User.findOneAndRemove({_id : req.user.id});
       
        res.json({msg : "User Removed from DB"});
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }

}
);


// @route DELETE api/profile
// @Description Delete User Profile from DB
// @access Private
router.put('/experience', [
auth ,
[
    check('title','title is required').notEmpty(),
    check('company','company is required').notEmpty(),
    check('from','from is required').notEmpty()

]]
, async (req,res) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error : errors.array()});
    }

    const {
        title,
        company,
        from,
        to,
        current,
        description,
        location
    } = req.body;

    const newExp = {
        title,
        company,
        from,
        to,
        current,
        description,
        location
    }

    try {

        const profile = await Profile.findOne({user : req.user.id});
        profile.experience.unshift(newExp);
        
        await profile.save();

        res.json(profile);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Server Error"});
        
    }
});

// @route DELETE api/profile/experience/:experience_id
// @Description Delete User Profile from DB
// @access Private
router.delete('/experience/:experience_id', auth,  async (req,res) => {
      
    try {

        const profile = await Profile.findOne({user : req.user.id});

        const removeIndex = profile.experience.map( exp => exp.id).indexOf(req.params.experience_id);

        profile.experience.splice(removeIndex,1);

        await profile.save();
       
        res.json(profile);
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }

}
);



// @route PUT api/profile/education
// @Description Delete User Profile from DB
// @access Private
router.put('/education', [
    auth ,
    [
        check('school','title is required').notEmpty(),
        check('fieldofstudy','from is required').notEmpty(),
        check('from','company is required').notEmpty(),
        check('degree','from is required').notEmpty()
    
    ]]
    , async (req,res) =>{
    
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            return res.status(400).json({error : errors.array()});
        }
    
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;
    
        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,description
        }
    
        try {
    
            const profile = await Profile.findOne({user : req.user.id});
            profile.education.unshift(newEdu);
            
            await profile.save();
    
            res.json(profile);
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "Server Error"});
            
        }
    });
    
    // @route DELETE api/profile/experience/:experience_id
    // @Description Delete User Profile from DB
    // @access Private
    router.delete('/experience/:experience_id', auth,  async (req,res) => {
          
        try {
    
            const profile = await Profile.findOne({user : req.user.id});
    
            const removeIndex = profile.experience.map( exp => exp.id).indexOf(req.params.experience_id);
    
            profile.experience.splice(removeIndex,1);
    
            await profile.save();
           
            res.json(profile);
            
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    
    }
    );

// @route DELETE api/profile/education/:education_id
// @Description Delete User Profile from DB
// @access Private
router.delete('/education/:education_id', auth,  async (req,res) => {
      
    try {

        const profile = await Profile.findOne({user : req.user.id});

        const removeIndex = profile.education.map( edu => edu.id).indexOf(req.params.education_id);

        profile.education.splice(removeIndex,1);

        await profile.save();
       
        res.json(profile);
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }

}
);

module.exports = router;