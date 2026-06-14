function Dashboard({ transactions }) {
  const totalTransactions = transactions.length;
  const flaggedTransactions = transactions.filter((transaction) => transaction.riskScore >= 70);
  const highRiskTransactions = transactions.filter((transaction) => transaction.riskScore >= 85);

  return (
    <section className="dashboard">
      <article className="stat-card">
        <div className="stat-icon neutral">T</div>
        <div>
          <span>Total Transactions</span>
          <strong>{totalTransactions}</strong>
        </div>
      </article>
      <article className="stat-card warning">
        <div className="stat-icon warning">F</div>
        <div>
          <span>Flagged Transactions</span>
          <strong>{flaggedTransactions.length}</strong>
        </div>
      </article>
      <article className="stat-card danger">
        <div className="stat-icon danger">R</div>
        <div>
          <span>High Risk Transactions</span>
          <strong>{highRiskTransactions.length}</strong>
        </div>
      </article>
    </section>
  );
}

export default Dashboard;
