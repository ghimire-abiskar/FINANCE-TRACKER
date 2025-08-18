import { useContext, useEffect, useState, useRef } from "react";
import LedgerContext from "../context/Ledgercontext";
import { useNavigate } from "react-router-dom";
import Addtrans from './Addtrans'
import TransactionModal from "../components/Transaction";

const Home = () => {
  const { ledgers, fetchLedgers } = useContext(LedgerContext);
  const navigator = useNavigate();

  const addRef = useRef(null);
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

  const handleAdd = () => {
    addRef.current.click();
  }

  return (
    <>

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
            filteredLedgers.map((ledger) =>
            (
              <TransactionModal ledger={ledger}></TransactionModal>
            )
            )
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
