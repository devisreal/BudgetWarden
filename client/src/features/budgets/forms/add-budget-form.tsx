import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "lucide-react";
import { type Dispatch, type SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";

import NumberInput from "../../../components/number-input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import type { User } from "../../../types/domain";
import { addUserBudgets } from "../../../utils/api";
import { DashboardContext } from "../../dashboard/contexts/dashboard-context";

type AddBudgetFormProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

type BudgetFormValues = {
  name: string;
  category_id: string;
  amount: number;
};

const addBillFormSchema = yup
  .object()
  .shape({
    name: yup.string().required("Budget name is required"),
    category_id: yup.string().required("Category is required"),
    amount: yup
      .number()
      .required("Amount is required")
      .min(0, "Amount must be positive")
      .typeError("Amount must be a number"),
  })
  .required();

export function AddBudgetForm({ showModal, setShowModal }: AddBudgetFormProps) {
  const [userData] = useOutletContext<[User]>();
  const { categories, userBudgets } = useContext(DashboardContext)!;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<BudgetFormValues>({
    defaultValues: {
      name: "",
      category_id: "",
      amount: 0,
    },
    mode: "onBlur",
    resolver: yupResolver(addBillFormSchema) as never,
  });
  if (!categories) {
    return <p>Loading...</p>;
  }

  const handleAddBudget = async (formValues: BudgetFormValues) => {
    const payload = {
      ...formValues,
      category_id: Number(formValues.category_id),
    };

    try {
      const data = await addUserBudgets(payload);
      toast.success(data.message);
      setShowModal(false);
      reset();
      userBudgets.getBudgets();
    } catch (error) {
      console.log(error);
      //   toast.error("Error adding budget");
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center rounded-md bg-emerald-700 px-3 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-700/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <Plus className="h-4 w-4 mr-1" /> Create Budget
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleAddBudget)}
          className="space-y-4 pt-4"
        >
          <div className="grid items-center gap-2">
            <Label htmlFor="name">Budget name</Label>
            <Input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Name"
              className="text-sm md:text-md"
            />
            {errors.name && (
              <small className="text-red-500 mt-1 font-medium text-xs">
                {errors.name?.message}
              </small>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              id="category_id"
              defaultValue=""
              onValueChange={(e) =>
                setValue("category_id", e, { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category " />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category) => {
                    return (
                      <SelectItem key={category.id} value={`${category.id}`}>
                        {category.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid items-center gap-2">
            <NumberInput
              label="Monthly Allocation"
              defaultValue={0}
              onChange={(e) => setValue("amount", e, { shouldValidate: true })}
              name="amount"
              formatOptions={{
                style: "currency",
                currency: `${userData.currency}`,
              }}
              minValue={0}
              step={1}
            />
            {errors.amount && (
              <small className="text-red-500 mt-1 font-medium text-xs">
                {errors.amount?.message}
              </small>
            )}
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setShowModal(false)}
              className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800"
            >
              {isSubmitting ? "Creating budget..." : "Create Budget"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
