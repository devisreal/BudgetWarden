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

import { Button } from "../ui/button";

export default function EditBillDrawer({
  isEditDrawerOpen,
  setEditDrawerIsOpen,
}) {
  return (
    <Drawer
      direction="right"
      open={isEditDrawerOpen}
      onOpenChange={setEditDrawerIsOpen}
    >
      <DrawerTrigger>
        <Button variant="outline" className="cursor-pointer">
          <Pencil />
          <span>Edit</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent direction="right">
        <DrawerHeader>
          <DrawerTitle className="text-2xl">Edit Bill {`Billname`}</DrawerTitle>
          <DrawerDescription className="text-md">
            Make a change to this bill
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setEditDrawerIsOpen(false)}
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
