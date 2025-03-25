import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className=" bg-emerald-50 py-4 px-2 sticky top-0 z-[100]">
      <div className="max-w-[85rem] mx-auto flex justify-between items-center">
        <h1 className="font-itle text-2xl font-bold tracking-tighter text-neutral-900">
          Budget Warden
        </h1>

        <div className="flex">
          <ul className="flex items-center gap-4">
            <li className="inline-flex items-center rounded-full transition-colors duration-200 hover:bg-emerald-200 px-3.5 py-1 text-md font-semibold text-neutral-900">
              <Link to="/">Home</Link>
            </li>
            <li className="inline-flex items-center rounded-full transition-colors duration-200 hover:bg-emerald-200 px-3.5 py-1 text-md font-semibold text-neutral-900">
              <Link to="/about">About</Link>
            </li>
            <li className="inline-flex items-center rounded-full transition-colors duration-200 hover:bg-emerald-200 px-3.5 py-1 text-md font-semibold text-neutral-900">
              <Link to="">Get Started</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
