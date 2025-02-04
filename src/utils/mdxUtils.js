export const getAllPosts = async (language) => {
    try {
        // Изменяем путь для учета языковых папок
        const modules = import.meta.glob('/src/content/posts/**/*.mdx', { eager: true });
        const posts = await Promise.all(
            Object.entries(modules)
                // Фильтруем файлы по языку
                .filter(([filepath]) => filepath.includes(`/${language}/`))
                .map(async ([filepath, module]) => {
                    try {
                        console.log('Module structure:', {
                            filepath,
                            moduleKeys: Object.keys(module),
                            frontmatter: module.frontmatter,
                            default: typeof module.default
                        });

                        // Извлекаем slug без языкового префикса
                        const slug = filepath.split('/').pop().replace('.mdx', '');

                        if (!module.frontmatter) {
                            console.warn(`No frontmatter found for ${slug}`);
                            return null;
                        }

                        return {
                            content: module.default,
                            frontmatter: module.frontmatter,
                            slug,
                        };
                    } catch (moduleError) {
                        console.error(`Error processing post ${filepath}:`, moduleError);
                        return null;
                    }
                })
        );

        const validPosts = posts
            .filter(post => post !== null && Object.keys(post.frontmatter).length > 0)
            .sort((a, b) =>
                new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
            );

        console.log('Processed posts:', validPosts);
        return validPosts;
    } catch (error) {
        console.error('Error in getAllPosts:', error);
        return [];
    }
};