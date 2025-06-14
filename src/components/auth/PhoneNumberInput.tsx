
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CountryCodeSelector from "./CountryCodeSelector";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface PhoneNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  countryCodeName: TName;
  phoneNumberName: TName;
}

const PhoneNumberInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  countryCodeName,
  phoneNumberName,
}: PhoneNumberInputProps<TFieldValues, TName>) => {
  return (
    <div className="space-y-2">
      <FormLabel>Phone Number</FormLabel>
      <div className="flex gap-2">
        <FormField
          control={control}
          name={countryCodeName}
          render={({ field }) => (
            <FormItem className="flex-shrink-0">
              <FormControl>
                <CountryCodeSelector
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={phoneNumberName}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input 
                  placeholder="700123456" 
                  {...field}
                  className="transition-all focus:ring-2 focus:ring-career-blue"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="text-xs text-red-500">
        {/* Error messages will be displayed by the parent form validation */}
      </div>
    </div>
  );
};

export default PhoneNumberInput;
