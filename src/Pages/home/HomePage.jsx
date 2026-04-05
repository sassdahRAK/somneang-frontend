import { useMemo, useState } from "react";
import { FaChevronDown, FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import BottomNav from "../../components/BottomNav";
import "./HomePage.css";

function HomePage() {
  const songs = useMemo(
    () => [
      {
        id: 1,
        title: "Stayboy",
        artist: "The Weekend",
        duration: "3:57",
        gradientClass: "home-t1",
        emoji: "*",
      },
      {
        id: 2,
        title: "Perfect",
        artist: "Ed Sheeran",
        duration: "4:23",
        gradientClass: "home-t2",
        emoji: "♪",
      },
      {
        id: 3,
        title: "Love In The Dark",
        artist: "Adele",
        duration: "4:45",
        gradientClass: "home-t3",
        emoji: "+",
      },
      {
        id: 4,
        title: "SOLO",
        artist: "Vanda",
        duration: "3:09",
        gradientClass: "home-t4",
        emoji: "#",
      },
      {
        id: 5,
        title: "Night Train",
        artist: "Luna Band",
        duration: "3:38",
        gradientClass: "home-t1",
        emoji: "*",
      },
      {
        id: 6,
        title: "Blue Echo",
        artist: "Nara",
        duration: "4:02",
        gradientClass: "home-t2",
        emoji: "♪",
      },
    ],
    [],
  );

  const [likedSongIds, setLikedSongIds] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const visibleSongs = showAll ? songs : songs.slice(0, 4);

  const toggleLike = (songId) => {
    setLikedSongIds((previousIds) => {
      if (previousIds.includes(songId)) {
        return previousIds.filter((id) => id !== songId);
      }

      return [...previousIds, songId];
    });
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <a
          className="home-logo"
          href="#"
          onClick={(event) => event.preventDefault()}
        >
          <svg
            className="home-logo-icon"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="22" cy="22" r="22" fill="#7a00b0" />
            <path
              d="M16 14 C16 14 28 10 30 18 C32 26 20 30 18 26 C16 22 24 20 24 20"
              stroke="#ff80ff"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="17" cy="27" r="3.5" fill="#ff40ff" />
            <path
              d="M24 20 L24 12"
              stroke="#ff80ff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="home-logo-text">Somneang</span>
        </a>

        <div className="home-search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search for song, artists, albums..."
          />
        </div>
      </header>

      <section className="home-songs-section">
        <h2 className="home-section-title">Popular Songs</h2>
        <div className="home-songs-list">
          {visibleSongs.map((song, index) => {
            const isLiked = likedSongIds.includes(song.id);

            return (
              <div className="home-song-row" key={song.id}>
                <span className="home-song-num">{index + 1}</span>

                <div className="home-song-thumb">
                  <div className={`home-thumb-grad ${song.gradientClass}`}>
                    {song.emoji}
                  </div>
                </div>

                <div className="home-song-info">
                  <div className="home-song-title">{song.title}</div>
                  <div className="home-song-artist">{song.artist}</div>
                </div>

                <div className="home-song-right">
                  <button
                    type="button"
                    className={`home-heart-btn ${isLiked ? "liked" : ""}`}
                    onClick={() => toggleLike(song.id)}
                    aria-label={`Toggle favorite for ${song.title}`}
                  >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <span className="home-song-duration">{song.duration}</span>
                </div>
              </div>
            );
          })}

          <div className="home-show-more">
            <button type="button" onClick={() => setShowAll((value) => !value)}>
              <FaChevronDown className={showAll ? "rotated" : ""} />
            </button>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
}

export default HomePage;
