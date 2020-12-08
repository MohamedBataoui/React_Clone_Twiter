import React, { useEffect, useState } from "react";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import { useParams } from "react-router-dom";
import Api from "./../../Api";

function Live() {
  let { slug } = useParams();
  // console.log(slug);

  const [infoStream, setInfoStream] = useState([]);
  const [infoGame, setInfosGame] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await Api.get(
        `https://api.twitch.tv/helix/streams?user_login=${slug}`
      );
      // console.log(response);

      let gameID = response.data.data.map((gameid) => {
        return gameid.game_id;
      });

      const resNomGame = await Api.get(
        `https://api.twitch.tv/helix/games?id=${gameID}`
      );
      // console.log(resNomGame);

      let nomJeu = resNomGame.data.data.map((gameName) => {
        return gameName.name;
      });
      setInfosGame(nomJeu);
      setInfoStream(response.data.data[0]);
    };
    getData();
  }, []);

  return (
    <div className="containerDecale">
      <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
      <div className="contInfo">
        <div className="titreStream">{infoStream.title}</div>
        <div className="viewer">
          <span>Viewers:</span>&nbsp;{infoStream.viewer_count}
        </div>
        <div className="infogame">
          <span>Streamer:</span> {infoStream.user_name}, &nbsp;{" "}
          {infoStream.language}
        </div>
        <div className="nomJeu">
          <span>Jeu:</span> {infoGame}
        </div>
      </div>
    </div>
  );
}

export default Live;
