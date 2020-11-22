export const NOTE= "NOTE"
export const FETCH_RESTAURANT = "FETCH_RESTAURANT"
export const FETCH_RESTAURANT_REVIEW = "FETCH_RESTAURANT_REVIEW"

export const noteRestaurant = (note) =>({
    type : NOTE,
    note
})

export const fetchRestaurant = (restaurants) =>({
    type : FETCH_RESTAURANT,
    restaurants
})

export const fetchRestaurantReview = (reviews) =>({
    type : FETCH_RESTAURANT_REVIEW,
    reviews
})