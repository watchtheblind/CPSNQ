"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import type { FieldPath } from "react-hook-form";
import { z } from "@/lib/zod";

const FormSchema = z.object({
  email: z.string().email().min(11).max(50),
  password: z.string().min(6).max(20),
  names: z.string().min(2).max(50),
  document: z.string().min(7).max(8),
  lastnames: z.string().min(2).max(50),
  phonenumber: z.string().min(11).max(11),
});

interface SignUpFormFieldProps {
  name: FieldPath<z.infer<typeof FormSchema>>;
  label: string;
  placeholder?: string;
  description?: string;
  inputType?: React.HTMLInputTypeAttribute;
  charLenght: number;
  disabled?: any;
}

const SignUpFormFieldsData = [
  {
    name: "email" as const,
    label: "Correo Electronico",
    placeholder: "elsapatero@gmail.com",
    inputType: "email",
    charLenght: 30,
  },
  {
    name: "password" as const,
    label: "Contraseña",
    inputType: "password",
    charLenght: 20,
  },
  {
    name: "names" as const,
    label: "Nombres",
    placeholder: "Juan Carlos",
    inputType: "string",
    charLenght: 60,
  },
  {
    name: "lastnames" as const,
    label: "Apellidos",
    placeholder: "Bodoque Rulfo",
    inputType: "string",
    charLenght: 70,
  },
  {
    name: "document" as const,
    label: "Cedula de identidad",
    description: "Solo números",
    placeholder: "12345678",
    inputType: "tel",
    charLenght: 8,
  },
  {
    name: "phonenumber" as const,
    label: "Número Telefónico",
    placeholder: "04241234567",
    inputType: "tel",
    charLenght: 11,
  },
];

const SignUpFormField: React.FC<SignUpFormFieldProps> = ({
  name,
  label,
  placeholder,
  description,
  inputType,
  charLenght,
  disabled,
}) => {
  const { control } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                disabled={disabled}
                maxLength={charLenght}
                placeholder={placeholder}
                type={inputType}
                {...field}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const [attempts, setAttemps] = useState(1);
  const [Error, setError] = useState(false);
  // const [loading, setLoading] = useState(false)
  const [disableButton, setDisableButton] = useState(false);

  function submitData(data: z.infer<typeof FormSchema>) {
    alert("you submitted: " + JSON.stringify(data));
  }
  /*creating a Form instance*/
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitData)}
          className=" justify-center space-y-4"
        >
          {SignUpFormFieldsData.map((fieldProps) => (
            <SignUpFormField
              key={fieldProps.name}
              disabled={isPending || disableButton}
              {...fieldProps}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isPending || disableButton}
              className="w-60 mt-3"
            >
              Registrarse
              {isPending && <LoaderCircle className="ml-2 animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
      {Error && <div className="mt-4 visible animate-pulse"></div>}
    </>
  );
};

export default SignUpForm;
