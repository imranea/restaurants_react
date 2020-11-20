<<<<<<< HEAD
export const NOTE= "NOTE"
export const FETCH_RESTAURANT = "FETCH_RESTAURANT"

export const noteRestaurant = (note) =>({
    type : NOTE,
    note
})

=======
export const CLICK= "CLICK";
export const FETCH_RESTAURANT = "FETCH_RESTAURANT"

>>>>>>> 952d128b3071914d927953750810ae6a48197add
export const fetchRestaurant = (restaurants) =>({
    type : FETCH_RESTAURANT,
    restaurants
})