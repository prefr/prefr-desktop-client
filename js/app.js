"use strict";

var prefr   =   angular.module(
							'prefr',
							[
								'ng',
								'ngRoute',
								'ngAnimate',
								'ngSanitize',
								'prefrServices',
								'prefrControllers',
								'prefrDirectives',
								'prefrFilters',  
								'ngGitReleases',
								'ngFlattr'
							]
						)

prefr.constant('$config', {
	'flattrThingId'         :   '4251245',
	'checkRemoteInterval'   :   60,
	'gitReleases'           :   {
									apiUrl: 'https://api.github.com',
									owner:  'prefr',
									repo:   'prefr'
								}
})

prefr.run( function($rootScope, $config) {    
	$rootScope.console      = window.console
	$rootScope.$config      = $config

})


prefr.config([
	'$config',
	'$routeProvider',
	'$locationProvider',
	'$httpProvider',
	'apiProvider',
	'ngGitReleasesProvider',

	function($config, $routeProvider, $locationProvider, $httpProvider, apiProvider, ngGitReleasesProvider) {

		if(!prefrConfig){
			console.error('missing prefr config. Please load config.js');
		}

		ngPrefrApiProvider
		.setApiUrl(prefrConfig.apiUrl) //from config.js
     

		$routeProvider
		.when(
			'/ballotBox/new',
			{
				templateUrl :   'partials/new_ballot_box.html',
				controller  :   'NewBallotBoxCtrl',
				reloadOnSearch: false
			}
		)
		.when(
			'/ballotBox/:box_id/:admin_secret?',
			{
				templateUrl :   'partials/ballot_box.html',
				controller  :   'BallotBoxCtrl'
			}
		)
		.when(
			'/evaluate/:box_id',
			{
				templateUrl :   'partials/evalation.html',
				controller  :   'EvaluationCtrl'
			}
		)
		.when(
			'/releases',
			{
				templateUrl :   'partials/releases.html',
				controller  :   'GitReleasesCtrl'
			}
		)
		.when(
			'/pull',
			{
				templateUrl :   'partials/pull_test.html'
			}
		)	
		.otherwise({
			redirectTo:     'ballotBox/new'
		})

		// use the HTML5 History API
		$locationProvider.html5Mode({
			enabaled: 		true,
			requireBase:	false 
		});

		ngGitReleasesProvider
		.config($config)
	}
])

				
