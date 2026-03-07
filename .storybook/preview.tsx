import type { Preview } from '@storybook/nextjs-vite'
import { Poppins, Space_Grotesk, Inter, Inter_Tight } from 'next/font/google'
import '../app/globals.css'
import React from 'react'

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk'
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter-tight'
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter-family'
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      test: 'todo'
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/'
      }
    }
  },
  decorators: [
    (Story) => (
      <div
        className={`${poppins.variable} ${spaceGrotesk.variable} ${interTight.variable} ${inter.variable} min-h-screen`}
      >
        <Story />
      </div>
    )
  ]
}

export default preview
