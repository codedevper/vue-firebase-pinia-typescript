import { Router } from 'vue-router'
import { AuthStore } from '@/stores/authStore'

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $router: Router
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $auth: AuthStore
  }
}
