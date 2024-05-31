//admin layout
import Dashboard from 'admin/pages/Dashboard';
import AllMusics from 'admin/pages/AllMusics';
import AddMusic from 'admin/pages/AddMusic';
import Categories from 'admin/pages/Categories';
import Tracks from 'admin/pages/Tracks';
import UpdateMusic from 'admin/pages/UpdateMusic';
import Genre from 'admin/pages/Genre';
import Tag from 'admin/pages/Tag';

const publicRoutes = [];
const privareRoutes = [
    { path: '/', component: Dashboard },
    { path: '/allMusics', component: AllMusics },
    { path: '/addMusic', component: AddMusic },
    { path: '/tracks/:id', component: Tracks},
    { path: '/editMusic/:id', component: UpdateMusic },
    { path: '/categories', component: Categories },
    { path: '/genres', component: Genre },
    { path: '/tag', component: Tag },

];
export { publicRoutes, privareRoutes };
