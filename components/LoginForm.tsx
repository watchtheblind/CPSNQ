"use client";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Alert } from "./ui/alert";
import { LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import type { FieldPath } from "react-hook-form";
import { z } from "zod";

//formSchema declares an object using the Zod library for form validation.
const formSchema = z.object({
  email: z.string().min(11).max(50),
  password: z.string().min(6).max(50),
});
// this fragment creates a form's instance
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});
interface LoginFieldProps {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  characters: number;
  disabled?: any;
}

const LoginField: React.FC<LoginFieldProps> = ({
  name,
  label,
  placeholder,
  description,
  inputType,
  characters,
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
                maxLength={characters}
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

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [intentos, setIntentos] = useState(1);
  const [Error, setError] = useState(false);
  // const [cargando, setCargando] = useState(false)
  const [mensajeAlerta, setMensajeAlerta] = useState("Usuario no encontrado");
  const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
  // const desbloquearLoginEn10Segundos = async () => {
  //   setDeshabilitarBoton(true);
  //   setTimeout(() => {
  //     setDeshabilitarBoton(false);
  //     setError((error) => !error);
  //   }, 10000);
  // };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={() => {
            null;
          }}
          className=" justify-center space-y-4"
        >
          <LoginField
            disabled={isPending || deshabilitarBoton}
            characters={30}
            name="email"
            label="Correo Electrónico"
            placeholder="correo"
            inputType="email"
          />
          <LoginField
            disabled={isPending || deshabilitarBoton}
            characters={20}
            name="password"
            label="Contraseña"
            placeholder="Password"
            inputType="password"
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isPending || deshabilitarBoton}
              className="w-60 mt-3 bg-[#5C776B] rounded-full hover:bg-[#475D53] boton-login"
            >
              Iniciar Sesión
              {isPending ? <LoaderCircle className="ml-2 animate-spin" /> : ""}
            </Button>
          </div>
        </form>
      </Form>
      {Error ?? (
        <div className="mt-4 visible animate-pulse">
          <Alert />
        </div>
      )}
    </>
  );
};
