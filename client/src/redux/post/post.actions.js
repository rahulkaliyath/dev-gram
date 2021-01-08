import {postActionTypes} from './post.types';
import {setAlert} from '../alert/alert.actions';
import axios from 'axios';

export const getPosts = () => async dispatch => {

    try{
     const resp = await axios.get(`api/posts`);

     dispatch({
         type: postActionTypes.GET_POSTS,
         payload:resp.data
     });

 }
 catch(error){
     

   
     dispatch({
         type: postActionTypes.POST_ERROR,
         payload: {msg:error.response.data.msg, status : error.response.status}
     });
 }
};


export const getPost = postId => async dispatch => {

    try{
        
     const resp = await axios.get(`api/posts/${postId}`);

     dispatch({
         type: postActionTypes.GET_POST,
         payload:resp.data
     });

 }
 catch(error){
     

   
     dispatch({
         type: postActionTypes.POST_ERROR,
         payload: {msg:error.response.data.msg, status : error.response.status}
     });
 }
};

export const addLike = postId => async dispatch => {

    try{
     const resp = await axios.put(`api/posts/like/${postId}`);

     dispatch({
         type: postActionTypes.UPDATE_LIKES,
         payload: { postId , likes : resp.data}
     });

 }
 catch(error){
     

   
     dispatch({
         type: postActionTypes.POST_ERROR,
         payload: {msg:error.response.data.msg, status : error.response.status}
     });
 }
};

export const removeLike = postId => async dispatch => {

    try{
     const resp = await axios.put(`api/posts/unlike/${postId}`);

     dispatch({
         type: postActionTypes.UPDATE_LIKES,
         payload: { postId , likes : resp.data}
     });

 }
 catch(error){
     

   
     dispatch({
         type: postActionTypes.POST_ERROR,
         payload: {msg:error.response.data.msg, status : error.response.status}
     });
 }
};

export const deletePost = postId => async dispatch => {

    try{
     
        await axios.delete(`api/posts/${postId}`);

     dispatch({
         type: postActionTypes.DELETE_POST,
         payload: postId
     });

     dispatch(setAlert('Post Deleted', 'success'));

 }
 catch(error){
     

   
     dispatch({
         type: postActionTypes.POST_ERROR,
         payload: {msg:error.response.data.msg, status : error.response.status}
     });
 }
};


export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };
    try{
     const resp = await axios.post(`api/posts`,formData,config);

     dispatch({
         type: postActionTypes.ADD_POST,
         payload: resp.data
     });

     dispatch(setAlert('Post Created', 'success'));

 }
 catch(error){
     

   
     dispatch({
         type: postActionTypes.POST_ERROR,
         payload: {msg:error.response.data.msg, status : error.response.status}
     });
 }
};




export const addComment = (postId,formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };
    try{
     const resp = await axios.post(`api/posts/comment/${postId}`,formData,config);

     dispatch({
         type: postActionTypes.ADD_COMMENT,
         payload: resp.data
     });

     dispatch(setAlert('Comment Added', 'success'));

 }
 catch(error){
     

   
     dispatch({
         type: postActionTypes.POST_ERROR,
         payload: {msg:error.response.data.msg, status : error.response.status}
     });
 }
};



export const deleteComment = (postId,commentId) => async dispatch => {
    
    try{
      await axios.delete(`api/posts/comment/${postId}/${commentId}`);

     dispatch({
         type: postActionTypes.REMOVE_COMMENT,
         payload: commentId
     });

     dispatch(setAlert('Comment Deleted', 'success'));

 }
 catch(error){
     

   
     dispatch({
         type: postActionTypes.POST_ERROR,
         payload: {msg:error.response.data.msg, status : error.response.status}
     });
 }
};