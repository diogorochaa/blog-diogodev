import type { PlayerCardStat } from '@/components/PlayerCard'
import type { ExperienceContentEntry, ProfileContent } from '@/models'
import { formatYears, getYearsSince } from '@/utils'

const MAX_SKILLS = 8

type PlayerCardStats = {
  title: string
  stats: PlayerCardStat[]
  overall: number | null
  note: string
}

/**
 * Prefers the illustrative attributes edited in Prismic. While they are not
 * configured, falls back to the real years-per-technology data from `about`.
 */
export const buildPlayerCardStats = (
  profile: ProfileContent | null,
  experiences: ExperienceContentEntry[],
): PlayerCardStats => {
  const attributes = profile?.playerStats ?? []

  if (attributes.length > 0) {
    const average = Math.round(
      attributes.reduce((total, stat) => total + stat.value, 0) /
        attributes.length,
    )

    return {
      title: 'Atributos',
      stats: attributes.map((stat) => ({
        label: stat.label,
        valueLabel: String(stat.value),
        percent: stat.value,
      })),
      overall: profile?.overall ?? average,
      note: 'Atributos ilustrativos: uma leitura bem-humorada das minhas áreas de atuação, não métricas.',
    }
  }

  const skills = experiences
    .map((item) => ({ ...item, years: getYearsSince(item.startYear) }))
    .sort((first, second) => second.years - first.years)
    .slice(0, MAX_SKILLS)
  const maxYears = Math.max(1, ...skills.map((skill) => skill.years))

  return {
    title: 'Anos por tecnologia',
    stats: skills.map((skill) => ({
      label: skill.name,
      valueLabel: formatYears(skill.years),
      percent: skill.level ?? (skill.years / maxYears) * 100,
    })),
    overall: profile?.overall ?? null,
    note: 'Tempo de uso de cada tecnologia no dia a dia.',
  }
}
