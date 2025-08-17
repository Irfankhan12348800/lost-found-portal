import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between">
        <h1 className="font-bold text-xl">
          <Link to="/" className="hover:underline">Lost & Found</Link>
        </h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/Report" className="hover:underline">Report</Link>
          <Link to="/Items" className="hover:underline">Items</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;