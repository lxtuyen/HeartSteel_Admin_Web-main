//admin layout
import Dashboard from 'admin/pages/Dashboard';
import AllMusics from 'admin/pages/AllMusics';
import AddMusic from 'admin/pages/AddMusic';
import Albums from 'admin/pages/Albums';
import AddAlbum from 'admin/pages/AddAlbum';
import Tracks from 'admin/pages/Tracks';
import UpdateMusic from 'admin/pages/UpdateMusic';
import Genre from 'admin/pages/Genre';
import Tag from 'admin/pages/Tag';

const publicRoutes = [];
const privareRoutes = [
    { path: '/', component: Dashboard },
    { path: '/allMusics', component: AllMusics },
    { path: '/addMusic', component: AddMusic },
    { path: '/addAlbum', component: AddAlbum },
    { path: '/tracks/:id', component: Tracks},
    { path: '/editMusic/:id', component: UpdateMusic },
    { path: '/albums', component: Albums },
    { path: '/genres', component: Genre },
    { path: '/tag', component: Tag },

];
export { publicRoutes, privareRoutes };
