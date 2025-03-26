import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white/70 backdrop-blur-sm py-4 px-4 sticky top-0 z-[100]">
      <div className="max-w-[85rem] mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="font-title text-2xl font-bold tracking-tighter text-neutral-900"
        >
          Budget Warden
        </Link>

        <div className="flex">
          <ul className="flex items-center gap-4">
            <li className="inline-flex items-center rounded-full transition-colors duration-200 bg-emerald-700 px-5 py-3 text-md font-medium text-white">
              <Link to="/auth/register">Get Started</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
