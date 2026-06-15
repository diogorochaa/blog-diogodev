import type { Metadata } from 'next'

export const notFoundMetadata: Metadata = {
  title: 'Página não encontrada',
  description: 'A página solicitada não existe ou foi removida.',
  robots: {
    index: false,
    follow: false,
  },
}

export const slugNotFoundMetadata: Metadata = {
  title: 'Post não encontrado',
  description: 'Este post não existe ou foi removido do blog.',
  robots: {
    index: false,
    follow: false,
  },
}
