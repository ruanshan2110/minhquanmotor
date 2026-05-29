import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        md: '24px',
      },
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        canvas: 'var(--canvas)',
        surface: {
          soft: 'var(--surface-soft)',
          card: 'var(--surface-card)',
          elevated: 'var(--surface-elevated)',
        },
        carbon: 'var(--carbon-gray)',
        hairline: {
          DEFAULT: 'var(--hairline)',
          strong: 'var(--hairline-strong)',
        },
        ink: 'var(--ink)',
        body: {
          DEFAULT: 'var(--body)',
          strong: 'var(--body-strong)',
        },
        muted: 'var(--muted)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          light: 'var(--accent-light)',
          glow: 'var(--accent-glow)',
        },
        m: {
          'blue-light': 'var(--m-blue-light)',
          'blue-dark': 'var(--m-blue-dark)',
          red: 'var(--m-red)',
        },
      },
      fontFamily: {
        display: ['var(--font-inter)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        tightBody: '-0.01em',
        label: '0.15em',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out-premium': 'var(--ease-in-out)',
        spring: 'var(--ease-spring)',
      },
      spacing: {
        section: 'var(--section-y)',
      },
    },
  },
  plugins: [],
}

export default config
