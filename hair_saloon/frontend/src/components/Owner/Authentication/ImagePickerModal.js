import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ImagePickerModal(props) {
    const [fileInputState, setFileInputState] = useState();
    const [errMsg, setErrMsg] = useState('');
    
    const { selectedImages, setSelectedImages } = props;

    const handleFileInputChange = (e) => {
        console.log(e.target.files)
        for (let i = 0; i < e.target.files.length; i++) {
            if (e.target.files[i].type == "image/png" || e.target.files[i].type == "image/jpeg") {
                encodeAndAppend(e.target.files[i]);
            }
            else {
                setErrMsg("Input file type must be image only.");
            }
        }
    };

    const encodeAndAppend = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setSelectedImages((prev) => [...prev, reader.result]);
        };
        reader.onerror = () => {
            console.error('something went wrong!');
            setErrMsg('something went wrong!');
        };
        setErrMsg('');
    };

    function removeImage(index) {
        //removing element by filter
        setSelectedImages(prev => prev.filter((ele, ind) => ind !== index));
    }
    function hide() {
        setErrMsg('');
        props.onHide();
    }
    return (
        <Modal {...props} size="lg" backdrop="static" aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2>Image Picker</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container h-auto" style={{ backgroundColor: '#f0f8ff' }}>
                    <div className="row my-1">
                        {selectedImages && selectedImages.map((selectedImage, i) => (
                            <div key={i} className="col-4 col my-2 cntr">
                                <img
                                    src={selectedImage}
                                    alt="chosen"
                                    style={{ height: '130px', width: '210px' }}
                                />
                                <button onClick={() => { removeImage(i); }} className="btn1">X</button>
                            </div>
                        ))}
                    </div>

                </div>
                <br />
                <input
                    type="file"
                    name='images[]'
                    multiple="multiple"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                />
                {errMsg && <p style={{ position: 'relative', marginBottom: "0px", color: "red", fontSize: "large" }}>{errMsg}</p>}

            </Modal.Body>
            <Modal.Footer>
                <Button size="lg" onClick={hide}>Done</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ImagePickerModal;