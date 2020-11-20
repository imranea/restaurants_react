export const NOTE= "NOTE"
export const FETCH_RESTAURANT = "FETCH_RESTAURANT"

export const noteRestaurant = (note) =>({
    type : NOTE,
    note
})

export const fetchRestaurant = (restaurants) =>({
    type : FETCH_RESTAURANT,
    restaurants
})