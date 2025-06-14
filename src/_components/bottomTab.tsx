// components/BottomTab.tsx
import Link from "next/link";
import { Home, BarChart2, User } from "lucide-react";

export default function BottomTab() {
  return (
 <div className="w-full hidden max-md:flex items-center justify-around bg-white shadow-md border-t py-2 fixed bottom-0 left-0 right-0" >
          
  <Link href="/auth/painel" className="flex flex-col items-center text-sm text-gray-600">
    <Home size={20} />
    Painel
  </Link>
  <Link href="/auth/resumo" className="flex flex-col items-center text-sm text-gray-600">
    <BarChart2 size={20} />
    Resumo
  </Link>
  <Link href="/auth/perfil" className="flex flex-col items-center text-sm text-gray-600">
    <User size={20} />
    Perfil
  </Link>
        </div>

  );
}
