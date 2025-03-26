import Navbar from "@/components/Navbar";
import { Ripple } from "@/components/magicui/ripple";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <section className="relative flex h-[40rem] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <div className="mx-auto max-w-[80rem] text-center">
          <h2 className="text-3xl font-extrabold tracking-tight leading-[1] text-gray-950 md:text-[5rem] font-title">
            Take Full Control Of <br /> Your Personal Finances
          </h2>

          <p className="text-gray-500 sm:mt-4 font-medium text-lg">
            Manage and Visualize your everyday finances with features you’ll
            love to use.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => navigate("/auth/register")}
            className="group cursor-pointer relative h-16 text-lg rounded-full border border-neutral-200 bg-emerald-700 text-white px-8 font-semibold"
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
