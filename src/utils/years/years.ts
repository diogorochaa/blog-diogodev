export const getCurrentYear = (referenceDate = new Date()) => {
  return referenceDate.getFullYear()
}

export const getYearsSince = (
  startYear: number,
  currentYear = getCurrentYear(),
) => {
  return Math.max(0, currentYear - startYear)
}

export const formatYears = (years: number) => {
  return `${years} ${years === 1 ? 'ano' : 'anos'}`
}
