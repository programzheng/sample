import {
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router';
import { LocalStorage, Notify } from 'quasar'
import {
  goBaseAdminApiUserTokenKey,
  goBaseAdminApi,
  goLanguageRepositoryApi,
  nodeMessagingSocketApi,
  nodeMessagingSocketApiUserTokenKey
} from 'boot/axios'

function getTokenFailNotify() {
  Notify.create({
    color: 'red-4',
    textColor: 'white',
    icon: 'error',
    message: '失去驗證，請重新登入'
  })
}

function authFailNextNotify() {
  Notify.create({
    color: 'red-4',
    textColor: 'white',
    icon: 'error',
    message: '驗證失效，請重新登入'
  })
}

export async function goBaseAdminAuth (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) {
	const token = LocalStorage.getItem(goBaseAdminApiUserTokenKey)
  if(!token){
    return next({ name: 'go.base.admin.login' })
  }
  //if jwt error to login page
  await goBaseAdminApi.post('api/v1/admins/auth').catch(() => {
    return next({ name: 'go.base.admin.login' })
  })
  return next()
}

export async function goLanguageRepositoryAuth (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) {
	const token = LocalStorage.getItem('go_language_repository_user_token')
  if(!token){
    return next({ name: 'go.language-repository.login' })
  }
  //if jwt error to login page
  await goLanguageRepositoryApi.post('api/v1/user/auth').catch(() => {
    return next({ name: 'go.language-repository.login' })
  })
  return next()
}

export async function nodeMessagingSocketAuth (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) {
	const token = LocalStorage.getItem(nodeMessagingSocketApiUserTokenKey)
  if(!token){
    getTokenFailNotify()
    return next({ name: 'node.messaging-socket.login' })
  }
  //if jwt error to login page
  await nodeMessagingSocketApi.post('api/v1/users/auth').catch(() => {
    authFailNextNotify()
    return next({ name: 'node.messaging-socket.login' })
  })
  return next()
}

export function laravelBaseAdminAuth (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) {
	return next({ name: 'admin.php.laravel-base.login' })
}