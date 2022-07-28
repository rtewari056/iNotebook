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

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
