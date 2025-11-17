import { NextResponse } from 'next/server';

export async function GET() {
    const siteUrl = 'https://acesoft.in/products/ace-project-management-software';
    const robots = `
# ===================================================
# Robots.txt for ${siteUrl}
# ===================================================

# GENERAL RULES
User-agent: *
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /private
Disallow: /temp

# ===================================================
# GOOD BOTS
# ===================================================
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Yandex
Allow: /

User-agent: Baiduspider
Allow: /

# ===================================================
# BAD BOTS
# ===================================================
User-agent: BadBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: CCBot
Disallow: /

# ===================================================
# SITEMAP
# ===================================================
Sitemap: ${siteUrl}/sitemap.xml
`;

    return new NextResponse(robots.trim(), {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
