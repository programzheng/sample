import {
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router';

export function laravelBaseAdminAuth (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext):void {
	return next({ name: 'admin.php.laravel-base.login' })
}

export function goLanguageRepositoryAuth (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext):void {
	return next({ name: 'go.language-repository.login' })
}