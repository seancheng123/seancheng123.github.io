import "./Reveries.css";
import PostPreview from "../../components/PostPreview/PostPreview";
import useRemBreakpoint from "../../hooks/useRemBreakpoint";
import AnimatedLine from "../../components/AnimatedLine/AnimatedLine";
import Tag from "../../components/Tag/Tag";

export default function Reveries() {
	const smallWindow = useRemBreakpoint(80);

  
	return (
		<div className="reveries">
			<div className="header">
				<h1>Recent Posts</h1>
				<p>Sort and filter posts using the tags below</p>
				<div className="tag-select">
					<Tag>romantic reveries</Tag>
					<Tag>limelight letters</Tag>
				</div>
				
				<AnimatedLine delay={1}/>
			</div>
			{!smallWindow ?
				<div className="posts">
					<div className="main-post">
						<PostPreview type="main" delay={0.5}/>
					</div>
					<div className="side-posts">
						<PostPreview type="side" delay={1}/>
						<PostPreview type="side" delay={1.5}/>
						<PostPreview type="side" delay={2}/>
					</div>
				</div>
				:
				<div className="small-posts">
					<PostPreview type="card" delay={0.5}/>
					<PostPreview type="card" delay={1}/>
					<PostPreview type="card" delay={1.5}/>
					<PostPreview type="card" delay={2}/>
				</div>
			}
		</div>
	);
}