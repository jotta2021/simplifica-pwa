"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { auth, db, provider } from "@/lib/services/firebaseconfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {  collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";


type LoginData =  {
email:string
password:string
}
export default function Login() {
  const { register, handleSubmit,formState:{errors} } = useForm<LoginData>();
  const {toast} = useToast()

const router = useRouter()

  async function handleLogin(data:LoginData){

  try {
      const {email,password} = data 
      const user =await signInWithEmailAndPassword(auth,email,password)
  console.log(user)
    } catch (error:any) {
      const errorMessage =error.message
      toast({
          title:`${errorMessage}`,
          variant:'destructive'
        })
        console.log(errorMessage)
    }

  }

   async function handleLoginGoogle(){

  try {
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    
      //verifica se esse usuario ja existe
      const userRef = collection(db, "user");
      const q = query(userRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
  
   router.push('/auth/painel')
      } else{
        toast({
          title:"Usuário não existe!",
          variant:'destructive'
        })
      }
    } catch (error:any) {
      const errorMessage =error.message
      toast({
          title:`${errorMessage}`,
          variant:'destructive'
        })
    }

  }
  return (
    <div className="text-black w-full  h-screen flex  justify-center items-center border bg-green-100 overflow-y-auto py-2 max-md:py-0
   justify-center items-center 
    ">
      <div className="bg-white w-[40%] h-[80%] py-2 p-4 max-md:w-full max-md:h-full rounded-md">
        <div className="flex flex-col items-center">
          <Image
            src={"/icons/icon.png"}
            alt="simplifica"
            width={120}
            height={120}
          />
          <h1 className="font-bold text-gray-700 text-xl">Simplifica</h1>
          <p className="text-sm"> seu guia pra organizar, guardar e crescer.</p>
        </div>
  
        <div className="my-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <Input
                placeholder="Digite seu email"
                className="py-5"
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Digite um email válido",
                  },
                })}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors?.email?.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label>Senha</label>
              <Input placeholder="Digite seu senha" className="py-5" 
              {...register("password", {required:"A senha é obrigatória" })}
              />
               {errors.password && <span className="text-red-500 text-sm">{errors?.password?.message}</span>}
            </div>

            <div className="flex items-center gap-1">
              <Checkbox />
              <label className="text-sms">Lembrar-me</label>
            </div>

            <Button className="bg-BrightGreen hover:bg-green-600 duration-300 p-5">
              Entrar
            </Button>
          </form>
        </div>

        {/**
         *
         * lOGIN COM GOOGLE
         */}

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-full bg-gray-300 h-[0.1px]"></div>
            <p className="text-gray-600">ou</p>
            <div className="w-full bg-gray-300 h-[0.1px]"></div>
          </div>

          <Button variant={"outline"} className="w-full p-6 items-center" onClick={handleLoginGoogle}>
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
              <Link href={"/register"} className="text-green-500">
                se cadastre
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
