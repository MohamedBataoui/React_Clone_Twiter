import React, { useState, useEffect } from "react";
import api from "../../Api";

export default function Games() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const getData = async () => {
      // Appel de l'Api
      const response = await api.get("https://api.twitch.tv/helix/games/top");
      // console.log(response);
      // Création de la Data
      let dataArray = response.data.data;
      let finalArray = dataArray.map((game) => {
        // création de nouveau Url
        let newUrl = game.box_art_url
          .replace("{width}", "250")
          .replace("{height}", "300");
        game.box_art_url = newUrl;
        return game;
      });
      setGames(finalArray);
    };
    getData();
  }, []);

  // console.log(games);
  return (
    <div>
      <h1 className="titreGames">Jeux les plus populaires</h1>
      <div className="flexAccueil">
        {games.map((game, index) => (
          <div key={index} className="carteGames">
            <img
              src={game.box_art_url}
              alt="jeu profile pic"
              className="imgCarte"
            />
            <div className="carteBodyGames">
              <h5 className="titreCartesGames">{game.name}</h5>
              <div className="btnCarte">Regarder {game.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
