import React, { useEffect, useState } from "react";
import Api from "./../../Api";
import { Link } from "react-router-dom";

function TopStreams() {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await Api.get("https://api.twitch.tv/helix/streams");
      let dataArray = response.data.data;
      // console.log(dataArray);
      let gameIDs = dataArray.map((stream) => {
        return stream.game_id;
      });
      let userIDs = dataArray.map((stream) => {
        return stream.user_id;
      });

      // Création des Urls personnalisés

      let baseUrlGames = "https://api.twitch.tv/helix/games?";
      let baseUrlUsers = "https://api.twitch.tv/helix/users?";

      let queryParamsGame = "";
      let queryParamsUsers = "";

      gameIDs.map((id) => {
        return (queryParamsGame = queryParamsGame + `id=${id}&`);
      });
      userIDs.map((id) => {
        return (queryParamsUsers = queryParamsUsers + `id=${id}&`);
      });

      // Url Final

      let urlFinalGames = baseUrlGames + queryParamsGame;
      let urlFinalUsers = baseUrlUsers + queryParamsUsers;

      // console.log(urlFinalGames, urlFinalUsers);

      // Appel

      let getGamesNames = await Api.get(urlFinalGames);
      let getUsers = await Api.get(urlFinalUsers);

      // Data

      let gamesNameArray = getGamesNames.data.data;
      let usersArray = getUsers.data.data;

      // console.log(gamesNameArray, usersArray);

      // Création du tableau final de Data

      let finalArray = dataArray.map((stream) => {
        stream.gameName = "";
        stream.login = "";

        gamesNameArray.forEach((name) => {
          usersArray.forEach((user) => {
            if (stream.user_id === user.id && stream.game_id === name.id) {
              stream.truePic = user.profile_image_url;
              stream.gameName = name.name;
              stream.login = user.login;
            }
          });
        });

        // console.log(stream.login);

        let newUrl = stream.thumbnail_url
          .replace("{width}", "320")
          .replace("{height}", "180");
        stream.thumbnail_url = newUrl;

        return stream;
      });
      setChannels(finalArray);
    };
    getData();
  }, []);
  return (
    <div>
      <h1 className="titreGames">Stream les plus populaires</h1>
      <div className="flexAccueil">
        {channels.map((channel, index) => (
          <div key={index} className="carteStream">
            <img src={channel.thumbnail_url} alt="jeu" className="imgCarte" />
            <div className="cardBodyStream">
              <h5 className="titreCartesStream">{channel.user_name}</h5>
              <p className="txtStream">Jeu : {channel.gameName}</p>
              <p className="txtStream viewers">
                Viewers : {channel.viewer_count}
              </p>
              <Link
                className="lien"
                to={{
                  pathname: `/live/${channel.login}`,
                }}
              >
                <div className="btnCarte">Regarder {channel.user_name}</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopStreams;