import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { FcOk } from 'react-icons/fc';
import { AiFillCloseCircle } from 'react-icons/ai';

function Salon({ salon, prefixLink }) {
    const history = useHistory();
    const fullPathOFImage = prefixLink + salon.images_pub_ids[0] + ".png";
    const current_time = new Date().getHours() + ":" + new Date().getMinutes();

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
            <div className="col-md-4 border-left pt-1" style={{ position: "relative" }}>

                <p style={{ fontSize: '22px', paddingLeft: '10px', fontFamily: "Monaco" }}>
                    <b>Shop Name : </b>{salon.shop_name}<br />
                    <b>Gender : </b> {salon.salon_gender_type}<br />
                    <b>Time : </b>{salon.opening_time} to {salon.closing_time}<br />
                    <b>Seat Capacity : </b>{salon.capacity_seats}<br />
                    {salon.opening_time < current_time && salon.closing_time > current_time ? <span className="text-success badge rounded-pill">< FcOk /> Open</span> : <span className="text-danger badge rounded-pill"><AiFillCloseCircle /> closed</span>}

                </p>


            </div>

            <div className="col-md-4 mx-auto border-left" style={{ position: 'relative' }}>
                <p style={{ fontSize: '20px', paddingLeft: '10px', overflowX: "auto", fontFamily: "Monaco" }}>
                    <b>Address : </b>{salon.address}<br />
                </p>
                <p>
                    <Button variant="outline-primary" style={{ position: 'absolute', bottom: '0px', right: "0px" }} onClick={bookSalon}><b>Check Now</b></Button>
                </p>

            </div>

        </div>
    )

}

export default Salon;