import { useState } from "react";
import { auditCheckpoints } from "../data";

function TransactionForm({ onAddTransaction }) {
  const [transactionId, setTransactionId] = useState("");
  const [department, setDepartment] = useState(auditCheckpoints[0]);
  const [amount, setAmount] = useState("");
  const [riskScore, setRiskScore] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!transactionId || !amount || !riskScore) {
      return;
    }

    onAddTransaction({
      id: transactionId.toUpperCase(),
      department,
      amount: Number(amount),
      riskScore: Number(riskScore)
    });

    setTransactionId("");
    setAmount("");
    setRiskScore("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Transaction ID
        <input
          type="text"
          value={transactionId}
          onChange={(event) => setTransactionId(event.target.value)}
          placeholder="Example: TXN1006"
        />
      </label>

      <label>
        Auditing Checkpoint
        <select value={department} onChange={(event) => setDepartment(event.target.value)}>
          {auditCheckpoints.map((checkpointName) => (
            <option key={checkpointName} value={checkpointName}>
              {checkpointName}
            </option>
          ))}
        </select>
      </label>

      <label>
        Amount
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Amount in rupees"
        />
      </label>

      <label>
        Risk Score
        <input
          type="number"
          min="0"
          max="100"
          value={riskScore}
          onChange={(event) => setRiskScore(event.target.value)}
          placeholder="0 to 100"
        />
      </label>

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
