import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LedgerContext from '../context/Ledgercontext';
function Addtrans({addRef}) {
    const { addLedger } = useContext(LedgerContext);
    const [ledger, setledger] = useState({ type: "", category: "", description: "", amount: ""});
    const [show, setShow] = useState(false);
    const handleChange = (e) => {
        setledger({ ...ledger, [e.target.name]: e.target.value });
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAdd = () => {
        addLedger(ledger.type, ledger.amount, ledger.category, ledger.description);
        handleClose();
    }

    return (
        <>
            <Button ref={addRef} variant="primary" className='d-none' onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Type</label>
                            <input type="text" className="form-control" name="type" value={ledger.type} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <input type="text" className="form-control" name="category" value={ledger.category} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control" name="description" value={ledger.description} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Amount</label>
                            <input type="text" className="form-control" name="amount" value={ledger.amount} onChange={handleChange} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Addtrans;