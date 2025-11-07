import "./PostPreview.css";
import React, { useEffect, useState } from "react";
import Tag from "../../components/Tag/Tag";

export default function PostPreview({ type = "main", data = {} }) {

	const typeMap = {
		main: "",
		side: "-side",
		card: "-card",
		min: "-min"
	}

	const suffix = typeMap[type] ?? "";

	return (
		<a className="preview-box" href="/">
			<div className={`preview${suffix}`}>
				<div className={`img-container${suffix}`}>
					<img src={data.image} alt="preview" className="preview-image" />
				</div>
				<div className={`preview-text${suffix}`}>
					<p className="date">{data.date}</p>
					<h1>{data.title}</h1>
					<p className="post-caption">{data.caption}</p>
					<Tag>{data.tag}</Tag>
				</div>
			</div>
		</a>
	);
}
