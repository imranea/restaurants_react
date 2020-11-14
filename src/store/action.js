export const CLICK= "CLICK";
export const FETCH_RESTAURANT = "FETCH_RESTAURANT"

export const fetchRestaurant = (restaurants) =>({
    type : FETCH_RESTAURANT,
    restaurants
})