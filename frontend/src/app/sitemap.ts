import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://hoteltechddjw.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Si en el futuro hay blog o más páginas, se añaden aquí:
    // {
    //   url: 'https://hoteltechddjw.com/blog',
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
  ]
}
