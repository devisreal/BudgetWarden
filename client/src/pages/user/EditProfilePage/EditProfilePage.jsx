import NumberInput from "@/components/NumberInput";
import { DashboardSkeletonLoader } from "@/components/SkeletonLoader/SkeletonLoaders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { editUserProfile } from "@/utils/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";

const editProfileFormSchema = yup
  .object()
  .shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("This field is required"),
    currency: yup.string().required("Category is required"),
    income: yup
      .number()
      .required("Amount is required")
      .min(0, "Amount must be positive")
      .typeError("Amount must be a number"),
  })
  .required();

export default function EditProfilePage() {
  const [isLoading, userData, getUser] = useOutletContext();
  const { currencies } = useContext(DashboardContext);
  const navigate = useNavigate();

  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      income: 0,
      currency: "GBP",
    },
    mode: "onBlur",
    resolver: yupResolver(editProfileFormSchema),
  });

  useEffect(() => {
    if (!isLoading && userData) {
      reset({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        username: userData.username || "",
        email: userData.email || "",
        income: userData.income || 0,
        currency: userData.currency || "GBP",
      });
    }
  }, [isLoading, userData, reset]);

  if (isLoading) {
    return <DashboardSkeletonLoader />;
  }

  const handleEditUserProfile = async (formValues) => {
    try {
      const data = await editUserProfile(formValues);
      toast.success(data.message);
      reset();
      getUser()
      navigate("/user/profile");
    } catch (error) {
      console.log(error);
      toast.error("Error updating user");
    }
  };
  return (
    <div className="sm:min-w-2xl mr-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
        Edit your profile
      </h2>
      <div className="pt-6 pb-6">
        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleEditUserProfile)}
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 space-y-2">
              <Label htmlFor="first_name">First name</Label>
              <Input
                id="first_name"
                {...register("first_name")}
                placeholder="First Name"
                type="text"
              />
              {errors.first_name && (
                <small className="text-red-500 mt-1 font-medium text-xs">
                  {errors.first_name?.message}
                </small>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="last_name">Last name</Label>
              <Input
                id="last_name"
                {...register("last_name")}
                placeholder="Last Name"
                type="text"
              />
              {errors.last_name && (
                <small className="text-red-500 mt-1 font-medium text-xs">
                  {errors.last_name?.message}
                </small>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register("username")}
              placeholder="Username"
              type="text"
            />
            {errors.username && (
              <small className="text-red-500 mt-1 font-medium text-xs">
                {errors.username?.message}
              </small>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              {...register("email")}
              placeholder="Email Address"
              type="email"
            />
            {errors.email && (
              <small className="text-red-500 mt-1 font-medium text-xs">
                {errors.email?.message}
              </small>
            )}
          </div>

          <div className="flex gap-4 items-center">
            <div className="grid max-w-sm items-center gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                id="currency"
                defaultValue={`${userData.currency}`}
                onValueChange={(e) =>
                  setValue("currency", e, { shouldValidate: true })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a currency " />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Currency</SelectLabel>
                    {currencies.map((currency) => {
                      return (
                        <SelectItem key={currency.id} value={currency.value}>
                          <span className="font-bold">{currency.symbol}</span>{" "}
                          {currency.display}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.currency && (
                <small className="text-red-500 mt-1 font-medium text-xs">
                  {errors.currency?.message}
                </small>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <NumberInput
                label="Income"
                defaultValue={userData.income}
                onChange={(e) =>
                  setValue("income", e, { shouldValidate: true })
                }
                name="income"
                formatOptions={{
                  style: "currency",
                  currency: `${userData.currency}`,
                  currencySign: "accounting",
                }}
                minValue={0}
                step={1}
              />

              {errors.income && (
                <small className="text-red-500 mt-1 font-medium text-xs">
                  {errors.income?.message}
                </small>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className=" bg-emerald-700">
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
