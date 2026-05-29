import { Pencil } from "lucide-react";

import EditBillForm from "../forms/edit-bill-form";
import { Button } from "../../../components/ui/button";
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

export default function EditBillDrawer({
  bill,
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
        <Button variant="outline" className="cursor-pointer" asChild>
          <span>
            <Pencil />
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent direction="right">
        <DrawerHeader>
          <DrawerTitle className="text-2xl">Edit Bill: {bill.name}</DrawerTitle>
          <DrawerDescription className="text-md">
            Make a change to this bill
          </DrawerDescription>
        </DrawerHeader>
        <EditBillForm bill={bill} setEditDrawerIsOpen={setEditDrawerIsOpen} />
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
