import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TimeField from 'react-simple-timefield';
import MapPicker from 'react-google-map-picker';
import { Modal, Button } from 'react-bootstrap';
import ImagePickerModal from './ImagePickerModal';
import { MDBInput } from 'mdbreact';
import { BsShop } from 'react-icons/bs';
import { FaAddressCard } from 'react-icons/fa';
import { MdOutlineReduceCapacity } from 'react-icons/md';

const DefaultLocation = { lat: 21.101472400442564, lng: 72.82393134493594 };
const DefaultZoom = 10;

function ShopRegister() {
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('/img/bg1.jpg')",
    }

    const history = useHistory();
    const [show, setShow] = useState(false);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    const [shop, setShop] = useState({
        shop_name: "",
        address: "",
        opening_time: "",
        closing_time: "",
        salon_gender_type: "",
        capacity_seats: "",
        verified: "",
        longitude: 72.82393134493594,
        latitude: 21.101472400442564
    })
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

    const [agree, setAgree] = useState(false);
    const [zoom, setZoom] = useState(DefaultZoom);
    function handlecheckbox() {
        setAgree(!agree);
    }
    function handleChangeLocation(lat, lng) {
        setShop({ ...shop, longitude: lng, latitude: lat });
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    function handleResetLocation() {
        getLocation();
        setZoom(DefaultZoom);
    }

    function handlechange(e) {
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
        setShop({ ...shop, salon_gender_type: e.target.value });
    }

    async function registerShop() {
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
        if (shop_name && address && opening_time && closing_time && salon_gender_type && capacity_seats && longitude && latitude && selectedImages.length) {
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
                    verified: "pending",
                    owner_id: await JSON.parse(localStorage.getItem("owner"))._id,
                    longitude: longitude,
                    latitude: latitude,
                    encoded_images: selectedImages
                })
            })

            res = await res.json();
            if (res.wentWrong) {
                alert(res.message);
            }
            else {
                if (res.stat) {
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

    return (
        <>
            <div className='main' style={style} >
                <div className='d-flex justify-content-center' style={{ textAlign: "center" }}>
                    <div className='bg-white ' style={{ width: "150vh", minHeight: "80vh", borderRadius: "25px", boxShadow: "3px 3px rgb(33,37,41)" }} >
                        <div className='mt-4 text-black'>
                            <h1 > Shop Register</h1>
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
                                    <div className='col-auto mt-3'>
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
                                        <input type="radio" className='form-check-input' value="Male" onChange={handlegender} name="salon_gender_type" /> Male
                                        <input type="radio" style={{ marginLeft: "15px" }} className='form-check-input' value="Female" onChange={handlegender} name="salon_gender_type" /> Female
                                        <input type="radio" style={{ marginLeft: "15px" }} className='form-check-input' value="Both" onChange={handlegender} name="salon_gender_type" /> Both
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
                                            <Button style={{ fontSize: '10px', borderRadius: "4px" }} onClick={() => { setShow(true); }} >Set Location</Button>
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
                                            <label className='label1'>Verify Your account: </label><br />
                                            <input type="checkbox" className='form-check-input' onChange={handlecheckbox} /><label htmlFor="agree"> I verify my <b>credentials for shop </b> and <b>location</b> <span style={{ color: "red" }}>*</span></label><br />
                                            <Button className='col-6' type="submit" style={{ borderRadius: "20px", color: "white" }} variant='blue' disabled={!agree} onClick={registerShop}>Register</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ImagePickerModal show={showImagePicker} onHide={() => setShowImagePicker(false)} selectedImages={selectedImages} setSelectedImages={setSelectedImages} />

            <div className='location'>
                <>
                    <Modal
                        size="xl"
                        show={show}
                        onHide={() => setShow(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm" style={{ textAlign: "center" }}>
                                <span style={{ textAlign: "center", color: "blue", fontFamily: "Helvetica, sans-serif" }}>Set Your Shop Location Here</span>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='bg-light'>
                            <div style={{ textAlign: "center" }} className="mb-3">
                                <div style={{ textAlign: "center" }}>
                                    <button className='btn btn-primary btn-sm mb-3' onClick={handleResetLocation} >Set Current Location</button>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <label className='l1'>Latitute: </label><input type='text' className='text-box1' value={shop.latitude} disabled />
                                    <label className='l1'>Longitute:</label><input type='text' className='text-box1' value={shop.longitude} disabled />
                                    <label className='l1'>Zoom:</label><input type='text' className='text-box1' value={zoom} disabled />
                                </div>
                            </div>
                            <MapPicker defaultLocation={defaultLocation}
                                zoom={zoom}
                                containerElement={<div style={{ height: '100%' }} />}
                                mapTypeId="roadmap"
                                style={{ height: '700px' }}
                                onChangeLocation={handleChangeLocation}
                                onChangeZoom={handleChangeZoom}
                                apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button style={{ borderRadius: "20px" }} onClick={() => setShow(false)}>Done</Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </div>
        </>
    )
}

export default ShopRegister;