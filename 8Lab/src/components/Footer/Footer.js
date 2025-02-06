import React from "react";
import "./Footer.css";
import logoImage from "../../images/tv1980.png";
import TTIcon from "../../images/TT.png";
import YoutubeIcon from "../../images/youtube.png";
import tgIcon from "../../images/tg.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="branding">
        <img src={logoImage} alt="Logo" className="footer-logo" />
        <p>BookShop</p>
      </div>
      <div className="social-media">
        <a href="#TT">
          <img src={TTIcon} alt="TT" className="social-icon" />
        </a>
        <a href="#youtube">
          <img src={YoutubeIcon} alt="Youtube" className="social-icon" />
        </a>
        <a href="#tg">
          <img src={tgIcon} alt="tg" className="social-icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
