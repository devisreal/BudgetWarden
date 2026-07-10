import { Plus } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../components/ui/drawer";
import AddSubscriptionForm from "../forms/add-subscription-form";

type AddSubscriptionDrawerProps = {
  isAddDrawerOpen: boolean;
  setAddDrawerIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddSubscriptionDrawer({
  isAddDrawerOpen,
  setAddDrawerIsOpen,
}: AddSubscriptionDrawerProps) {
  return (
    <Drawer
      direction="right"
      open={isAddDrawerOpen}
      onOpenChange={setAddDrawerIsOpen}
      className=""
    >
      <DrawerTrigger asChild>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center rounded-md bg-emerald-700 px-3 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-700/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <Plus className="size-5" />
          Add Subscription
        </button>
      </DrawerTrigger>
      <DrawerContent direction="right" className="">
        <DrawerHeader className="">
          <DrawerTitle className="text-2xl">Add New Subscription</DrawerTitle>
          <DrawerDescription className="text-md">
            Add a new subscription
          </DrawerDescription>
        </DrawerHeader>
        <AddSubscriptionForm setAddDrawerIsOpen={setAddDrawerIsOpen} />
        <DrawerFooter className="">
          <DrawerClose asChild className="">
            <button
              type="button"
              className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setAddDrawerIsOpen(false)}
            >
              Cancel
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
