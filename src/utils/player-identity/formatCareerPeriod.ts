const monthYearFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

const formatMonthYear = (date: string) => {
  const parsed = new Date(`${date}T00:00:00Z`)

  if (Number.isNaN(parsed.getTime())) {
    return ''
  }

  return monthYearFormatter.format(parsed).replace('.', '').replace(' de ', ' ')
}

export const formatCareerPeriod = (
  startDate: string,
  endDate: string,
  isCurrent: boolean,
) => {
  const start = startDate ? formatMonthYear(startDate) : ''
  const end = isCurrent ? 'atual' : formatMonthYear(endDate)

  if (!start && !end) {
    return ''
  }

  return [start, end].filter(Boolean).join(' — ')
}
