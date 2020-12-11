export const actionTypes = {
    NOTE:'NOTE',
    FETCH_RESTAURANT:'FETCH_RESTAURANT',
    FETCH_RESTAURANT_REVIEW : 'FETCH_RESTAURANT_REVIEW'
};

export const noteRestaurant = (note) =>{ // function to update rating
    return dispatch =>{
        dispatch({type:actionTypes.NOTE,note})
    }
}

export const fetchRestaurant = (restaurants) =>({ // function to fill our state restaurants
    type : actionTypes.FETCH_RESTAURANT,
    restaurants
})

export const fetchRestaurantReview = (reviews) =>({ //function to fill our state reviews
    type : actionTypes.FETCH_RESTAURANT_REVIEW,
    reviews
})
