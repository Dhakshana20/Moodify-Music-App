import { useState, useRef, useEffect } from "react";
import "./App.css";

// 🎶 Mood-based Tamil Playlist
const moodPlaylists = {
  Romantic: [
    { title: "Neethane Neethane", artist: "Mersal", src: "/songs/neethane.mp3" },
    { title: "Nallai Allai", artist: "Kaatru Veliyidai", src: "/songs/nallai-allai.mp3" },
    { title: "Mei Nigara", artist: "24", src: "/songs/mei-nigara.mp3" }
  ],
  Sad: [
    { title: "Ennodu Nee Irundhaal", artist: "I", src: "/songs/ennodu.mp3" },
   
  ],
  Motivational: [
    { title: "Surviva", artist: "Vivegam", src: "/songs/surviva.mp3" },
  ],
  Happy: [
    { title: "Vaathi Coming", artist: "Master", src: "/songs/vaathi.mp3" },
  ],
  Melody: [
    { title: "Munbe Vaa", artist: "Sillunu Oru Kadhal", src: "/songs/munbe-vaa.mp3" },
     { title: "Nenjukkul Peidhidum", artist: "Vaaranam Aayiram", src: "/songs/nenjukkul.mp3" },
  ]
};

function App() {
  const [mood, setMood] = useState("");
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef(null);

  const moods = Object.keys(moodPlaylists);
  const currentTrack = mood ? moodPlaylists[mood][trackIndex] : null;

  useEffect(() => {
    if (mood) setTrackIndex(0);
  }, [mood]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch((err) => console.warn("Autoplay blocked:", err));
    }
  }, [trackIndex, mood]);

  const handleNext = () => {
    const total = moodPlaylists[mood]?.length || 0;
    setTrackIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="app">
      <h1 className="title">🎧 Moodify - Tamil Edition</h1>
      <p className="subtitle">Select your mood to play Tamil songs:</p>

      <div className="mood-buttons">
        {moods.map((m) => (
          <button
            key={m}
            className={`mood-btn ${mood === m ? "active" : ""}`}
            onClick={() => setMood(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {currentTrack && (
        <div className="single-card-view">
          <div className="song-card playing">
            <h3>{currentTrack.title}</h3>
            <p>{currentTrack.artist}</p>
            <audio
              ref={audioRef}
              controls
              autoPlay
              onEnded={handleNext}
            >
              <source src={currentTrack.src} type="audio/mp3" />
            </audio>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
