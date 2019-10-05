import _ from "lodash";

import jsonPlaceholder from "../api/jsonPlaceholder";
import { FETCH_POSTS, FETCH_USER } from "./types";

//action creator inside an action creator
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    //Make sure the api request is completed
    await dispatch(fetchPosts());

/*    //Go through our posts and pull out just the 100 userId and then array_unique => array_column => array_unique
    const usersIds = _.uniq(_.map(getState().posts, "userId"));
    //no need for await - async, no further logic, if async needed don't use forEach
    usersIds.forEach((id) => dispatch(fetchUser(id)))*/;

    //Same as above
    _.chain(getState().posts)
        .map("userId")
        .uniq()
        .forEach((id) => dispatch(fetchUser(id)))
        .value();
};

export const fetchPosts = () => {
    return async (dispatch, getState) => {
        const response = await jsonPlaceholder.get("/posts");

        dispatch({
            type: FETCH_POSTS,
            payload: response.data
        });
    };
};

export const fetchUser = (id) => async (dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({
        type: FETCH_USER,
        payload: response.data
    });
};

//Memoize function: it returns a dispatch function, that call _fetchUser
/*export const fetchUser = (id) => (dispatch) => {
    _fetchUser(id, dispatch);
};

const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({
        type: "FETCH_USER",
        payload: response.data
    });
});*/
