import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      window.location.reload();
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
      <Link to="/" onClick={handleHomeClick}>
        <Logo />
      </Link>
      <div className="flex space-x-4">
        <Link to="/" className="nav-link" onClick={handleHomeClick}>
          Home
        </Link>
        <Link to="/my-book-list" className="nav-link">
          My Book List
        </Link>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div className="flex items-center">
      <span role="img" className="text-2xl">
        📚
      </span>
      <h1 className="ml-2 text-xl font-bold">BookHive</h1>
    </div>
  );
}
