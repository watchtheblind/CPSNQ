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
  email: z.string().min(11).max(50),
  password: z.string().min(6).max(50),
});

interface LoginFormFieldProps {
  name: FieldPath<z.infer<typeof FormSchema>>;
  label: string;
  placeholder?: string;
  description?: string;
  inputType?: string;
  charLenght: number;
  disabled?: any;
}

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [attempts, setAttemps] = useState(1);
  const [Error, setError] = useState(false);
  // const [loading, setLoading] = useState(false)
  const [AlertMessage, setAlertMessage] = useState("Usuario no encontrado");
  const [disableButton, setDisableButton] = useState(false);
  // const unlockLoginin10s = async () => {
  //   setdisableButton(true);
  //   setTimeout(() => {
  //     setdisableButton(false);
  //     setError((error) => !error);
  //   }, 10000);
  // };

  function submitData(data: z.infer<typeof FormSchema>) {
    alert("you submitted: " + JSON.stringify(data));
    // <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  }
  /*creating a Form instance*/
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitData)}
          className=" justify-center space-y-4"
        >
          <LoginFormField
            disabled={isPending || disableButton}
            charLenght={30}
            name="email"
            label="Correo Electronico"
            placeholder="elsapatero@gmail.com"
            inputType="email"
          />
          <LoginFormField
            disabled={isPending || disableButton}
            charLenght={20}
            name="password"
            label="Contraseña"
            inputType="password"
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isPending || disableButton}
              className="w-60 mt-3"
            >
              Iniciar Sesión
              {isPending && <LoaderCircle className="ml-2 animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
      {Error && <div className="mt-4 visible animate-pulse"></div>}
    </>
  );
};

const LoginFormField: React.FC<LoginFormFieldProps> = ({
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
                type={inputType || "text"}
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
export default LoginForm;
