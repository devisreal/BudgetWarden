import { Pencil } from "lucide-react";

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
import type { Bill } from "../../../types/domain";
import EditBillForm from "../forms/edit-bill-form";

type EditBillDrawerProps = {
  bill: Bill;
  isEditDrawerOpen: boolean;
  setEditDrawerIsOpen: (open: boolean) => void;
};

export default function EditBillDrawer({
  bill,
  isEditDrawerOpen,
  setEditDrawerIsOpen,
}: EditBillDrawerProps) {
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
          <DrawerTitle className="text-2xl">Edit Bill: {bill.name}</DrawerTitle>
          <DrawerDescription className="text-md">
            Make a change to this bill
          </DrawerDescription>
        </DrawerHeader>
        <EditBillForm bill={bill} setEditDrawerIsOpen={setEditDrawerIsOpen} />
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
