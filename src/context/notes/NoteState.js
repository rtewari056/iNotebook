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
    // console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, tag, description) => {
    // API call
    const url = `${host}/api/notes/addNote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTY4MTI3MDQ4YzQ2ZmM4MzY1YTk0In0sImlhdCI6MTY1ODkzOTQ0NX0.QzFTw1rqjQ6endWZNbvVrHkWeBbn5ZpVm-pO7y8TqqY",
      },
      body: JSON.stringify({ title, tag, description }),
    });

    const json = await response.json();
    console.log(json);

    const note = {
      title: title,
      tag: tag,
      description: description,
    };

    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API call
    const url = `${host}/api/notes/deleteNote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTY4MTI3MDQ4YzQ2ZmM4MzY1YTk0In0sImlhdCI6MTY1ODkzOTQ0NX0.QzFTw1rqjQ6endWZNbvVrHkWeBbn5ZpVm-pO7y8TqqY",
      },
    });
    const json = await response.json();
    console.log(json);

    setNotes(notes.filter((note) => note._id !== id)); // Filter the deleted note and set the remaining notes
  };

  // Edit a note
  const editNote = async (id, title, tag, description) => {
    // API call
    const url = `${host}/api/notes/updateNote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTY4MTI3MDQ4YzQ2ZmM4MzY1YTk0In0sImlhdCI6MTY1ODkzOTQ0NX0.QzFTw1rqjQ6endWZNbvVrHkWeBbn5ZpVm-pO7y8TqqY",
      },
      body: JSON.stringify({ title, tag, description }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    // Logic to edit from client side
    for (const element of newNotes) {
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;

        break;
      }
    }

    setNotes(newNotes);
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
