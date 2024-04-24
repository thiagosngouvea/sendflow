import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/firebase/firebaseAppConfig";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import Modal from "@/components/Modal";

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
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleContactSelect = (contactId: any) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));
    } else {
      setSelectedContacts((prevState) => [...prevState, contactId]);
    }
  };


  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setContacts(data);
    }
    fetchData();
  }, []);

  return (
    <>
      {userAuth && (
        <section className="bg-[#151515]">
          <div className=" grid items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <h1 className="text-white text-lg font-bold">
              Mensagem Personalizada
            </h1>
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
                            if(selectedContacts.length === 0) {
                              alert("Selecione ao menos um contato para enviar a mensagem");
                              return;
                            }

                            if(message === "") {
                              alert("Digite uma mensagem para enviar");
                              return;
                            }
                            alert("A mensagem foi enviado com sucesso para os contatos selecionados");
                            setSelectedContacts([]);
                            setMessage("");
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
                        <p className="text-gray-700 font-medium bg-blue-100 p-2 rounded-md shadow-md">
                          {selectedContacts && selectedContacts.length > 1
                            ? `${selectedContacts.length} contatos selecionados`
                            : `${selectedContacts.length > 0 ? selectedContacts.length : ''} ${selectedContacts.length === 0 ? 'Nenhum contato selecionado' : 'contato selecionado'}`}
                        </p>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                          rows={4}
                          placeholder="Digite sua mensagem aqui"
                        />
                        <button
                          onClick={handleOpenModal}
                          className="mt-3 inline-block text-[.925rem] text-white font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-black border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light"
                        >
                          Selecionar Contatos
                        </button>
                        <Modal
                          open={showModal}
                          onClose={handleCloseModal}
                          // onConfirm={handleSendMessage}
                          title="Selecione os contatos"
                        >
                          {contacts.map((contact) => (
                            <div
                              key={contact.id}
                              className="flex items-center space-x-3"
                            >
                              <input
                                type="checkbox"
                                id={`contact-${contact.id}`}
                                name={`contact-${contact.id}`}
                                value={contact.id}
                                onChange={() => handleContactSelect(contact.id)}
                                checked={selectedContacts.includes(contact.id)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                              />
                              <label
                                htmlFor={`contact-${contact.id}`}
                                className="text-gray-700 font-medium"
                              >
                                {contact.name} - {contact.phone}
                              </label>
                            </div>
                          ))}
                        </Modal>
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
