import "./Posts.css";
import { useState } from 'react';
import PostPreview from "../../components/PostPreview/PostPreview";
import useRemBreakpoint from "../../hooks/useRemBreakpoint";
import AnimatedLine from "../../components/AnimatedLine/AnimatedLine";
import Button from "../../components/Button/Button";
import RevealSection from "../../components/RevealSection/RevealSection";

export default function Posts() {
	const exampleData = [
		{
			image: "https://picsum.photos/200/300",
			date: "12 October 2025",
			title: "Beethoven - Symphony No. 5 in C Minor, Op. 67",
			caption: "An iconic symphony that begins with one of the most recognizable motifs in classical music. Its dramatic progression captivates listeners from start to finish.",
			tag: "romantic reveries"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "13 October 2025",
			title: "Mozart - Piano Concerto No. 21 in C Major, K. 467",
			caption: "A masterpiece of elegance and charm, featuring a lyrical second movement that has enchanted audiences for centuries.",
			tag: "romantic reveries"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "14 October 2025",
			title: "Bach - Brandenburg Concerto No. 3 in G Major, BWV 1048",
			caption: "A lively concerto filled with intricate counterpoint and energetic interplay between instruments. A celebration of Baroque virtuosity.",
			tag: "limelight letters"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "15 October 2025",
			title: "Tchaikovsky - Swan Lake, Op. 20: Act II",
			caption: "A romantic ballet piece full of emotion and graceful melodies. Its haunting themes evoke the beauty and tragedy of the story.",
			tag: "romantic reveries"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "16 October 2025",
			title: "Debussy - Clair de Lune",
			caption: "A shimmering, impressionistic piano piece that evokes a peaceful moonlit night. Its gentle melody is both soothing and profoundly beautiful.",
			tag: "romantic reveries"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "17 October 2025",
			title: "Vivaldi - The Four Seasons: 'Spring' (La primavera)",
			caption: "The quintessential Baroque depiction of spring, bursting with bright, cheerful violin melodies and the sounds of nature awakening.",
			tag: "limelight letters"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "18 October 2025",
			title: "Chopin - Nocturne in E-flat Major, Op. 9, No. 2",
			caption: "One of the most popular and recognized nocturnes, known for its elegant, flowing melody and sophisticated ornamentation. Perfect for quiet contemplation.",
			tag: "personal"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "19 October 2025",
			title: "Stravinsky - The Rite of Spring (Le Sacre du printemps)",
			caption: "A revolutionary ballet score famous for its rhythmic vitality and jarring harmonies, which radically changed music composition in the 20th century.",
			tag: "limelight letters"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "20 October 2025",
			title: "Handel - Water Music, Suite No. 2 in D Major, HWV 349",
			caption: "Composed for King George I's boat trip on the River Thames, this suite is a grand, celebratory work with iconic brass fanfares.",
			tag: "personal"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "21 October 2025",
			title: "Schubert - Ave Maria, D. 839",
			caption: "A serene and heartfelt setting of a traditional prayer, celebrated for its purity of melody and emotional depth.",
			tag: "romantic reveries"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "22 October 2025",
			title: "Ravel - Boléro",
			caption: "A mesmerizing orchestral piece built on repetition and gradual crescendo, growing from a whisper to a thunderous finale.",
			tag: "limelight letters"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "23 October 2025",
			title: "Mahler - Symphony No. 2 in C Minor 'Resurrection'",
			caption: "A monumental symphony exploring life, death, and transcendence through lush orchestration and soaring choral climaxes.",
			tag: "romantic reveries"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "24 October 2025",
			title: "Haydn - String Quartet in C Major, Op. 76, No. 3 'Emperor'",
			caption: "Famed for its noble slow movement, later adopted as the German national anthem, this quartet balances grace and structure.",
			tag: "limelight letters"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "25 October 2025",
			title: "Liszt - Liebesträume No. 3",
			caption: "A romantic piano work of passion and tenderness, showcasing Liszt’s gift for lyrical melody and expressive harmonies.",
			tag: "romantic reveries"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "26 October 2025",
			title: "Brahms - Hungarian Dance No. 5",
			caption: "A fiery, dance-inspired piece with infectious rhythms and spirited energy, one of Brahms’s most beloved short works.",
			tag: "limelight letters"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "27 October 2025",
			title: "Dvořák - Symphony No. 9 in E Minor 'From the New World'",
			caption: "A powerful synthesis of American folk influence and European symphonic tradition, filled with sweeping themes and nostalgia.",
			tag: "romantic reveries"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "28 October 2025",
			title: "Mendelssohn - Violin Concerto in E Minor, Op. 64",
			caption: "A cornerstone of the violin repertoire, admired for its lyrical beauty and virtuosic brilliance.",
			tag: "limelight letters"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "29 October 2025",
			title: "Puccini - Nessun dorma (from Turandot)",
			caption: "An operatic aria of triumph and passion, immortalized by its soaring final note that embodies hope and victory.",
			tag: "romantic reveries"
		},
		{
			image: "https://picsum.photos/200/300",
			date: "30 October 2025",
			title: "Saint-Saëns - The Carnival of the Animals",
			caption: "A humorous and imaginative suite where each movement playfully represents different animals through vivid musical character.",
			tag: "personal"
		}
	];


  let [postStream, setPostStream] = useState(exampleData);
	let smallWindow = useRemBreakpoint(80);

	return (
			<div className="posts-page">
				<div className="recent-header">
					<h1>Recent Posts</h1>
					<AnimatedLine delay={.25}/>
				</div>
				<RevealSection delay={.75} duration={0.75}>
					<div className="recent-posts">
						{!smallWindow ?
							<div className="posts">
								<div className="main-post">
									<PostPreview type="main" data={postStream[0]}/>
								</div>
								<div className="side-posts">
									<PostPreview type="side" data={postStream[1]}/>
									<PostPreview type="side" data={postStream[2]}/>
									<PostPreview type="side" data={postStream[3]}/>
								</div>
							</div>
							:
							<div className="small-posts">
								<PostPreview type="card" data={postStream[0]}/>
								<PostPreview type="card" data={postStream[1]}/>
								<PostPreview type="card" data={postStream[2]}/>
								<PostPreview type="card" data={postStream[3]}/>
							</div>
						}
					</div>
				</RevealSection>
				
				
				<div className="all-header">
						<h1>View All Posts</h1>
						<AnimatedLine delay={0.25}/>
					</div>

					<RevealSection delay={.75} duration={.75}>
						<div className="all-posts">
							<PostFilter/>
							<PaginatedList className="" data={postStream} pageNum={!useRemBreakpoint(60) ? 5 : 1}/>
						</div>
					</RevealSection>

			</div>
	);
}

function PostFilter() {
  const tags = ["romantic reveries", "personal", "limelight letters", "repertoire update"];

  return (
    <div className="post-filter">
      <div className="filter-group">
        <h2>Search Posts</h2>
        <input
          type="text"
          placeholder="Search by title or caption..."
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <h2>Filter by Tag</h2>
        <div className="tag-options">
          {tags.map((tag, idx) => (
            <button key={idx} className="tag-button">
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h2>Sort by</h2>
        <select className="sort-select">
          <option value="date-desc">Date: Newest First</option>
          <option value="date-asc">Date: Oldest First</option>
          <option value="title-asc">Title: A → Z</option>
          <option value="title-desc">Title: Z → A</option>
        </select>
      </div>

      <div className="filter-actions">
        <Button>Apply</Button>
      </div>
    </div>
  );
}



function PaginatedList({ data, pageNum }) {
  const ITEMS_PER_PAGE = 8;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = data.slice(startIndex, endIndex);

  const getPageNumbers = (visibleCount = 5) => {
		const pages = [];

		if (visibleCount <= 1) return [`${page} of ${totalPages}`];

		const sideCount = Math.floor(visibleCount / 2);

		let start = Math.max(1, page - sideCount);
		let end = Math.min(totalPages, page + sideCount);

		if (page <= sideCount) {
			start = 1;
			end = Math.min(totalPages, visibleCount);
		} else if (page >= totalPages - sideCount) {
			start = Math.max(1, totalPages - visibleCount + 1);
			end = totalPages;
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		if (start > 1) {
			if (start > 2) pages.unshift("…");
			pages.unshift(1);
		}

		if (end < totalPages) {
			if (end < totalPages - 1) pages.push("…");
			pages.push(totalPages);
		}

		return pages;
	};

  const handlePageClick = (num) => {
    if (num !== "…" && (typeof num === "number")) setPage(num);
  };

  return (
    <div className="paginated-container">
      <div className="all-posts-grid">
        {currentItems.map((post, index) => (
          <PostPreview key={index} type="min" data={post} />
        ))}
      </div>

      <div className="pagination">
        <span
          className={`page-nav-button ${page === 1 ? "disabled" : "underline-animate"}`}
          onClick={() => page > 1 && setPage((p) => Math.max(p - 1, 1))}
        >
          ← Prev
        </span>

        {getPageNumbers(pageNum).map((num, idx) => (
          <span
            key={idx}
            className={`page-number ${num === page ? "active" : ""} ${
              num === "…" ? "disabled" : "underline-animate"
            }`}
            onClick={() => handlePageClick(num)}
          >
            {num}
          </span>
        ))}

        <span
          className={`page-nav-button ${page === totalPages ? "disabled" : "underline-animate"}`}
          onClick={() => page < totalPages && setPage((p) => Math.min(p + 1, totalPages))}
        >
          Next →
        </span>
      </div>
    </div>
  );
}
