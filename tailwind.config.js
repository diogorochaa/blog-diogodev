/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /^grid-cols-/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^gap-/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^bg-/,
      variants: ['blue', 'red', 'green'],
    },
    {
      pattern: /^text-/,
      variants: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-manrope)', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-sora)', 'ui-sans-serif', 'system-ui'],
        permanent: ['Permanent Marker', 'cursive'],
        foldit: ['Foldit', 'cursive'],
      },
      colors: {
        primary: '#0a0a0f',
        secondary: '#1a1a2e',
        accent: {
          cyan: '#22d3ee',
          purple: '#8b5cf6',
          blue: '#3b82f6',
          pink: '#ec4899',
        },
        link: '#22d3ee',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
        'gradient-card':
          'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.35)',
      },
    },
  },
  plugins: [],
}
