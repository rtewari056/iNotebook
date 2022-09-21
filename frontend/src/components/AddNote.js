import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const handleSubmit = (e) => {
    e.preventDefault(); // Page will not reload
    addNote(
      note.title,
      note.tag.length === 0 ? "General" : note.tag, // If the tag field empty
      note.description
    );
    setNote({ title: "", description: "", tag: "" }); // Clear input fields after submit
    props.showAlert("Note added sucessfully", "success");
  };

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="card border-info mb-3">
      <div className="card-header display-6 p-4">Add a note</div>
      <div className="card-body">
        <form className="row g-3 my-3">
          <div className="col-md-6">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className={`form-control ${
                note.title.length === 0
                  ? ""
                  : note.title.length < 3
                  ? "is-invalid"
                  : "is-valid"
                // If nothing is typed then set it to "" else, if title length is <3 then set "is-invalid" else set "is-valid"
              }`}
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.title}
            />
            <div className="invalid-feedback">
              Title must be atleast 3 characters
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="tag" className="form-label">
              Tag (Optional)
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className={`form-control ${
                note.description.length === 0
                  ? ""
                  : note.description.length < 5
                  ? "is-invalid"
                  : "is-valid"
              }`}
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
            />
            <div className="invalid-feedback">
              Description must be atleast 5 characters
            </div>
          </div>
          <div className="col-12">
            <button
              disabled={
                (note.title.length >= 3 && note.description.length >= 5) ===
                true
                  ? false
                  : true
                // If length of the title and description is less than 3 and 5 then only disable the button
              }
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Add note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
