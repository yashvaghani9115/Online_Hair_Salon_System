import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';

function Salon({ salon, prefixLink }) {
    const history = useHistory();
    const fullPathOFImage = prefixLink + salon.images_pub_ids[0] + ".png";
    console.log(fullPathOFImage);
    function bookSalon() {
        localStorage.setItem("selectedSalon", JSON.stringify(salon));
        localStorage.setItem("prefixLink", JSON.stringify(prefixLink));
        history.push('/booksalon');
    }

    return (
        <div className="row shadow-lg p-3 mt-3 bg-white rounded">
            <div className="col-md-4 ml-0">
                <img className="img-fluid float-start " style={{ height: '200px' }} src={fullPathOFImage} alt="#" />
            </div>
            <div className="col-md-4 border-left pt-1">
                <p style={{ fontSize: 'large', paddingLeft: '10px' }}>
                    <b>Shop Name : </b>{salon.shop_name}<br />
                    <b>Gender : </b> {salon.salon_gender_type}<br />
                    <b>Time : </b>{salon.opening_time} to {salon.closing_time}<br />
                </p>

            </div>

            <div className="col-md-4 mx-auto border-left" style={{ position: 'relative' }}>
                <p style={{ fontSize: 'large', paddingLeft: '10px' }}>
                    <b>Address : </b>{salon.address}<br />
                    <b>Seat Capacity : </b>{salon.capacity_seats}<br />
                </p>
                <Button variant="outline-primary" style={{ position: 'relative', bottom: '0px', float: "right" }} onClick={bookSalon}><b>Check Now</b></Button>
            </div>
        </div>
    )

}

export default Salon;