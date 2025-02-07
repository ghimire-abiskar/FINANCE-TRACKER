import { useContext, useEffect } from "react";
import LedgerContext from "../context/Ledgercontext";

const Home = () => {
  const { ledgers, fetchLedgers, addLedger, updateLedger } = useContext(LedgerContext);

  useEffect(() => {
    fetchLedgers();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Transaction Overview</h2>

      <div className="list-group mt-3">
        {ledgers.length > 0 ? (
          ledgers.map((ledger) => (
            <div key={ledger._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{ledger.category}</strong> - {ledger.description}
                <p className={`text-${ledger.type === "income" ? "success" : "danger"}`}>
                  {ledger.type === "income" ? "+" : "-"} ${ledger.amount}
                </p>
              </div>
              <button className="btn btn-sm btn-warning" onClick={() => updateLedger(ledger._id, ledger.type, ledger.amount, ledger.category, ledger.description)}>
                Edit
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No transactions found</p>
        )}
      </div>


      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => addLedger("expense", 100, "Food", "Lunch at restaurant")}>
          Add Transaction
        </button>
      </div>
    </div>
  );
};

export default Home;
