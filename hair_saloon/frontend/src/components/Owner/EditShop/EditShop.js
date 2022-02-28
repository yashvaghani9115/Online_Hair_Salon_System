import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TimeField from 'react-simple-timefield';
import { Modal, Button } from 'react-bootstrap';
import EditImageListModal from './EditImageListModal';
import MapModal from './MapModal';

import { MDBInput } from 'mdbreact';
import { BsShop } from 'react-icons/bs';
import { FaAddressCard } from 'react-icons/fa';
import { MdOutlineReduceCapacity } from 'react-icons/md';

const DefaultLocation = { lat: 21.101472400442564, lng: 72.82393134493594 };
const DefaultZoom = 10;

function EditShop() {
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('/img/bg1.jpg')",
        // height: "91vh"s
    }


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
                // console.log(res.shop);
                if (res.wentWrong) {
                    alert(res.message);
                }
                else {
                    if (res.stat) {
                        localStorage.removeItem("shop");
                        localStorage.setItem("shop",JSON.stringify(res.shop));
                        alert(res.message);
                     
                        if(shop.verified=="Accept")
                        {
                            history.push("/ownerHome")
                        }
                        else
                        {
                            history.push('/verification');
                        }
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
                <center><div className="spinner-border text-primary " role="status">
                </div>
                    <span className="text-white">Loading...</span>
                </center>
                :
                <div className='main' style={style} >
                    <div className='d-flex justify-content-center' style={{ textAlign: "center" }}>
                        <div className='bg-white ' style={{ width: "150vh", minHeight: "75vh", borderRadius: "25px", boxShadow: "3px 3px rgb(33,37,41)" }} >

                            <div className='mt-4 text-black'>
                                <h1 >Edit Shop</h1>
                            </div>
                            <div className='row form-group ml-2 mt-3'>
                                <div className='row'>
                                    <div className='row col-md-6'>
                                        <div className='col-auto mt-3'>
                                            <BsShop size="27px" />
                                        </div>
                                        <div className="form-group col-10">
                                            <MDBInput containerClass="text-left m-0" icon='' type="text" name="shop_name" value={shop.shop_name} onChange={handlechange} label="Shop Name" />
                                        </div>
                                    </div>
                                    <div className='row col-md-6'>

                                        <div className='col-auto mt-3 '>
                                            <FaAddressCard size='27px' />
                                        </div>
                                        <div className="form-group col-10">
                                            <MDBInput containerClass="text-left m-0" label="Shop address" name="address" value={shop.address} onChange={handlechange} />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='row col-md-6'>
                                        <div className='col-1 mt-3'>
                                            <MdOutlineReduceCapacity size="27px" />
                                        </div>
                                        <div className='col-10'>
                                            <MDBInput containerClass="text-left mt-0 mb-5" type="number" label="Shop capacity" name="capacity_seats" value={shop.capacity_seats} onChange={handlechange} />
                                        </div>
                                    </div>
                                    <div className='row mt-3 col-md-6'>
                                        <div className='col-4'>
                                            <label>Gender Type : </label>
                                        </div>
                                        <div className='col-8'>
                                            {shop.salon_gender_type == "Male" ?
                                                <span className="col-auto"><input type="radio" className='form-check-input' value="Male" onChange={handlegender} defaultChecked name="salon_gender_type" /> Male</span> :
                                                <span className="col-auto"><input type="radio" className='form-check-input' value="Male" onChange={handlegender} name="salon_gender_type" /> Male</span>
                                            }
                                            {shop.salon_gender_type == "Female" ?
                                                <span className="col-auto"><input type="radio" className='form-check-input' value="Female" onChange={handlegender} defaultChecked name="salon_gender_type" /> Female</span> :
                                                <span className="col-auto"><input type="radio" className='form-check-input' value="Female" onChange={handlegender} name="salon_gender_type" /> Female</span>
                                            }
                                            {shop.salon_gender_type == "Both" ?
                                                <span className="col-auto"><input type="radio" className='form-check-input' value="Both" onChange={handlegender} defaultChecked name="salon_gender_type" /> Both</span> :
                                                <span className="col-auto"><input type="radio" className='form-check-input' value="Both" onChange={handlegender} name="salon_gender_type" /> Both</span>
                                            }
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className='row col-md-6'>
                                            <div className='col-6'>

                                                <label>Opening Time :</label>
                                            </div>
                                            <div className='col-6'>

                                                <span><TimeField name="opening_time" value={shop.opening_time} onChange={handlechange} style={{ width: "30%", height: "45px", fontFamily: "Open Sans", fontSize: "18px" }} /></span>
                                            </div>

                                        </div>
                                        <div className='row col-md-6'>
                                            <div className='col-6'>

                                                <label>Closing time :</label>
                                            </div>
                                            <div className='col-6'>

                                                <span ><TimeField name="closing_time" value={shop.closing_time} onChange={handlechange} style={{ width: "30%", height: "45px", fontFamily: "Open Sans", fontSize: "18px" }} /></span>
                                            </div>

                                        </div>
                                        <div className='row col-md-6 mt-4'>
                                            <div className='col-6'>

                                                <label>Select Location :</label>
                                            </div>
                                            <div className='col-6'>
                                                <Button style={{ fontSize: '10px', borderRadius: "4px" }} onClick={() => { setShowMap(true); }} >Set Location</Button>
                                            </div>

                                        </div>
                                        <div className='row col-md-6 mt-4' >
                                            <div className='col-6'>

                                                <label>Upload Images :</label>
                                            </div>
                                            <div className='col-6'>
                                                <Button style={{ fontSize: '10px', borderRadius: "4px" }} onClick={() => setShowImagePicker(true)} >Upload Images</Button>
                                            </div>

                                        </div>
                                        <div className='row mt-5' >
                                            <div className='text-center'>
                                                <input type="checkbox" className='form-check-input' onChange={handlecheckbox} /><label htmlFor="agree"> I verify my <b>credentials for shop </b> and <b>location</b> <span style={{ color: "red" }}>*</span></label><br />
                                                <Button className='col-6' type="submit" style={{ borderRadius: "20px", color: "white" }} variant='blue' disabled={!agree} onClick={editShop}>Edit</Button>

                                            </div>

                                        </div>

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
                </div>
            }
        </>

    )
}

export default EditShop;