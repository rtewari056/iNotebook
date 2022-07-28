import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const [details, setDetails] = useState({
    "name": "Rohit",
    "class": "Bsc",
  });

  const update = () => {
    setTimeout(() => {
      setDetails({
        "name": "Mohit",
        "class": "Btech",
      });
    }, 2000);
  };
  return (
    <NoteContext.Provider value={{ details, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
