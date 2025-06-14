'use client'
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { FunnelPlus, LogOut } from 'lucide-react';
import React from 'react';

// import { Container } from './styles';

const ButtonLogout= () => {
    async function Logout(){
        await authClient.signOut()
    }
  return (
    <Button variant={"outline"} className="w-full" onClick={Logout}>
        <LogOut />
        Sair
    </Button>
  )
}

export default ButtonLogout;