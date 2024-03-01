import React, { useState, useEffect } from "react";
import vignette from "../Medias/vignette.webp";
import Background from "./Background";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function WebPlayback(props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Le Blindtesteur fou",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect().then((success) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );
        }
      });
    };
  }, []);

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b> Instance non active. Active la via l'application Spotify !</b>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="main-wrapper p-5 bg-gray">
            {show ? (
              <img
                src={current_track.album.images[0].url}
                className="now-playing__cover"
                alt=""
              />
            ) : (
              <img src={vignette} className="now-playing__cover" alt="" />
            )}

            <div className="now-playing__side">
              <div className="now-playing__name">
                {show ? current_track.name : "Titre inconnu"}
              </div>
              <div className="now-playing__artist">
                {show ? current_track.artists[0].name : "Artiste inconnu"}
              </div>

              <button
                className="btn btn-primary"
                onClick={() => {
                  player.previousTrack();
                  setShow(false);
                }}
              >
                &lt;&lt;
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  player.togglePlay();
                }}
              >
                {is_paused ? "PLAY" : "PAUSE"}
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  player.nextTrack();
                  setShow(false);
                }}
              >
                &gt;&gt;
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  show ? setShow(false) : setShow(true);
                }}
              >
                {show ? "Cacher" : "Afficher"}
              </button>

              <br />
              <label htmlFor="volume" className="form-label mt-3">
                Volume
              </label>
              <input
                type="range"
                id="volume"
                className="form-range"
                min="0"
                max="1"
                step="0.01"
                onChange={(e) => {
                  player.setVolume(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default WebPlayback;
