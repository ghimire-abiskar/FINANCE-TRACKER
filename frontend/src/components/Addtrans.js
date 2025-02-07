import React, { useContext, useState } from 'react'
import context from '../context/Ledgercontext'

const Addledger = (props) => {
    const [ledger, setledger] = useState({ title: "", description: "", tag: "" });
    const onchange = (e) => {
        setledger({ ...ledger, [e.target.name]: e.target.value })
    }
    const { addLedger } = useContext(context);

    const handleclick = (e) => {
        e.preventDefault();
        addLedger(ledger.title, ledger.description, ledger.tag);
        setledger({ title: "", description: "", tag: "" });
        props.showalert("ledger Added Successfully", "success");
    }

    return (
        <div className='container my-5'>
            <h1>Add Your ledger</h1>
            <form className='container my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={ledger.title} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={ledger.description} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={ledger.tag} onChange={onchange} minLength={5} required />
                </div>
                <button disabled={ledger.title.length < 5 || ledger.description.length < 5} type="submit" className="btn btn-primary" onClick={handleclick}>Add ledger</button>
            </form>
        </div>
    )
}

export default Addledger
