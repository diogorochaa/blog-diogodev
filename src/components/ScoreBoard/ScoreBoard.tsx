import type { ScoreBoardProps } from './ScoreBoard.types'

export const ScoreBoard = ({ items, className = '' }: ScoreBoardProps) => {
  return (
    <dl
      className={[
        'grid grid-cols-2 gap-[2px] border-2 border-line bg-line sm:grid-cols-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map((item, index) => (
        <div
          key={item.label}
          className="flex flex-col-reverse items-center gap-3 bg-bg px-3 py-5 text-center"
        >
          <dt className="pixel-label text-[9px] text-muted">{item.label}</dt>
          <dd
            className="score-pop font-pixel text-2xl text-score sm:text-3xl"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
