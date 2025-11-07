import "./Repertoire.css";
import Button from "../../components/Button/Button";
import { FaHeadphonesAlt } from "react-icons/fa";
import AnimatedLine from "../../components/AnimatedLine/AnimatedLine";

export default function Repertoire() {
	const playlists = [
    {
      name: "Romantic Reveries Collection",
      description: "A collection of works that I have covered in the Romantic Reveries series thus far.",
      songs: [
        { title: "Debussy - Clair de Lune", date: "16 October 2025" },
        { title: "Chopin - Nocturne in E-flat Major, Op. 9, No. 2", date: "18 October 2025" },
        { title: "Liszt - Liebesträume No. 3", date: "25 October 2025" },
        { title: "Brahms - Hungarian Dance No. 5", date: "26 October 2025" },
        { title: "Dvořák - Symphony No. 9 in E Minor 'From the New World'", date: "27 October 2025" },
        { title: "Mendelssohn - Violin Concerto in E Minor, Op. 64", date: "28 October 2025" },
      ],
    },
    {
      name: "Wind Down Wednesday Core",
      description: "Wind Down Wednesday is a periodic event at my old University, where students enjoy a short study break with relaxing, live piano music at the beautiful Garden Chapel. Inspired by a good friend, I present a special curation of works that would be most appropriate for such a peaceful and calm occasion.",
      songs: [
        { title: "Bach - Brandenburg Concerto No. 3", date: "14 October 2025" },
        { title: "Vivaldi - The Four Seasons: Spring", date: "17 October 2025" },
        { title: "Ravel - Boléro", date: "22 October 2025" },
        { title: "Handel - Water Music, Suite No. 2 in D Major, HWV 349", date: "20 October 2025" },
        { title: "Schubert - Ave Maria, D. 839", date: "21 October 2025" },
      ],
    },
    {
      name: "Contemporary Soundscapes",
      description: "Stepping into the contemporary era, these are my favorite picks of modern instrumental music. A testament that wonderful music can be discovered in all kinds of places",
      songs: [
        { title: "Beethoven - Symphony No. 5 in C Minor, Op. 67", date: "12 October 2025" },
        { title: "Mahler - Symphony No. 2 'Resurrection'", date: "23 October 2025" },
        { title: "Puccini - Nessun dorma", date: "29 October 2025" },
        { title: "Saint-Saëns - The Carnival of the Animals", date: "30 October 2025" },
        { title: "Haydn - String Quartet in C Major, Op. 76, No. 3 'Emperor'", date: "24 October 2025" },
        { title: "Stravinsky - The Rite of Spring (Le Sacre du printemps)", date: "19 October 2025" },
      ],
    },
  ];


  return (
    <div className="repertoire-page">
      <h1>REPERTOIRE</h1>
      <p>Curated music selections for your listening enjoyment</p>

      <div className="playlists-container">
        {playlists.map((playlist, i) => (
          <div className="playlist-card" key={i}>
            <h2 className="playlist-title">{playlist.name}</h2>
            <p className="playlist-desc">{playlist.description}</p>
            <AnimatedLine/>

            <ul className="song-list">
              {playlist.songs.map((song, j) => (
                <li className="song-item" key={j}>
                  <div className="song-info">
                    <p className="song-title" title={song.title}>{song.title}</p>
                    <p className="song-date">{song.date}</p>
                  </div>
                  <Button className="song-link"><FaHeadphonesAlt/></Button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
	);
}