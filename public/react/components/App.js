import React, { useCallback, useEffect, useState } from "react";
import apiURL from "../api";
import Home from "./Home";
import Page from "./Page";

const App = () => {
  // An array of all pages.
  const [pages, setPages] = useState([]);

  // The single page view.
  const [currentPage, setCurrentPage] = useState(null);

  // Sends a GET request to /api/wiki and updates the pages state
  // with the response data.
  const fetchPages = useCallback(async () => {
    const response = await fetch(`${apiURL}/wiki`);
    const pages = await response.json();
    setPages(pages);
  }, []);

  // Sets the current page to the page object that was passed in.
  const navigate = (page) => {
    setCurrentPage(page);
  };

  // Fetches the list of pages when the App component first renders.
  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  // Updates the document title when the currentPage state changes.
  useEffect(() => {
    if (currentPage) {
      document.title = `${currentPage.title} - Wikiverse`;
    } else {
      document.title = "Wikiverse";
    }
  }, [currentPage]);

  // If the currentPage state is set, shows the current page.
  if (currentPage) {
    return (
      <Page {...currentPage} navigate={navigate} fetchPages={fetchPages} />
    );
  }

  // Otherwise, shows the home page.
  return <Home pages={pages} navigate={navigate} fetchPages={fetchPages} />;
};

export default App;
