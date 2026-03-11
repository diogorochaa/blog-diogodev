import { SliceSimulatorParams } from '@prismicio/next'

import { SliceSimulatorPageContent } from './SliceSimulatorPageContent'
import { getSliceSimulatorSlices } from './slice-simulator.data'

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const { state } = await searchParams
  const slices = getSliceSimulatorSlices(state)

  return <SliceSimulatorPageContent slices={slices} />
}
