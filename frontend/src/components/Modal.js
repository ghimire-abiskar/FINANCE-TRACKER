import React, { useState, useImperativeHandle, forwardRef } from "react";

const Modal = forwardRef(({ ledger, onSave }, ref) => {
    const [formData, setFormData] = useState({
        type: ledger?.type || "expense",
        amount: ledger?.amount || "",
        category: ledger?.category || "",
        description: ledger?.description || "",
    });

    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
    }));

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(formData);
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{ledger ? "Edit Transaction" : "Add Transaction"}</h5>
                        <button type="button" className="btn-close" onClick={() => setIsOpen(false)}></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="form-control mb-2" />
                        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" className="form-control mb-2" />
                        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="form-control mb-2" />
                        <select name="type" value={formData.type} onChange={handleChange} className="form-control mb-2">
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Modal;
