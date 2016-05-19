var testApp = angular.module('testApp', ['ngRoute','angular.filter']);
testApp.config(function($routeProvider) {
$routeProvider
  .when('/', {
    templateUrl : 'test.html',
    controller  : 'ArticleList'
  })
  .when('/article/:id', {
    templateUrl : 'article.html',
    controller  : 'articleDetail',

  })
  

  .otherwise({redirectTo: '/'});
});

testApp.controller('ArticleList', ['$scope', '$filter', '$q','$http','getListings',articleList]);
testApp.controller('articleDetail', ['$scope','$routeParams', '$filter', '$q','$http','getListings',articleDetail]);

testApp.factory('getListings', ['$http','$q',getListings]) 
function articleDetail($scope,$routeParams, $filter, $q,$http,getListings) {
	
	getListings.getDetails().then(function(response) {
        $scope.articles=getListings.getArticles(response.data);
        $scope.categories=getListings.getCategories(response.data);
        //filterBy: ['category_id']: value.id
        $scope.arti=$filter('filter')($scope.articles,{'id':$routeParams.id});
        $scope.arti=$scope.arti[0];
        $scope.singlecategory=$filter('filter')($scope.categories,{'id':$scope.arti.category_id});
        $scope.singlecategory=$scope.singlecategory[0];
    });
}
function articleList($scope, $filter, $q,$http,getListings) {
	$scope.allData={};

	getListings.getDetails().then(function(response) {
        $scope.articles=getListings.getArticles(response.data);
        $scope.categories=getListings.getCategories(response.data);
        //console.log($scope.articles);
    });

        
    

    


}

function getListings($http, $q) {
    var listings = {};
    listings.getDetails = function() {

        
        return $http.post('webroot/js/response.json', {
        },{
            headers: {'Content-Type': 'application/json'},
            async: true,
        });
    }
    listings.getArticles=function(allData){
    	
    	return allData.data.articles;
    }
    listings.getCategories=function(allData){
    	
    	return allData.data.categories;
    }
    return listings;
};