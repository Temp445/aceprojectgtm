// import { getAllProducts } from '@/lib/api';

export default async function sitemap() {
    const siteUrl = 'https://wwww.acesoft.in/products/ace-project-management-software';
    // const products = await getAllProducts();

    // 1️⃣ Static pages
    const staticPages = [
        { path: '', priority: 1.0, changeFrequency: 'daily' },
        // { path: 'about', priority: 0.7, changeFrequency: 'monthly' },
        // { path: 'productenquire', priority: 0.7, changeFrequency: 'monthly' },
        // { path: 'demo', priority: 0.7, changeFrequency: 'monthly' },
        // { path: 'contact', priority: 0.7, changeFrequency: 'monthly' },
        // { path: 'admin', priority: 0.5, changeFrequency: 'yearly' },
        // { path: 'login', priority: 0.5, changeFrequency: 'yearly' },
    ];

    const urls = [
        // ✅ Static pages
        ...staticPages.map((page) => ({
            url: `${siteUrl}/${page.path}`.replace(/\/$/, ''), // Removes trailing slash
            lastModified: new Date(),
            changeFrequency: page.changeFrequency,
            priority: page.priority,
        })),

        // ✅ Dynamic Products
        // ...products
        //     .filter((product) => {
        //         // ✅ Keep only products with a valid productPath
        //         return typeof product.productPath === 'string' && product.productPath.trim() !== '';
        //     })
        //     .map((product) => {
        //         const lastModified = product.uploadedAt
        //             ? new Date(product.uploadedAt)
        //             : new Date();

        //         return {
        //             url: `${siteUrl}/app/products/v1/${product.productPath}`,
        //             lastModified,
        //             changeFrequency: 'weekly',
        //             priority: 0.8,
        //         };
        //     }),
    ];

    return urls;
}
