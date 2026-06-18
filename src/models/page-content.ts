import type { PrismicSlice } from '@/slices/slice.types'

export type PageContent = {
  uid: string
  title: string
  description: string
  showInHeader: boolean
  navLabel: string
  navOrder: number
  showInFooter: boolean
  footerLabel: string
  footerOrder: number
  slices: PrismicSlice[]
}
