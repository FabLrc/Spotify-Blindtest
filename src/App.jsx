import React, { useState, useEffect } from "react";
import WebPlayback from "./components/WebPlayback";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      {token === "" ? <Login /> : <WebPlayback token={token} />}
      <h1>
        Les variables sont :{" "}
        {`${process.env.REACT_APP_PUBLIC_URL}:${process.env.REACT_APP_PORT}`}
      </h1>
    </>
  );
}

export default App;
