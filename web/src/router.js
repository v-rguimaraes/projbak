
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [
      {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
              /*
              {
                path: '/',
                name: 'home',
                component: () => import('./views/Principal.vue')
              },
              */
              {
                path: '/',
                name: 'home',
                component: () => import('./views/Linhas.vue')
              },
              {
                path: '/frota',
                name: 'frota',
                component: () => import('./views/Frota.vue')
              },
              {
                path: '/itinerario',
                name: 'itinerario',
                component: () => import('./views/Itinerario.vue')
              },
            ],
        },
    
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = 'none';
    }
})

export default router
