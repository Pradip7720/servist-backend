import authRoute from './auth';

const routes = [
    {
        path: `/auth`,
        route: authRoute,
    }
];

const registerRoutes = (app) =>
    routes.forEach((route) => {
        app.use(route.path, route.route);
    });

module.exports = registerRoutes;
