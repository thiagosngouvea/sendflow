'use client'

import React from "react";
import signUp from "../../firebase/auth/signUp";
import { useRouter } from 'next/navigation';
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";


function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
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
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Senha
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <button
                      type="submit"
                      className="w-full text-black bg-[#FFDE07] hover:bg-[#B29B04] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                      Cadastrar
                  </button>
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