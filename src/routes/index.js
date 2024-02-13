
const authenticateRoute = require('./user.route');

const routes = [
    {
        path: `/auth`,
        route: authenticateRoute,
    }
];

const registerRoutes = (app) =>
    routes.forEach((route) => {
        app.use(route.path, route.route);
});

module.exports = registerRoutes;
