angular.module('sfCore', [])

    //https://stackapps.com/apps/oauth/view/3721

    /*
    This Id identifies your application to the Stack Exchange API. 
    Your application client id is not secret, and may be safely embeded in distributed binaries.
    */
    .constant('ClientId', '3721')

    /*
    Pass this as client_secret in our OAuth 2.0 flow if your app uses the explicit path.
    This must be kept secret. Do not embed it in client side code or binaries you intend to distribute. 
    If you need client side authentication, use the implicit OAuth 2.0 flow.
    */
    .constant('ClientSecret', 'g95dKQv6nHt3ORypF*1mSw((')

    /*
    Pass this as key when making requests against the Stack Exchange API to receive a higher request quota.
    This is not considered a secret, and may be safely embed in client side code or distributed binaries.
    */
    .constant('Key', 'ThmygetOsp11*Kd10FANEQ((')



    .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://api.stackexchange.com/**']);
    }])



    .service('sfService', ['$q','$http','Key', function ($q, $http, Key) {


        /*
        初始化filter的值，
        stackExchange 有些值必须使用filter 才能够查出来

        */
        var filterPromise = $http({
            url: 'https://api.stackexchange.com/2.2/filters/create',
            params: {
                unsafe: false,
                include: '.page;.page_size;.total;question.body;question.up_vote_count;question.comment_count',
                key: Key
            }
        }).success(function (data) {
            console.log(data);
        });


        /*

            从filterPromise 中
            获取 filter的值， 当filterPromise 执行完了之后 
            返回一个新的 promise，promise里 有 可以使用的 filter字符串


        */
        this.getFilter = function () {

            return filterPromise.then(function (result) {
                 return result.data.items[0].filter;
            });

        };


        this.getQuestions = function () {

            return this.getFilter().then(function (filter) {
                return $http({
                    url: 'https://api.stackexchange.com/2.2/questions',
                    params: {
                        order: 'desc',
                        sort: 'activity',
                        tagged: 'angularjs',
                        site: 'stackoverflow',
                        key: Key,
                        filter: filter
                    }
                });
            });

        }


         
         
    }]);

    
    