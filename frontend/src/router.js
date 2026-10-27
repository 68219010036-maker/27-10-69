import { createRouter, createWebHistory } from 'vue-router';
import { state } from './api';

const routes = [
    { path: '/login', component: () => import('./pages/LoginPage.vue') },
    { path: '/password', component: () => import('./pages/PasswordPage.vue') },
    { path: '/profile', component: () => import('./pages/ProfilePage.vue') },
    { path: '/', redirect: '/login' },
    { path: '/:pathMatch(.*)*', redirect: '/login' },
];

const router = createRouter({ history: createWebHistory(), routes });

export function homeOf(user) {
    if (user.must_change_password) return '/password';
    return '/profile';
}

router.beforeEach((to) => {
    const user = state.user;
    if (!user) return to.path === '/login' ? true : '/login';
    if (user.must_change_password && to.path !== '/password') return '/password';
    if (to.path === '/login') return homeOf(user);
});

export default router;
