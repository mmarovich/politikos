

export const SIGN_UP = "SIGN_UP";
export const signUp = userInfo => ({
    type: SIGN_UP,
    userInfo
})

export const LOG_IN = "LOG_IN";
export const logIn = userInfo => ({
    type: LOG_IN,
    userInfo
})

export const LOG_OUT = "LOG_OUT";
export const logOut = wipeState => ({
    type: LOG_OUT,
    wipeState
})

export const PROFILE_UPDATE = "PROFILE_UPDATE";
export const profileUpdate = location => ({
    type: PROFILE_UPDATE,
    location
})

export const REPS_UPDATE = "REPS_UPDATE";
export const repsUpdate = reps => ({
    type: REPS_UPDATE,
    reps
})

export const CURRENT_REP_FEED = "CURRENT_REP_FEED";
export const currentRepFeed = rep => ({
    type: CURRENT_REP_FEED,
    rep
})

export const FEED = "FEED";
export const feed = (feed, id) => ({
    type: FEED,
    feed,
    id
})

export const REMOVE_FEED = "REMOVE_FEED";
export const removeFeed = feed => ({
    type: REMOVE_FEED,
    feed
})

export const FEED_UPDATE = "FEED_UPDATE";
export const feedUpdate = (newPost) => ({
    type: FEED_UPDATE,
    newPost
})

export const POST_COMMENT = "POST_COMMENT";
export const postComment = (postId, post) => ({
    type: POST_COMMENT,
    postId,
    post
})

export const POST_UPDATE = "POST_UPDATE";
export const postUpdate = (post, postNum) => ({
    type: POST_UPDATE,
    post,
    postNum
})

export const DELETE_POST = "DELETE_POST";
export const deletePost = postNum => ({
    type: DELETE_POST,
    postNum
})

export const DELETE_COMMENT = "DELETE_COMMENT";
export const deleteComment = (post, postNum) => ({
    type: DELETE_COMMENT,
    post,
    postNum
})