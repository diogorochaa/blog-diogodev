import { SliceSimulator } from '@prismicio/next'
import { SliceZone } from '@prismicio/react'

import { components } from '../../slices'

import { SliceSimulatorPageContentProps } from './slice-simulator.types'

export const SliceSimulatorPageContent = ({
  slices,
}: SliceSimulatorPageContentProps) => {
  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  )
}
