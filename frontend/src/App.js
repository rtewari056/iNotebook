import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [alertMessage, setAlertMessage] = useState({ message: "", type: "" });
  const [dismissAlert, setDismissAlert] = useState("none");

  const showAlert = (message, type) => {
    setAlertMessage({
      message: message,
      type: type,
    });
    setDismissAlert("block");

    // To dismiss the alert after 2 seconds
    setTimeout(() => {
      setAlertMessage({ message: "", type: "" });
      setDismissAlert("none");
    }, 2000);
  };

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar showAlert={showAlert} />
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route
              path="/login"
              element={<Login showAlert={showAlert} />}
            ></Route>
            <Route
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            ></Route>
          </Routes>
          <Alert
            alertMessage={alertMessage}
            dismissAlert={dismissAlert}
            setDismissAlert={setDismissAlert}
          />
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
