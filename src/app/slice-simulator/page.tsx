import {
  getSlices,
  SliceSimulator,
  type SliceSimulatorParams,
} from '@slicemachine/adapter-next/simulator'

import { SliceRenderer } from '@/components/SliceRenderer'
import type { PrismicSlice } from '@/slices/slice.types'

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const { state } = await searchParams
  const slices = getSlices(state) as PrismicSlice[]
  const renderedSlices = await SliceRenderer({ slices })

  return (
    <SliceSimulator background="#05050a">
      <main className="mx-auto w-full max-w-5xl px-4 py-10 text-gray-100 sm:px-6">
        {renderedSlices}
      </main>
    </SliceSimulator>
  )
}
