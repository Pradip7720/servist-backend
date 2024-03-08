import authRoute from './auth';
import userRoute from './user';
const routes = [
    {
        path: `/auth`,
        route: authRoute,
    },
    {
        path: `/users`,
        route: userRoute,
    }
];

const registerRoutes = (app) =>
    routes.forEach((route) => {
        app.use(route.path, route.route);
    });

module.exports = registerRoutes;
