import { expect, userEvent, within } from 'storybook/test'

import { StorySurface } from '@/storybook/story-helpers'
import type { TocItem } from '@/utils/toc'
import { TableOfContents } from './table-of-contents'
import { TocNav } from './toc-item'

const mcpTocItems: TocItem[] = [
  { id: 'escopo', text: 'Escopo', level: 1 },
  { id: 'conceitos-de-mcp', text: 'Conceitos de MCP', level: 2 },
  { id: 'participantes', text: 'Participantes', level: 3 },
  { id: 'camadas', text: 'Camadas', level: 3 },
  { id: 'camada-de-dados', text: 'Camada de dados', level: 4 },
  { id: 'exemplo', text: 'Exemplo', level: 2 },
]

const meta = {
  title: 'Components/TableOfContents',
  component: TableOfContents,
  tags: ['autodocs', 'test'],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      disable: false,
    },
  },
}

export default meta

export const DesktopSidebar = {
  render: () => (
    <StorySurface surfaceTone="primary" className="min-h-screen p-6 lg:p-10">
      <div className="mx-auto grid max-w-5xl grid-cols-[240px_minmax(0,1fr)] gap-10">
        <TocNav
          items={mcpTocItems}
          activeId="participantes"
          onNavigate={() => undefined}
        />
        <article className="space-y-8 text-gray-300">
          <p>Conteúdo do post com hierarquia de seções para o índice.</p>
        </article>
      </div>
    </StorySurface>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Nesta página')).toBeInTheDocument()
    await expect(
      canvas.getByRole('button', { name: 'Participantes' }),
    ).toHaveClass('font-semibold')
  },
}

export const MobileDrawer = {
  globals: {
    viewport: {
      value: 'iphone12',
      isRotated: false,
    },
  },
  render: () => (
    <StorySurface surfaceTone="primary" className="min-h-screen p-4">
      <article id="post-content" className="space-y-6 pb-24 text-gray-300">
        <h1 id="escopo">Escopo</h1>
        <h2 id="conceitos-de-mcp">Conceitos de MCP</h2>
        <h2 id="participantes">Participantes</h2>
        <p>Conteúdo longo para testar o drawer mobile.</p>
      </article>
      <TableOfContents items={mcpTocItems} />
    </StorySurface>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole('button', { name: /Nesta página/i })

    await userEvent.click(toggle)

    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(
      canvas.getByRole('button', { name: 'Camadas' }),
    ).toBeInTheDocument()
  },
}
