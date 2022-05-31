const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.file('index.html')
    }
  },
  {
    method: 'GET',
    path: '/script.js',
    handler: (request, h) => {
      return h.file('script.js')
    }
  },
  {
    method: 'GET',
    path: '/style.css',
    handler: (request, h) => {
      return h.file('style.css')
    }
  }
]

module.exports = routes
