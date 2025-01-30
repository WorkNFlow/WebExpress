import { MDXProvider } from "@mdx-js/react";

const BlogPost = ({ content }) => {
    return (
        <div className="prose mx-auto">
            <MDXProvider>
                <article>{content}</article>
            </MDXProvider>
        </div>
    );
};

export default BlogPost;