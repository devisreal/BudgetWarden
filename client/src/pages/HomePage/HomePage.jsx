import dashboardImage from "@/assets/images/dashboard-image.webp";
import dashboardMobile from "@/assets/images/dashboard-mobile.webp";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar";
import { Ripple } from "@/components/magicui/ripple";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/contexts/AuthContext";
import { BarChart3, ChevronDown, LineChart, PieChart } from "lucide-react";
import { motion } from "motion/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const { isLoading, isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Navbar />

      <section className="relative flex h-[40rem] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto max-w-[80rem] text-center px-3 md:p-0"
        >
          <h2 className="text-4xl font-extrabold tracking-tight leading-[1] text-gray-950 md:text-[5rem] font-title">
            Take Full Control Of <br /> Your Personal Finances
          </h2>

          <p className="text-gray-500 mt-3 sm:mt-4 text-sm md:text-lg">
            Manage and Visualize your everyday finances with features you’ll
            love to use.
          </p>
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="inline-block"
          >
            <ChevronDown className="w-8 h-8 text-emerald-700" />
          </motion.div>
        </motion.div>

        <Ripple
          mainCircleOpacity={0.17}
          mainCircleSize={300}
          numCircles={100}
        />
      </section>

      <section className="py-20 mt-16 bg-gray-50">
        <div className="max-w-[85rem] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            whileInView="animate"
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-title mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to take control of your personal finances in
              one place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-10 h-10 text-emerald-700" />,
                title: "Budget Tracking",
                description:
                  "Set budgets for different categories and track your spending against them.",
              },
              {
                icon: <PieChart className="w-10 h-10 text-emerald-700" />,
                title: "Expense Analysis",
                description:
                  "Visualize where your money goes with intuitive charts and graphs.",
              },
              {
                icon: <LineChart className="w-10 h-10 text-emerald-700" />,
                title: "Financial Goals",
                description:
                  "Set savings goals and track your progress over time.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileInView="animate"
                transition={{ duration: 0.7, delay: 0.2 * index }}
              >
                <Card className="border-none shadowhover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="mb-4 inline-block"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 mt-16">
        <div className="max-w-[85rem] mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              whileInView="animate"
              className="w-full lg:w-1/3"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-title mb-6">
                Intuitive Dashboard
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get a complete overview of your finances at a glance. Our
                dashboard provides real-time insights into your spending habits,
                savings progress, and budget status.
              </p>
              <button
                onClick={() => navigate("/auth/login")}
                className="group cursor-pointer text-sm  inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-emerald-700 px-6 font-semibold text-white"
              >
                <span>Explore Dashboard</span>
                <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              whileInView="animate"
              className="w-full lg:w-2/3"
            >
              <div className="bg-gray-100 p-2 rounded-xl shadow-lg">
                <img src={dashboardImage} alt="Dashboard Image" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 mt-16 bg-emerald-50">
        <div className="max-w-[85rem] mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-title mb-6">
                Take It Anywhere
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Access your finances on the go with your mobile phone. Track
                expenses, check budgets, and make financial decisions wherever
                you are.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="md:w-1/2 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="bg-white p-2 rounded-3xl shadow-xl"
              >
                <div className="bg-gray-800 rounded-2xl overflow-hidden w-72 h-[550px]">
                  <img src={dashboardMobile} alt="Dashboard Mobile" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 mt-16 bg-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-title mb-6">
              Ready to Take Control?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join users who have transformed their financial lives with Budget
              Warden.
            </p>

            {!isLoading ? (
              isLoggedIn === false ? (
                <button
                  onClick={() => navigate("/auth/register")}
                  className="group cursor-pointer relative h-12 md:h-16 text-base md:text-lg rounded-full border border-neutral-200 bg-emerald-700 text-white px-6 md:px-8 font-semibold"
                >
                  <span className="relative inline-flex overflow-hidden">
                    <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
                      Get Started Now
                    </div>
                    <div className="absolute translate-y-[110%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                      Get Started Now
                    </div>
                  </span>
                </button>
              ) : (
                <span className="inline-flex items-center rounded-full transition-colors duration-200 bg-gray-100 px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-md font-medium text-gray-900 hover:bg-gray-200">
                  <Link to="/user/dashboard">Go to Dashboard</Link>
                </span>
              )
            ) : (
              <Skeleton className="w-[120px] h-10 rounded-full" />
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
