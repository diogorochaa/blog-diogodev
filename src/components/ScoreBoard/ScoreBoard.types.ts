export type ScoreBoardItem = {
  label: string
  value: number | string
}

export type ScoreBoardProps = {
  items: ScoreBoardItem[]
  className?: string
}
