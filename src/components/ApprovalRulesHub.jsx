function ApprovalRulesHub({ rules }) {
  return (
    <section className="panel">
      <h2>Approval Rules Hub</h2>
      <p>Signature matrix rules for money transfers by value band and risk level.</p>

      <div className="rules-list">
        {rules.map((rule) => (
          <article className="rule-card" key={rule.transferBand}>
            <div>
              <span className={`rule-risk ${rule.riskLevel.toLowerCase()}`}>
                {rule.riskLevel}
              </span>
              <strong>{rule.transferBand}</strong>
            </div>
            <p>{rule.requiredSignatures}</p>
            <small>{rule.departments}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ApprovalRulesHub;
