import RegisterForm from "@/components/registerform/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md flex flex-col gap-2 md:gap-4">
      <div className="text-center">
        <h4 className="mt-3 text-2xl md:text-3xl font-bold font-title text-gray-900 ">
          Sign Up
        </h4>
        <p className="mt-2 text-sm md:text-base text-gray-500 ">
          Create Your Budget Warden Account Today!
        </p>
      </div>

      <RegisterForm />
    </div>
  );
}
