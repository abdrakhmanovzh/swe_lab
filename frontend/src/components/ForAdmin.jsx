import "../App.css";

const ForAdmin = () => {
  return (
    <div className="App">
      <nav className="navbar has-text-centered Navbar">
        <a className="has-text-white" href="/">
          LoremIpsum
        </a>
      </nav>

      <div className="card-content Message">
        <div className="content">
          <p className="has-text-white is-size-2">Trusted Health Information</p>
        </div>
        <span className="has-text-white is-size-5">
          Access the LoremIpsum Portal
        </span>
      </div>
      <div className="button NavButton">
        <a className="has-text-white" href="/login">
          Login
        </a>
      </div>
    </div>
  );
};

export default ForAdmin;