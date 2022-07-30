import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    editTitle: "",
    editDescription: "",
    editTag: "",
  });

  const ref = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      editTitle: currentNote.title,
      editDescription: currentNote.description,
      editTag: currentNote.tag,
    });
  };

  const handleSubmit = (e) => {
    console.log("Dpdating note... ");
    console.log(note);
    e.preventDefault(); // Page will not reload
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5">
      <AddNote />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="editTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTitle"
                    name="editTitle"
                    value={note.editTitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="editTag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTag"
                    name="editTag"
                    value={note.editTag}
                    onChange={onChange}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="editDescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editDescription"
                    name="editDescription"
                    value={note.editDescription}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="display-6 my-4">Your notes</h1>
      <div className="row">
        {notes.map((note, index) => {
          return <NoteItem key={index} updateNote={updateNote} note={note} />;
        })}
      </div>
    </div>
  );
}
