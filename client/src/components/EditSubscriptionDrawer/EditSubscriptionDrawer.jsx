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
import { Pencil } from "lucide-react";
import { useState } from "react";

import EditSubscriptionForm from "../EditSubscriptionForm/EditSubscriptionForm";
import { Button } from "../ui/button";

export default function EditSubscriptionDrawer({ subscription }) {
  const [isEditDrawerOpen, setEditDrawerIsOpen] = useState(false);

  return (
    <Drawer
      direction="right"
      open={isEditDrawerOpen}
      onOpenChange={setEditDrawerIsOpen}
    >
      <DrawerTrigger>
        <Button variant="outline" className="cursor-pointer" asChild>
          <span>
            <Pencil />
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent direction="right">
        <DrawerHeader>
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
        <DrawerFooter>
          <DrawerClose>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setEditDrawerIsOpen(false)}
              asChild
            >
              <span>Cancel</span>
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
