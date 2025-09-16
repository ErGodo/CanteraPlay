import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// If NEXT_PUBLIC_SANITY_PROJECT_ID is not set in the environment (for example in
// some Studio runs or during certain build steps), avoid creating a client with
// an empty projectId because that can cause a module evaluation error.
// Fall back to the project's `src/sanity.ts` client which contains a sensible
// default (projectId/dataset) used elsewhere in the repo.
let sanityClient: ReturnType<typeof createClient> | unknown
if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
  })
} else {
  // Lazy import to keep module evaluation stable
  // Note: this resolves to `src/sanity.ts` which already exports a configured client
  // with a hard-coded projectId used for local/dev environment. Use a require-style
  // import here because the module shape may be CJS/ESM depending on the toolchain.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fallback = require('../sanity') as unknown as { default?: ReturnType<typeof createClient>; sanityClient?: ReturnType<typeof createClient> }
  sanityClient = fallback?.sanityClient || fallback?.default || fallback
}

// imageUrlBuilder expects a Sanity client-like object; at runtime we always
// provide one, but the file-level `sanityClient` can be `unknown` during builds
// when env vars aren't present. Narrow the type here with a safe cast so the
// TypeScript compiler understands the runtime shape while preserving the
// original fallback behavior.
const builder = imageUrlBuilder(sanityClient as ReturnType<typeof createClient>)

export function buildImageUrl(imageObj: SanityImageSource | null | undefined, w?: number, h?: number) {
  if (!imageObj) return null
  let img = builder.image(imageObj as SanityImageSource)
  if (w) img = img.width(w)
  if (h) img = img.height(h)

  // If the image has hotspot, let the URL builder handle focal point crop
  // hotspot may live on the image object or inside asset.metadata.hotspot
  const maybeHs = (imageObj as unknown as { hotspot?: { x?: number; y?: number } } )?.hotspot
    || (imageObj as unknown as { asset?: { metadata?: { hotspot?: { x?: number; y?: number } } } })?.asset?.metadata?.hotspot
  if (maybeHs && typeof maybeHs.x === 'number' && typeof maybeHs.y === 'number') {
    // Sanity image-url supports focal point via `focalPoint` (x,y normalized 0..1)
    img = img.focalPoint(maybeHs.x, maybeHs.y).fit('crop')
  }

  return img.url()
}

export function getObjectPosition(x?: number, y?: number) {
  const X = typeof x === 'number' ? Math.max(0, Math.min(100, x)) : 50
  const Y = typeof y === 'number' ? Math.max(0, Math.min(100, y)) : 50
  return `${X}% ${Y}%`
}

// Export with a typed signature so callers expecting a configured client get
// proper types while still allowing this module to be imported in environments
// where the env vars are missing (Studio/build tooling).
export default sanityClient as ReturnType<typeof createClient>
