import React, {useState, useEffect} from 'react';
import {getBlogById} from '../utils/firestoreDB.js';

export const BlogImage = ({name, alt, className = '', postId, onLoad, onError, style = {}}) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                if (!postId) {
                    throw new Error('Post ID not provided');
                }

                const blogData = await getBlogById(postId);
                console.log(blogData)

                if (blogData && blogData[name]) {
                    setImageUrl(blogData[name]);
                } else {
                    setError(`Image ${name} not found in blog data`);
                    onError && onError();
                }
            } catch (err) {
                console.error('Error fetching image:', err);
                setError(err.message);
                onError && onError();
            }
        };

        fetchImage();
    }, [name, postId, onError]);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!imageUrl) return null;

    return (
        <img
            src={imageUrl}
            alt={alt || `Изображение ${name}`}
            className={`my-4 mx-auto h-auto w-auto ${className}`}
            onLoad={onLoad}
            onError={onError}
            style={style}
        />
    );
};

export default BlogImage;