import { useContext, useEffect, useState, useRef } from "react";
import LedgerContext from "../context/Ledgercontext";
import { useNavigate } from "react-router-dom";
import Addtrans from './Addtrans'


const Home = () => {
  const { ledgers, fetchLedgers, updateLedger, deleteledger } = useContext(LedgerContext);
  const navigator = useNavigate();
  // const [ledger, setledger] = useState(null);
  const ref = useRef(null);
  const refclose = useRef(null);
  const [ledger, setledger] = useState({ type: "", category: "", description: "", amount: "", _id: "" });

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      fetchLedgers();
      navigator('/');
    } else {
      navigator('/login');
    }
  }, []);

  const handleEdit = (ldg) => {
    // alert(ldg.type);
    setledger(ldg);
    ref.current.click();
  };

  const handleclick = () => {
    updateLedger(ledger.type, ledger.amount, ledger.category, ledger.description, ledger._id);
    // alert("Successfully edited!!");
    refclose.current.click();
  }
  const handleDelete = (ldg) => {
    deleteledger(ldg._id);
  }

  const onchange = (e) => {
    setledger({ ...ledger, [e.target.name]: e.target.value })
  }


  return (
    <>
      <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit your ledger</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className='container my-5'>
                  <form className='container my-3'>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Type</label>
                      <input type="text" className="form-control" id="title" value={ledger.type} name='type' onChange={onchange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Category</label>
                      <input type="text" className="form-control" id="title" value={ledger.category} name='category' onChange={onchange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="desc" className="form-label">Description</label>
                      <input type="text" className="form-control" id="description" value={ledger.description} name='description' onChange={onchange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tag" className="form-label">Amount</label>
                      <input type="text" className="form-control" id="tag" value={ledger.amount} name='amount' onChange={onchange} />
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button ref={refclose} type="button" className="close" data-bs-dismiss="modal" aria-label="Close"> Close</button>

                {/* <button type="button" disabled={ledger.title.length < 5 || ledger.description.length < 5} className="btn btn-primary" onClick={handleclick}>Update ledger</button> */}
                <button type="button" className="btn btn-primary" onClick={handleclick}>Update ledger</button>
              </div>
            </div>
          </div>
        </div>
      </div>





      <div className="container mt-4">
        <h2 className="text-center mb-4">Transactions Overview</h2>

        <div className="row">
          {ledgers.length > 0 ? (
            ledgers.map((ledger) => (
              <div key={ledger._id} className="col-md-4 mb-3">
                <div className="card shadow-sm p-3">
                  <h5 className="text-center fw-bold">{ledger.category}</h5>
                  <p className="text-muted text-center">{ledger.description}</p>
                  <p className={`fw-bold text-center text-${ledger.type === "income" ? "success" : "danger"}`}>
                    {ledger.type === "income" ? "+" : "-"} ${ledger.amount}
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
            ))
          ) : (
            <p className="text-center text-muted">No transactions found</p>
          )}
        </div>
      </div>

      <Addtrans></Addtrans>


    </>
  );
};

export default Home;