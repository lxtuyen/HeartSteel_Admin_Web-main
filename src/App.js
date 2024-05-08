import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDefaultLayout from '~/admin/Components//DefaultLayout';
import { privareRoutes } from './routes';

function App() {
    return (
        <Router>
        <div className="App">
            <Routes>
                {privareRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = AdminDefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page /> 
                                </Layout>
                            }
                        />
                    );
                }) 
                }
            </Routes>
        </div>
    </Router>
    );
}

export default App;
