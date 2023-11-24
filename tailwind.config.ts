import type { Config } from 'tailwindcss'

const config: Config = {
  // prefix: 'tw-',
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /(lb|dot)-(paid|pending|draft)/
    },
    '-translate-x-full',
    'translate-x-0'
  ],
  theme: {
    extend: {},
    fontFamily: {
      normal: ['Spartan-Medium', 'san-serif'],
      heading: ['Spartan-Bold', 'san-serif']
    }
  },
  plugins: [],
}
export default config
