import { Pencil } from "lucide-react";
import { useState } from "react";

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
import type { Subscription } from "../../../types/domain";
import EditSubscriptionForm from "../forms/edit-subscription-form";

type EditSubscriptionDrawerProps = {
  subscription: Subscription;
};

export default function EditSubscriptionDrawer({
  subscription,
}: EditSubscriptionDrawerProps) {
  const [isEditDrawerOpen, setEditDrawerIsOpen] = useState(false);

  return (
    <Drawer
      direction="right"
      open={isEditDrawerOpen}
      onOpenChange={setEditDrawerIsOpen}
      className=""
    >
      <DrawerTrigger asChild>
        <button
          type="button"
          className="cursor-pointer rounded-md border border-input bg-background px-3 py-2 hover:bg-accent hover:text-accent-foreground"
        >
          <Pencil />
        </button>
      </DrawerTrigger>
      <DrawerContent direction="right" className="">
        <DrawerHeader className="">
          <DrawerTitle className="text-2xl">
            Edit Subscription: {subscription.name}
          </DrawerTitle>
          <DrawerDescription className="text-md">
            Make a change to this subscription
          </DrawerDescription>
        </DrawerHeader>
        <EditSubscriptionForm
          subscription={subscription}
          setEditDrawerIsOpen={setEditDrawerIsOpen}
        />
        <DrawerFooter className="">
          <DrawerClose asChild className="">
            <button
              type="button"
              className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setEditDrawerIsOpen(false)}
            >
              Cancel
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
