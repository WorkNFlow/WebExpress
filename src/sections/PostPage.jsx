import { getPosts } from "../utils/getPosts";
import BlogPost from "./BlogPost";

const PostPage = ({ post }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-sm text-gray-600">{post.date}</p>
            <BlogPost content={post.content} />
        </div>
    );
};

export async function getStaticProps({ params }) {
    const posts = getPosts();
    const post = posts.find((p) => p.slug === params.slug);

    return {
        props: { post },
    };
}

export async function getStaticPaths() {
    const posts = getPosts();
    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}

export default PostPage;