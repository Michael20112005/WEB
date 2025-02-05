import React from "react";
import Tile from "../Tile/Tile";
import "./MainContent.css";
import heroImage from "../../images/angel.png";
import pig from "../../images/pig.png";
import sk from "../../images/skeleton.png";
import tv from "../../images/tv1990.png";

function MainContent() {
  return (
    <main className="main-content">
      <div className="hero">
        <img src={heroImage} alt="Slaveshelf" className="hero-image" />
        <div className="hero-content">
          <h1>We are glad to see you in the our SlaveShop!</h1>
          <p>
            Our bar is designed for power-hungry individuals. Here you will
            satisfy all your hunger for power.
          </p>
        </div>
      </div>
      <div className="tiles">
        <Tile
          title="Pig"
          image={pig}
          description="The venerable pig is capable of wielding the strength of 3 horses.. will be useful for any work in the garden or around the house."
        />
        <Tile
          title="Skeleton"
          image={sk}
          description="This unit comes with a bow and a menacing appearance. It will be very helpful in protecting the house from mobs."
        />
        <Tile
          title="TV"
          image={tv}
          description="This is an incredible thing, a breakthrough for scientists around the world. Because with this, you won't be able to relax with anything else.."
        />
      </div>
      <button className="view-more">View more</button>
    </main>
  );
}

export default MainContent;
