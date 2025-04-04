import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardContext } from "@/contexts/DashboardContext";
import { editBill } from "@/utils/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

import NumberInput from "../NumberInput";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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

export default function EditBillForm({ bill, setEditDrawerIsOpen }) {
  const [date, setDate] = useState(new Date(bill.due_date));
  const { categories, userBills } = useContext(DashboardContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: bill.name,
      category_id: `${bill.category_id}`,
      amount: bill.amount,
      is_paid: bill.is_paid,
      due_date: bill.due_date,
    },
    mode: "onBlur",
    resolver: yupResolver(addBillFormSchema),
  });

  const handleAddBill = async (formValues) => {
    formValues.due_date = format(formValues.due_date, "yyyy/MM/dd");
    formValues.category_id = Number(formValues.category_id);

    try {
      const data = await editBill(formValues, bill.slug);
      toast.success(data.message);
      reset();
      userBills.getBills();
      setEditDrawerIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Error adding bill");
    }
    console.log(formValues);
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
          defaultValue={`${bill.category_id}`}
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
        {errors.category_id && (
          <small className="text-red-500 mt-1 font-medium text-xs">
            {errors.category_id?.message}
          </small>
        )}
      </div>

      <div className="grid w-full max-w-sm items-center gap-2">
        <NumberInput
          label="Amount"
          defaultValue={bill.amount}
          onChange={(e) => setValue("amount", e, { shouldValidate: true })}
          name="amount"
          formatOptions={{
            style: "currency",
            currency: "GBP",
            currencySign: "accounting",
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
            setValue("due_date", format(e, "yyyy/MM/dd"), {
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
            setValue("is_paid", e, {
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

      <Button disabled={isSubmitting} type="submit" className="w-full mt-4">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
