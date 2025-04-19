import { Suspense } from "react";

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let fetchData: Post[];

type Post = {
	id: string;
	title: string;
	content: string;
	created_at: string;
	updated_at: string;
};

const fetchPosts = async (): Promise<Post[]> => {
	const res = await fetch("http://localhost:3000/api/v1/posts");
	return res.json();
};

type Props = {
	setPost: (postId: string) => void;
};

const Posts = ({ setPost }: Props) => {
	if (!fetchData) {
		throw fetchPosts().then((data) => {
			fetchData = data;
		});
	}

	return (
		<div>
			{fetchData.map((post: Post) => (
				<div key={post.id}>
					<button
						// href={`posts/${post.id}`}
						type="button"
						onClick={() => {
							setPost(post.id);
						}}
					>
						{post.title}
					</button>
					<p>{post.content}</p>
					<button type="button">Edit</button>
					<button type="button">Delete</button>
				</div>
			))}
		</div>
	);
};

export const SuspensePosts = ({ setPost }: Props) => {
	return (
		<>
			<Suspense fallback={<p>loading ...</p>}>
				<Posts setPost={setPost} />
			</Suspense>
		</>
	);
};
