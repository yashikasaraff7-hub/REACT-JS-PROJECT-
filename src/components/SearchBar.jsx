function SearchBar({ searchId, onSearchChange }) {
  return (
    <label className="search-box">
      Search Transaction ID
      <input
        type="text"
        value={searchId}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by ID, for example TXN1001"
      />
    </label>
  );
}

export default SearchBar;
