import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <>
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link className="nav-link" to="/">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-tachometer-alt"></i>
                                </div>
                                Dashboard
                            </Link>
                            <div className="sb-sidenav-menu-heading">Interface</div>
                            <Link
                                className="nav-link collapsed"
                                href="/"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseLayouts"
                                aria-expanded="false"
                                aria-controls="collapseLayouts"
                            >
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-book-open"></i>
                                </div>
                                Musics
                                <div className="sb-sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down"></i>
                                </div>
                            </Link>
                            <div
                                className="collapse"
                                id="collapseLayouts"
                                aria-labelledby="headingOne"
                                data-bs-parent="#sidenavAccordion"
                            >
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/addMusic">
                                        Add Music
                                    </Link>
                                    <Link className="nav-link" to="/allMusics">
                                        All Musics
                                    </Link>
                                </nav>
                            </div>
                            <Link
                                className="nav-link collapsed"
                                href="/"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseLayouts1"
                                aria-expanded="false"
                                aria-controls="collapseLayouts1"
                            >
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-book-open"></i>
                                </div>
                                Reels
                                <div className="sb-sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down"></i>
                                </div>
                            </Link>
                            <div
                                className="collapse"
                                id="collapseLayouts1"
                                aria-labelledby="headingOne"
                                data-bs-parent="#sidenavAccordion"
                            >
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/addReel">
                                        Add Reel
                                    </Link>
                                    <Link className="nav-link" to="/reels">
                                        Reels
                                    </Link>
                                </nav>
                            </div>
                            <Link className="nav-link" to="/categories">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-book-open"></i>
                                </div>
                                Categories
                            </Link>
                            <Link className="nav-link" to="/genres">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-book-open"></i>
                                </div>
                                Genres
                            </Link>
                            <Link className="nav-link" to="/tag">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-book-open"></i>
                                </div>
                                Tags
                            </Link>
                            <Link className="nav-link" to="/users">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-book-open"></i>
                                </div>
                                Users
                            </Link>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        Admin
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Sidebar;
