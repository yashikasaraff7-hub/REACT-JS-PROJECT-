function TransactionTable({ transactions, onUpdateRiskScore }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Auditing Checkpoint</th>
            <th>Amount</th>
            <th>Risk Score</th>
            <th>Update Risk</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.department}</td>
              <td>₹{transaction.amount.toLocaleString("en-IN")}</td>
              <td>
                <span className={transaction.riskScore >= 70 ? "risk high" : "risk normal"}>
                  {transaction.riskScore}
                </span>
              </td>
              <td>
                <input
                  className="small-input"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={transaction.riskScore}
                  onBlur={(event) =>
                    onUpdateRiskScore(transaction.id, event.target.value || transaction.riskScore)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {transactions.length === 0 && (
        <p className="empty-state">No transaction found for this search.</p>
      )}
    </div>
  );
}

export default TransactionTable;
