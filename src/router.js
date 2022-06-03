import Vue from 'vue'
import VueRouter from 'vue-router'
import volunt from './views/volunt.vue'
import tovolunt from './views/tovolunt.vue'
import phising from './views/phising.vue'
import main from './views/main.vue'
import comparsion from './views/comparsion.vue'


Vue.use(VueRouter)

const route = [
  {path : "/", component : main},
  {path : "/connect", component : volunt},
  {path : "/apply", component : tovolunt},
  {path : "/phising", component : phising},
  {path : "/comparsion", component : comparsion},
];

const router = new VueRouter({
  mode: 'history',
  routes: route
})

export default router