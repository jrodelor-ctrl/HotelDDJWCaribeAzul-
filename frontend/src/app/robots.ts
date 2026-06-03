import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Prohibimos que Google indexe el panel administrativo
    },
    sitemap: 'https://hoteltechddjw.com/sitemap.xml',
  }
}
