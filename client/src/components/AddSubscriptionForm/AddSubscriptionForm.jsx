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
import { addUserSubscriptions } from "@/utils/api";
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

const addSubscriptionFormSchema = yup
  .object()
  .shape({
    name: yup.string().required("Subscription name is required"),
    category_id: yup.string().required("Category is required"),
    billing_cycle: yup.string().required("Billing Cycle is required"),
    cost: yup
      .number()
      .required("Cost is required")
      .min(0, "Cost must be positive")
      .typeError("Cost must be a number"),
    renewal_date: yup
      .date()
      .required("Renewal date is required")
      .min(new Date(), "Renewal date cannot be in the past")
      .typeError("Please enter a valid date"),
    is_active: yup.boolean().default(false),
  })
  .required();

const billingCycles = [
  { id: 1, value: "weekly", displayName: "Weekly" },
  { id: 2, value: "biweekly", displayName: "Bi-Weekly (Every 2 Weeks)" },
  { id: 3, value: "monthly", displayName: "Monthly" },
  { id: 4, value: "quarterly", displayName: "Quarterly (Every 3 Months)" },
  { id: 5, value: "semiannual", displayName: "Semi-Annual (Every 6 Months)" },
  { id: 6, value: "annual", displayName: "Annual (Yearly)" },
  { id: 7, value: "bimonthly", displayName: "Bi-Monthly (Twice a Month)" },
];

export default function AddSubscriptionForm({ setAddDrawerIsOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      category_id: "",
      billing_cycle: "",
      cost: 0,
      is_active: false,
      renewal_date: new Date(),
    },
    mode: "onBlur",
    resolver: yupResolver(addSubscriptionFormSchema),
  });
  const [date, setDate] = useState(new Date());
  const { categories, userSubscriptions } = useContext(DashboardContext);

  const handleAddSubscription = async (formValues) => {
    formValues.renewal_date = format(formValues.renewal_date, "yyyy/MM/dd");

    try {
      const data = await addUserSubscriptions(formValues);
      toast.success(data.message);
      reset();
      userSubscriptions.getSubscriptions();
      setAddDrawerIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Error adding bill");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddSubscription)}
      className="p-4 py-2 space-y-4"
    >
      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="name">Subscription name</Label>
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
        {errors.category_slug && (
          <small className="text-red-500 mt-1 font-medium text-xs">
            {errors.category_slug?.message}
          </small>
        )}
      </div>

      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="billing_cycle">Billing Cycle</Label>
        <Select
          id="billing_cycle"
          defaultValue=""
          onValueChange={(e) =>
            setValue("billing_cycle", e, { shouldValidate: true })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a billing cycle " />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cycles</SelectLabel>
              {billingCycles.map((cycle) => {
                return (
                  <SelectItem key={cycle.id} value={`${cycle.value}`}>
                    {cycle.displayName}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.billing_cycle && (
          <small className="text-red-500 mt-1 font-medium text-xs">
            {errors.billing_cycle?.message}
          </small>
        )}
      </div>

      <div className="grid w-full max-w-sm items-center gap-2">
        <NumberInput
          label="Cost"
          defaultValue={0}
          onChange={(e) => setValue("cost", e, { shouldValidate: true })}
          name="cost"
          formatOptions={{
            style: "currency",
            currency: "GBP",
            currencySign: "accounting",
          }}
          minValue={0}
          step={1}
        />
        {errors.cost && (
          <small className="text-red-500 mt-1 font-medium text-xs">
            {errors.cost?.message}
          </small>
        )}
      </div>

      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="renewal_date">Renewal Date</Label>
        <Calendar
          id="renewal_date"
          selected={date}
          mode="single"
          name="renewal_date"
          className="rounded-md border shadow w-full mx-auto"
          onSelect={(e) => {
            setValue("renewal_date", format(e, "yyyy/MM/dd"), {
              shouldValidate: true,
            });
            setDate(e);
          }}
        />
        {errors.renewal_date && (
          <small className="text-red-500 mt-1 font-medium text-xs">
            {errors.renewal_date?.message}
          </small>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_active"
          onCheckedChange={(e) =>
            setValue("is_active", e, {
              shouldValidate: true,
            })
          }
          {...register("is_active")}
        />

        <label
          htmlFor="is_active"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Is this subscription active ?
        </label>

        {errors.is_active && (
          <small className="text-red-500 mt-1 font-medium text-xs">
            {errors.is_active?.message}
          </small>
        )}
      </div>

      <Button
        disabled={isSubmitting}
        type="submit"
        className="w-full mt-2 bg-emerald-700"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
