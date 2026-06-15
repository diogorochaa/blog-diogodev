import type { RichTextField } from '@prismicio/client'

import { createUniqueSlug } from '@/utils/slugify'

import { extractTocFromRichText } from './extractTocFromRichText'
import type { TocItem } from './toc.types'

type BuildPostTocItemsParams = {
  title: string
  slug: string
  body: RichTextField
}

export const buildPostTocItems = ({
  title,
  slug,
  body,
}: BuildPostTocItemsParams) => {
  const usedSlugs = new Map<string, number>()
  const titleId = slug || createUniqueSlug(title, usedSlugs)

  if (!slug) {
    usedSlugs.set(titleId, 1)
  } else {
    usedSlugs.set(titleId, 1)
  }

  const titleItem: TocItem = {
    id: titleId,
    text: title,
    level: 1,
  }

  const { headingIdsInOrder, bodyTocItems } = extractTocFromRichText(
    body,
    usedSlugs,
  )

  const items = [titleItem, ...bodyTocItems]

  return {
    items,
    titleId,
    headingIdsInOrder,
  }
}
