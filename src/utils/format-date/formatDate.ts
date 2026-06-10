const INVALID_DATE_LABEL = 'Data indisponível'
const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/

const parseDateInput = (date: string): Date | null => {
  const trimmed = date.trim()
  const dateOnlyMatch = DATE_ONLY_PATTERN.exec(trimmed)

  if (dateOnlyMatch) {
    const year = Number(dateOnlyMatch[1])
    const month = Number(dateOnlyMatch[2])
    const day = Number(dateOnlyMatch[3])
    const parsed = new Date(year, month - 1, day)

    if (
      parsed.getFullYear() !== year ||
      parsed.getMonth() !== month - 1 ||
      parsed.getDate() !== day
    ) {
      return null
    }

    return parsed
  }

  const parsed = new Date(trimmed)

  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return parsed
}

export const toIsoDate = (date: string) => {
  const trimmed = date.trim()

  if (DATE_ONLY_PATTERN.test(trimmed)) {
    return trimmed
  }

  const parsed = parseDateInput(date)

  if (!parsed) {
    return undefined
  }

  return parsed.toISOString()
}

export const formatDate = (date: string) => {
  const parsed = parseDateInput(date)

  if (!parsed) {
    return INVALID_DATE_LABEL
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
  }).format(parsed)
}
