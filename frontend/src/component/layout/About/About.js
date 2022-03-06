import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import GitHubIcon from "@material-ui/icons/GitHub";

const About = () => {
  const visitLinkedIn = () => {
    window.location = "https://www.linkedin.com/in/alakhdeepsingh/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/bigmart/image/upload/v1646056690/avatars/pic_gdwggn.jpg"
              alt="Founder"
            />
            <Typography>Alakhdeep Singh</Typography>
            <Button onClick={visitLinkedIn} color="primary">
              Visit Linkedin
            </Button>
            <span>
              This is a BigMart wesbite made by AlakhdeepSingh.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/channel/UC2IKS2Izc-_jR0NrR1AVkIw"
              target="blank"
            >
              <YouTubeIcon className="linkedinSvgIcon" />
            </a>

            <a href="https://github.com/Alakhdeepsingh" target="blank">
              <GitHubIcon className="githubSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;