import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/firebase/firebaseAppConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Table from "@/components/Table";

interface Contact {
  id: string;
  name: string;
  phone: string;
  message: string;
  user_id: string;
  timestamp?: number;
}

async function getData() {
  const querySnapshot = await getDocs(collection(db, "contacts"));

  const data: { id: string; [key: string]: any }[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

function getDataByUserIdRealTime(userId: string, callback: any) {
  const q = query(collection(db, "contacts"), where("user_id", "==", userId));
  return onSnapshot(q, (querySnapshot) => {
    const data: { id: string; [key: string]: any }[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });
}

function Page() {
  const [contacts, setContacts] = useState([] as any[]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { userAuth } = useAuthContext();

  const deletar = async (id: string) => {
    await deleteDoc(doc(db, "contacts", id));
    const data = await getData();
    setContacts(data);
  };

  useEffect(() => {
    if (!userAuth?.uid) return;

    const unsubscribe = getDataByUserIdRealTime(userAuth.uid, setContacts);

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [userAuth?.uid]);

  async function addData(name: string, phone: string) {
    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        name,
        phone,
        user_id: userAuth?.uid,
        timestamp: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  }

  async function handleForm(event: FormEvent) {
    event.preventDefault();
    const result = await addData(name, phone);
    if (result) {
      setName("");
      setPhone("");
      alert("Contato cadastrado com sucesso!");
    }
  }

  return (
    <>
      {userAuth && (
        <div className="grid gap-4">
          <section className="bg-[#151515]">
          <Grid 
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              marginBottom={2}
              width="100%"
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{ color: "#FFF", marginBottom: "1rem" }}
              >
                Cadastro de contatos para envio de mensagens
              </Typography>
              <form onSubmit={handleForm} className="grid gap-2">
                <Input
                  label="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="grid gap-2">
                  <Button>Cadastrar</Button>
                </div>
              </form>
            </Grid>
          </section>
          <section className="bg-[#151515]">
            <Grid 
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{ color: "#FFF", marginBottom: "1rem", fontBold: "bold" }}
              >
                Lista de Contatos
              </Typography>
              <Container
                maxWidth="lg"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#151515",
                }}
              >
                <Table
                  data={contacts}
                  columns={[
                    { key: "name", title: "Nome" },
                    { key: "phone", title: "Telefone" },
                    // Adicione mais colunas conforme necessário
                  ]}
                  onDelete={(id) => {
                    // Implemente a lógica de exclusão aqui
                  }}
                />
              </Container>
            </Grid>
          </section>
        </div>
      )}
    </>
  );
}

export default Page;

// export function getServerSideProps(ctx: any) {
//     const { 'sendflow.token': token } = parseCookies(ctx);

//     if (!token) {
//       return {
//         redirect: {
//           destination: `/signIn`,
//           permanent: false,
//         },
//       };
//     }

//     return {
//       props: {
//       },
//     };
//   }
