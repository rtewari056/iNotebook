import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const allNotes = [
    {
      _id: "62e168b77048c46fc8365a9e",
      user: "62e168127048c46fc8365a94",
      title: "Title update 2",
      description: "Description update 2",
      tag: "Tag update 2",
      timestamp: "2022-07-27T16:32:55.853Z",
      __v: 0,
    },
    {
      _id: "62e2232d895fbcba8e6ff975",
      user: "62e168127048c46fc8365a94",
      title: "Title update 4",
      description: "Description update 4",
      tag: "New tag",
      timestamp: "2022-07-28T05:48:29.423Z",
      __v: 0,
    },
    {
      _id: "62e22343895fbcba8e6ff977",
      user: "62e168127048c46fc8365a94",
      title: "Title 3",
      description: "Description 3",
      tag: "General",
      timestamp: "2022-07-28T05:48:51.049Z",
      __v: 0,
    },
    {
      _id: "62e22343895fbcba8e6ff977",
      user: "62e168127048c46fc8365a94",
      title: "Title 3",
      description: "Description 3",
      tag: "General",
      timestamp: "2022-07-28T05:48:51.049Z",
      __v: 0,
    },
    {
      _id: "62e22343895fbcba8e6ff977",
      user: "62e168127048c46fc8365a94",
      title: "Title 3",
      description: "Description 3",
      tag: "General",
      timestamp: "2022-07-28T05:48:51.049Z",
      __v: 0,
    },
    {
      _id: "62e22343895fbcba8e6ff977",
      user: "62e168127048c46fc8365a94",
      title: "Title 3",
      description: "Description 3",
      tag: "General",
      timestamp: "2022-07-28T05:48:51.049Z",
      __v: 0,
    },
    {
      _id: "62e22343895fbcba8e6ff977",
      user: "62e168127048c46fc8365a94",
      title: "Title 3",
      description: "Description 3",
      tag: "General",
      timestamp: "2022-07-28T05:48:51.049Z",
      __v: 0,
    },
    {
      _id: "62e22343895fbcba8e6ff977",
      user: "62e168127048c46fc8365a94",
      title: "Title 3",
      description: "Description 3",
      tag: "General",
      timestamp: "2022-07-28T05:48:51.049Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(allNotes);

  // Add a note
  const addNote = (title, description, tag) => {
    // TODO: API call
    console.log("Adding a new note");
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
  const editNote = (id, title, description, tag) => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
