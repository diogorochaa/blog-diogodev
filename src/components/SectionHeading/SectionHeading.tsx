import type { SectionHeadingProps } from './SectionHeading.types'

export const SectionHeading = ({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) => {
  return (
    <div className="mb-6 flex flex-col gap-2 sm:mb-8">
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-cyan">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-gradient-vivid font-display text-2xl font-bold sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm text-gray-400 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
