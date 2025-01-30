import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

export default defineConfig({
    plugins: [
        {
            enforce: 'pre',
            ...mdx({
                providerImportSource: "@mdx-js/react",
                remarkPlugins: [
                    remarkFrontmatter,
                    [remarkMdxFrontmatter, { name: 'frontmatter' }]
                ],
            })
        },
        react()
    ],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    optimizeDeps: {
        include: ["path"]
    }
})