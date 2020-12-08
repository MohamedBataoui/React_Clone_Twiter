import React from "react";
import Logo from "./IconeTwitch.svg";
import Search from "./IconeSearch.svg";
import IconeMenu from "./IconeMenu.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <nav className="headerTop">
        <ul className="listeMenu">
          <li className="liensNav">
            <Link className="lien" to="/">
              <img src={Logo} alt="logo twitch" className="logo" />
            </Link>
          </li>
          <li className="liensNav">
            <Link className="lien" to="/">
              Top Games
            </Link>
          </li>
          <li className="liensNav">
            <Link className="lien" to="/top-streams">
              Top Streams
            </Link>
          </li>
          <li className="liensNav">
            <form className="formSubmit">
              <input
                type="text"
                placeholder="Rechercher"
                className="inputSearch"
              />
              <button type="submit">
                <img src={Search} alt="icone loupe" className="logoLoupe" />
              </button>
            </form>
          </li>
        </ul>
      </nav>
      <div className="menuResBtn">
        <img src={IconeMenu} alt=" icone menue respnsive" className="menuIco" />
      </div>
    </div>
  );
}
