export function setupListView() {
  // list view toggle
  const searchResults = document.getElementById("search-results");
  const listViewToggle = document.getElementById("list-view");
  if (searchResults && listViewToggle){
    // Load saved state
    const savedState = localStorage.getItem('listViewEnabled');
    if (savedState !== null) {
      const isEnabled = savedState === 'true';
      listViewToggle.checked = isEnabled;
      if (isEnabled) {
        searchResults.classList.add("list");
      }
    }

    listViewToggle.addEventListener("change", () => {
      if (listViewToggle.checked) {
        searchResults.classList.add("list");
      } else {
        searchResults.classList.remove("list");
      }
      // Save state
      localStorage.setItem('listViewEnabled', listViewToggle.checked);
    })
  }
}


