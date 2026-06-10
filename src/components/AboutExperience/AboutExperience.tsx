'use client'

import {
  Atom,
  BracketsCurly,
  Cube,
  FileCss,
  FileHtml,
  FileJs,
  TerminalWindow,
} from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'framer-motion'
import { type ReactNode, useEffect, useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ExperienceIconKey } from '@/config/experience'
import { experienceEntries } from '@/config/experience'
import { formatYears, getCurrentYear, getYearsSince } from '@/utils'

import type { Category, ExperienceItem } from './AboutExperience.types'

const CATEGORY_COLORS: Record<Category, string> = {
  frontend: '#22d3ee',
  backend: '#8b5cf6',
}

const chartTooltipStyle = {
  contentStyle: {
    background: '#0f172a',
    borderRadius: '12px',
  },
  labelStyle: { color: '#f8fafc', fontWeight: 600 },
  itemStyle: { color: '#e2e8f0' },
} as const

const experienceIcons: Record<ExperienceIconKey, (color: string) => ReactNode> =
  {
    javascript: (color) => <FileJs size={24} weight="duotone" color={color} />,
    css: (color) => <FileCss size={24} weight="duotone" color={color} />,
    html: (color) => <FileHtml size={24} weight="duotone" color={color} />,
    react: (color) => <Atom size={24} weight="duotone" color={color} />,
    nextjs: (color) => (
      <BracketsCurly size={24} weight="duotone" color={color} />
    ),
    nodejs: (color) => (
      <TerminalWindow size={24} weight="duotone" color={color} />
    ),
    docker: (color) => <Cube size={24} weight="duotone" color={color} />,
  }

export const AboutExperience = () => {
  const prefersReducedMotion = useReducedMotion()
  const [canRenderCharts, setCanRenderCharts] = useState(false)
  const currentYear = getCurrentYear()

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      setCanRenderCharts(typeof window.ResizeObserver !== 'undefined')
    })

    return () => {
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  const experience = useMemo<ExperienceItem[]>(() => {
    return experienceEntries.map((item) => ({
      ...item,
      icon: experienceIcons[item.iconKey](item.color),
      years: getYearsSince(item.startYear, currentYear),
    }))
  }, [currentYear])

  const totalYears = useMemo(
    () => experience.reduce((acc, item) => acc + item.years, 0),
    [experience],
  )

  const categoryData = useMemo(() => {
    const groups: Record<Category, ExperienceItem[]> = {
      frontend: experience.filter((e) => e.category === 'frontend'),
      backend: experience.filter((e) => e.category === 'backend'),
    }
    return (Object.entries(groups) as [Category, ExperienceItem[]][]).map(
      ([cat, items]) => ({
        name: cat === 'frontend' ? 'Frontend' : 'Backend',
        total: items.reduce((s, e) => s + e.years, 0),
        media: Math.round(
          items.reduce((s, e) => s + e.years, 0) / items.length,
        ),
        tecnologias: items.length,
        color: CATEGORY_COLORS[cat],
      }),
    )
  }, [experience])

  return (
    <section className="animate-slide-up rounded-2xl border border-accent-purple/20 bg-linear-to-br from-secondary/50 to-secondary/30 p-5 backdrop-blur-sm sm:p-8">
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Experiência Técnica
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-300 sm:text-base">
              Linha do tempo das tecnologias com mais vivência prática no dia a
              dia.
            </p>
          </div>

          <div className="rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-2 text-sm text-accent-cyan">
            {formatYears(totalYears)} somados de experiência
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {experience.map((item, index) => {
            return (
              <motion.div
                key={item.name}
                className="rounded-xl border border-accent-purple/20 bg-primary/45 p-4"
                initial={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, y: 12, scale: 0.98 }
                }
                whileInView={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 1, y: 0, scale: 1 }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: 0.05 + index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <p className="font-semibold text-white">{item.name}</p>
                </div>

                <p className="mt-3 text-2xl font-bold text-accent-cyan">
                  {formatYears(item.years)}
                </p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={prefersReducedMotion ? undefined : { width: 0 }}
                    whileInView={
                      prefersReducedMotion
                        ? undefined
                        : {
                            width: `${Math.min((item.years / 15) * 100, 100)}%`,
                          }
                    }
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.08 + index * 0.05 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <motion.div
            className="rounded-xl border border-accent-purple/20 bg-primary/45 p-4"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <p className="mb-4 text-sm uppercase tracking-wide text-gray-400">
              Panorama por anos
            </p>

            <div className="h-80 w-full">
              {canRenderCharts ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={experience}
                    margin={{ top: 8, right: 12, left: -20, bottom: 8 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#334155"
                      opacity={0.3}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#cbd5e1', fontSize: 12 }}
                    />
                    <YAxis
                      tick={{ fill: '#cbd5e1', fontSize: 12 }}
                      domain={[0, 15]}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(148, 163, 184, 0.12)' }}
                      contentStyle={{
                        ...chartTooltipStyle.contentStyle,
                        border: '1px solid rgba(34, 211, 238, 0.35)',
                      }}
                      labelStyle={chartTooltipStyle.labelStyle}
                      itemStyle={chartTooltipStyle.itemStyle}
                      formatter={(value) => [
                        formatYears(Number(value)),
                        'Experiência',
                      ]}
                    />
                    <Bar
                      dataKey="years"
                      radius={[8, 8, 0, 0]}
                      fill="#22d3ee"
                      animationDuration={900}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full flex-col justify-center gap-3">
                  {experience.map((item) => (
                    <div
                      className="h-7 overflow-hidden rounded-full bg-secondary"
                      key={item.name}
                    >
                      <div
                        className="flex h-full items-center px-3 text-xs font-medium text-primary"
                        style={{
                          width: `${Math.min((item.years / 15) * 100, 100)}%`,
                          backgroundColor: item.color,
                        }}
                      >
                        {item.name} · {formatYears(item.years)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl border border-accent-purple/20 bg-primary/45 p-4"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.14 }}
          >
            <p className="mb-1 text-sm uppercase tracking-wide text-gray-400">
              Frontend vs Backend
            </p>

            <div className="mb-4 flex gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-cyan" />
                Frontend
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-purple" />
                Backend
              </span>
            </div>

            <div className="h-72 w-full">
              {canRenderCharts ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={experience}
                    margin={{ top: 8, right: 12, left: -20, bottom: 8 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#334155"
                      opacity={0.25}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#cbd5e1', fontSize: 12 }}
                    />
                    <YAxis
                      tick={{ fill: '#cbd5e1', fontSize: 12 }}
                      domain={[0, 15]}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(148, 163, 184, 0.12)' }}
                      contentStyle={{
                        ...chartTooltipStyle.contentStyle,
                        border: '1px solid rgba(139, 92, 246, 0.35)',
                      }}
                      labelStyle={chartTooltipStyle.labelStyle}
                      itemStyle={chartTooltipStyle.itemStyle}
                      formatter={(value, _name, props) => [
                        formatYears(Number(value)),
                        props.payload?.category === 'frontend'
                          ? 'Frontend'
                          : 'Backend',
                      ]}
                    />
                    <Bar
                      dataKey="years"
                      radius={[8, 8, 0, 0]}
                      animationDuration={950}
                    >
                      {experience.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={CATEGORY_COLORS[entry.category]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full flex-col justify-center gap-4">
                  {categoryData.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center justify-between rounded-lg border border-accent-purple/25 bg-secondary/50 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-block h-3 w-3 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="font-semibold text-white">
                          {cat.name}
                        </span>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-bold text-white">
                          {formatYears(cat.total)} total
                        </p>
                        <p className="text-gray-400">
                          ~{formatYears(cat.media)} de média
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
