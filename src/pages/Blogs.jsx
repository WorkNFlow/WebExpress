import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useLanguage} from "../App.jsx"
import { getAllPosts } from '../utils/mdxUtils';
import { parse } from 'date-fns';
import { ru } from 'date-fns/locale';

const Blogs = () => {
    const {language} = useLanguage()
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(5);

    // В useEffect добавляем language как зависимость
    useEffect(() => {
        const fetchPosts = async () => {
            // Передаем текущий язык в getAllPosts
            const allPosts = await getAllPosts(language);
            const sortedPosts = allPosts.sort((a, b) => {
                const dateA = parse(a.frontmatter.date, 'dd.MM.yyyy', new Date(), { locale: ru });
                const dateB = parse(b.frontmatter.date, 'dd.MM.yyyy', new Date(), { locale: ru });
                return dateB - dateA;
            });
            setPosts(sortedPosts);
        };
        fetchPosts();
    }, [language]); // Добавляем language в зависимости

    const loadMorePosts = () => {
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
    };

    return (
        <section className="w-full bg-bg lg:px-16 md:px-12 px-8 py-20 lg:pt-40">
            <div className="max-w-[1536px] mx-auto">
                <h1 className="lg:text-5xl text-4xl font-bold mb-12">
                    {language === "ru" ?
                        "Блог" :
                        "Blog"
                    }
                </h1>
                <div className="space-y-8">
                    {posts.slice(0, visiblePosts).map((post) => (
                        <Link
                            key={post.slug}
                            to={`/${language}/blogs/${post.slug}`}
                            className="p-6 max-sm:pt-14 bg-white rounded-lg flex justify-between shadow-blog shadow-primary hover:shadow-window hover:shadow-primary transition-shadow relative"
                        >
                            <div className="w-full pr-4">
                                <h2 className="text-2xl font-semibold mb-2 text-primary sm:mr-20">
                                    {post.frontmatter.title}
                                </h2>
                                <p className="text-gray-600 max-w-[90%] truncate">
                                    {post.frontmatter.excerpt}
                                </p>
                            </div>
                            <p className="text-[#aaaaaa] absolute shrink-0 top-6 right-6">
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
                        {language === "ru" ?
                            "Загрузить еще" :
                            "Load more"
                        }
                    </button>
                )}
            </div>
        </section>
    );
};

export default Blogs;