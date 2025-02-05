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
        <p>SlaveShop</p>
      </div>
      <div className="social-media">
        <a
          href="https://www.tiktok.com/@povistky?_t=ZM-8tekOM3wlm9&_r=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={TTIcon} alt="TT" className="social-icon" />
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={YoutubeIcon} alt="Youtube" className="social-icon" />
        </a>
        <a href="https://t.me" target="_blank" rel="noopener noreferrer">
          <img src={tgIcon} alt="tg" className="social-icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
