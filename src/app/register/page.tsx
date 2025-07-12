"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, Mail, Lock, User, Check } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { createCategoriesDefaultAction } from "@/actions/upsertCategorieActions/createCategoriesDefault";
import React from "react";
import { upsertAccountWalletAction } from "@/actions/upsertAccountWalletActions";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
});
export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  //durante o cadastro serao criada as categorias padroes
const createCategoriesDefault = useAction(createCategoriesDefaultAction)


//funcao pra criar uma conta padrão
const createAccountDefault = useAction(upsertAccountWalletAction)


  


  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values;
   
    await authClient.signUp.email(
      {
        email: email,
        name: name,
        password: password,
        callbackURL: "/",
      },
      {
        onSuccess: async() => {
         await createCategoriesDefault.execute()
         await createAccountDefault.execute({name:"Conta inicial", image: '/banks/wallet.png'})
          toast.success("Cadastro realizado com sucesso");
          form.reset();
          redirect('/login')
          
        },
        onError: (error: unknown) => {
          const err = (error as { error?: { message?: string } }).error;

          if (err?.message === "User already exists") {
            toast.error("Email já cadastrado");
          }else{
            toast.error("Erro ao cadastrar");
          }
          
        },
      }
    );
  }

  async function handleGoogleSignIn() {
   const user =  await authClient.signIn.social({
      provider: "google",
      callbackURL: "/painel"
    });
    if(user?.data?.url){}
   
  }



  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 p-4">
      <div className="w-full max-w-md">
        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-2xl shadow-green-100/50 border border-green-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-lg opacity-20"></div>
                <Image
                  src={"/icon.png"}
                  alt="simplifica"
                  width={64}
                  height={64}
                  className="relative z-10"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Criar conta</h1>
            <p className="text-gray-600 text-sm">Junte-se ao Simplifica e organize suas finanças</p>
          </div>

          {/* Formulário */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Nome Completo</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input 
                          placeholder="Seu nome completo" 
                          {...field} 
                          className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500/20 transition-all duration-200"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input 
                          placeholder="seu@email.com" 
                          {...field} 
                          className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500/20 transition-all duration-200"
                        />
                      </div>
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
                    <FormLabel className="text-gray-700 font-medium">Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          placeholder="Sua senha"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="pl-10 pr-12 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500/20 transition-all duration-200"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          tabIndex={-1}
                          onClick={() => setShowPassword((v) => !v)}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-green-500/25"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Criando conta...</span>
                  </div>
                ) : form.formState.isSubmitSuccessful ? (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Sucesso!</span>
                  </div>
                ) : (
                  'Criar conta'
                )}
              </Button>
            </form>
          </Form>

          {/* Divisor */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">ou continue com</span>
            </div>
          </div>

          {/* Botão Google */}
          <Button
            variant="outline"
            className="w-full h-12 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
            type="button"
            onClick={handleGoogleSignIn}
          >
            <div className="flex items-center gap-3">
              <Image
                src={"/icons/google.png"}
                alt="google icone"
                width={20}
                height={20}
              />
              <span className="text-gray-700 font-medium">Continuar com Google</span>
            </div>
          </Button>

          {/* Link para login */}
          <div className="text-center mt-8 pt-6 border-t border-gray-100">
            <p className="text-gray-600 text-sm">
              Já tem uma conta?{" "}
              <Link 
                href="/login" 
                className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs">
            © 2024 Simplifica. Seu guia para organizar, guardar e crescer.
          </p>
        </div>
      </div>
    </div>
  );
}
