export type PlayerStatProps = {
  label: string
  /** Text shown next to the label, e.g. "92" or "8 anos". */
  valueLabel: string
  /** Bar fill from 0 to 100. */
  percent: number
  /** Position in the list, used to stagger the entry animation. */
  index?: number
}
