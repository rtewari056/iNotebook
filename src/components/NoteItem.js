import React from "react";

export default function NoteItem(props) {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card border-info mb-3">
        <div className="card-header">{note.tag}</div>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
