import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {MDXProvider} from '@mdx-js/react';
import BlogImage from '../components/BlogImage';
import {MdKeyboardArrowLeft} from 'react-icons/md';
import useParallax from "../components/Parallax.jsx"

const BlogPost = () => {
    useParallax()
    const {id} = useParams();
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imagesLoading, setImagesLoading] = useState({});

    const updateImageLoading = (name, isLoaded) => {
        setImagesLoading(prev => ({
            ...prev,
            [name]: isLoaded
        }));
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postModule = await import(`../content/posts/${id}.mdx`);
                const images = postModule.default.toString().match(/name="(.*?)"/g) || [];

                // Инициализируем состояние загрузки для всех изображений
                const initialImagesLoading = images.reduce((acc, img) => {
                    const name = img.match(/name="(.*?)"/)[1];
                    acc[name] = false;
                    return acc;
                }, {});

                setImagesLoading(initialImagesLoading);

                setPostData({
                    id,
                    frontmatter: postModule.frontmatter,
                    default: postModule.default
                });
            } catch (error) {
                console.error('Error loading post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    // Проверяем, все ли изображения загружены
    const allImagesLoaded = postData
        ? Object.values(imagesLoading).every(loaded => loaded)
        : false;

    if (loading || !allImagesLoaded) {
        return (
            <section className="bg-bg w-full h-screen flex items-center justify-center text-5xl">
                Загрузка...
            </section>);
    }

    if (!postData) {
        return <div>Post not found</div>;
    }

    const components = {
        BlogImage: (props) => (
            <BlogImage
                {...props}
                postId={postData.id}
                onLoad={() => updateImageLoading(props.name, true)}
                onError={() => updateImageLoading(props.name, true)}
            />
        )
    };

    return (
        <section className="bg-bg px-16 py-20 lg:pt-32">
            <div className="max-w-[1536px] mx-auto">
                <div className={"flex flex-col items-center justify-center mb-8 relative"}>
                    <Link className={"flex items-center cursor-pointer font-semibold absolute top-2 left-7"} to={"/blogs"}>
                        <MdKeyboardArrowLeft className={"text-2xl mb-[1px]"}/>
                        Назад
                    </Link>
                    <div className={"h-7 p-7"}/>
                    {postData.frontmatter && (
                        <h1 className="text-4xl text-center text-primary font-bold">
                            {postData.frontmatter.title}
                        </h1>
                    )}
                </div>
                <div className="prose prose-base font-montserrat text-text lg:px-12 xl:px-16">
                    <div className="prose-content w-full">
                        <MDXProvider components={components}>
                            <article>
                                <postData.default/>
                            </article>
                        </MDXProvider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogPost;