import { getSlices } from '@prismicio/next'

export type SliceSimulatorPageContentProps = {
  slices: ReturnType<typeof getSlices>
}
