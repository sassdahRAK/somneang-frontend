import React from "react";
import "./SearchPage.css";
import rock from "../../assets/rock.jpg";
import BottomNav from "../../components/BottomNav";

export default function SearchPage() {
  const genres = [
    { name: "ROCK", img: rock },
    { name: "R&B", img: rock },
    { name: "CLASSIC", img: rock },
    { name: "HIP-HOP", img: rock },
    { name: "JAZZ", img: rock },
    { name: "ROMANTIC", img: rock },
  ];

  return (
    <div className="container">
      {/* HEADER */}
      <div className="header">
        {/* PUT YOUR LOGO HERE */}
        <div className="logo">LOGO</div>

        <input
          type="text"
          placeholder="Search for song, artists, albums..."
          className="search-bar"
        />
      </div>

      {/* TITLE */}
      <h2 className="title">Top Recommend Genres</h2>

      {/* GRID */}
      <div className="grid">
        {genres.map((genre, index) => (
          <div className="card" key={index}>
            {/* PUT YOUR IMAGE HERE */}
            <img src={genre.img} alt={genre.name} />
            <p>{genre.name}</p>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
