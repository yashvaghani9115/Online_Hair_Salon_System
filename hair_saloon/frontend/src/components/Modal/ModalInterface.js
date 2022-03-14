import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalInterface({ show, setShow, header, msg }) {
    return (
        <Modal
            size="md"
            show={show}
            onHide={() => setShow(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    {header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-light'>{msg}</Modal.Body>
            <Modal.Footer>
                <Button style={{ borderRadius: "20px" }} onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalInterface;
