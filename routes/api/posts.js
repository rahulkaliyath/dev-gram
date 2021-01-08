const express  = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');

// @route POST posts
// @Description Test api
// @access public
router.post('/',[
    auth,
    [
        check('text', 'text is required').notEmpty()
    ]
], async (req, res) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    const user = await User.findById(req.user.id).select('-password');

    

   try {
       
    const newPost = new Post({
        user :req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
    }
    );

    const post =  await newPost.save();

    res.json(post);

   } catch (error) {
       res.send(500).json({error: "Server Error"});
   }

});

// @route POST posts
// @Description Test api
// @access public
router.get('/', auth, async (req,res) => {

    try {
        const post = await Post.find().sort({ date : -1});

        res.json(post);
    } catch (error) {
        
        res.status(500).json({error : "Server Error"})
    }
});


// @route POST posts
// @Description Test api
// @access public
router.get('/:post_id', auth, async (req,res) => {

    try {
        const post = await Post.findById(req.params.post_id);

        res.json(post);
    } catch (error) {
        if (error.kind == 'ObjectId'){
            return res.status(400).json({msg: "Post Not Available"});
         }
        res.status(500).json({error : "Server Error"})
    }
});


// @route POST posts
// @Description Test api
// @access public
router.delete('/:post_id', auth, async (req,res) => {

    try {
        const post =  await Post.findById(req.params.post_id);

        if (!post){
            return res.status(400).json({msg: "Post Not Available"});
         }

        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: "User Not Authorised"});
        }

        await post.remove();

        res.json({ msg : "Post Removed"});
    } catch (error) {
        if (error.kind == 'ObjectId'){
            return res.status(400).json({msg: "Post Not Available"});
         }
        res.status(500).json({error : "Server Error"})
    }
});


// @route POST posts
// @Description Test api
// @access public
router.put('/like/:post_id', auth, async (req,res) => {

    try {
        const post = await Post.findById(req.params.post_id);

        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg : "Post Already Liked"});
        }

        post.likes.unshift({user: req.user.id});

        await post.save();

        res.json(post.likes);


        res.json(post);
    } catch (error) {
        console.log(error);
        if (error.kind == 'ObjectId'){
            return res.status(400).json({msg: "Post Not Available"});
         }
        res.status(500).json({error : "Server Error"})
    }
});



// @route POST posts
// @Description Test api
// @access public
router.put('/unlike/:post_id', auth, async (req,res) => {

    try {
        const post = await Post.findById(req.params.post_id);

        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg : "Post Not Liked"});
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);

        await post.save();

        res.json(post.likes);


        res.json(post);
    } catch (error) {
        console.log(error);
        if (error.kind == 'ObjectId'){
            return res.status(400).json({msg: "Post Not Available"});
         }
        res.status(500).json({error : "Server Error"})
    }
});



// @route POST posts
// @Description Test api
// @access public
router.post('/comment/:post_id',[
    auth,
    [
        check('text', 'text is required').not().isEmpty()
    ]
], async (req, res) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log("erro")
        return res.status(400).json({error: errors.array()});
    }

    

   try {

    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.post_id);

    const newComment = {
        user :req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
    };

    post.comments.unshift(newComment);
    await post.save();

    res.json(post.comments);

   } catch (error) {
    if (error.kind == 'ObjectId'){
        return res.status(400).json({msg: "Post Not Available"});
     }
     console.log(error);
       res.send(500).json({error: "Server Error"});
   }

});


// @route POST posts
// @Description Test api
// @access public
router.delete('/comment/:post_id/:comment_id', auth, async (req,res) => {

    const {post_id,comment_id} = req.params;

    try {
        const post =  await Post.findById(post_id);
        
        const comment = post.comments.find(comment => comment.id === comment_id);

        const removeIndex =  post.comments.map(comment => comment.id).indexOf(comment_id);

        if (!post){
            return res.status(400).json({msg: "Post Not Available"});
         }

        if(!comment){
            return res.status(400).json({msg: "Comment Not Available"});
        }

        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({ msg: "User Not Authorised"});
        }

        post.comments.splice(removeIndex,1);

        await post.save();
        
        res.json({ msg : "Post Removed"});
    } catch (error) {
        if (error.kind == 'ObjectId'){
            return res.status(400).json({msg: "Post Not Available"});
         }
        
        res.status(500).json({error : "Server Error"})
    }
});


module.exports = router;