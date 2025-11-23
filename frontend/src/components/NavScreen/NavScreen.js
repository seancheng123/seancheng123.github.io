import "./NavScreen.css";
import pianos from '../../assets/piano_models3.png';


export default function NavScreen({ isOpen }) {
  return (
    <nav className={`nav-screen ${isOpen ? "open" : ""}`}>
			<div className="nav-screen-img-container">
				<img src={pianos} alt="portrait" className={`nav-screen-img ${isOpen ? "open" : ""}`}></img>
			</div>
			<div className="nav-screen-links">
				<a href="/" className="underline-animate"><p>Home</p></a>
				<a href="/notes" className="underline-animate"><p>Program Notes</p></a>
				<a href="/posts" className="underline-animate"><p>Posts</p></a>
				<a href="/repertoire" className="underline-animate"><p>Repertoire</p></a>
				<a href="/postlude" className="underline-animate"><p>Postlude</p></a>
			</div>
    </nav>
  );
}
