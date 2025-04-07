import LoginForm from "/src/components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md flex flex-col gap-2 md:gap-4 ">
      <div className="text-center">
        <h4 className="mt-3 text-2xl md:text-3xl font-bold font-title text-gray-900 ">
          Sign In
        </h4>
        <p className="mt-2 text-sm md:text-base text-gray-500 ">
          Log in to Budget Warden Now.
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
