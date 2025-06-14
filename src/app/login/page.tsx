"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Image from "next/image";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
});
export default function Login() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {email,password} = values
   await authClient.signIn.email({
    email,
    password,
    callbackURL: "/painel",
   },
  {
    onError:(error)=> {
 
     if(error.error.message==='Invalid email or password'){
      toast.error("Email ou senha inválidos")
     }else{
      toast.error("Erro ao fazer login")
     }
    },
    onSuccess:()=> {
      toast.success("Login realizado com sucesso")
      router.push("/painel")
    }
  })

  }

  async function handleGoogleSignIn(){
    await authClient.signIn.social({
       provider: "google",
       callbackURL: "/painel"
       })
      
     
     }
  return (
    <div
      className="text-black w-full  h-screen flex  justify-center items-center border bg-green-100  py-2 max-md:py-0 "
    >
      <div className="bg-white w-[40%] h-full py-2 p-4 max-md:w-full  rounded-md">
        <div className="flex flex-col items-center">
          <Image
            src={"/icons/icon.png"}
            alt="simplifica"
            width={60}
            height={60}
          />
          <h1 className="font-bold text-gray-700 text-lg">Simplifica</h1>
          <p className="text-xs"> seu guia pra organizar, guardar e crescer.</p>
        </div>

        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 my-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe seu email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe sua senha" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full p-6 items-center bg-green-500 hover:bg-green-600"
              disabled={form.formState.isSubmitting}
            >
               {
                form.formState.isSubmitting ? 

                <Loader2 className="w-4 h-4 animate-spin" />
                :
                form.formState.isSubmitSuccessful ?
                <Check className="w-4 h-4" />
                :
                'Entrar'
              }
              
            </Button>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-full bg-gray-300 h-[0.1px]"></div>
                <p className="text-gray-600">ou</p>
                <div className="w-full bg-gray-300 h-[0.1px]"></div>
              </div>

              <Button
                variant={"outline"}
                className="w-full p-6 items-center"
                type="button"
                onClick={handleGoogleSignIn}
              >
                <Image
                  src={"/icons/google.png"}
                  alt="google icone"
                  width={24}
                  height={24}
                />
                Google
              </Button>

              <div className="flex items-center justify-center text-sm">
                <p>
                  Ainda não tem uma conta?{" "}
                  <Link href={"/"} className="text-green-500">
                    se cadastre
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Form>

        {/**
         *
         * lOGIN COM GOOGLE
         */}
      </div>
    </div>
  );
}
