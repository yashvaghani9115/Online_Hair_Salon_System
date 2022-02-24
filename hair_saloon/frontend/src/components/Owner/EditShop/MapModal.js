import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TimeField from 'react-simple-timefield';
import './ShopRegister.css';
import { Modal, Button } from 'react-bootstrap';
import EditImageListModal from './EditImageListModal';
import MapPicker from 'react-google-map-picker';

function MapModal(props) {
    const { show,setShow,updationflag,setUpdationFlag,handleChangeLocation,handleResetLocation,defaultLocation,shop,zoom,setZoom } = props;
    return (
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
                <MapPicker defaultLocation={{lat:shop.latitude,lng:shop.longitude}}
                    zoom={zoom}
                    containerElement={<div style={{ height: '100%' }} />}
                    mapTypeId="roadmap"
                    style={{ height: '700px' }}
                    onChangeLocation={handleChangeLocation}
                    onChangeZoom={(newZoom)=>setZoom(newZoom)}
                    apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' />
            </Modal.Body>
            <Modal.Footer>
                <Button style={{ borderRadius: "20px" }} onClick={() => setShow(false)}>Done</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MapModal;