import type { ProfileProps } from './Profile.types'

export const Profile = ({ items }: ProfileProps) => {
  return (
    <section className="panel-vivid relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34, 211, 238, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-accent-purple/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-8 bottom-0 h-36 w-36 rounded-full bg-accent-cyan/15 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <span className="rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-accent-cyan">
          Developer Blog
        </span>

        <h1 className="text-gradient-vivid max-w-3xl font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          {items.title}
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
          {items.subtitle}
        </p>
      </div>
    </section>
  )
}
