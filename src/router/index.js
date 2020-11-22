import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

import Courses from '../views/Courses.vue'
import Login from '../views/Login.vue'
import Lessons from '../views/Lessons.vue'
import CreateCourses from '../views/CreateCourses.vue'
import EditCourses from '../views/EditCourses.vue'
import ExportLessons from '../views/ExportLessons.vue'
import Bookings from '../views/Bookings.vue'
import AddBooking from '../views/AddBooking.vue'
import Categories from '../views/Categories.vue'
import Tutors from '../views/Tutors.vue'
import AddTutor from '../views/AddTutor.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/tutors',
    name: 'Tutors',
    component: Tutors,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/add-tutor',
    name: 'AddTutor',
    component: AddTutor,
    meta: {
      requiresAuth: true,
    }
  },
  
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/edit-courses',
    name: 'EditCourses',
    component: EditCourses,
    meta: {
      requiresAuth: true,
    }
  },
  
  {
    path: '/add-booking',
    name: 'AddBooking',
    component: AddBooking,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/create-courses',
    name: 'CreateCourses',
    component: CreateCourses,
    meta: {
      requiresAuth: true,
    }
  },
  
  {
    path: '/bookings',
    name: 'Bookings',
    component: Bookings,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/lessons',
    name: 'Lessons',
    component: Lessons,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/export-lessons',
    name: 'ExportLessons',
    component: ExportLessons,
    props:true,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
