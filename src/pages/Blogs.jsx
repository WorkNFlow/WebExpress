import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/mdxUtils';
import { parse } from 'date-fns';
import { ru } from 'date-fns/locale';

const Blogs = () => {
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(5);

    useEffect(() => {
        const fetchPosts = async () => {
            const allPosts = await getAllPosts();
            const sortedPosts = allPosts.sort((a, b) => {
                const dateA = parse(a.frontmatter.date, 'dd.MM.yyyy', new Date(), { locale: ru });
                const dateB = parse(b.frontmatter.date, 'dd.MM.yyyy', new Date(), { locale: ru });
                return dateB - dateA;
            });
            setPosts(sortedPosts);
        };
        fetchPosts();
    }, []);

    const loadMorePosts = () => {
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
    };

    return (
        <section className="w-full bg-bg px-16 py-20 lg:pt-40">
            <div className="max-w-[1536px] mx-auto">
                <h1 className="text-5xl font-bold mb-12">Блог</h1>
                <div className="space-y-8">
                    {posts.slice(0, visiblePosts).map((post) => (
                        <Link
                            key={post.slug}
                            to={`/blogs/${post.slug}`}
                            className="p-6 bg-white rounded-lg flex justify-between shadow-blog shadow-primary hover:shadow-window hover:shadow-primary transition-shadow relative"
                        >
                            <div className="w-full pr-4">
                                <h2 className="text-2xl font-semibold mb-2 text-primary mr-20">
                                    {post.frontmatter.title}
                                </h2>
                                <p className="text-gray-600 max-w-[90%] truncate">
                                    {post.frontmatter.excerpt}
                                </p>
                            </div>
                            <p className="text-[#aaaaaa] shrink-0 absolute top-6 right-6">
                                {post.frontmatter.date}
                            </p>
                        </Link>
                    ))}
                </div>
                {visiblePosts < posts.length && (
                    <button
                        onClick={loadMorePosts}
                        className="mt-8 px-6 py-3 bg-primary text-white rounded-lg hover:bg-hover transition-colors"
                    >
                        Загрузить еще
                    </button>
                )}
            </div>
        </section>
    );
};

export default Blogs;