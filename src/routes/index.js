//admin layout
import Dashboard from 'admin/pages/Dashboard';
import AllMusics from 'admin/pages/AllMusics';
import AddMusic from 'admin/pages/AddMusic';
import Categories from 'admin/pages/Categories';
import Tracks from 'admin/pages/Tracks';
import UpdateMusic from 'admin/pages/UpdateMusic';
import Genre from 'admin/pages/Genre';
import Tag from 'admin/pages/Tag';
import Users from 'admin/pages/User';
import Reels from 'admin/pages/Reels';
import AddReel from 'admin/pages/AddReel';

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
    { path: '/users', component: Users },
    { path: '/reels', component: Reels },
    { path: '/addReel', component: AddReel },
];
export { publicRoutes, privareRoutes };
