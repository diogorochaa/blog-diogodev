import { rootHtmlClassName, rootMetadata } from './layout.constants'
import { RootLayoutContent } from './RootLayoutContent'

import '../../styles/globals.css'

export const metadata = rootMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootLayoutContent htmlClassName={rootHtmlClassName}>
      {children}
    </RootLayoutContent>
  )
}
