import "./PostPreview.css";
import React, { useEffect, useRef } from "react";
import postImage from '../../assets/carnegie.jpg';
import Tag from "../../components/Tag/Tag";

export default function PostPreview({ type = "main", delay = 0 }) {
	const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay * 1000);
          observer.unobserve(el); 
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

	const typeMap = {
		main: "",
		side: "-side",
		card: "-card"
	}

	const suffix = typeMap[type] ?? "";

	return (
		<a ref={ref} className="preview-box" href="/">
			<div className={`preview${suffix}`}>
				<div className={`img-container${suffix}`}>
					<img src={postImage} alt="preview" className="preview-image" />
				</div>
				<div className={`preview-text${suffix}`}>
					<p className="date">13 October 2025</p>
					<h1>Mendelssohn - Piano Quartet No. 2 in F Minor, Op. 2: II. Adagio</h1>
					<p className="post-caption">some preview text that will be short and sweet and serve as filler so ill keep typing typing typing when will it stop? forever and ever until i run out of filler text</p>
					<Tag className="bot-tag">romantic reveries</Tag>
				</div>
			</div>
		</a>
	);
}