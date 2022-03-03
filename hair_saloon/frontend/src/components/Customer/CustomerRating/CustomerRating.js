import StarRatings from 'react-star-ratings';
import React from 'react';

function CustomerRating({ o, fetchOrders }) {
    

    async function updateRating(newRating, name) {
        var res = await fetch("http://localhost:9700/customer/updateRating", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                order_id: o.order_id,
                new_rating: newRating
            })
        })

        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);
        } else {
            if (res.stat) {
                fetchOrders(res.message);
            } else {

            }
        }

    }
    if (o.rating === 0) {
        return (
            <>
                <StarRatings
                    rating={o.rating}
                    starRatedColor="#ff9529"
                    changeRating={updateRating}
                    numberOfStars={5}
                    name='rating'
                    starDimension='25px'
                />

            </>
        );
    }
    else {
        return (
            <StarRatings
                rating={o.rating}
                starRatedColor="#ff9529"
                numberOfStars={5}
                name='rating'
                starDimension='25px'
            />
        );
    }
}

export default CustomerRating;