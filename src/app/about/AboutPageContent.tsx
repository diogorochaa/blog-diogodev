import Image from 'next/image'
import NextLink from 'next/link'

import { AboutExperience } from '@/components/AboutExperience'
import { JsonLd } from '@/components/JsonLd'

import type { AboutPageContentProps } from './about.types'

export const AboutPageContent = ({
  personJsonLd,
  avatarUrl,
  publicRepos,
  followers,
  repos,
}: AboutPageContentProps) => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:gap-12">
      <JsonLd data={personJsonLd} />

      <div className="mb-5 flex flex-col items-center gap-3 text-center sm:mb-8 sm:gap-4">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Foto de perfil do Diogo Rocha"
            width={112}
            height={112}
            className="h-28 w-28 rounded-full border-2 border-accent-cyan/40 object-cover"
          />
        ) : (
          <div className="text-6xl md:text-7xl">👨‍💻</div>
        )}
        <h1 className="bg-linear-to-r from-accent-purple via-accent-cyan to-accent-pink bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
          Sobre mim
        </h1>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-accent-purple/20 bg-linear-to-br from-secondary/50 to-secondary/30 p-5 backdrop-blur-sm sm:gap-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Olá, Dev! 👋
        </h2>

        <p className="text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
          É um prazer te receber no meu blog!
          <br />
          Espero que meus artigos possam te ajudar de alguma forma. Se você
          tiver alguma sugestão, me envie uma mensagem!
        </p>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
          <div className="flex flex-col items-center gap-2 rounded-xl border border-accent-purple/30 bg-linear-to-br from-accent-purple/20 to-accent-blue/20 p-6 transition-all duration-300 hover:scale-105 hover:border-accent-cyan/55">
            <div className="text-3xl font-bold text-accent-cyan md:text-4xl">
              {publicRepos}
            </div>
            <div className="text-sm uppercase tracking-wider text-gray-400 md:text-base">
              Repositórios
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-xl border border-accent-purple/30 bg-linear-to-br from-accent-purple/20 to-accent-blue/20 p-6 transition-all duration-300 hover:scale-105 hover:border-accent-cyan/55">
            <div className="text-3xl font-bold text-accent-cyan md:text-4xl">
              {followers}
            </div>
            <div className="text-sm uppercase tracking-wider text-gray-400 md:text-base">
              Seguidores
            </div>
          </div>
        </div>
      </div>

      <AboutExperience />

      <div className="flex flex-col gap-8">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          <span className="text-accent-cyan">🚀</span> Projetos em Destaque
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <a
              key={repo.id}
              className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-accent-purple/20 bg-linear-to-br from-secondary/80 to-secondary/60 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-accent-cyan/55 hover:shadow-glow-cyan"
              href={repo.html_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
                  📦
                </div>
                <h3 className="truncate text-xl font-bold text-white transition-colors duration-300 group-hover:text-accent-cyan">
                  {repo.name}
                </h3>
              </div>

              <p className="line-clamp-2 grow text-sm text-gray-400">
                {repo.description || 'Sem descrição disponível'}
              </p>

              <div className="flex items-center justify-between border-t border-accent-purple/20 pt-4">
                {repo.language ? (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-3 w-3 rounded-full bg-accent-cyan" />
                    {repo.language}
                  </div>
                ) : null}

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <span>⭐</span> {repo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🔀</span> {repo.forks_count}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {repos.length === 0 ? (
          <p className="text-center text-gray-400">
            Nenhum repositório disponível no momento.{' '}
            <NextLink
              href="https://github.com/diogorochaa"
              className="text-accent-cyan hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Visite meu GitHub
            </NextLink>
          </p>
        ) : null}
      </div>
    </div>
  )
}
