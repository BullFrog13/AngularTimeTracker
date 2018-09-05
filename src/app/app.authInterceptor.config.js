export default authInterceptor;

function authInterceptor($httpProvider) {
    $httpProvider.interceptors.push(() => {
        return {
            request(config) {
                config.headers['API_KEY'] = 'gRZQUv6ZpUntaMvaPsWkvSQbXx%2f2aQ9Tqjv9RmegczE%3d'

                return config;
            }
        };
    });
}