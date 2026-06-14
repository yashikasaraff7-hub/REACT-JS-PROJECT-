# FinTrack Compliance Settle

A beginner-friendly React JS project for checking company financial transactions and demonstrating simple data structures.

## Features

- Dashboard for total, flagged, and high-risk transactions
- Transaction table with ID, auditing checkpoint, amount, and risk score
- Add transaction form using `useState`
- Search by transaction ID
- Risk sorter by risk score
- Review queue for flagged transactions
- Undo feature using a stack
- Auditing checkpoint graph
- BFS shortest path finder between checkpoints

## Folder Structure

```text
src/
  components/
    Dashboard.jsx
    ReviewQueue.jsx
    SearchBar.jsx
    ShortestPathFinder.jsx
    TransactionForm.jsx
    TransactionTable.jsx
  App.jsx
  data.js
  main.jsx
  styles.css
  utils.js
```

## Run the Project

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.
