import React, { useEffect, useState } from "react";
import Api from "../../Api";

export default function SideBar() {
  const [topStreams, setTopStreams] = useState([]);
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
        stream.truePic = "";
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
        return stream;
      });
      setTopStreams(finalArray.slice(0, 6));
    };
    getData();
  }, []);
  // console.log(topStreams);
  return (
    <div className="sidebar">
      <h2 className="titreSidebar">Chaînes recommandées</h2>
      <ul className="listeStream">
        {topStreams.map((stream, index) => (
          <li className="containerFlexSidebar">
            <img
              src={stream.truePic}
              alt="logo user"
              className="profilePicRonde"
            />
            <div className="streamuser">{stream.user_name}</div>
            <div className="viewerRight">
              <div className="pointRouge"></div>
              <div>{stream.viewer_count}</div>
            </div>
            <div className="gameNameSidebar">{stream.gameName}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
