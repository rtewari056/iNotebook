import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const handleSubmit = (e) => {
    e.preventDefault(); // Page will not reload
    addNote(note.title, note.description, note.tag);
  };

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h1 className="display-6">Add a note</h1>
      <form className="row g-3 my-3">
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Add note
          </button>
        </div>
      </form>
    </div>
  );
}
