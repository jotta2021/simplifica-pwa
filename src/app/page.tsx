import { auth } from '@/lib/auth';
import LandingClient from './_components/landing/landing-client';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function HomePage  () {
  const session = await auth.api.getSession({
    headers:await headers()
  })

  if(session?.user){
    redirect('/painel')
  }
  return <LandingClient />;
} 