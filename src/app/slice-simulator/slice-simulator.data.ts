import { getSlices } from '@prismicio/next'

export const getSliceSimulatorSlices = (state: string | undefined) => {
  return getSlices(state)
}
