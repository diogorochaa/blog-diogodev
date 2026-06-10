const INVALID_DATE_LABEL = 'Data indisponível'

export const toIsoDate = (date: string) => {
  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return undefined
  }

  return parsed.toISOString()
}

export const formatDate = (date: string) => {
  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return INVALID_DATE_LABEL
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
  }).format(parsed)
}
