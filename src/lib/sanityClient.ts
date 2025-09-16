import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// If NEXT_PUBLIC_SANITY_PROJECT_ID is not set in the environment (for example in
// some Studio runs or during certain build steps), avoid creating a client with
// an empty projectId because that can cause a module evaluation error.
// Fall back to the project's `src/sanity.ts` client which contains a sensible
// default (projectId/dataset) used elsewhere in the repo.
let sanityClient
if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
  })
} else {
  // Lazy import to keep module evaluation stable
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // Note: this resolves to `src/sanity.ts` which already exports a configured client
  // with a hard-coded projectId used for local/dev environment.
  // Use require to avoid ESM/TS transform issues at top-level.
  // If `src/sanity.ts` is missing, this will still throw — but it will be more
  // explicit and only occur when the fallback is truly unavailable.
  // We cast to any because the imported module can be either ESM or CJS.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fallback = require('../sanity') as any
  sanityClient = fallback?.sanityClient || fallback?.default || fallback
}

const builder = imageUrlBuilder(sanityClient)

export function buildImageUrl(imageObj: any, w?: number, h?: number) {
  if (!imageObj) return null
  let img = builder.image(imageObj)
  if (w) img = img.width(w)
  if (h) img = img.height(h)

  // If the image has hotspot, let the URL builder handle focal point crop
  const hs = imageObj.hotspot || imageObj.asset?.metadata?.hotspot
  if (hs && typeof hs.x === 'number' && typeof hs.y === 'number') {
    // Sanity image-url supports focal point via `focalPoint` (x,y normalized 0..1)
    img = img.
      focalPoint(hs.x, hs.y)
      .fit('crop')
  }

  return img.url()
}

export function getObjectPosition(x?: number, y?: number) {
  const X = typeof x === 'number' ? Math.max(0, Math.min(100, x)) : 50
  const Y = typeof y === 'number' ? Math.max(0, Math.min(100, y)) : 50
  return `${X}% ${Y}%`
}

export default sanityClient
