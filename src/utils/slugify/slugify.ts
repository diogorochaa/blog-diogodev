export const slugify = (text: string) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export const createUniqueSlug = (text: string, used: Map<string, number>) => {
  const base = slugify(text) || 'section'
  const count = used.get(base) ?? 0
  used.set(base, count + 1)

  if (count === 0) {
    return base
  }

  return `${base}-${count + 1}`
}
