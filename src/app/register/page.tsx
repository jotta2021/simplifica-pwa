"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db, auth, provider } from "@/lib/services/firebaseconfig";
import { useToast } from "@/hooks/use-toast";
type IFormInput = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { toast } = useToast();

  async function handleRegister(data: IFormInput) {
    const { name, email, password } = data;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);

      if (res.user) {
        const docUser = await addDoc(collection(db, "user"), {
          name: name,
          email: email,
          saldo: 0,
          uid: res.user.uid,
        });
      }
      alert("Cadastro realizado");
    } catch (error: any) {
      const errorMessage = error.message;
      toast({
        title: `${errorMessage}`,
        variant: "destructive",
      });
      console.log("Erro ao cadastrar", error);
    }
  }

  async function handleGoogleRegister() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("usuario:", user);
      //verifica se esse usuario ja existe
      const userRef = collection(db, "user");
      const q = query(userRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        //cria um novo usuario
        await addDoc(userRef, {
          name: user.displayName,
          email: user.email,
          saldo: 0,
          uid: user.uid,
        });
        alert("usuário cadastrado");
      } else {
        alert("Usuário já existe");
      }
    } catch (error) {
      console.log("Erro ao cadastrar", error);
    }
  }

  return (
    <div className="text-black w-full h-[100vh] flex justify-center items-center border bg-green-100 overflow-y-auto py-2 max-md:py-0">
      <div className="bg-white w-[40%] h-[80%] py-2 p-4 max-md:w-full max-md:h-full rounded-md">
        <div className="flex flex-col items-center">
          <Image
            src={"/icons/icon.png"}
            alt="simplifica"
            width={120}
            height={120}
          />
          <h1 className="font-bold text-gray-700 text-xl">Simplifica</h1>
          <p className="text-sm">Crie uma nova conta</p>
        </div>

        <div className="my-4">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleRegister)}
          >
            <div className="flex flex-col gap-1">
              <label>Nome</label>
              <Input
                placeholder="Digite seu nome"
                className="py-5"
                type="text"
                {...register("name", { required: "O nome é obrigatório" })}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label>Email</label>
              <Input
                placeholder="Digite seu email"
                className="py-5"
                type="email"
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Digite um email válido",
                  },
                })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label>Senha</label>
              <Input
                placeholder="Digite sua senha"
                className="py-5"
                type="password"
                {...register("password", {
                  required: "A senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter no mínimo 6 caracteres",
                  },
                })}
              />

              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
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

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-full bg-gray-300 h-[0.1px]"></div>
            <p className="text-gray-600">ou</p>
            <div className="w-full bg-gray-300 h-[0.1px]"></div>
          </div>

          <Button
            variant={"outline"}
            className="w-full p-6 items-center"
            onClick={handleGoogleRegister}
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
              Já tem uma conta?{" "}
              <Link href={"/"} className="text-green-500">
                Entre agora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
