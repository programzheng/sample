import {
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router';
import { LocalStorage } from 'quasar'

export function laravelBaseAdminAuth (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext):void {
	return next({ name: 'admin.php.laravel-base.login' })
}

export function goLanguageRepositoryAuth (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext):void {
	const token = LocalStorage.getItem('go_language_repository_user_token')
  if(!token){
    return next({ name: 'go.language-repository.login' })
  }
  return next()
}