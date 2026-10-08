import type { ExperienceContentEntry } from '@/models'

import { getCurrentYear, getYearsSince } from '../years'

/** Years since the earliest technology start year registered in Prismic. */
export const getExperienceYears = (
  experiences: ExperienceContentEntry[],
  currentYear = getCurrentYear(),
) => {
  if (experiences.length === 0) {
    return 0
  }

  const firstYear = Math.min(...experiences.map((item) => item.startYear))
  return getYearsSince(firstYear, currentYear)
}
