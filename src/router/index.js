import Vue from 'vue'
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
import EditTutor from '../views/EditTutor.vue'
import Members from '../views/Members.vue'
import MemberInfo from '../views/MemberInfo.vue'
import CorporateMembers from '../views/CorporateMembers.vue'
import AddCorporate from '../views/AddCorporate.vue'
import EditCorporate from '../views/EditCorporate.vue'
import Attendance from '../views/Attendance.vue'
import CorporateAttendance from '../views/CorporateAttendance.vue'
import NewsBlog from '../views/NewsBlog.vue'
import AddNews from '../views/AddNews.vue'
import Messages from '../views/Messages.vue'
import AddMessages from '../views/AddMessages.vue'
import AddIndividualMember from '../views/AddIndividualMember.vue'
import EditIndividualMember from '../views/EditIndividualMember.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/members',
    name: 'Members',
    component: Members,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/member-info',
    name: 'MemberInfo',
    component: MemberInfo,
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: '/add-individual-member',
    name: 'AddIndividualMember',
    component: AddIndividualMember,
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: '/edit-individual-member/:id',
    name: 'EditIndividualMember',
    component: EditIndividualMember,
    meta: {
      requiresAuth: true,
    }
  },
  
  {
    path: '/news-blog',
    name: 'NewsBlog',
    component: NewsBlog,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/add-news',
    name: 'AddNews',
    component: AddNews,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/corporate-attendance',
    name: 'CorporateAttendance',
    component: CorporateAttendance,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/add-messages',
    name: 'AddMessages',
    component: AddMessages,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/attendance',
    name: 'Attendance',
    component: Attendance,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/corporate-members',
    name: 'CorporateMembers',
    component: CorporateMembers,
    meta: {
      requiresAuth: true,
    }
  },
  
  {
    path: '/add-corporate',
    name: 'AddCorporate',
    component: AddCorporate,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/edit-corporate/:id',
    name: 'EditCorporate',
    component: EditCorporate,
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
    path: '/edit-tutor/:id',
    name: 'EditTutor',
    component: EditTutor,
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
    path: '/edit-course/:id',
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
    path: '/create-course',
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
    path: '/export-lesson/:id',
    name: 'ExportLessons',
    component: ExportLessons,
    props:true,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

export default routes
