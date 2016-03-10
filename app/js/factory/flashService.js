// (function () {
//     'use strict';

//     angular
//         .module('store')
//         .factory('Flash', ['$rootScope', '$timeout', function($rootScope, $timeout) {

//             var dataFactory = {},
//                 timeOut;

//             // Create flash message
//             dataFactory.create = function(type, text, addClass) {
//                 var $this = this;
//                 $timeout.cancel(timeOut);
//                 $rootScope.flash.type = type;
//                 $rootScope.flash.text = text;
//                 $rootScope.flash.addClass = addClass;
//                 $timeout(function() {
//                     $rootScope.hasFlash = true;
//                 }, 100);
//                 timeOut = $timeout(function() {
//                     $this.dismiss();
//                 }, $rootScope.flash.timeout);
//             };

//             // Cancel flashmessage timeout function
//             dataFactory.pause = function() {
//                 $timeout.cancel(timeOut);
//             };

//             // Dismiss flash message
//             dataFactory.dismiss = function() {
//                 $timeout.cancel(timeOut);
//                 $timeout(function() {
//                     $rootScope.hasFlash = false;
//                 });
//             };
//             return dataFactory;
//         }
//     ]);

// })();