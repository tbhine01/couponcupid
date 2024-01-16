import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import General from '../views/GeneralList.vue'
import FinalList from '../views/FinalList.vue'
import StoreLocations from '../views/StoreLocations.vue'
import CouponCollection from '../views/CouponCollection.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/general',
      name: 'general',
      component: General
    },
    {
      path: '/final-list',
      name: 'shopping-list',
      component: FinalList
    },
    {
      path: '/locations',
      name: 'store-locations',
      component: StoreLocations
    },
    {
      path: '/coupons',
      name: 'coupon-collection',
      component: CouponCollection
    }

  
  ]
})

export default router
