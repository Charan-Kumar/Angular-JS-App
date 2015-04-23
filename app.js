(function(){
    var app =angular.module('LearningApp',['ngRoute', 'ngAnimate']);
    
    var CustomersController = function($scope,CustomerFactory){
        $scope.customers = CustomerFactory.getCustomers();
        $scope.sortBy = 'name';
        $scope.reverse = false;
        $scope.doSort = function(propName){
            $scope.sortBy = propName;
            $scope.reverse = ! $scope.reverse;
        }
    }
    app.controller('CustomersController', CustomersController);
    CustomersController.$inject = ['$scope','CustomerFactory']
    
    
    var OrdersController = function($scope, $routeParams, CustomerFactory){
        $scope.customers = CustomerFactory.getCustomers();
        $scope.customer = null;        
        function init(){
            $scope.customer = CustomerFactory.getCustomer($routeParams.customerId);
        }
        init();
    }
    OrdersController.$inject = ['$scope', '$routeParams', 'CustomerFactory'];
    app.controller('OrdersController', OrdersController);
    
    var ProductsController = function($scope, CustomerFactory){
        $scope.products = null;
        function init(){
            $scope.products = CustomerFactory.getProducts();
        };
        init();
        
    }
    app.controller('ProductsController', ProductsController);
    ProductsController.$inject = ['$scope', 'CustomerFactory'];
    
    var AllOrderController = function($scope, CustomerFactory){        
      $scope.allorders = null;
      function init(){
          $scope.allOrders = CustomerFactory.allOrders();
      };
      init();
    };
    
    app.controller('AllOrderController',AllOrderController);
    AllOrderController.$inject = ['$scope','CustomerFactory'];
    
    var customerFactory = function(){
        customers = [{ id: 1,name:'Charan Kumar Borra', joined:'2015-04-21', city:'Vijayawaya', order:120,
                            orders: [{id:1, product: 'Shoe', price:20 }, {id:2, product:'Laptop', price:100 } ]
                            },
                          {id: 2, name:'Ram Teja Guruvelli', joined: '2015-04-01', city: 'Eluru', order:70,
                            orders: [{id:3, product: 'Iphone', price:50 }, {id:4, product:'HeadSet', price:20 } ]
                          },
                          {id: 3, name:'Naresh Katta', joined: '2015-05-21', city:'Bhimavaram', order:190,
                            orders: [{id:3, product: 'Iphone', price:50 }, {id:4, product:'HeadSet', price:20 },
                                     {id:1, product: 'Shoe', price:20 }, {id:2, product:'Laptop', price:100 } ]},
                          {id: 4, name:'Sruthi Nomula', joined:'2015-04-21', city:'Hyderabad', order:120,
                          orders: [{id:1, product: 'Shoe', price:20 }, {id:2, product:'Laptop', price:100 }]
                          },
                          {id: 5, name:'Tarun Jain', joined:'2015-04-01', city:'Jarkhand', order:20,
                           orders: [{id:1, product: 'Shoe', price:20 }] }
                           ];
        var factory = {};
        factory.getCustomers = function(){
            return customers;
        };
        
        factory.getCustomer = function(customerId){
            var len = customers.length;
            for(var i=0;i<len; i++){
                if(customers[i].id === parseInt(customerId)){
                  return customers[i];
                }
            }
            return {};
            
        };
        
        factory.getProducts = function(){
            var len = customers.length;
            var products = [];
            for(var i=0 ; i<len;i++)
            {
                for(var j=0; j<customers[i].orders.length; j++){
                    if(! check(products,customers[i].orders[j].id))
                        products.push(customers[i].orders[j]);
                }
                
            }
            return products;
        };
        
        function check(products, id){
            for(var i =0;i< products.length; i++)
            {
                if(products[i].id === id)
                    return true;
            }
            return false;
        }
        factory.allOrders = function(){
            var len = customers.length;
            var allOrders = [];
            for(var i=0;i<len;i++)
            {
                for(var j=0; j<customers[i].orders.length; j++){
                    allOrders.push(customers[i].orders[j]);
                }
            }
            return allOrders;
        }
        
        return factory;
    };
    
    app.factory('CustomerFactory',customerFactory);
        
    
    
    app.config(function($routeProvider){
        $routeProvider
            .when('/',
                  {
                    controller: 'CustomersController',
                    templateUrl: 'views/customersView.html'
                  })
            .when('/orders/:customerId',
                  {
                    controller: 'OrdersController',
                    templateUrl: 'views/ordersView.html'
            
                  })
            .when('/products',
                  {
                    controller: 'ProductsController',
                    templateUrl: 'views/productsView.html'
            
                  })
            .when('/orders',
                  {
                    controller: 'AllOrderController',
                    templateUrl: 'views/allOrders.html'
                  })
            .otherwise({redirectTo: '/'});
    
    });
}());