import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CirclePlus } from "lucide-react";

import AddSubscriptionForm from "../AddSubscriptionForm/AddSubscriptionForm";
import { Button } from "../ui/button";

export default function AddSubscriptionDrawer({
  isAddDrawerOpen,
  setAddDrawerIsOpen,
}) {
  return (
    <Drawer
      direction="right"
      open={isAddDrawerOpen}
      onOpenChange={setAddDrawerIsOpen}
    >
      <DrawerTrigger>
        <Button
          asChild
          type="button"
          className="inline-flex cursor-pointer items-center rounded-md bg-emerald-700 px-3 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-700/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <span>
            <CirclePlus className="size-5" />
            Add Subscription
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent direction="right">
        <DrawerHeader>
          <DrawerTitle className="text-2xl">Add New Subscription</DrawerTitle>
          <DrawerDescription className="text-md">
            Add a new subscription
          </DrawerDescription>
        </DrawerHeader>
        <AddSubscriptionForm setAddDrawerIsOpen={setAddDrawerIsOpen} />
        <DrawerFooter>
          <DrawerClose>
            <Button
              asChild
              variant="outline"
              className="w-full"
              onClick={() => setAddDrawerIsOpen(false)}
            >
              <span>Cancel</span>
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
