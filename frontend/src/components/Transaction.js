import Delmodal from './Delmodal';
import TransModal from './Modal';
import { useContext, useState, useRef } from 'react';
export default function TransactionModal(props) {
    const ledger = props.ledger;
    const [ledger_to_update, setledger] = useState({ type: "", category: "", description: "", amount: "", transactionId: "" });
    const modalRef = useRef(null);
    const delRef = useRef(null);
    const handleEdit = (ldg) => {
        setledger(ldg);
        modalRef.current.click();
    };

    const handleDelete = (ldg) => {
        setledger(ldg);
        delRef.current.click();
    };
    return (
        <>
            <TransModal ledger={ledger_to_update} setledger={setledger} modalRef={modalRef} />
            <Delmodal id={ledger_to_update.transactionId} delRef={delRef}></Delmodal>
            <div key={ledger.transactionId} className="col-md-4 mb-3">
                <div className="card shadow-sm p-3">
                    <h5 className="text-center fw-bold">{ledger.category}</h5>
                    <p className="text-muted text-center">{ledger.description}</p>
                    <p className={`fw-bold text-center text-${ledger.type === "income" ? "success" : "danger"}`}>
                        {ledger.type === "income" ? "+" : "-"} Rs {ledger.amount}
                    </p>
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-sm btn-warning mx-3"
                            onClick={() => handleEdit(ledger)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(ledger)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
