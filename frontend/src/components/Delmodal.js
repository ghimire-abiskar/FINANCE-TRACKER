import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LedgerContext from '../context/Ledgercontext';
function Delmodal({ id, delRef }) {
    const { deleteLedger } = useContext(LedgerContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDel = () => {
        deleteLedger(id);
        handleClose();
    }

    return (
        <>
            <Button ref={delRef} variant="primary" className='d-none' onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete the transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure want to delete this transaction??
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDel}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Delmodal;