import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const allNotes = []; // Empty array to store notes
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNjFmMmMwZjYyZmE3NmE1YTNkNGNhIn0sImlhdCI6MTY1OTI0ODUzNX0.PQmfeog6lN9ahD62StfT2HrdBsCAlx5hSTrhRWULa9k",
      },
    });
    const json = await response.json();
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNjFmMmMwZjYyZmE3NmE1YTNkNGNhIn0sImlhdCI6MTY1OTI0ODUzNX0.PQmfeog6lN9ahD62StfT2HrdBsCAlx5hSTrhRWULa9k",
      },
      body: JSON.stringify({ title, tag, description }),
    });

    const note = await response.json();
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNjFmMmMwZjYyZmE3NmE1YTNkNGNhIn0sImlhdCI6MTY1OTI0ODUzNX0.PQmfeog6lN9ahD62StfT2HrdBsCAlx5hSTrhRWULa9k",
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNjFmMmMwZjYyZmE3NmE1YTNkNGNhIn0sImlhdCI6MTY1OTI0ODUzNX0.PQmfeog6lN9ahD62StfT2HrdBsCAlx5hSTrhRWULa9k",
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
