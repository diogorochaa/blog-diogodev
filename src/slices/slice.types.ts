import type { RichTextField } from '@prismicio/client'

export type SliceItem = Record<string, unknown>

export type PrismicSlice = {
  id?: string
  slice_type: string
  slice_label?: string | null
  primary?: Record<string, unknown>
  items?: SliceItem[]
}

export const getTextField = (
  primary: Record<string, unknown> | undefined,
  field: string,
  fallback = '',
) => {
  const value = primary?.[field]

  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export const getNumberField = (
  primary: Record<string, unknown> | undefined,
  field: string,
  fallback: number,
) => {
  const value = primary?.[field]
  const numberValue = typeof value === 'number' ? value : Number(value)

  return Number.isFinite(numberValue) ? numberValue : fallback
}

export const getBooleanField = (
  primary: Record<string, unknown> | undefined,
  field: string,
  fallback = false,
) => {
  const value = primary?.[field]

  return typeof value === 'boolean' ? value : fallback
}

export const getRichTextField = (
  primary: Record<string, unknown> | undefined,
  field: string,
): RichTextField | undefined => {
  const value = primary?.[field]

  return Array.isArray(value) && value.length > 0
    ? (value as RichTextField)
    : undefined
}

export const getItems = (slice: PrismicSlice) => {
  return Array.isArray(slice.items) ? slice.items : []
}
