import { useState } from "react";

import EditBillDrawer from "../EditBillDrawer/EditBillDrawer";

export default function BillCard() {
  const [isEditDrawerOpen, setEditDrawerIsOpen] = useState(false);

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg bg-white ">
      <div className="flex items-center gap-4">
        <span className="rounded-lg bg-emerald-100 p-3 text-emerald-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>

        <div>
          <p className="text-base font-semibold text-gray-900">Rent</p>

          <p className="text-sm text-emerald-500">Total Sales</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className="font-semibold text-base">£1800</p>

        <EditBillDrawer
          isEditDrawerOpen={isEditDrawerOpen}
          setEditDrawerIsOpen={setEditDrawerIsOpen}
        />
      </div>
    </li>
  );
}
