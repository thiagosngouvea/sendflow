/* eslint-disable @next/next/no-img-element */
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateQRCode } from "@/services/qrcode.service";
import { useAuthContext } from "../context/AuthContext";
import { db } from "@/firebase/firebaseAppConfig";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
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
import QRCode from "qrcode";

interface Contact {
  id: string;
  name: string;
  phone: string;
  user_id: string;
  timestamp?: number;
}

async function getData(): Promise<Contact[]> {
  const dbRef = ref(getDatabase(), "contacts/");
  const data: Contact[] = [];

  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      data.push({ id: childSnapshot.key, ...childData });
    });
  });

  return data;
}

function getQrCode(userId: string, callback: any) {
  const q = query(collection(db, "qrcode"));
  return onSnapshot(q, (querySnapshot) => {
    const data: { id: string; [key: string]: any }[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });
}

function Page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [qrCodeBase64, setQrCodeBase64] = useState<any>("");

  const { userAuth, logout } = useAuthContext();

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

  useEffect(() => {
    if (!userAuth?.uid) return;

    const unsubscribe = getQrCode(userAuth.uid, setQrCodeBase64);

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [userAuth?.uid]);

  return (
    <>
      {userAuth && (
        <section className="bg-[#151515]">
          <div className="flex items-center justify-center px-6 py-8 mx-auto lg:py-0">
            {qrCodeBase64 && (
              <img
                src={qrCodeBase64[qrCodeBase64.length - 1]?.qr_code}
                alt="QR Code"
              />
            )}
            <h1 className="text-white text-lg font-bold self-start ml-2">
              Escaneie o QR Code para utilizar o sistema
            </h1>
          </div>
        </section>
      )}
    </>
  );
}

export default Page;
