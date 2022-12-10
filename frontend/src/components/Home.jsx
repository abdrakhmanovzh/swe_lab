import "../App.css";
import Back from "../assets/1.jpg"

const Home = () => {

    return (
        <div className="App" style={{ display: "flex", flexFlow: "column", height: "100%" }}>
            <nav className="navbar Navbar" role="navigation" aria-label="main navigation" style={{ flex: "0 1 auto", marginBottom: "1rem" }}>
                <div className="navbar-brand">
                    <a className="has-text-white mx-5" href="/">
                        HealthSystems
                    </a>
                </div>
                <div className="navbar-start">

                    <div className="navbar-item mx-3" style={{ paddingTop: "12px" }}>
                        <a href="/patients/login"><p className="has-text-white is-size-5">Patient Login</p></a>
                    </div>

                    <div className="navbar-item mx-3" style={{ paddingTop: "12px" }}>
                        <a href="/doctors/login"><p className="has-text-white is-size-5">Doctor Login</p></a>
                    </div>

                    <div className="navbar-item mx-3" style={{ paddingTop: "12px" }}>
                        <a href="/appointment"><p className="has-text-white is-size-5">Make an Appointment</p></a>
                    </div>

                </div>
                <div className="navbar-end">
                    <a className="adminLink"
                        href="/admin_access" >admin
                    </a>
                </div>
            </nav>
            <div style={{ display: "flex", height: "84vh", margin: "0", padding: "0", backgroundImage: `url(${Back})`, flex: "1 1 auto" }}>
                {/* <img src="images/1.jpg" /> */}
                <div className="card-content Message">
                    <div className="content">
                        <p className="has-text-white is-size-2">Trusted Health Information</p>
                    </div>
                    <div className="content">
                        <p className="has-text-white is-size-4">Lorem Ipsum Dolor</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;