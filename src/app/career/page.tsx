import { CareerPageContent } from './CareerPageContent'
import {
  buildCareerJsonLd,
  careerMetadata,
  getCareerPageData,
} from './career.data'

export const revalidate = 60

export const metadata = careerMetadata

export default async function CareerPage() {
  const entries = await getCareerPageData()

  return (
    <CareerPageContent
      entries={entries}
      careerJsonLd={buildCareerJsonLd(entries)}
    />
  )
}
