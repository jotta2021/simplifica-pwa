"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

interface Props{

    date: Date | undefined
    setDate: (value:Date)=> void;
}

// Função para normalizar o formato de tempo
const normalizeTimeFormat = (timeString: string): string => {
  const parts = timeString.split(":")
  
  // Se tem apenas hora e minuto (HH:mm)
  if (parts.length === 2) {
    return `${timeString}:00`
  }
  
  // Se tem hora, minuto e segundo (HH:mm:ss)
  if (parts.length === 3) {
    return timeString
  }
  
  // Fallback para formato padrão
  return "10:30:00"
}

// Função para extrair horas, minutos e segundos de forma segura
const extractTimeParts = (timeString: string): { hours: number; minutes: number; seconds: number } => {
  const normalizedTime = normalizeTimeFormat(timeString)
  const [hours, minutes, seconds] = normalizedTime.split(":").map(Number)
  
  return {
    hours: isNaN(hours) ? 10 : hours,
    minutes: isNaN(minutes) ? 30 : minutes,
    seconds: isNaN(seconds) ? 0 : seconds
  }
}

export function DatePickerAndHour({ date, setDate }: Props) {
  const [open, setOpen] = React.useState(false)
  // Estado para a hora no formato "HH:mm:ss"
  const [time, setTime] = React.useState(() => {
    if (date) {
      return format(date, 'HH:mm:ss')
    }
    return "10:30:00"
  })

  // Atualiza a data com a hora selecionada
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value
    
    // Só atualiza se o valor não estiver vazio
    if (newTime) {
      setTime(newTime)
      
      if (date) {
        try {
          const { hours, minutes, seconds } = extractTimeParts(newTime)
          const newDate = new Date(date)
          newDate.setHours(hours)
          newDate.setMinutes(minutes)
          newDate.setSeconds(seconds)
          setDate(newDate)
        } catch (error) {
          console.error("Erro ao processar tempo:", error)
        }
      }
    }
  }

  // Quando a data mudar, mantém a hora selecionada
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      try {
        const { hours, minutes, seconds } = extractTimeParts(time)
        const newDate = new Date(selectedDate)
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        newDate.setSeconds(seconds)
        setDate(newDate)
        setOpen(false)
      } catch (error) {
        console.error("Erro ao processar data:", error)
      }
    }
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          Data
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          Hora
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={time}
          onChange={handleTimeChange}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  )
}
