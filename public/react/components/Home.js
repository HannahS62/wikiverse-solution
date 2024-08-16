import React, { useState } from "react";
import apiURL from "../api";
import Form from "./Form";

const Home = (props) => {
  const [isAddingPage, setIsAddingPage] = useState(false);
  const handleClick = async (event) => {
    // Prevents the browser from following the link.
    event.preventDefault();

    // Sends a GET request to /api/wiki/:slug and gets the response data.
    const response = await fetch(apiURL + event.target.pathname);
    const page = await response.json();

    // Updates the currentPage state (in App) with the response data.
    props.navigate(page);
  };

  const hideForm = () => {
    setIsAddingPage(false);
  };

  return (
    <main>
      <h1 className="title">Wikiverse</h1>
      <p className="subtitle">
        An interesting <span aria-label="library">📚</span>
      </p>

      <button
        onClick={() => setIsAddingPage(!isAddingPage)}
        aria-expanded={isAddingPage}
      >
        Toggle Name
      </button>
      {isAddingPage && (
        <Form hideForm={hideForm} fetchPages={props.fetchPages} />
      )}
      <ul className="pageList">
        {props.pages.map((page) => (
          <li className="pageList-item" key={page.id}>
            <a href={`/wiki/${page.slug}`} onClick={handleClick}>
              {page.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
