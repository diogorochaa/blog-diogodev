import { PixelButton } from '@/components/PixelButton'
import { PixelSprite } from '@/components/PixelSprite'

import type { GameOverProps } from './GameOver.types'

export const GameOver = ({
  code = '404',
  title,
  description,
  children,
}: GameOverProps) => {
  return (
    <main className="screen-enter flex flex-col items-center gap-10 py-10 sm:py-16">
      <div className="pixel-frame scanlines flex w-full max-w-2xl flex-col items-center gap-6 px-6 py-10 text-center sm:px-10">
        <PixelSprite name="goal" scale={6} />
        <p aria-hidden className="font-pixel text-2xl text-accent sm:text-4xl">
          Fim de jogo
        </p>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          {title}
        </h1>
        <p className="max-w-md text-base leading-relaxed text-muted">
          {description}
        </p>
        <p className="pixel-label text-[9px] text-muted">
          Erro <span className="text-score">{code}</span> · Continuar?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <PixelButton href="/">Voltar ao início</PixelButton>
          <PixelButton href="/blog" variant="secondary">
            Ir para o blog
          </PixelButton>
        </div>
      </div>
      {children}
    </main>
  )
}
