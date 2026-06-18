import {
  AtomIcon,
  BracketsCurlyIcon,
  CloudIcon,
  CodeIcon,
  CubeIcon,
  DatabaseIcon,
  FileCssIcon,
  FileHtmlIcon,
  FileJsIcon,
  FileTsIcon,
  GitBranchIcon,
  TerminalWindowIcon,
} from '@phosphor-icons/react'

const iconMap = {
  javascript: FileJsIcon,
  typescript: FileTsIcon,
  css: FileCssIcon,
  html: FileHtmlIcon,
  react: AtomIcon,
  nextjs: BracketsCurlyIcon,
  nodejs: TerminalWindowIcon,
  docker: CubeIcon,
  database: DatabaseIcon,
  cloud: CloudIcon,
  git: GitBranchIcon,
  terminal: TerminalWindowIcon,
  code: CodeIcon,
} as const

export const renderIcon = (iconKey: unknown, color = '#22d3ee') => {
  const Icon =
    typeof iconKey === 'string' && iconKey in iconMap
      ? iconMap[iconKey as keyof typeof iconMap]
      : CodeIcon

  return <Icon size={24} weight="duotone" color={color} />
}
