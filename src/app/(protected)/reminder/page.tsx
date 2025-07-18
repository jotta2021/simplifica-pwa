
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
import AddButton from './_components/buttonAdd';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { prisma } from '../../../../lib/prisma';
import CalendarReminders from './_components/calendarReminders';
import MobileReminders from './_components/mobileReminders';

const Reminder  = async  () => {
const session =  await auth.api.getSession({
    headers: await headers()
})

//pega todos os lembretes do usuario
const reminders = await prisma.reminder.findMany({
    where:{
        userId: session?.user.id
    }
})
 


  return (
    <ContainerPage>
      <ContainerPageHeader>
        <ContentHeader>
          <>
            <BreadcrumbP
              items={[
                { label: 'Resumo', href: '/painel' },
                { label: 'Lembretes', isCurrentPage: true },
              ]}
            />
            <TitlePage title="Lembretes" />
            <DescriptionPage description="Visualize e gerencie seus lembretes." />
          </>
        </ContentHeader>
        <PageActions>
        <AddButton/>
        </PageActions>
      </ContainerPageHeader>
      <ContentPage>
     <CalendarReminders reminders={reminders}/>
     <MobileReminders reminders={reminders}/>
      </ContentPage>
    </ContainerPage>
  );
}

export default Reminder;