import "./NavScreen.css";
import portrait from '../../assets/background-piano.jpg';

export default function NavScreen({ isOpen }) {
  return (
    <nav className={`nav-screen ${isOpen ? "open" : ""}`}>
			<div className="nav-screen-img-container">
				<img src={portrait} alt="portrait" className={`nav-screen-img ${isOpen ? "open" : ""}`}></img>
			</div>
			<div className="nav-screen-links">
				<a href="/" className="underline-animate">Home</a>
				<a href="/notes" className="underline-animate">Program Notes</a>
				<a href="/posts" className="underline-animate">Posts</a>
				<a href="/repertoire" className="underline-animate">Repertoire</a>
				<a href="/postlude" className="underline-animate">Postlude</a>
			</div>
    </nav>
  );
}
