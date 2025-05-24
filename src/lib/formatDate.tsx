import {format, getDay, getDaysInMonth, getMonth, getYear} from 'date-fns'

// import { Container } from './styles';

const FormatDate = (value:Date) => {
  const month = value.toLocaleDateString('pt-BR', {month:'long'})
  const day = getDay(value)
  const year = value.toLocaleDateString('pt-BR', {year:'numeric'})

  return `${day} de ${month} ${year}`
}

export default FormatDate;