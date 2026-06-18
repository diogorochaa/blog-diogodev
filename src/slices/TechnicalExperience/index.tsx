import { AboutExperience } from '@/components/AboutExperience'
import type { ExperienceCategory } from '@/models'

import type { PrismicSlice } from '../slice.types'
import {
  getBooleanField,
  getItems,
  getNumberField,
  getTextField,
} from '../slice.types'

type TechnicalExperienceProps = {
  slice: PrismicSlice
}

const validCategories = new Set<ExperienceCategory>(['frontend', 'backend'])

const getCategory = (value: unknown): ExperienceCategory => {
  return typeof value === 'string' &&
    validCategories.has(value as ExperienceCategory)
    ? (value as ExperienceCategory)
    : 'frontend'
}

export const TechnicalExperience = ({ slice }: TechnicalExperienceProps) => {
  const primary = slice.primary
  const heading = getTextField(primary, 'heading', 'Experiência Técnica')
  const description = getTextField(primary, 'description')
  const showCharts = getBooleanField(primary, 'show_charts', true)
  const items = getItems(slice)
    .map((item) => ({
      name: getTextField(item, 'name'),
      startYear: getNumberField(item, 'start_year', new Date().getFullYear()),
      category: getCategory(item.category),
      iconKey: getTextField(item, 'icon_key', 'CodeIcon'),
      color: getTextField(item, 'color', '#22d3ee'),
    }))
    .filter((item) => item.name)

  if (items.length === 0) {
    return null
  }

  return (
    <AboutExperience
      heading={heading}
      description={description}
      showCharts={showCharts}
      items={items}
    />
  )
}

export default TechnicalExperience
