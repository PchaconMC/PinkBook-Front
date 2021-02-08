import Vue from 'vue'
import VueRouter from 'vue-router'
import MainBooks from '@/views/Main.vue'
import Login from '@/components/LoginBP.vue'
import Detail from '@/components/DetailBP.vue'
import CreateBook from '@/components/CreateBookBP.vue'
import EditBook from '@/components/EditBookBP.vue'
import Rating from '@/components/RatingBookBP.vue'
import AdminCategories from '@/components/AdminCategoryBP.vue'
import {
  store
} from '@/store/store';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainBooks',
    component: MainBooks,      
    meta: { esPublico: true},  
  },  
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { esPublico: true, soloCuandoNoEsteLogueado: true },
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    meta: { esPublico: true},
  },
  {
    path: '/rating/:id',
    name: 'Rating',
    component: Rating,
    meta: { tipoUsuario: ['READER',"ADMIN"] },
  },
  {
    path: '/create-book',
    name: 'CreateBook',
    component: CreateBook,
    meta: { tipoUsuario: ['READER',"ADMIN"] },
  },
  {
    path: '/edit-book/:id',
    name: 'EditBook',
    component: EditBook,
    meta: { tipoUsuario: ['READER',"ADMIN"] },
  },
  {
    path: '/admin-category',
    name: 'AdminCategories',
    component: AdminCategories,
    meta: { tipoUsuario: ["ADMIN"] },
  },
  {
    path: "*",
    redirect: { name: 'MainBooks' }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const esPublico = to.matched.some((record) => record.meta.esPublico);  
  const soloCuandoNoEsteLogueado = to.matched.some(
    (record) => record.meta.soloCuandoNoEsteLogueado
  );  
  const dataUser = store.getters.getDataUser //se verifica si esta logueado
  const token=store.getters.getAccessToken
  const tipoUsuarioLogueado=dataUser.role  

  //no es publico y no esta logueado  
  if (!esPublico && !token) {    
    return next({ name:'Login' });    
  }
  //esta logueado y solo se accede cuando no este logueado
  if (token && soloCuandoNoEsteLogueado) {        
    return next({ name:'MainBooks' });    
  }
  //verificar si existe alguna restriccion de tipo de usuario  
  const tiposAcceso = to.matched[0].meta.tipoUsuario?to.matched[0].meta.tipoUsuario:[];
  
  if (tiposAcceso.length>0 && tipoUsuarioLogueado!=null) {    
    if(tiposAcceso.indexOf(tipoUsuarioLogueado)==-1){
      return next({ name:'MainBooks' });  
    }  
  }
  next()
});

export default router
