const { generateBlogSideBar } = require('./util')


module.exports = {
  title: 'mayonaka',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' }
    ],
    repo: 'myoshi1012',
    sidebar: [
      ...generateBlogSideBar('/posts'),
    ],
    sidebarDepth: 0,
    tags: {
      path: '/tags/:tagName'
    },
    categories: {
      path: '/categories/:category'
    }
  },
  plugins: [
    [
      '@vuepress/blog', 
      {
        postsDir: 'posts',
        permalink: '/blog/:year/:month/:day/:slug',
        categoryIndexPageUrl: '/blog/category/',
        tagIndexPageUrl: '/blog/tag/'
      }
    ]
  ],
  host: '0.0.0.0'
}
