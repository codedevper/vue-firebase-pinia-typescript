const account = [
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/account/DashBoard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/account/profile',
    name: 'account-profile',
    component: () => import('@/views/account/profile/IndexView.vue'),
    meta: { requiresAuth: true }
  }
]

export default account
