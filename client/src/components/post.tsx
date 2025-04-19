import { useEffect, useState } from "react";

type Post = {
	id: string;
	title: string;
	content: string;
	created_at: string;
	updated_at: string;
};

const fetchPost = async (postId: string): Promise<Post> => {
	const res = await fetch(`http://localhost:3000/api/v1/posts/${postId}`);
	if (!res.ok) throw new Error("Failed to fetch post");
	return res.json();
};

type Props = {
	postId: string;
};

const Post = ({ postId }: Props) => {
	const [post, setPost] = useState<Post | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
        console.log("postId", postId);
		fetchPost(postId)
			.then((data) => {
				setPost(data);
			})
			.catch((err) => {
				setError(err.message);
			});
	}, [postId]);

	if (error) return <p>エラー: {error}</p>;
	if (!post) return <p>読み込み中...</p>;

	return (
		<div>
			<h2>{post.title}</h2>
			<p>{post.content}</p>
			<p>{post.created_at}</p>
			<p>{post.updated_at}</p>
		</div>
	);
};

export const SuspensePost = ({ postId }: Props) => {
	return (
		<>
			<Post postId={postId} />
		</>
	);
};
