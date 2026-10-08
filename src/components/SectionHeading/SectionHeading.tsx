import type { SectionHeadingProps } from './SectionHeading.types'

export const SectionHeading = ({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8">
      {eyebrow ? (
        <span className="pixel-label text-accent">{eyebrow}</span>
      ) : null}
      <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm text-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
