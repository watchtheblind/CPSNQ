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

const formSchema = z.object({
  email: z.string().min(11).max(50),
  password: z.string().min(6).max(50),
});

interface LoginFormFieldProps {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder?: string;
  description?: string;
  inputType?: string;
  charLenght: number;
  disabled?: any;
}

const InicioSesionForm = () => {
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
  /*creating a Form instance*/
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={() => {
            null;
          }}
          className=" justify-center space-y-4"
        >
          <LoginFormField
            disabled={isPending || disableButton}
            charLenght={30}
            name="email"
            label="email Electrónico"
            placeholder="email"
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
              className="w-60 mt-3 bg-[#5C776B] rounded-full hover:bg-[#475D53] boton-login"
            >
              Iniciar Sesión
              {isPending ? <LoaderCircle className="ml-2 animate-spin" /> : ""}
            </Button>
          </div>
        </form>
      </Form>
      {Error && (
        <div className="mt-4 visible animate-pulse">
          <Alert />
        </div>
      )}
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
            <FormLabel className="text-base">{label}</FormLabel>
            <FormControl>
              <Input
                disabled={disabled}
                maxLength={charLenght}
                className="mt-2 mb-5 w-80 bg-transparent rounded-full elemento-login"
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
export default InicioSesionForm;
