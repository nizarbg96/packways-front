// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const REMOTE_URL = 'http://147.135.136.78:8096' ;
const LOCAL_URL = 'http://127.0.0.1:8052' ;
export const environment = {
  production: false,
  // googleAPIKey: 'AIzaSyAPAf-flbiOFpWjBaVK_p0sH1mWGYNdCAM'
  googleAPIKey: 'AIzaSyA-Mv9N7wwVvT4xndz8QFkxuZpWlmdoKgw',
  // localhost url
  serverUrl: LOCAL_URL
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
