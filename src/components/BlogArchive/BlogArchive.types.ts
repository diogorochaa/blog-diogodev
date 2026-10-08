import type { BreadcrumbItem } from '@/components/Breadcrumbs'
import type { PaginationProps } from '@/components/Pagination/Pagination.types'
import type { ArchiveTag, StagedPost } from '@/lib/blog'

export type BlogArchiveProps = {
  title: string
  label: string
  description: string
  breadcrumbs: BreadcrumbItem[]
  posts: StagedPost[]
  tags: ArchiveTag[]
  activeTagSlug?: string
  pagination?: PaginationProps
}
