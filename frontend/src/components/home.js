import { useContext, useEffect, useState, useRef } from "react";
import LedgerContext from "../context/Ledgercontext";
import { useNavigate } from "react-router-dom";
import Addtrans from './Addtrans'
import TransModal from './Modal'
import Delmodal from "./Delmodal";

const Home = () => {
  const { ledgers, fetchLedgers, deleteledger } = useContext(LedgerContext);
  const navigator = useNavigate();
  const [ledger, setledger] = useState({ type: "", category: "", description: "", amount: "", _id: "" });
  const modalRef = useRef(null);
  const addRef = useRef(null);
  const delRef = useRef(null);
  const [filterType, setFilterType] = useState("all");
  const [categoryType, setcategoryType] = useState("");
  const [minAmount, setminAmount] = useState("");
  const [maxAmount, setmaxAmount] = useState("");

  const filteredLedgers = ledgers.filter((ledger) => {
    return (
      (filterType === "all" || ledger.type === filterType) &&
      (categoryType === "" || ledger.category.toLowerCase().includes(categoryType.toLowerCase())) &&
      (minAmount === "" || ledger.amount >= Number(minAmount)) &&
      (maxAmount === "" || ledger.amount <= Number(maxAmount))
    );
  });
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      fetchLedgers();
      navigator('/');
    } else {
      navigator('/login');
    }
  }, []);

  const handleEdit = (ldg) => {
    setledger(ldg);
    modalRef.current.click();
  };

  const handleDelete = (ldg) => {
    setledger(ldg);
    delRef.current.click();
  };

  const handleAdd = () => {
    addRef.current.click();
  }

  return (
    <>
      <TransModal ledger={ledger} setledger={setledger} modalRef={modalRef} />
      <Delmodal id={ledger._id} delRef={delRef}></Delmodal>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Transactions Overview</h2>

        {ledgers.length > 0 && <div className="d-flex gap-3 mb-3">
          <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">--Select Type--</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={categoryType}
            onChange={(e) => setcategoryType(e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Min Amount"
            value={minAmount}
            onChange={(e) => setminAmount(e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Max Amount"
            value={maxAmount}
            onChange={(e) => setmaxAmount(e.target.value)}
          />
        </div>}

        <div className="row">
          {filteredLedgers.length > 0 ? (
            filteredLedgers.map((ledger) => (
              <div key={ledger._id} className="col-md-4 mb-3">
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
            ))
          ) : (
            <p className="text-center text-muted">No transactions found</p>
          )}
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>Add transaction</button>
      </div>

      <Addtrans addRef={addRef} />
    </>
  );
};

export default Home;
