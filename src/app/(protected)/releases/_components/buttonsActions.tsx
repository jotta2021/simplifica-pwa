import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Pencil, Trash } from 'lucide-react';
import React, { useState } from 'react';
import UpsertReleaseForm from '../../_components/upsert-release-form';
import { Transaction } from './columns';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useAction } from 'next-safe-action/hooks';
import deleteReleaseActions from '@/actions/upsertReleasesActions/deleteReleaseActions';
import { toast } from 'sonner';
import UpsertTransferForm from '../../_components/upsert-transfer-form';
// import { Container } from './styles';
interface ButtonsActionsProps {
    release: Transaction
}
const ButtonsActions: React.FC<ButtonsActionsProps> = ({release}) => {
    const [openDialog, setOpenDialog] = useState(false)

    const deleteRelease = useAction(deleteReleaseActions,{
        onSuccess:()=> {
            toast.success("Lançamento deletado com sucesso")
        },
        onError:()=> {
            toast.error("Erro ao deletar lançamento")
        }
    })

    const handleDeleteRelease = () => {
        deleteRelease.execute({id: release.id})
    }
  return (
    <div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
    <DialogTrigger>
      <Button variant="ghost" size="icon">
        <Pencil size={16} />
      </Button>
    </DialogTrigger>
    <DialogContent className='max-md:w-[90%]'>
      {
        release.type ==='EXPENSE' || release.type ==='INCOME'  ?
         <UpsertReleaseForm type={release.type === "INCOME" ? "INCOME" : "EXPENSE"} onSuccess={() =>setOpenDialog(false) }     release={{
          ...release,
          toAccountWalletId: release.toAccountWalletId ?? undefined,
        }}/>
     :

     <UpsertTransferForm
       onSuccess={() => setOpenDialog(false)}
       release={{
         ...release,
         toAccountWalletId: release.toAccountWalletId ?? undefined,
       }}
     />
     
        }
       
    </DialogContent>
  </Dialog>
  
  <AlertDialog>
    <AlertDialogTrigger>
        <Button variant="ghost" size="icon">
        <Trash size={16} />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent className='max-md:w-[90%]'>
        <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja deletar este lançamento?</AlertDialogTitle>
            <AlertDialogDescription>
                Este lançamento será deletado permanentemente e não poderá ser recuperado.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className='border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white' onClick={handleDeleteRelease}>Deletar</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
     
    
   

    </div>
  )
}

export default ButtonsActions;