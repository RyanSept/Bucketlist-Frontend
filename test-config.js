// Load our SystemJS configuration.
System.config({
  baseURL: '/base/',
  defaultJSExtensions: true,
  paths: {
    'angular2/*': 'node_modules/angular2/*.js',
    'rxjs/*': 'node_modules/rxjs/*.js',
    'ng2-toastr/*': 'node_modules/ng2-toastr/*.js',
    'angular2-jwt/*': 'node_modules/angular2-jwt/*.js'
  }
});

