export const constantRoute = [
    {
      path: '/',
      component: () => import('@/views/web/home.vue'),
      name: 'home',
      meta: {
        title: 'home',
        hidden: true,
      },
    },
    {
      path: '/workspace',
      component: () => import('@/views/web/workspace.vue'),
      name: 'workspace',
      meta: {
        title: 'workspace',
        hidden: true,
      },
    },
    {
      path: '/make',
      component: () => import('@/views/web/make.vue'),
      name: 'make',
      meta: {
        title: 'make',
        hidden: true,
      },
    },
    {
      path: '/detail/:video_id',
      component: () => import('@/views/web/detail.vue'),
      name: 'detail',
      meta: {
        title: 'detail',
        hidden: true,
      },
    },
    {
      path: '/sign-in',
      component: () => import('@/views/web/sign-in.vue'),
      name: 'sign-in',
      meta: {
        title: 'sign-in',
        hidden: true,
      },
    },
    {
      path: '/sign-up',
      component: () => import('@/views/web/sign-up.vue'),
      name: 'sign-up',
      meta: {
        title: 'sign-up',
        hidden: true,
      },
    },
    {
      path: '/terms-of-service',
      component: () => import('@/views/web/terms-of-service.vue'),
      name: 'terms-of-service',
      meta: {
        title: 'terms-of-service',
        hidden: true,
      },
    },
    {
      path: '/404',
      component: () => import('@/views/web/404.vue'),
      name: '404',
      meta: {
        title: '404',
        hidden: true,
      },
    },
  ]
  
  export const asyncRoute = [
    {
      path: '/acl',
      component: () => import('@/layout/acl/index.vue'),
      name: 'Acl',
      meta: {
        title: '权限管理',
        hidden: false,
        icon: 'Lock',
      },
      redirect: '/acl/user',
      children: [
        {
          path: '/acl/user',
          component: () => import('@/views/acl/user/index.vue'),
          name: 'User',
          meta: {
            title: '用户管理',
            hidden: false,
            icon: 'User',
          },
        },
        {
          path: '/acl/role',
          component: () => import('@/views/acl/role/index.vue'),
          name: 'Role',
          meta: {
            title: '角色管理',
            hidden: false,
            icon: 'Avatar',
          },
        },
        {
          path: '/acl/permission',
          component: () => import('@/views/acl/permission/index.vue'),
          name: 'Permission',
          meta: {
            title: '菜单管理',
            hidden: false,
            icon: 'List',
          },
        },
      ],
    },
  ]
  
  export const anyRoute = {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
    },
  }