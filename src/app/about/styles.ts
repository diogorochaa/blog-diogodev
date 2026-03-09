import tw from 'tailwind-styled-components'

export const Container = tw.div`
  flex
  flex-col
  gap-12
  max-w-7xl
  mx-auto
  animate-soft-in
`

export const Header = tw.div`
  flex
  flex-col
  items-center
  text-center
  gap-4
  mb-8
  animate-slide-up
`

export const Badge = tw.div`
  text-6xl
  md:text-7xl
  animate-float-slow
`

export const Title = tw.h1`
  text-4xl
  md:text-5xl
  font-bold
  text-transparent
  bg-clip-text
  bg-gradient-to-r
  from-accent-purple
  via-accent-cyan
  to-accent-pink
  animate-slide-up
`

export const IntroSection = tw.div`
  flex
  flex-col
  gap-6
  bg-gradient-to-br
  from-secondary/50
  to-secondary/30
  backdrop-blur-sm
  rounded-2xl
  p-8
  border
  border-accent-purple/20
  animate-slide-up
`

export const Greeting = tw.h2`
  text-3xl
  md:text-4xl
  font-bold
  text-white
`

export const Description = tw.p`
  text-lg
  md:text-xl
  text-gray-300
  leading-relaxed
`

export const StatsContainer = tw.div`
  grid
  grid-cols-2
  gap-4
  mt-4
`

export const StatCard = tw.div`
  flex
  flex-col
  items-center
  gap-2
  bg-gradient-to-br
  from-accent-purple/20
  to-accent-blue/20
  rounded-xl
  p-6
  border
  border-accent-purple/30
  hover:border-accent-cyan/55
  transition-all
  duration-300
  hover:scale-105
`

export const StatNumber = tw.div`
  text-3xl
  md:text-4xl
  font-bold
  text-accent-cyan
`

export const StatLabel = tw.div`
  text-sm
  md:text-base
  text-gray-400
  uppercase
  tracking-wider
`

export const ProjectsSection = tw.div`
  flex
  flex-col
  gap-8
  animate-slide-up
`

export const SectionTitle = tw.h2`
  text-3xl
  md:text-4xl
  font-bold
  text-white
  flex
  items-center
  gap-3
`

export const ProjectsGrid = tw.div`
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-6
`

export const ProjectCard = tw.a`
  flex
  flex-col
  gap-4
  bg-gradient-to-br
  from-secondary/80
  to-secondary/60
  backdrop-blur-sm
  rounded-xl
  p-6
  border
  border-accent-purple/20
  hover:border-accent-cyan/55
  transition-all
  duration-300
  hover:scale-105
  hover:shadow-glow-cyan
  cursor-pointer
  group
`

export const ProjectHeader = tw.div`
  flex
  items-center
  gap-3
`

export const ProjectIcon = tw.div`
  text-3xl
  group-hover:scale-110
  transition-transform
  duration-300
`

export const ProjectName = tw.h3`
  text-xl
  font-bold
  text-white
  group-hover:text-accent-cyan
  transition-colors
  duration-300
  truncate
`

export const ProjectDescription = tw.p`
  text-gray-400
  text-sm
  line-clamp-2
  flex-grow
`

export const ProjectFooter = tw.div`
  flex
  items-center
  justify-between
  pt-4
  border-t
  border-accent-purple/20
`

export const ProjectLanguage = tw.div`
  flex
  items-center
  gap-2
  text-sm
  text-gray-400
`

export const LanguageDot = tw.div`
  w-3
  h-3
  rounded-full
  bg-accent-cyan
`

export const ProjectStats = tw.div`
  flex
  items-center
  gap-4
  text-sm
  text-gray-400
`

export const ProjectStat = tw.div`
  flex
  items-center
  gap-1
`
