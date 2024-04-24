import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import { db } from "@/firebase/firebaseAppConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

async function getData() {
  const querySnapshot = await getDocs(collection(db, "contacts"));

  const data: { id: string; [key: string]: any }[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

function Page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");


  const { userAuth, logout } = useAuthContext();
  const router = useRouter();

  async function addData(name: string, phone: string) {
    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        name,
        phone,
        message,
      });
      console.log("Document written with ID: ", docRef.id);
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  }

  async function handleForm(event: React.FormEvent) {
    event.preventDefault();
    const result = await addData(name, phone);
    if (result) {
      console.log("Cadastrado com sucesso");
    }
  }

  useEffect(() => {
    if (userAuth === null) {
      router.push("/signIn");
    }
  }, [userAuth]);

  return (
    <>
      {userAuth && (
        <section className="bg-[#151515]">
          <div className=" grid items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <h1 className="text-white text-lg font-bold">
              Cadastro de contatos para envio de mensagens
            </h1>
            <form onSubmit={handleForm} className="grid gap-2">
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Contato"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Digite aqui a mensagem que deseja enviar"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                    type="submit"
                    className="w-full text-black bg-[#FFDE07] hover:bg-[#B29B04] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Cadastrar
                </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default Page;
