import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function About() {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])
  
  return <div>I am {a.details.name} from {a.details.class}</div>;
}
