import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function svgSpritesPlugin() {
  return {
    name: 'svg-sprites-plugin',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        try {
          const spritePath = resolve(__dirname, '../public/sprites.svg')
          const spriteContent = readFileSync(spritePath, 'utf-8')

          const cleanSprite = spriteContent.replace(/<\?xml[^>]*>/g, '')

          return html.replace(
            '<body>',
            `<body>\n    <div style="position: absolute; width: 0; height: 0; overflow: hidden;">\n      ${cleanSprite}\n    </div>`
          )
        } catch (error) {
          console.warn('Could not load sprites.svg:', error.message)
          return html
        }
      }
    }
  }
}
