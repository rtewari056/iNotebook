import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const hostName = "http://localhost:5000";
  const [notes, setNotes] = useState([]); // Empty array to store notes

  // Get all notes
  const getNotes = async () => {
    // API call
    const url = `${hostName}/api/notes/fetchAllNotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json.notes);
  };

  // Add a note
  const addNote = async (title, tag, description) => {
    // API call
    const url = `${hostName}/api/notes/addNote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, tag, description }),
    });

    const json = await response.json();
    setNotes(notes.concat(json.savedNote));
  };

  // Update a note
  const editNote = async (id, title, tag, description) => {
    // API call
    const url = `${hostName}/api/notes/updateNote/${id}`;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, tag, description }),
    });

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

  // Delete a note
  const deleteNote = async (id) => {
    // API call
    const url = `${hostName}/api/notes/deleteNote/${id}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    setNotes(notes.filter((note) => note._id !== id)); // Filter the deleted note and set the remaining notes
  };

  return (
    <NoteContext.Provider
      value={{ hostName, notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
