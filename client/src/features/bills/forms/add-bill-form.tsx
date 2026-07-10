import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import {
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";

import NumberInput from "../../../components/number-input";
import { Calendar } from "../../../components/ui/calendar";
import { Checkbox } from "../../../components/ui/checkbox";
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
import type { Category, User } from "../../../types/domain";
import { addBill } from "../../../utils/api";
import { DashboardContext } from "../../dashboard/contexts/dashboard-context";

type AddBillFormProps = {
  setAddDrawerIsOpen: Dispatch<SetStateAction<boolean>>;
};

type BillFormValues = {
  name: string;
  category_id: string;
  amount: number;
  due_date: Date;
  is_paid: boolean;
};

const addBillFormSchema = yup
  .object()
  .shape({
    name: yup.string().required("Bill name is required"),
    category_id: yup.string().required("Category is required"),
    amount: yup
      .number()
      .required("Amount is required")
      .min(0, "Amount must be positive")
      .typeError("Amount must be a number"),
    due_date: yup
      .date()
      .required("Due date is required")
      .min(new Date(), "Due date cannot be in the past")
      .typeError("Please enter a valid date"),
    is_paid: yup.boolean().default(false),
  })
  .required();

export default function AddBillForm({ setAddDrawerIsOpen }: AddBillFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<BillFormValues>({
    defaultValues: {
      name: "",
      category_id: "",
      amount: 0,
      is_paid: false,
      due_date: new Date(),
    },
    mode: "onBlur",
    resolver: yupResolver(addBillFormSchema) as never,
  });
  const [date, setDate] = useState(new Date());
  const { categories, userBills } = useContext(DashboardContext)!;
  const [userData] = useOutletContext<[User]>();

  const handleAddBill = async (formValues: BillFormValues) => {
    const payload = {
      ...formValues,
      category_id: Number(formValues.category_id),
      due_date: format(formValues.due_date, "yyyy/MM/dd"),
    };

    try {
      const data = await addBill(payload);
      toast.success(data.message);
      reset();
      userBills.getBills();
      setAddDrawerIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Error adding bill");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleAddBill)} className="p-4 space-y-4">
      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="name">Bill name</Label>
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

      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="category">Category</Label>
        <Select
          id="category"
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
              {(categories as Category[]).map((category) => {
                return (
                  <SelectItem key={category.id} value={`${category.id}`}>
                    {category.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.category_id && (
          <small className="text-red-500 mt-1 font-medium text-xs">
            {errors.category_id?.message}
          </small>
        )}
      </div>

      <div className="grid w-full max-w-sm items-center gap-2">
        <NumberInput
          label="Amount"
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

      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="due_date">Due Date</Label>
        <Calendar
          id="due_date"
          selected={date}
          mode="single"
          name="due_date"
          className="rounded-md border shadow w-full mx-auto"
          onSelect={(e) => {
            if (!e) return;
            setValue("due_date", e, {
              shouldValidate: true,
            });
            setDate(e);
          }}
        />
        {errors.due_date && (
          <small className="text-red-500 mt-1 font-medium text-xs">
            {errors.due_date?.message}
          </small>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_paid"
          onCheckedChange={(e) =>
            setValue("is_paid", Boolean(e), {
              shouldValidate: true,
            })
          }
          {...register("is_paid")}
        />

        <label
          htmlFor="is_paid"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Bill is paid?
        </label>

        {errors.is_paid && (
          <small className="text-red-500 mt-1 font-medium text-xs">
            {errors.is_paid?.message}
          </small>
        )}
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full mt-4 rounded-md bg-emerald-700 px-4 py-2 text-white"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
