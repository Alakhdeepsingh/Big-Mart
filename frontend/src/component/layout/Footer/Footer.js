import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>BIGMART.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2022 &copy; Alakhdeep Singh</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.linkedin.com/in/alakhdeepsingh/">Linkedin</a>
        <a href="https://www.youtube.com/channel/UC2IKS2Izc-_jR0NrR1AVkIw">Youtube</a>
        <a href="https://github.com/Alakhdeepsingh">Github</a>
      </div>
    </footer>
  );
};

export default Footer;