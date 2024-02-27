import React from "react";

function Navbar(props) {
  return (
    <header>
      <nav class="navbar bg-dark" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            🎙️ Le Blindtesteur Fou
          </a>
          {props.token === "" ? (
            <a className="btn btn-primary" href="/auth/login">
              Se connecter
            </a>
          ) : (
            <p>Connecté</p>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
