'use client'

import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

    // Custom menu button component
  export default   function MenuButton() {
        const { toggleSidebar } = useSidebar();
        return (
          <button  onClick={toggleSidebar} className="hidden max-md:flex">
            <Menu />
          
          </button>
        );
      }