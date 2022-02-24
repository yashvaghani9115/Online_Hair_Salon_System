import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TimeField from 'react-simple-timefield';
import './ShopRegister.css';
import { Modal, Button } from 'react-bootstrap';
import EditImageListModal from './EditImageListModal';
import MapModal from './MapModal';

const DefaultLocation = { lat: 21.101472400442564, lng: 72.82393134493594 };
const DefaultZoom = 10;

function EditShop() {
    const old_shop = JSON.parse(localStorage.getItem("shop"));
    const history = useHistory();
    const [showMap, setShowMap] = useState(false);
    const [updationflag, setUpdationFlag] = useState(false);
    const [response, setResponse] = useState(true);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [indexOfImagesToDelete, setIndexOfImagesToDelete] = useState([]);
    const [shop, setShop] = useState({
        shop_name: old_shop.shop_name,
        address: old_shop.address,
        opening_time: old_shop.opening_time,
        closing_time: old_shop.closing_time,
        salon_gender_type: old_shop.salon_gender_type,
        capacity_seats: old_shop.capacity_seats,
        verified: old_shop.verified,
        longitude: 72.82393134493594,
        latitude: 21.101472400442564
    })
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

    // const [location, setLocation] = useState(defaultLocation);

    const [agree, setAgree] = useState(false);
    const [zoom, setZoom] = useState(DefaultZoom);
    function handlecheckbox() {
        setAgree(!agree);
    }
    function handleChangeLocation(lat, lng) {
        if (!updationflag) setUpdationFlag(true);
        setShop({ ...shop, longitude: lng, latitude: lat });
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    function handleResetLocation() {
        // setDefaultLocation({ ...DefaultLocation });
        getLocation();
        if (!updationflag) setUpdationFlag(true);
        // setShop({...shop,longitude:defaultLocation.lng,latitude:defaultLocation.lat})
        // setLocation({ ...DefaultLocation });
        setZoom(DefaultZoom);
    }


    function handlechange(e) {
        if (!updationflag) setUpdationFlag(true);
        const { name, value } = e.target;

        setShop(
            {
                ...shop,
                [name]: value
            }
        )
    }
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosInState);
        }
    }

    function getPosInState(position) {
        setDefaultLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        setShop({ ...shop, longitude: position.coords.longitude, latitude: position.coords.latitude })
    }
    function handlegender(e) {
        if (!updationflag) setUpdationFlag(true);
        setShop({ ...shop, salon_gender_type: e.target.value });
    }

    async function editShop() {
        if (!updationflag) {
            alert("Shop consisting Same value.");
        }
        else {
            const {
                shop_name,
                address,
                opening_time,
                closing_time,
                salon_gender_type,
                capacity_seats,
                longitude,
                latitude
            } = shop;
            if (shop_name && address && opening_time && closing_time && salon_gender_type && capacity_seats && longitude && latitude) {
                setResponse(false);
                var res = await fetch("http://localhost:9700/owner/editShop", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        shop_id: old_shop._id,
                        shop_name: shop_name,
                        address: address,
                        opening_time: opening_time,
                        closing_time: closing_time,
                        salon_gender_type: salon_gender_type,
                        capacity_seats: capacity_seats,
                        longitude: longitude,
                        latitude: latitude,
                        loc_id: old_shop.location_id,
                        index_images_to_delete: indexOfImagesToDelete,
                        images_to_add: selectedImages,
                    })
                })


                res = await res.json();
                setResponse(true);
                if (res.wentWrong) {
                    alert(res.message);
                }
                else {
                    if (res.stat) {
                        // localStorage.setItem("shop", JSON.stringify(res.shop));
                        alert(res.message);
                        history.push('/verification');
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

    }
    async function getOldLocation() {
        var res = await fetch("http://localhost:9700/customer/getlocation", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                loc_id: old_shop.location_id
            })
        })
        res = await res.json();
        if (res.wentWrong) {
            alert(res.message);

        } else {
            if (res.stat) {
                setShop({ ...shop, longitude: res.location.longitude, latitude: res.location.latitude });
                setDefaultLocation({ lat: shop.latitude, lng: shop.longitude });

            } else {
                alert(res.message);
            }
        }
    }
    function setDefaultLoc() {
        setDefaultLocation({ lat: shop.latitude, lng: shop.longitude });
    }
    useEffect(() => {
        getOldLocation();
    }, [])

    return (
        <>
            {!response ?
                <center><div class="spinner-border text-primary " role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                </center>
                :
                <>
                    <div className='main_box'>
                        <div className='after-main'>
                            <div className='container col-8 px-4 box'>
                                <div className="header">Edit Shop</div>
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
                                        {shop.salon_gender_type == "Male" ?
                                            <><input type="radio" className='radio' value="Male" defaultChecked onChange={handlegender} name="salon_gender_type" /> <label className='label'>Male</label></> :
                                            <><input type="radio" className='radio' value="Male" onChange={handlegender} name="salon_gender_type" /> <label className='label'>Male</label></>
                                        }
                                        {shop.salon_gender_type == "Female" ?
                                            <><input type="radio" className='radio' value="Female" defaultChecked onChange={handlegender} name="salon_gender_type" /> <label className='label'>Female</label></> :
                                            <><input type="radio" className='radio' value="Female" onChange={handlegender} name="salon_gender_type" /> <label className='label'>Female</label></>
                                        }
                                        {shop.salon_gender_type == "Both" ?
                                            <><input type="radio" className='radio' value="Both" defaultChecked onChange={handlegender} name="salon_gender_type" /> <label className='label'>Both</label></> :
                                            <><input type="radio" className='radio' value="Both" onChange={handlegender} name="salon_gender_type" /> <label className='label'>Both</label></>
                                        }
                                    </div>
                                    <div className="col-6 pt-5">
                                        <label className='label1'>Capacity <span style={{ color: "red" }}> *</span></label><br />
                                        <input type="text" className="text-box" placeholder="Shop capacity" name="capacity_seats" value={shop.capacity_seats} onChange={handlechange} />
                                    </div>
                                    <div className="col-6 pt-5">
                                        <label className='label1'>Opening time <span style={{ color: "red" }}> *</span></label><br />
                                        <TimeField name="opening_time" value={shop.opening_time} onChange={handlechange} style={{ width: "15%", alignItems: "center", height: "45px", fontFamily: "Open Sans", fontSize: "18px", borderRadius: "2px", borderWidth: "1px", borderColor: "#b9b9b9", textAlign: "center" }} />
                                    </div>
                                    <div className="col-6 pt-5">
                                        <label className='label1'>Closing time <span style={{ color: "red" }}> *</span></label><br />
                                        <TimeField name="closing_time" value={shop.closing_time} onChange={handlechange} style={{ width: "15%", alignItems: "center", height: "45px", fontFamily: "Open Sans", fontSize: "18px", borderRadius: "2px", borderWidth: "1px", borderColor: "#b9b9b9", textAlign: "center" }} />

                                    </div>
                                    <div className='col-6 pt-5'>

                                        <label className='label1 rounded'>Select Location <span style={{ color: "red" }}> *</span></label>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className='label1 rounded'>Upload Images <span style={{ color: "red" }}> *</span></label><br />

                                        <Button style={{ fontSize: '10px', borderRadius: "4px" }} onClick={() => { setDefaultLoc(); setShowMap(true); }} >Set Location</Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                        <Button style={{ fontSize: '10px', borderRadius: "4px" }} onClick={() => setShowImagePicker(true)} >Upload Images</Button>

                                    </div>

                                    <div className='col-6 pt-5'>
                                        <label className='label1'>Verify Your account: </label><br />
                                        <input type="checkbox" onChange={handlecheckbox} />
                                        <label style={{ marginLeft: "10px" }} htmlFor="agree"> I verify my <b>credentials for shop </b> and <b>location</b>
                                            <span style={{ color: "red" }}>*</span>
                                        </label><br />
                                        <button className='button' type="submit" disabled={!agree} onClick={() => { editShop() }}>Verify</button>
                                    </div>



                                </div>
                            </div>

                        </div>
                    </div>
                    <EditImageListModal show={showImagePicker} onHide={() => setShowImagePicker(false)} selectedImages={selectedImages} setSelectedImages={setSelectedImages} indexOfImagesToDelete={indexOfImagesToDelete} setIndexOfImagesToDelete={setIndexOfImagesToDelete} old_shop={old_shop} updationflag={updationflag} setUpdationFlag={setUpdationFlag} />

                    <div className='location'>


                        <>
                            <MapModal show={showMap} setShow={setShowMap} zoom={zoom} setZoom={setZoom} handleChangeLocation={handleChangeLocation} handleResetLocation={handleResetLocation} shop={shop} updationflag={updationflag} setUpdationFlag={setUpdationFlag} />
                        </>
                    </div>
                </>
            }
        </>

    )
}

export default EditShop;