import {postActionTypes} from './post.types';

const INITIAL_STATE = {
    posts:[],
    post : null,
    loading : true,
    error :{}
};

const postReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){
        case postActionTypes.GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };

            case postActionTypes.GET_POST:
                return {
                    ...state,
                    post: action.payload,
                    loading: false
                };

            case postActionTypes.POST_ERROR:
                return {
                    ...state,
                    error: action.payload,
                    loading: false
                };

            case postActionTypes.UPDATE_LIKES:
                return {
                    ...state,
                    posts : state.posts.map( post => post._id === action.payload.postId ? 
                        {...post, likes : action.payload.likes} : post),
                    loading :false
                    
                };

            case postActionTypes.DELETE_POST:
                return {
                    ...state,
                    posts : state.posts.filter( post => post._id !== action.payload),
                    loading :false                  
                };

            case postActionTypes.ADD_POST:
                return {
                    ...state,
                    posts : [action.payload,...state.posts],
                    loading :false
                }

            case postActionTypes.ADD_COMMENT:
                return{
                    ...state,
                    post : {...state.post, comments : action.payload},
                    loading:false
                };

            case postActionTypes.REMOVE_COMMENT:
                let check = state.post.comments.filter(
                    comment => comment._id !== action.payload
                );

                
                return{
                    ...state,
                    post : {...state.post, comments : state.post.comments.filter(
                        comment => comment._id !== action.payload
                    )},
                    check :check,
                    loading:false
                };

            
        
        default:
            return state;
    }
};

export default postReducer;