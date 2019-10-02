/*
 * action types
 */

export const ADD_FAVOURITE = 'ADD_FAVOURITE'
export const DELETE_FAVOURITE = 'DELETE_FAVOURITE'


export const addFavourite = name => ({
    type: ADD_FAVOURITE,
    name,
});

export const deleteFavourite = name => ({
    type: DELETE_FAVOURITE,
    name,
})



