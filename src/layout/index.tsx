import React from "react";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";


interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { logout } = useAuthContext();
    const router = useRouter();

    const excludedRoutes = ['/signIn', '/signUp'];

    if (excludedRoutes.includes(router.pathname)) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#151515]">
            <nav className="bg-[#151515] p-6 flex justify-between items-center shadow-sm border-b border-yellow-500">
                <div className="flex items-center">
                <Image src={Logo} alt="Workflow" width={100} quality={100} />
                </div>
                <div className="flex space-x-12">
                    <Link href="/" className="font-medium cursor-pointer text-[#FFDE07] border-b-2 border-transparent hover:border-b-2 hover:border-white">Inicio</Link>
                    <Link href="/contacts" className="font-medium cursor-pointer text-[#FFDE07] border-b-2 border-transparent hover:border-b-2 hover:border-white">Contatos</Link>
                    <Link href="/messages" className="font-medium cursor-pointer text-[#FFDE07] border-b-2 border-transparent hover:border-b-2 hover:border-white">Mensagens Personalizadas</Link>
                </div>
                <button onClick={logout} className="font-medium text-[#FFDE07] bg-transparent border border-[#FFDE07] py-2 px-4 rounded hover:text-white hover:bg-[#FFDE07]">Logout</button>
            </nav>
            <main className="p-6">
                {children}
            </main>
        </div>
    );
}