import authRoute from './auth';
import postRoute from './post';
import specialitiesRoute from './specialities';
import groupRoute from './group';
import contactusRoute from './contactus'
import userRoute from './user'
import notificationRoute from './notificationpref'
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
        path: `/groups`,
        route: groupRoute,
    },
    {
        path: `/contact-us`,
        route: contactusRoute,
    },
    {
        path: `/users`,
        route: userRoute,
    },
    {
        path: `/notification-preferences`,
        route: notificationRoute
    }
];

const registerRoutes = (app) =>
    routes.forEach((route) => {
        app.use(route.path, route.route);
    });

module.exports = registerRoutes;
