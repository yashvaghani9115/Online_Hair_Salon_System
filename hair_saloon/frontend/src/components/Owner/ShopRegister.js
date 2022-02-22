import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TimeField from 'react-simple-timefield';
import './ShopRegister.css';
import MapPicker from 'react-google-map-picker';
import { Modal, Button } from 'react-bootstrap';
import ImagePickerModal from './ImagePickerModal';

const DefaultLocation = { lat: 21.101472400442564, lng: 72.82393134493594 };
const DefaultZoom = 10;
function ShopRegister({handleClick}) {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    const [fileInputState,setFileInputState] = useState('');
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

    // const [location, setLocation] = useState(defaultLocation);

    const [agree, setAgree] = useState(false);
    const [zoom, setZoom] = useState(DefaultZoom);
    function handlecheckbox() {
        setAgree(!agree);
    }
    function handleChangeLocation(lat, lng) {
        // setLocation({ lat: lat, lng: lng });
        setShop({ ...shop, longitude: lng, latitude: lat });

    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    function handleResetLocation() {
        // setDefaultLocation({ ...DefaultLocation });
        getLocation();
        // setShop({...shop,longitude:defaultLocation.lng,latitude:defaultLocation.lat})
        // setLocation({ ...DefaultLocation });
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
        console.log(shop);
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
                    encoded_images : selectedImages
                })
            })

            res = await res.json();
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
                                <input type="radio" className='radio' value="Male" onChange={handlegender} name="salon_gender_type" /> <label className='label'>Male</label>
                                <input type="radio" style={{ marginLeft: "15px" }} className='radio' value="Female" onChange={handlegender} name="salon_gender_type" /> <label className='label'>Female</label>
                                <input type="radio" style={{ marginLeft: "15px" }} className='radio' value="Both" onChange={handlegender} name="salon_gender_type" /> <label className='label'>Both</label>
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
                                <Button style={{ fontSize: '10px', borderRadius: "4px" }} onClick={() => { setShow(true); }} >Set Location</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                <Button style={{ fontSize: '10px', borderRadius: "4px" }} onClick={() => setShowImagePicker(true)} >Upload Images</Button>
                                
                            </div>

                            <div className='col-6 pt-5'>
                                <label className='label1'>Verify Your account: </label><br />
                                <input type="checkbox" onChange={handlecheckbox} /><label style={{ marginLeft: "10px" }} htmlFor="agree"> I verify my <b>credentials for shop </b> and <b>location</b> <span style={{ color: "red" }}>*</span></label><br />
                                <button className='button' type="submit" disabled={!agree} onClick={() => { registerShop() }}>Verify</button>
                            </div>

                            <div className='col-12 pt-5 text-center'>
                                <button className='button'  onClick={() => { handleClick(1) }}>Back</button>
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