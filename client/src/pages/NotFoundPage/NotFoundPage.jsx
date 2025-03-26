import lostBroImage from "@/assets/images/lost-bro.svg";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="grid grid-cols-1 h-screen place-content-center items-center gap-4 lg:grid-cols-2 lg:gap-8 max-w-[85rem] mx-auto">
      <div className="">
        <img src={lostBroImage} alt="Not found image" />
      </div>
      <div className="rounded text-center flex flex-col gap-6 items-center">
        <h1 className="text-3xl font-extrabold text-gray-950 md:text-6xl font-title">
          Page not found 😢
        </h1>
        <li className="inline-flex items-center rounded-full transition-colors duration-200 bg-emerald-700 px-5 py-2.5 text-md font-medium text-white">
          <Link to="/">Go back home</Link>
        </li>
      </div>
    </div>
  );
}
