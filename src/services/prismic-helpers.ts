import * as prismic from '@prismicio/client'

export const asString = (value: unknown, fallback: string) => {
  if (typeof value !== 'string') {
    return fallback
  }

  const text = value.trim()
  return text || fallback
}

export const asOptionalString = (value: unknown) => asString(value, '')

export const asRichTextString = (
  value: prismic.RichTextField | string | undefined,
  fallback: string,
) => {
  if (typeof value === 'string') {
    return asString(value, fallback)
  }

  if (!value?.length) {
    return fallback
  }

  return prismic.asText(value).trim() || fallback
}

export const asNumber = (value: unknown, fallback: number) => {
  const numberValue = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(numberValue) ? numberValue : fallback
}

export const asOptionalNumber = (value: unknown) => {
  if (value === null || value === undefined || value === '') {
    return null
  }

  const numberValue = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(numberValue) ? numberValue : null
}

export const asPositiveInteger = (value: unknown, fallback: number) => {
  return Math.max(1, Math.trunc(asNumber(value, fallback)))
}

export const asBoolean = (value: unknown, fallback = false) => {
  return typeof value === 'boolean' ? value : fallback
}

export const asRichText = (value: unknown): prismic.RichTextField => {
  return Array.isArray(value) ? (value as prismic.RichTextField) : []
}

export const asImage = (value: unknown): prismic.ImageField => {
  return prismic.isFilled.image(value as prismic.ImageField)
    ? (value as prismic.ImageField)
    : {}
}

const asLinkUrl = (value: unknown) => {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (!value || typeof value !== 'object') {
    return ''
  }

  return prismic.asLink(value as prismic.LinkField) ?? ''
}

export const asHttpUrl = (value: unknown) => {
  const url = asLinkUrl(value)
  return /^https?:\/\//i.test(url) ? url : ''
}

export const asGroup = (value: unknown): Record<string, unknown>[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter(
    (item): item is Record<string, unknown> =>
      Boolean(item) && typeof item === 'object',
  )
}

export const asStringList = (value: unknown, field: string) => {
  return asGroup(value)
    .map((item) => asOptionalString(item[field]))
    .filter(Boolean)
}

export const asOneOf = <T extends string>(
  value: unknown,
  options: readonly T[],
  fallback: T,
): T => {
  return typeof value === 'string' && options.includes(value as T)
    ? (value as T)
    : fallback
}

export const asDateString = (value: unknown) => {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)
    ? value.slice(0, 10)
    : ''
}
