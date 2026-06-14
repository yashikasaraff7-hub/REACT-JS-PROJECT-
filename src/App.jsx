import { useEffect, useMemo, useState } from "react";
import {
  approvalRules,
  auditCheckpointGraph,
  branchAuditTasks,
  complianceOfficers,
  initialTransactions
} from "./data";
import { findShortestPath } from "./utils";
import Dashboard from "./components/Dashboard.jsx";
import TransactionForm from "./components/TransactionForm.jsx";
import SearchBar from "./components/SearchBar.jsx";
import TransactionTable from "./components/TransactionTable.jsx";
import ReviewQueue from "./components/ReviewQueue.jsx";
import ApprovalRulesHub from "./components/ApprovalRulesHub.jsx";
import ShortestPathFinder from "./components/ShortestPathFinder.jsx";
import AuditorTaskAssignor from "./components/AuditorTaskAssignor.jsx";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "transactions", label: "Transactions" },
  { id: "review", label: "Review" },
  { id: "assignor", label: "Auditors" },
  { id: "pathfinder", label: "Pathfinder" }
];

function App() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchId, setSearchId] = useState("");
  const [sortHighToLow, setSortHighToLow] = useState(true);
  const [reviewQueue, setReviewQueue] = useState([]);
  const [historyStack, setHistoryStack] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const addToHistory = (currentTransactions) => {
    setHistoryStack((previousHistory) => [...previousHistory, currentTransactions]);
  };

  const addTransaction = (newTransaction) => {
    addToHistory(transactions);
    setTransactions((currentTransactions) => [...currentTransactions, newTransaction]);
  };

  const updateRiskScore = (transactionId, newRiskScore) => {
    addToHistory(transactions);
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, riskScore: Number(newRiskScore) }
          : transaction
      )
    );
  };

  const undoLastUpdate = () => {
    if (historyStack.length === 0) {
      return;
    }

    const previousTransactions = historyStack[historyStack.length - 1];
    setTransactions(previousTransactions);
    setHistoryStack((currentStack) => currentStack.slice(0, -1));
  };

  const addFlaggedToQueue = () => {
    const flaggedTransactions = transactions.filter((transaction) => transaction.riskScore >= 70);
    setReviewQueue(flaggedTransactions);
  };

  const processNextReview = () => {
    setReviewQueue((currentQueue) => currentQueue.slice(1));
  };

  const visibleTransactions = useMemo(() => {
    return transactions
      .filter((transaction) =>
        transaction.id.toLowerCase().includes(searchId.trim().toLowerCase())
      )
      .sort((first, second) =>
        sortHighToLow
          ? second.riskScore - first.riskScore
          : first.riskScore - second.riskScore
      );
  }, [transactions, searchId, sortHighToLow]);

  const flaggedCount = transactions.filter((transaction) => transaction.riskScore >= 70).length;
  const highRiskValue = transactions
    .filter((transaction) => transaction.riskScore >= 70)
    .reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <main className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">ITM Skills University Project</p>
          <h1>FinTrack Compliance Settle</h1>
          <p>
            A professional audit workspace for checking financial transactions, reviewing
            flagged records, assigning auditors, and tracing accounting errors.
          </p>
        </div>
        <button
          className="theme-toggle"
          onClick={() => setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))}
          type="button"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>

      <section className="landing-page">
        <div className="landing-copy">
          <p className="eyebrow">Financial Audit Management System</p>
          <h2>Organized compliance tracking for transaction verification.</h2>
          <p>
            FinTrack brings transaction monitoring, risk review, approval rules, auditor
            assignment, and BFS-based error tracing into one structured audit workspace.
          </p>
          <div className="landing-actions">
            <button onClick={() => setActiveTab("transactions")} type="button">
              Open Workspace
            </button>
            <button
              className="secondary-button"
              onClick={() => setActiveTab("pathfinder")}
              type="button"
            >
              Trace Audit Path
            </button>
          </div>
        </div>

        <div className="landing-summary" aria-label="System highlights">
          <article>
            <span>Risk Review</span>
            <strong>{flaggedCount}</strong>
            <p>Flagged records ready for verification.</p>
          </article>
          <article>
            <span>Audit Value</span>
            <strong>₹{highRiskValue.toLocaleString("en-IN")}</strong>
            <p>High-risk transaction value under watch.</p>
          </article>
          <article>
            <span>Process Flow</span>
            <strong>BFS</strong>
            <p>Shortest verification route to locate accounting errors.</p>
          </article>
        </div>
      </section>

      <nav className="tab-bar" aria-label="Main sections">
        {tabs.map((tab) => (
          <button
            className={activeTab === tab.id ? "tab-button active" : "tab-button"}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "overview" && (
        <section className="tab-panel">
          <Dashboard transactions={transactions} />

          <div className="insight-grid">
            <article className="insight-card">
              <span>Open Review Queue</span>
              <strong>{reviewQueue.length}</strong>
              <p>Transactions currently waiting for manual compliance review.</p>
            </article>
            <article className="insight-card">
              <span>Flagged Records</span>
              <strong>{flaggedCount}</strong>
              <p>Records with a risk score of 70 or above.</p>
            </article>
            <article className="insight-card">
              <span>High-Risk Value</span>
              <strong>₹{highRiskValue.toLocaleString("en-IN")}</strong>
              <p>Total transaction value currently marked as high risk.</p>
            </article>
          </div>
        </section>
      )}

      {activeTab === "transactions" && (
        <section className="tab-panel layout">
          <div className="panel">
            <h2>Add Transaction</h2>
            <TransactionForm onAddTransaction={addTransaction} />
          </div>

          <div className="panel">
            <div className="section-heading">
              <div>
                <h2>Compliance Record Table</h2>
                <p>Search, sort by risk score, and update a record if needed.</p>
              </div>
              <button className="secondary-button" onClick={undoLastUpdate} type="button">
                Undo Last Update
              </button>
            </div>

            <SearchBar searchId={searchId} onSearchChange={setSearchId} />

            <div className="toolbar">
              <button onClick={() => setSortHighToLow((current) => !current)} type="button">
                Sort Risk: {sortHighToLow ? "High to Low" : "Low to High"}
              </button>
              <span>{historyStack.length} item(s) in undo stack</span>
            </div>

            <TransactionTable
              transactions={visibleTransactions}
              onUpdateRiskScore={updateRiskScore}
            />
          </div>
        </section>
      )}

      {activeTab === "review" && (
        <section className="tab-panel layout">
          <ReviewQueue
            queue={reviewQueue}
            onAddFlagged={addFlaggedToQueue}
            onProcessNext={processNextReview}
          />

          <ApprovalRulesHub rules={approvalRules} />
        </section>
      )}

      {activeTab === "assignor" && (
        <section className="tab-panel">
          <AuditorTaskAssignor initialBranches={branchAuditTasks} officers={complianceOfficers} />
        </section>
      )}

      {activeTab === "pathfinder" && (
        <section className="tab-panel">
          <ShortestPathFinder graph={auditCheckpointGraph} findShortestPath={findShortestPath} />
        </section>
      )}
    </main>
  );
}

export default App;
