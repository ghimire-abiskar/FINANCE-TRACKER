import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LedgerContext from '../context/Ledgercontext';
function Addtrans({ addRef }) {
    const { addLedger } = useContext(LedgerContext);
    const [ledger, setledger] = useState({ type: "", category: "", description: "", amount: "" });
    const [show, setShow] = useState(false);
    const handleChange = (e) => {
        setledger({ ...ledger, [e.target.name]: e.target.value });
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAdd = (e) => {
        e.preventDefault();
        console.log("Adding ledger:");
        if(!ledger.type || !ledger.category || !ledger.description || !ledger.amount || isNaN(ledger.amount) || ledger.amount <= 0) {
            alert("Please fill all fields correctly.");
            return;
        }
        addLedger(ledger.type, ledger.amount, ledger.category, ledger.description);
        setledger({ type: "", category: "", description: "", amount: "" });
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
                    <form onSubmit={handleAdd}>
                        <div className="mb-3">
                            <label className="form-label">Type</label>
                            <select className="form-control"
                                name="type"
                                value={ledger.type}
                                onChange={handleChange}
                                required>
                                <option value={""}>--Select Type--</option>
                                <option value={"income"}>Income</option>
                                <option value={"expense"}>Expense</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <input type="text" className="form-control" name="category" value={ledger.category} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control" name="description" value={ledger.description} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Amount</label>
                            <input type="text" className="form-control" name="amount" value={ledger.amount} onChange={handleChange} required />
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Addtrans;