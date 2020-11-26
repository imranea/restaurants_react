export const NOTE= "NOTE"
export const FETCH_RESTAURANT = "FETCH_RESTAURANT"
export const FETCH_RESTAURANT_REVIEW = "FETCH_RESTAURANT_REVIEW"

export const noteRestaurant = (note) =>({ // function to update rating
    type : NOTE,
    note
})

export const fetchRestaurant = (restaurants) =>({ // function to fill our state restaurants
    type : FETCH_RESTAURANT,
    restaurants
})

export const fetchRestaurantReview = (reviews) =>({ //function to fill our state reviews
    type : FETCH_RESTAURANT_REVIEW,
    reviews
})
