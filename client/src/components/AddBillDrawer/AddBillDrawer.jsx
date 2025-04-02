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

import { Button } from "../ui/button";

export default function AddBillDrawer({ isAddDrawerOpen, setAddDrawerIsOpen }) {
  return (
    <Drawer
      direction="right"
      open={isAddDrawerOpen}
      onOpenChange={setAddDrawerIsOpen}
    >
      <DrawerTrigger>
        <Button
          type="button"
          className="inline-flex cursor-pointer items-center rounded-md bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-600/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <CirclePlus className="size-5" />
          Add Bill
        </Button>
      </DrawerTrigger>
      <DrawerContent direction="right">
        <DrawerHeader>
          <DrawerTitle className="text-2xl">Add New Bill</DrawerTitle>
          <DrawerDescription className="text-md">
            Add a new bill
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setAddDrawerIsOpen(false)}
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
