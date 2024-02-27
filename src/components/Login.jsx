import React from "react";

function Login() {
  return (
    <div className="App">
      <div className="container d-flex justify-content-center">
        <div className="position-absolute top-50 start-50 translate-middle">
          <h1>Bienvenue sur le Blindtesteur Fou !</h1>
          <h2>
            Blindtests, devine les paroles, et bien d'autres jeux à venir !
          </h2>
          <a href="/auth/login">Connecte-toi avec Spotify →</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
