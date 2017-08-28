import * as actions from '../actions';

const initialState = {
    isLoggedIn: false,
    // userInfo: {
    //     username: "mmarovich",
    //     id: "596c258aa7bec01d00d2395c",
    //     email: "mmarovich@gmail.com"
    // },
    // location:
    // {
    //     line1: "",
    //     city: "Hammond",
    //     state: "IN",
    //     zip: ""
    // },
    currentRepFeed: {
        feed: [],
        // postField: "video",
        // pointer: {
        //     name: "Donald J. Trump",
        //     party: "Republican"
        // }
    }
}

export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.SIGN_UP:
            return {
                ...state,
                userInfo: action.userInfo
            }
        case actions.LOG_IN:
            return {
                ...state,
                userInfo: action.userInfo,
                isLoggedIn: true
            }
        case actions.LOG_OUT:
            return {
                ...state,
                userInfo: {},
                isLoggedIn: false,
                Representatives: {},
                currentRepFeed: {}
            }
        case actions.PROFILE_UPDATE:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    location: action.location
                }
            }
        case actions.REPS_UPDATE:
            return {
                ...state,
                Representatives: action.reps
            }
        case actions.CURRENT_REP_FEED:
            return {
                ...state,
                pointer: action.rep
            }
        case actions.FEED:
            return {
                ...state,
                currentRepFeed: {
                    ...state.currentRepFeed,
                    id: action.id,
                    feed: state.currentRepFeed.feed.concat(action.feed)
                }
            }
        case actions.REMOVE_FEED:
            return {
                ...state,
                currentRepFeed: action.feed
            }
        case actions.FEED_UPDATE:
            return {
                ...state,
                currentRepFeed: {
                    ...state.currentRepFeed,
                    feed: [action.newPost, ...state.currentRepFeed.feed]
                }
            }
        case actions.POST_UPDATE:
            if (action.postNum === 0) {
                return {
                    ...state,
                    currentRepFeed: {
                        ...state.currentRepFeed,
                        feed: [
                            action.post,
                            ...state.currentRepFeed.feed.slice(action.postNum + 1)
                        ]
                    }
                }
            }
            if (action.postNum > 0) {
                return {
                    ...state,
                    currentRepFeed: {
                        ...state.currentRepFeed,
                        feed: [
                            ...state.currentRepFeed.feed.slice(0, action.postNum),
                            action.post,
                            ...state.currentRepFeed.feed.slice(action.postNum + 1)
                        ]
                    }
                }
            }
        case actions.DELETE_POST:
            return {
                ...state,
                currentRepFeed: {
                    ...state.currentRepFeed,
                    feed: [
                        ...state.currentRepFeed.feed.slice(0, action.postNum),
                        ...state.currentRepFeed.feed.slice(action.postNum + 1)
                    ]
                }
            }
        case actions.POST_COMMENT:
            if (action.postId === 0) {
                return {
                    ...state,
                    currentRepFeed: {
                        ...state.currentRepFeed,
                        feed: [
                            action.post,
                            ...state.currentRepFeed.feed.slice(action.postId + 1)
                        ]
                    }
                }
            }
            if (action.postId > 0) {
                return {
                    ...state,
                    currentRepFeed: {
                        ...state.currentRepFeed,
                        feed: [
                            ...state.currentRepFeed.feed.slice(0, action.postId),
                            action.post,
                            ...state.currentRepFeed.feed.slice(action.postId + 1)
                        ]
                    }
                }
            }

        default:
            return state;
    }
}