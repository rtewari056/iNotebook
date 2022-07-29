import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes } = context;
  return (
    <div className="container my-5">
      <AddNote />
      <h1 className="display-6 my-4">Your notes</h1>
      <div className="row">
        {notes.map((note, index) => {
          return <NoteItem key={index} note={note} />;
        })}
      </div>
    </div>
  );
}
