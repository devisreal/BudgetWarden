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
import type { Category, Subscription, User } from "../../../types/domain";
import { editUserSubscriptions } from "../../../utils/api";
import { DashboardContext } from "../../dashboard/contexts/dashboard-context";

type EditSubscriptionFormProps = {
  subscription: Subscription;
  setEditDrawerIsOpen: Dispatch<SetStateAction<boolean>>;
};

type SubscriptionFormValues = {
  name: string;
  category_id: string;
  billing_cycle: string;
  cost: number;
  renewal_date: Date;
  is_active: boolean;
};

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

export default function EditSubscriptionForm({
  subscription,
  setEditDrawerIsOpen,
}: EditSubscriptionFormProps) {
  const [userData] = useOutletContext<[User]>();
  const [date, setDate] = useState(new Date(subscription.renewal_date));
  const { categories, userSubscriptions, billingCycles } =
    useContext(DashboardContext)!;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<SubscriptionFormValues>({
    defaultValues: {
      name: subscription.name,
      category_id: `${subscription.category_id}`,
      billing_cycle: `${subscription.billing_cycle}`,
      cost: Number(subscription.cost),
      is_active: subscription.is_active,
      renewal_date: new Date(subscription.renewal_date),
    },
    mode: "onBlur",
    resolver: yupResolver(addSubscriptionFormSchema) as never,
  });

  const handleUpdateSubscription = async (
    formValues: SubscriptionFormValues,
  ) => {
    const payload = {
      ...formValues,
      category_id: Number(formValues.category_id),
      renewal_date: format(formValues.renewal_date, "yyyy/MM/dd"),
    };

    try {
      const data = await editUserSubscriptions(payload, subscription.slug);
      toast.success(data.message);
      reset();
      userSubscriptions.getSubscriptions();
      setEditDrawerIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Error updating subscription");
    }
    console.log(formValues);
  };

  return (
    <form
      onSubmit={handleSubmit(handleUpdateSubscription)}
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
          defaultValue={`${subscription.category_id}`}
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
        <Label htmlFor="billing_cycle">Billing Cycle</Label>
        <Select
          id="billing_cycle"
          defaultValue={`${subscription.billing_cycle}`}
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
          defaultValue={Number(subscription.cost)}
          onChange={(e) =>
            setValue("cost", Number(e), { shouldValidate: true })
          }
          name="cost"
          formatOptions={{
            style: "currency",
            currency: `${userData.currency}`,
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
            if (!e) return;
            setValue("renewal_date", e, {
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
          checked={watch("is_active")}
          onCheckedChange={(e) =>
            setValue("is_active", Boolean(e), {
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

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full mt-2 rounded-md bg-emerald-700 px-4 py-2 text-white"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
