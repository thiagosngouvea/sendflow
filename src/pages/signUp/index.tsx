'use client'

import React from "react";
import signUp from "../../firebase/auth/signUp";
import { useRouter } from 'next/navigation';
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Input from "@/components/Input";

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return alert("Erro ao realizar cadastro")
        }

        // else successful
        alert("Cadastro realizado com sucesso!")
        return router.push("/signIn")
    }
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
                Bem vindo!
              </h1>
              <p className="text-center text-white">
                  Cadastre sua conta, é rápido e fácil.
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
                  Cadastrar
                </Button>
                  <p className="text-sm text-white text-center">
                      Já tem uma conta?{" "}
                      <Link
                          href="/signIn"
                          className="font-medium text-[#FFDE07] hover:underline dark:text-primary-500"
                      >
                          Entrar
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

export default Page;