import Navbar from "@/components/Navbar";
import { Ripple } from "@/components/magicui/ripple";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const { isLoading, isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <section className="relative flex h-[40rem] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <div className="mx-auto max-w-[80rem] text-center px-3 md:p-0">
          <h2 className="text-4xl font-extrabold tracking-tight leading-[1] text-gray-950 md:text-[5rem] font-title">
            Take Full Control Of <br /> Your Personal Finances
          </h2>

          <p className="text-gray-500 mt-3 sm:mt-4 text-sm md:text-lg">
            Manage and Visualize your everyday finances with features you’ll
            love to use.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          {!isLoading && !isLoggedIn && (
            <button
              onClick={() => navigate("/auth/register")}
              className="group cursor-pointer relative h-12 md:h-16 text-base md:text-lg rounded-full border border-neutral-200 bg-emerald-700 text-white px-6 md:px-8 font-semibold"
            >
              <span className="relative inline-flex overflow-hidden">
                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
                  Get started
                </div>
                <div className="absolute translate-y-[110%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  Get started
                </div>
              </span>
            </button>
          )}
        </div>

        <Ripple
          mainCircleOpacity={0.17}
          mainCircleSize={300}
          numCircles={100}
        />
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
