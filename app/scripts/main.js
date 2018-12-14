require.config({
    baseUrl: '',
    paths: {
    	'angular': 'bower_components/angular/angular',
	    'angular-ui-router': 'bower_components/ui-router/release/angular-ui-router',
	    'angularAMD': 'bower_components/angularAMD/angularAMD',
	    'ngload': 'bower_components/angularAMD/ngload',
	    'angular-cookies': 'bower_components/angular-cookies/angular-cookies',
	    'angular-resource': 'bower_components/angular-resource/angular-resource',
        'angular-animate': 'bower_components/angular-animate/angular-animate.min',
        'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize.min',
        'angular-strap': 'bower_components/angular-strap/dist/angular-strap.min',
        'angular-strap-tpl': 'bower_components/angular-strap/dist/angular-strap.tpl.min',
	    'jquery': 'bower_components/jquery/dist/jquery',
	    'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
      'momentjs': 'bower_components/moment/moment',
      'moment-locale-zh': 'bower_components/moment/locale/zh-cn',
      'angularMoment': 'bower_components/angular-moment/angular-moment',
      'angular-carousel': 'bower_components/angular-carousel/dist/angular-carousel.min'
    },
    shim: {
    	'angularAMD': ['angular'], 
    	'angular-route': ['angular'], 
    	'angular-ui-router': ['angular'], 
    	'angular-resource': ['angular'], 
        'angular-animate': ['angular'], 
        'angular-sanitize': ['angular'], 
        'angular-strap': ['angular'], 
        'angular-strap-tpl': ['angular-strap'], 
        'ngload': ['angularAMD'], 
    	'bootstrap': ['jquery']
    },
    deps: ['scripts/app']
});
