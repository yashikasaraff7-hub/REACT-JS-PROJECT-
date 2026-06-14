function ReviewQueue({ queue, onAddFlagged, onProcessNext }) {
  const nextTransaction = queue[0];

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <h2>Review Queue</h2>
          <p>Flagged transactions are processed in first-in, first-out order.</p>
        </div>
        <button onClick={onAddFlagged}>Add Flagged</button>
      </div>

      {nextTransaction ? (
        <div className="queue-card">
          <span>Next Review</span>
          <strong>{nextTransaction.id}</strong>
          <p>
            {nextTransaction.department} | ₹{nextTransaction.amount.toLocaleString("en-IN")} |
            Risk {nextTransaction.riskScore}
          </p>
          <button className="secondary-button" onClick={onProcessNext}>
            Process Next
          </button>
        </div>
      ) : (
        <p className="empty-state">No flagged transactions in the queue.</p>
      )}

      <ol className="queue-list">
        {queue.map((transaction) => (
          <li key={transaction.id}>{transaction.id}</li>
        ))}
      </ol>
    </section>
  );
}

export default ReviewQueue;
