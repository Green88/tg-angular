'use strict';
angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.dishes= menuFactory.getDishes();

        $scope.select = function(setTab) {
            this.tab = setTab;
            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
    }])
    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])

    .controller('FeedbackController', ['$scope', function($scope) {
        $scope.sendFeedback = function() {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel == "") && !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel: "", firstName: "", lastName: "",
                    agree: false, email: ""
                };
                $scope.feedback.mychannel = "";

                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])
    .controller('DishDetailController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.dish= menuFactory.getDish(3);

    }])

    .controller('DishCommentController', ['$scope', function($scope) {
        // init model
        $scope.userComment = {
            date: new Date().toISOString(),
            rating: 5
        };
        // handle submission
        $scope.submitComment = function () {

            var submittedComment = {
                rating: parseInt($scope.userComment.rating),
                comment: $scope.userComment.comments,
                author: $scope.userComment.name,
                date: $scope.userComment.date
            };

            $scope.dish.comments.push(submittedComment);

            //reinit form and model
            $scope.commentForm.$setPristine();
            $scope.userComment = {
                date: new Date().toISOString(),
                rating: 5
            };
        }
    }]);