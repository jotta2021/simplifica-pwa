'use client'

import React, { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import UpsertFormReminder from './upsert-reminder'
import { Button } from '@/components/ui/button'
import { useAction } from 'next-safe-action/hooks'
import { deleteReminderAction } from '@/actions/upsertReminderActions/deleteReminderAction'
import { toast } from 'sonner'

export type Reminder = {
  id: string
  description: string
  date_hour: string | Date
  createdAt: string | Date
  updatedAt: string | Date
  sent: boolean
  userId: string
}

interface Props {
  reminders: Reminder[]
}

const CalendarReminders = ({ reminders }: Props) => {
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const locales = {
    'pt-BR': ptBR,
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
    locale: 'pt-BR'
  })

  const events = reminders.map((reminder) => ({
    id: reminder.id,
    title: reminder.description,
    start: new Date(reminder.date_hour),
    end: new Date(new Date(reminder.date_hour).getTime() + 30 * 60 * 1000), // +30 minutos
    resource: reminder,
  }))

  const messages = {
    allDay: 'Dia todo',
    previous: 'Anterior',
    next: 'Próximo',
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'Não há eventos nesse período.',
    showMore: (total: number) => `+ ver mais (${total})`,
  }

  // Hook para deletar lembrete
  const deleteReminder = useAction(deleteReminderAction, {
    onSuccess: () => {
      toast.success('Lembrete excluído com sucesso!')
      setModalOpen(false)
    },
    onError: () => {
      toast.error('Erro ao excluir lembrete')
    }
  })

  // Handler ao clicar no evento
  const handleSelectEvent = (event: any) => {
    setSelectedReminder(event.resource)
    setEditMode(false)
    setModalOpen(true)
  }

  // Handler para abrir modo edição
  const handleEdit = () => {
    setEditMode(true)
  }

  // Handler para deletar
  const handleDelete = () => {
    if (selectedReminder) {
      deleteReminder.execute({ id: selectedReminder.id })
    }
  }

  // Handler para fechar modal
  const handleClose = () => {
    setModalOpen(false)
    setEditMode(false)
    setSelectedReminder(null)
  }

  return (
    <div className='p-4 max-md:hidden'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        messages={messages}
        style={{ height: 500 }}
        culture='pt-BR'
        onSelectEvent={handleSelectEvent}
      />
      <Dialog open={modalOpen} onOpenChange={handleClose}>
        <DialogContent className='max-h-[90vh] overflow-y-auto max-md:w-[90%]'>
          {selectedReminder && !editMode && (
            <div className='space-y-4'>
              <h2 className='text-lg font-bold'>Lembrete</h2>
              <div>
                <div className='font-semibold'>Descrição:</div>
                <div>{selectedReminder.description}</div>
              </div>
              <div>
                <div className='font-semibold'>Data e hora:</div>
                <div>{new Date(selectedReminder.date_hour).toLocaleString('pt-BR')}</div>
              </div>
              <div className='flex gap-2 justify-end'>
                <Button variant='outline' onClick={handleEdit}>Editar</Button>
                <Button variant='destructive' onClick={handleDelete} disabled={deleteReminder.isExecuting}>
                  {deleteReminder.isExecuting ? 'Excluindo...' : 'Excluir'}
                </Button>
              </div>
            </div>
          )}
          {selectedReminder && editMode && (
            <UpsertFormReminder
              onSuccess={handleClose}
            reminder={selectedReminder}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CalendarReminders
