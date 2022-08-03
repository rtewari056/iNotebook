import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    id: "",
    editTitle: "",
    editDescription: "",
    editTag: "",
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      editTitle: currentNote.title,
      editDescription: currentNote.description,
      editTag: currentNote.tag,
    });
  };

  const handleSubmit = (e) => {
    editNote(
      note.id,
      note.editTitle,
      note.editTag.length === 0 ? "General" : note.editTag, // If user leave the tag field empty while editing then set it to general
      note.editDescription
    );
    refClose.current.click();
    props.showAlert("Updated sucessfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5">
      <AddNote showAlert={props.showAlert} />

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
                    className={`form-control ${
                      note.editTitle.length === 0
                        ? ""
                        : note.editTitle.length < 3
                        ? "is-invalid"
                        : "is-valid"
                      // If nothing is typed then set it to "" else, if title length is <3 then set "is-invalid" else set "is-valid"
                    }`}
                    id="editTitle"
                    name="editTitle"
                    value={note.editTitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                  <div className="invalid-feedback">
                    Title must be atleast 3 characters
                  </div>
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
                    className={`form-control ${
                      note.editDescription.length === 0
                        ? ""
                        : note.editDescription.length < 5
                        ? "is-invalid"
                        : "is-valid"
                    }`}
                    id="editDescription"
                    name="editDescription"
                    value={note.editDescription}
                    onChange={onChange}
                  />
                  <div className="invalid-feedback">
                    Description must be atleast 5 characters
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={
                  (note.editTitle.length >= 3 &&
                    note.editDescription.length >= 5) === true
                    ? false
                    : true
                  // If length of the title and description is less than 3 and 5 then only disable the button
                }
              >
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="display-6 my-4">Your notes</h1>
      <div className="row">
        {notes.length === 0 && (
          <div className="container">No notes to display</div>
        )}
        {notes.map((note, index) => {
          return (
            <NoteItem
              key={index}
              updateNote={updateNote}
              note={note}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </div>
  );
}
