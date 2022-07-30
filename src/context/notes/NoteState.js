import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const allNotes = [];
  const [notes, setNotes] = useState(allNotes);

  // Get all notes
  const getNotes = async () => {
    // API call
    const url = `${host}/api/notes/fetchAllNotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTY4MTI3MDQ4YzQ2ZmM4MzY1YTk0In0sImlhdCI6MTY1ODkzOTQ0NX0.QzFTw1rqjQ6endWZNbvVrHkWeBbn5ZpVm-pO7y8TqqY",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // API call
    const url = `${host}/api/notes/addNote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTY4MTI3MDQ4YzQ2ZmM4MzY1YTk0In0sImlhdCI6MTY1ODkzOTQ0NX0.QzFTw1rqjQ6endWZNbvVrHkWeBbn5ZpVm-pO7y8TqqY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // TODO: API call
    console.log(response);
    const note = {
      _id: "62e22343895fbcba8e6ff977",
      user: "62e168127048c46fc8365a94",
      title: title,
      description: description,
      tag: tag,
      timestamp: "2022-07-28T05:48:51.049Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = (id) => {
    // TODO: API call
    console.log("Deleting note with id = " + id);
    setNotes(notes.filter((note) => note._id !== id)); // Filter the deleted note and set the remaining notes
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const url = `${host}/api/notes/updateNote/${id}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTY4MTI3MDQ4YzQ2ZmM4MzY1YTk0In0sImlhdCI6MTY1ODkzOTQ0NX0.QzFTw1rqjQ6endWZNbvVrHkWeBbn5ZpVm-pO7y8TqqY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    // Logic to edit from client side
    for (const element of notes) {
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
