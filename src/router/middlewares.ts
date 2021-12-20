import {
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router';
import { LocalStorage } from 'quasar'
import { goLanguageRepositoryApi } from 'boot/axios'

export function laravelBaseAdminAuth (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) {
	return next({ name: 'admin.php.laravel-base.login' })
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