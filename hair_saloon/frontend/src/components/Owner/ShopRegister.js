import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TimeField from 'react-simple-timefield';
import './ShopRegister.css';
import MapPicker from 'react-google-map-picker'

const DefaultLocation = { lat: 21.101472400442564, lng: 72.82393134493594 };
const DefaultZoom = 10;
function ShopRegister() {
    const history = useHistory();

    const [shop, setShop] = useState({
        shop_name: "",
        address: "",
        opening_time: "",
        closing_time: "",
        salon_gender_type: "",
        capacity_seats: "",
        verified: false,
        owner_id: 0,
        longitude: 0.0,
        latitude: 0.0
    })
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);

    const [agree, setAgree] = useState(false);
    const [zoom, setZoom] = useState(DefaultZoom);
    function handlecheckbox(){
        setAgree(!agree);
    }
    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    function handleResetLocation() {
        setDefaultLocation({ ...DefaultLocation });
        setLocation({ ...DefaultLocation });
        setZoom(DefaultZoom);
    }
    function setLocationinstate(){
        setShop({ ...shop, longitude: location.lng , latitude: location.lat });
        console.log("setloc called");
    }
    // function handleLocationChange({ position, address, places }) {

    //     // Set new location
    //     setPosition(position);
    //     setAddress(address);
    // }
    function handlechange(e) {
        const { name, value } = e.target;

        setShop(
            {
                ...shop,
                [name]: value
            }
        )
    }
    // function getLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(getPosInState);
    //     } else {
    //         //   x.innerHTML = "Geolocation is not supported by this browser.";
    //     }
    // }

    // function getPosInState(position) {
    //     // x.innerHTML = "Latitude: " + position.coords.latitude + 
    //     // "<br>Longitude: " + position.coords.longitude;

    //     setShop({ ...shop, longitude: position.coords.longitude, latitude: position.coords.latitude })

    //     // return position;
    // }
    function handlegender(e) {
        setShop({ ...shop, salon_gender_type: e.target.value });
    }
    // async function getOwnerId() {
    //     const ownerId = await JSON.parse(localStorage.getItem("owner"))._id;
    //     console.log(ownerId);
    //     console.log("getowner called");
    //     setShop({ ...shop, owner_id: ownerId });
    //     // while(ownerId!=0){
    //     //     setShop({ ...shop, owner_id: ownerId });
    //     // }
    // }

    // useEffect(() => {
    //     getLocation();
    //     // getOwnerId();
    // }, []);
    async function registerShop() {

        const {
            shop_name,
            address,
            opening_time,
            closing_time,
            salon_gender_type,
            capacity_seats,
            owner_id,
            longitude,
            latitude
        } = shop;
        console.log(shop);
        if (shop_name, address, opening_time, closing_time, salon_gender_type, capacity_seats, owner_id, longitude, latitude) {
            var res = await fetch("http://localhost:9700/owner/addShop", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    shop_name: shop_name,
                    address: address,
                    opening_time: opening_time,
                    closing_time: closing_time,
                    salon_gender_type: salon_gender_type,
                    capacity_seats: capacity_seats,
                    verified: false,
                    owner_id: await JSON.parse(localStorage.getItem("owner"))._id,
                    longitude: longitude,
                    latitude: latitude
                    // owner_id:150,
                    // latitude:10,
                    // longitude:5
                })
            })

            res = await res.json();
            console.log(res)
            if (res.wentWrong) {
                alert(res.message);
            }
            else {
                if (res.stat) {
                    // localStorage.setItem("shop", JSON.stringify(res.shop));
                    alert(res.message);
                    history.push('/');
                }
                else {
                    alert(res.message);
                }
            }
        }
        else {
            alert("Input fields can't be blank.");
        }

    }

    return (
        <>
            <div className='main_box'>
                <div className='after-main'>
                    <div className='container col-8 px-4 box'>
                        <div className="header">Shop Register</div>
                        <div className="row feild">
                            <div className="col-6 ">
                                <label className='label1'>Shop Name <span style={{ color: "red" }}> *</span></label><br />
                                <input type="text" className="text-box" name="shop_name" value={shop.shop_name} onChange={handlechange} placeholder="Shop Name" />
                            </div>
                            <div className="col-6">
                                <label className='label1'>Address <span style={{ color: "red" }}> *</span></label><br />
                                <input type="text" className="text-box" placeholder="Shop address" name="address" value={shop.address} onChange={handlechange} />
                            </div>
                            <div className="col-6 pt-5">
                                <label className='label1'>Saloon Gender type <span style={{ color: "red" }}> *</span></label><br />
                                <input type="radio" className='radio' value="M" onChange={handlegender} name="salon_gender_type" /> <label className='label'>Male</label>
                                <input type="radio" style={{ marginLeft: "15px" }} className='radio' value="F" onChange={handlegender} name="salon_gender_type" /> <label className='label'>Female</label>
                                <input type="radio" style={{ marginLeft: "15px" }} className='radio' value="B" onChange={handlegender} name="salon_gender_type" /> <label className='label'>Both</label>
                            </div>
                            <div className="col-6 pt-5">
                                <label className='label1'>Capacity <span style={{ color: "red" }}> *</span></label><br />
                                <input type="text" className="text-box" placeholder="Shop capacity" name="capacity_seats" value={shop.capacity_seats} onChange={handlechange} />
                            </div>
                            <div className="col-6 pt-5">
                                <label className='label1'>Opening time <span style={{ color: "red" }}> *</span></label><br />
                                <TimeField name="opening_time" value={shop.opening_time} onChange={handlechange} style={{ width: "15%", alignItems: "center", height: "45px", fontFamily: "Open Sans", fontSize: "18px", borderRadius: "2px", borderWidth: "1px", borderColor: "#b9b9b9" , textAlign:"center"}} />
                            </div>
                            <div className="col-6 pt-5">
                                <label className='label1'>Closing time <span style={{ color: "red" }}> *</span></label><br />
                                <TimeField name="closing_time" value={shop.closing_time} onChange={handlechange} style={{ width: "15%", alignItems: "center", height: "45px", fontFamily: "Open Sans", fontSize: "18px", borderRadius: "2px", borderWidth: "1px", borderColor: "#b9b9b9", textAlign:"center"}} />
                            </div>
                            <div className='col-6 pt-5'>
                                
                                <label className='label1'>Select Location <span style={{ color: "red" }}> *</span></label><br />
                                <label className='label1'>Latitute: </label><input className='text-box1' type='text' value={location.lat} disabled /> &nbsp;<br/>
                                <label className='label1'>Longitute: </label><input type='text' className='text-box1' value={location.lng} disabled />&nbsp;<br/>
                            </div>
                            <div className='col-6 pt-5'>
                                <label className='label1'>Verify Your account: </label><br />
                                <input type="checkbox" onChange={handlecheckbox} /><label style={{marginLeft:"10px"}} htmlFor="agree"> I verify my <b>credentials for shop </b> and <b>location</b> <span style={{color:"red"}}>*</span></label><br/>
                                <button className='button' type="submit" disabled={!agree} onClick={()=>{registerShop();setLocationinstate();}}>Verify</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='location'>
                {/* <div>
                    <h1>{address}</h1>
                    <div>
                        <LocationPicker
                            containerElement={<div style={{ height: '100%' }} />}
                            mapElement={<div style={{ height: '400px' }} />}
                            defaultPosition={defaultLocation}
                            onChange={handleLocationChange}
                            zoom={zoom}
                        />
                    </div>
                </div> */}
                <div className='under_loc'>
                <button className='btn btn-primary btn-sm'  onClick={handleResetLocation}>Reset Location</button> &nbsp;
                <label className='label1'>Latitute: </label><input className='text-box1' type='text' value={location.lat} disabled /> &nbsp;
                <label className='label1'>Longitute:</label><input type='text' className='text-box1' value={location.lng} disabled />&nbsp;
                <label className='label1'>Zoom:</label><input type='text' className='text-box1' value={zoom} disabled />
                </div>
                <MapPicker defaultLocation={defaultLocation}
                    zoom={zoom}
                    containerElement={<div style={{ height: '100%' }} />}
                    mapTypeId="roadmap"
                    style={{ height: '700px' }}
                    onChangeLocation={handleChangeLocation}
                    onChangeZoom={handleChangeZoom}
                    apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' />
            </div>
        </>

    )
}

export default ShopRegister;