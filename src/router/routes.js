
const routes = [
  {
    path: '/',
    component: () => import('layouts/Home.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ]
  },
  {
    path: '/sucursales',
    component: () => import('layouts/Sucursales.vue'),
    children: [
      { path: '', component: () => import('pages/Sucursales/Home.vue') },
      /* { path: 'new', component: () => import('pages/Sucursales/CreateSucursal.vue') }, */
    ]
  },
  {
    path: '/personal',
    component: () => import('layouts/Personal.vue'),
    children: [
      { path: '', component: () => import('pages/Personal/Index.vue') },
      { path: 'new', component: () => import('pages/Personal/CreatePersonal.vue') },
    ]
  },
  {
    path: '/articulos',
    component: () => import('layouts/Articulos.vue'),
    children: [
      { path: '', component: () => import('pages/Articulos/Index.vue') },
      { path: 'new', component: () => import('pages/Articulos/CreateArticles.vue') },
      { path: 'categoria', component: () => import('pages/Articulos/Category.vue') },
      { path: 'precios', component: () => import('pages/Articulos/Price.vue') },
      { path: 'proveedores', component: () => import('pages/Articulos/Provider.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
