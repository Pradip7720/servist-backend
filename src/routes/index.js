import authRoute from './auth';
import postRoute from './post';
import specialitiesRoute from './specialities';

const routes = [
    {
        path: `/auth`,
        route: authRoute,
    },
    {
        path: `/posts`,
        route: postRoute,
    },
    {
        path: `/specialities`,
        route:  specialitiesRoute,
    }
];

const registerRoutes = (app) =>
    routes.forEach((route) => {
        app.use(route.path, route.route);
    });

module.exports = registerRoutes;
