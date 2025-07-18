import {
  ContainerPage,
  ContainerPageHeader,
  ContentHeader,
  ContentPage,
  BreadcrumbP,
  TitlePage,
  DescriptionPage,
  PageActions,
} from '@/components/ui/container-page';
import ButtonAdd from './_components/buttonAdd';
import { FixedBillTable, fixedBillColumns } from './_components/columns-fixed-bill';
import { prisma } from '../../../../lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import MobileFixedBills from './_components/mobile-fixed-bills';

export default async function BillstoFixedPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    redirect('/login');
  }

  // Busca todas as contas fixas do usuário
  const fixedBills = await prisma.fixedBill.findMany({
    where: { userId: session.user.id },
    orderBy: { dueDay: 'asc' },
  });

  const fixedBillsSafe = fixedBills.map(bill => ({
    ...bill,
    categoryId: bill.categoryId ?? undefined,
  }));

  return (
    <ContainerPage>
      <ContainerPageHeader>
        <ContentHeader>
          <>
            <BreadcrumbP
              items={[
                { label: 'Resumo', href: '/painel' },
                { label: 'Contas Fixas', isCurrentPage: true },
              ]}
            />
            <TitlePage title="Contas Fixas" />
            <DescriptionPage description="Visualize e gerencie suas contas fixas." />
          </>
        </ContentHeader>
        <PageActions>
          <ButtonAdd />
        </PageActions>
      </ContainerPageHeader>
      <ContentPage>
        <div className="block md:hidden">
          <MobileFixedBills fixedBills={fixedBillsSafe} />
        </div>
        <div className="hidden md:block  ">
          <FixedBillTable columns={fixedBillColumns} data={fixedBillsSafe} />
        </div>
      </ContentPage>
    </ContainerPage>
  );
}