import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/firebase/firebaseAppConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

async function getData() {
  const querySnapshot = await getDocs(collection(db, "contacts"));

  const data: { id: string; [key: string]: any }[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

function Page() {
  const [contacts, setContacts] = useState([] as any[]);

  const { userAuth } = useAuthContext();
  const router = useRouter();

  const deletar = async (id: string) => {
    await deleteDoc(doc(db, "contacts", id));
    const data = await getData();
    setContacts(data);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setContacts(data);
    }
    fetchData();
  }, []);

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
            <h1 className="text-white text-lg font-bold">Mensagem Personalizada</h1>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full max-w-full px-3 mb-6  mx-auto">
                <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                  <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                    <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                      <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                        <span className="mr-3 font-semibold text-dark">
                          Contatos
                        </span>
                      </h3>
                      <div className="relative flex flex-wrap items-center my-2">
                        <button
                          onClick={() => {
                            //pegar os contatos e enviar disparos
                            
                          }}
                          className="inline-block text-[.925rem] text-white font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-black border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light"
                        >
                          {" "}
                          Enviar Disparos{" "}
                        </button>
                      </div>
                    </div>
                    <div className="flex-auto block py-8 pt-6 px-9">
                      <div className="overflow-x-auto">
                        <table className="w-full my-0 align-middle text-dark border-neutral-200">
                          <thead className="align-bottom">
                            <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                              <th className="pb-3 text-start min-w-[175px]">
                                NOME
                              </th>
                              <th className="pb-3 text-start min-w-[100px]">
                                CONTATO
                              </th>
                              <th className="pb-3 text-start min-w-[300px]">
                                MENSAGEM
                              </th>
                              <th className="pb-3 text-start min-w-[100px]">
                                AÇÕES
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {contacts.map((contact) => (
                              <tr
                                key={contact.id}
                                className="border-b border-neutral-200"
                              >
                                <td className="py-3 whitespace-nowrap text-left text-[0.95rem] font-medium text-dark">
                                  {contact.name}
                                </td>
                                <td className="py-3 whitespace-nowrap text-left text-[0.95rem] text-dark">
                                  {contact.phone}
                                </td>
                                <td className="py-3 whitespace-nowrap text-left text-[0.95rem] text-dark">
                                  {contact.message}
                                </td>
                                <td className="py-3 whitespace-nowrap text-left text-[0.95rem] text-dark">
                                  <button
                                    className="text-[0.75rem] font-medium text-dark bg-transparent border border-dark rounded-lg hover:text-white hover:bg-dark py-1 px-2"
                                    onClick={async () => {
                                      await deletar(contact.id);
                                    }}
                                  >
                                    Excluir
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Page;
