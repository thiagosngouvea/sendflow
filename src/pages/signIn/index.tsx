"use client";

import { useState, FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import signIn from "../../firebase/auth/signIn";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Input from "@/components/Input";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { result, error } = await signIn(email, password);

      if (error) {
        const firebaseError = error as FirebaseError;
        if (firebaseError.message) {
          console.log(firebaseError.message);
          throw new Error(firebaseError.message);
        } else {
          console.log("Unknown Error:", firebaseError);
          throw new Error("Unknown Error");
        }
      }

      return router.push("/");
    } catch (error) {
      alert("Erro ao realizar login");
    }
  };

  return (
    <section className="bg-[#151515]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <span
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <Image src={Logo} alt="Workflow" width={300} quality={100} />
        </span>
        <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-[#FFDE07] md:text-2xl">
              Bem vindo de volta!
            </h1>
            <p className="text-center text-white">
                Digite suas credenciais para acessar sua conta.
            </p>
            <form className="space-y-4 md:space-y-6" onSubmit={handleForm}>
              <div>
                <Input
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
              <div className="grid gap-2">
                <Button>
                  Entrar
                </Button>
                <p className="text-sm text-white text-center">
                    Não tem uma conta?{" "}
                    <Link
                        href="/signUp"
                        className="font-medium text-[#FFDE07] hover:underline dark:text-primary-500"
                    >
                        Cadastre-se
                    </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
