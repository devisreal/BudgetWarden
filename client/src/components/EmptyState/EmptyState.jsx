export default function EmptyState({ title, message }) {
  return (
    <div className="flex h-[20rem] flex-col justify-center items-center max-w-sm mx-auto text-center">
      <p className="p-3 text-sm font-medium text-orange-500 rounded-full bg-orange-50 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </p>
      <h1 className="mt-3 text-2xl font-semibold text-gray-800  md:text-2xl">
        {title}
      </h1>
      <p className="mt-4 text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}
