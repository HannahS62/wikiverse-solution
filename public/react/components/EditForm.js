import React, { useState } from "react";
import apiURL from "../api";

const EditForm = ({ slug, fetchPages, ...props }) => {
  const [data, setData] = useState({
    title: props.title,
    content: props.content,
    name: props.author.name,
    email: props.author.email,
    tags: props.tags.map((tag) => tag.name).join(" "),
  });

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    //Prevent the form from submitting to the server
    event.preventDefault();
    //Send a PUT request to /api/wiki/:slug
    const response = await fetch(event.target.action, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    //Update the page in place with the response
    const editedPage = await response.json();
    props.navigate(editedPage);

    //Fetch the updated list of pages
    await fetchPages();
  };

  return (
    <form
      action={`${apiURL}/wiki/${slug}`}
      method="POST"
      onSubmit={handleSubmit}
    >
      <p>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={data.title}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          value={data.content}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={data.name}
          readOnly={true}
        />
      </p>
      <p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={data.email}
          readOnly={true}
        />
      </p>
      <p>
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          name="tags"
          id="tags"
          value={data.tags}
          onChange={handleChange}
        />
      </p>
      <p>
        <button type="submit">Edit page</button>
      </p>
    </form>
  );
};

export default EditForm;
