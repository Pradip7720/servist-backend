import authRoute from './auth';
import postRoute from './post';


const routes = [
    {
        path: `/auth`,
        route: authRoute,
    },
    {
        path: `/posts`,
        route: postRoute,
    }
];

const registerRoutes = (app) =>
    routes.forEach((route) => {
        app.use(route.path, route.route);
    });

module.exports = registerRoutes;
