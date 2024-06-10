import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import HomePage from './components/HomePage.vue';
import IngredientsPage from './components/IngredientsPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/home', component: HomePage },
  { path: '/ingredients/:id', component: IngredientsPage, name: 'IngredientsPage' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
