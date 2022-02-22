import React from "react";
import { useHistory } from "react-router-dom";
import {Button} from 'react-bootstrap';

function Salon({salon}) {
    const history = useHistory();

    function bookSalon() {
        localStorage.setItem("selectedSalon", JSON.stringify(salon));
        history.push('/booksalon');
    }
    return (
            <div className="row shadow-lg p-3 mb-3 bg-white rounded">
                <div className="col-md-4 ml-0">
                    <img className="img-fluid float-start " alt="111" style={{height: '200px'}} src={require('./images/hair_salon_image.png')} />
                </div>
                <div className="col-md-4 border-left pt-1">
                    <p style={{fontSize: 'large' , paddingLeft:'10px'}}>
                        <b>Shop Name : </b>{salon.shop_name}<br />
                        <b>Gender : </b> {salon.salon_gender_type}<br />
                        <b>Time : </b>{salon.opening_time} to {salon.closing_time}<br />
                    </p>

                </div>

                <div className="col-md-4 mx-auto border-left" style={{position: 'relative'}}>
                    <p style={{fontSize: 'large', paddingLeft:'10px'}}>
                        <b>Address : </b>{salon.address}<br />
                        <b>Seat Capacity : </b>{salon.capacity_seats}<br />
                    </p>
                    <Button variant="outline-primary" style={{position: 'relative', bottom:'0px',float:"right"}} onClick={bookSalon}><b>Check Now</b></Button>
                    {/* <button className="btn-lg btn-outline-primary" style={{position: 'absolute', bottom:'0px', right:'10px'}}><b>Check Now </b></button> */}
                </div>
            </div>
    )

}

export default Salon;