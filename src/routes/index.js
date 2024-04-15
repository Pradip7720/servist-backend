import authRoute from './auth';
import postRoute from './post';
import specialitiesRoute from './specialities';
import groupRoute from './group';
import contactusRoute from './contactus'

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
        route: specialitiesRoute,
    },
    {
        path: `/group`,
        route: groupRoute,
    },
    {
        path: `/contact-us`,
        route: contactusRoute,
    }
];

const registerRoutes = (app) =>
    routes.forEach((route) => {
        app.use(route.path, route.route);
    });

module.exports = registerRoutes;
