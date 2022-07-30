import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div className="card border-info mb-3">
        <div className="card-header">{note.tag}</div>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="icons">
            <i className="fas fa-edit me-3" onClick={() => {updateNote(note)}}></i>
            <i
              className="fas fa-trash-alt"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
