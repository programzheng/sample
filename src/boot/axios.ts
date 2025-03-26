import { LocalStorage, Notify } from 'quasar'
import { boot } from 'quasar/wrappers';
import axios, { AxiosRequestConfig , AxiosInstance, AxiosError } from 'axios';
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
interface ApiErrorResponseData{
  message: string;
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

/**
 * go-base-api
 */
const goBaseAdminApiUserTokenKey = 'go_base_admin_token'
const goBaseAdminApi = axios.create({
  baseURL: window.location.origin,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
goBaseAdminApi.interceptors.request.use((config: AxiosRequestConfig) => {
  //set admin token
  const userToken:string = LocalStorage.getItem(goBaseAdminApiUserTokenKey)??''
  const authorization = 'Bearer '+userToken
  config.headers = {
    Authorization: authorization,
  }

  return config
}, (error) => {
  return Promise.reject(error);
})
goBaseAdminApi.interceptors.response.use((response) => {
  return response
}, (error:Error|AxiosError) => {
  // whatever you want to do with the error
  if (axios.isAxiosError(error) && error.response) {
    const data = error.response?.data as ApiErrorResponseData
    const message:string = data.message
    if(message){
      Notify.create({
        color: 'red-4',
        textColor: 'white',
        icon: 'error',
        message: message
      })
    }
  }
  else{
    Notify.create({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '伺服器錯誤'
    })
  }
  return Promise.reject(error);
});

/**
 * go-language-repository-api
 */
const goLanguageRepositoryUserTokenKey = 'go_language_repository_user_token'
const goLanguageRepositoryApi = axios.create({
  baseURL: window.location.origin,  // 替代 process.env.GO_LANGUAGE_REPOSITORY_API
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
goLanguageRepositoryApi.interceptors.request.use((config: AxiosRequestConfig) => {
  //set user token
  const userToken:string = LocalStorage.getItem(goLanguageRepositoryUserTokenKey)??''
  const authorization = 'Bearer '+userToken
  config.headers = {
    Authorization: authorization,
  }

  return config
}, (error) => {
  return Promise.reject(error);
})
goLanguageRepositoryApi.interceptors.response.use((response) => {
  return response
}, (error:Error|AxiosError) => {
  // whatever you want to do with the error
  if (axios.isAxiosError(error) && error.response) {
    const data = error.response?.data as ApiErrorResponseData
    const message:string = data.message
    if(message){
      Notify.create({
        color: 'red-4',
        textColor: 'white',
        icon: 'error',
        message: message
      })
    }
  }
  else{
    Notify.create({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '伺服器錯誤'
    })
  }
  return Promise.reject(error);
});

/**
 * node-messaging-socket-api
 */
const nodeMessagingSocketApiUserTokenKey = 'node_messaging_socket_user_token';
const nodeMessagingSocketApi = axios.create({
  baseURL: window.location.origin,  // 替代 process.env.NODE_MESSAGING_SOCKET_API
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
nodeMessagingSocketApi.interceptors.request.use((config: AxiosRequestConfig) => {
  //set user token
  const userToken:string = LocalStorage.getItem(nodeMessagingSocketApiUserTokenKey)??''
  const authorization = 'Bearer '+userToken
  config.headers = {
    Authorization: authorization,
  }

  return config
}, (error) => {
  return Promise.reject(error);
})

nodeMessagingSocketApi.interceptors.response.use((response) => {
  return response
}, (error:Error|AxiosError) => {
  // whatever you want to do with the error
  if (axios.isAxiosError(error) && error.response) {
    const data = error.response?.data as ApiErrorResponseData
    const message:string = data.message
    if(message){
      Notify.create({
        color: 'red-4',
        textColor: 'white',
        icon: 'error',
        message: message
      })
    }
  }
  else{
    Notify.create({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '伺服器錯誤'
    })
  }
  return Promise.reject(error);
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  app.config.globalProperties.$goBaseAdminApi = goBaseAdminApi;
  app.config.globalProperties.$goLanguageRepositoryApi = goLanguageRepositoryApi;
  app.config.globalProperties.$nodeMessagingSocketApi = nodeMessagingSocketApi;

});

export {
  axios,
  goBaseAdminApiUserTokenKey,
  goBaseAdminApi,
  goLanguageRepositoryApi,
  goLanguageRepositoryUserTokenKey,
  nodeMessagingSocketApi,
  nodeMessagingSocketApiUserTokenKey,
};
