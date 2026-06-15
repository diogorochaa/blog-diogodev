export type TocItem = {
  id: string
  text: string
  level: number
}

export type PreparedRichText = {
  headingIdsInOrder: string[]
  bodyTocItems: TocItem[]
}
