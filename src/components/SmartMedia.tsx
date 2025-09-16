
"use client"
import { buildImageUrl, getObjectPosition } from '@/lib/sanityClient'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import NextImage from 'next/image'
import { useEffect, useRef, useState } from 'react'

type SmartImage = SanityImageSource & { focusX?: number; focusY?: number; poster?: SmartImage | null; alt?: string; asset?: { url?: string; metadata?: { lqip?: string } } | null }

type SmartMediaProps = {
  kind: 'image' | 'video'
  image?: SmartImage | null
  videoUrl?: string
  posterUrl?: string
  focusX?: number
  focusY?: number
  alt?: string
  aspect?: '1/1' | '4/5' | '16/9' | '9/16'
  responsiveHybrid?: boolean // mobile = portrait, desktop = landscape (cover)
  mobileAspect?: '1/1' | '4/5' | '16/9' | '9/16'
  desktopAspect?: '1/1' | '4/5' | '16/9' | '9/16'
  blurredBackground?: boolean
  className?: string
  rounded?: string
  priority?: boolean
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
  verticalMode?: 'fit' | 'native'
}

export default function SmartMedia(props: SmartMediaProps) {
  const {
    kind,
    image,
    videoUrl,
    posterUrl,
    focusX,
    focusY,
    alt,
    aspect = '16/9',
  className = '',
  rounded,
  priority,
  autoPlay,
  muted = true,
  loop = true,
  playsInline = true,
  responsiveHybrid = false,
  mobileAspect,
  desktopAspect,
  blurredBackground = true,
  verticalMode = 'fit',
  } = props

  const pos = getObjectPosition(focusX ?? image?.focusX, focusY ?? image?.focusY)
  const [autoPos, setAutoPos] = useState<string | null>(null)
  const [videoSize, setVideoSize] = useState<{ w: number; h: number } | null>(null)
  const mountedRef = useRef(true)
  // face-api will be lazy-imported on the client inside the effect to avoid
  // server-side TextEncoder / crypto issues during module evaluation.
  const faceapiRef = useRef<unknown | null>(null)

  useEffect(() => {
    mountedRef.current = true

    // Client-only, lazy import of face-api to avoid server/runtime issues.
    // `faceapi` (outer variable) will be set if import succeeds.
      // Minimal typings for the parts of face-api we call
      type FaceApiShape = {
        nets?: {
          ssdMobilenetv1?: { loadFromUri: (uri: string) => Promise<void> }
        }
        detectSingleFace?: (img: HTMLImageElement) => Promise<{ box: { x: number; y: number; width: number; height: number } } | null>
      }

      async function ensureFaceApi() {
        if (typeof window === 'undefined') return null
        // Some server-like or restricted runtimes lack TextEncoder; bail out early
        // to prevent `this.util.TextEncoder is not a constructor` errors.
        if (typeof TextEncoder === 'undefined') return null
        if (faceapiRef.current) return faceapiRef.current
        try {
          const mod = await import('@vladmandic/face-api')
          faceapiRef.current = mod as unknown as FaceApiShape
          // load models from public/models (typed above)
          await (faceapiRef.current as FaceApiShape).nets?.ssdMobilenetv1?.loadFromUri('/models')
          return faceapiRef.current
        } catch {
          // loading failed; disable auto-detect
          faceapiRef.current = null
          return null
        }
      }

    async function detectFromImageUrl(url?: string) {
      if (!url) return null
      try {
        const img = document.createElement('img') as HTMLImageElement
        img.crossOrigin = 'anonymous'
        img.src = url
        await new Promise<void>((res, rej) => {
          img.onload = () => res()
          img.onerror = () => rej()
        })
  const api = await ensureFaceApi()
  if (!api) return null
  const apiTyped = api as unknown as FaceApiShape
  const detection = apiTyped.detectSingleFace ? await apiTyped.detectSingleFace(img as HTMLImageElement) : null
        if (detection && mountedRef.current) {
          const box = detection.box
          const cx = (box.x + box.width / 2) / img.width
          const cy = (box.y + box.height / 2) / img.height
          return `${Math.round(cx * 100)}% ${Math.round(cy * 100)}%`
        }
      } catch {
        // ignore
      }
      return null
    }

    async function detectFromVideoFirstFrame(url?: string) {
      if (!url) return null
      try {
        const v = document.createElement('video')
        v.crossOrigin = 'anonymous'
        v.src = url
        // try to load metadata
        await new Promise<void>((res) => {
          v.onloadedmetadata = () => res()
          // fallback in case metadata doesn't fire
          setTimeout(() => res(), 1500)
        })
        // seek to 0 and draw frame
        v.currentTime = 0
        await new Promise<void>((res) => setTimeout(() => res(), 200))
        const canvas = document.createElement('canvas')
        canvas.width = v.videoWidth || 640
        canvas.height = v.videoHeight || 360
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(v, 0, 0, canvas.width, canvas.height)
        const dataUrl = canvas.toDataURL()
        return await detectFromImageUrl(dataUrl)
      } catch {
        return null
      }
    }

    (async () => {
      // only run for media types where auto-detect is useful
      if (kind !== 'image' && kind !== 'video') return
      // try poster first (if provided)
      const posterCandidate = posterUrl ?? (image ? buildImageUrl(image) : undefined)
      // posterCandidate may be string | null | undefined; detectFromImageUrl accepts string | undefined
      let detected = await detectFromImageUrl(posterCandidate ?? undefined)
      if (!detected && kind === 'video' && videoUrl) {
        detected = await detectFromVideoFirstFrame(videoUrl)
      }
      if (detected && mountedRef.current) {
        setAutoPos(detected)
      }
    })()

    return () => {
      mountedRef.current = false
    }
  }, [kind, posterUrl, image, videoUrl])

  // detect intrinsic video size to determine portrait vs landscape
  useEffect(() => {
    let v: HTMLVideoElement | null = null
    let cancelled = false
    async function loadMeta() {
      if (kind !== 'video' || !videoUrl) return
      try {
        v = document.createElement('video')
        v.crossOrigin = 'anonymous'
        v.src = videoUrl
        await new Promise<void>((res) => {
          v!.onloadedmetadata = () => res()
          setTimeout(() => res(), 1500)
        })
        if (!cancelled && v) {
          const w = v.videoWidth || 0
          const h = v.videoHeight || 0
          if (w && h) setVideoSize({ w, h })
        }
      } catch (err) {
        // ignore
      }
    }
    loadMeta()
    return () => {
      cancelled = true
      if (v) v.src = ''
    }
  }, [kind, videoUrl])

  const mapAspect = (a?: '1/1' | '4/5' | '16/9' | '9/16'): string | undefined => {
    const aspectMap: { [key in '1/1' | '4/5' | '16/9' | '9/16']: string } = {
      '1/1': 'aspect-square',
      '4/5': "aspect-[4/5]",
      '16/9': 'aspect-video',
      '9/16': "aspect-[9/16]",
    }
    return a ? aspectMap[a] : undefined
  }

  const mobileA = mobileAspect ?? aspect
  const desktopA = desktopAspect ?? aspect
  const aspectClass = responsiveHybrid
    ? `${mapAspect(mobileA)} md:${mapAspect(desktopA)}`
    : mapAspect(aspect)

  const isPortrait = videoSize ? videoSize.h > videoSize.w : null

  if (kind === 'image') {
    const src = buildImageUrl(image || image?.asset || null)
    const finalPos = autoPos ?? pos
    const posterSrc = posterUrl ?? buildImageUrl(image || image?.asset || null)
    return (
      <div className={`w-full ${aspectClass} relative overflow-hidden ${rounded ?? ''} ${className}`} style={{ background: '#000' }}>
        {responsiveHybrid && blurredBackground && posterSrc ? (
          <NextImage src={posterSrc} alt="" fill className="absolute inset-0 -z-10 w-full h-full object-cover filter blur-2xl scale-105 opacity-30" />
        ) : null}
        {src ? (
          <NextImage
            src={src}
            alt={alt ?? image?.alt ?? ''}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: finalPos }}
            priority={priority}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gray-200 ${rounded ?? ''}`}>
            <span className="text-sm text-gray-600">No image</span>
          </div>
        )}
      </div>
    )
  }

  // video
  const posterSrc = posterUrl ?? buildImageUrl(props.image?.poster || props.image)
  const finalPos = autoPos ?? pos
  // If the video is portrait, handle according to verticalMode
  if (isPortrait) {
    if (verticalMode === 'native' && videoSize) {
      // Render container matching the video's native aspect ratio and show video contained
      const ratioStyle: React.CSSProperties = { aspectRatio: `${videoSize.w} / ${videoSize.h}` }
      return (
        <div className={`w-full relative overflow-hidden ${rounded ?? ''} ${className}`} style={{ background: '#000', ...ratioStyle }}>
          {responsiveHybrid && blurredBackground && posterSrc ? (
            <NextImage src={posterSrc} alt="" fill className="absolute inset-0 -z-10 w-full h-full object-cover filter blur-2xl scale-105 opacity-30" />
          ) : null}
          <video
            src={videoUrl}
            poster={posterSrc || undefined}
            className="w-full h-full object-contain"
            style={{ objectPosition: finalPos }}
            controls
            {...(autoPlay ? { autoPlay: true } : {})}
            muted={muted}
            loop={loop}
            playsInline={playsInline}
          />
        </div>
      )
    }

    // verticalMode === 'fit' -> keep the frame but show the video smaller and centered
    return (
      <div className={`w-full ${aspectClass} relative overflow-hidden ${rounded ?? ''} ${className}`} style={{ background: '#000' }}>
        {responsiveHybrid && blurredBackground && posterSrc ? (
          <NextImage src={posterSrc} alt="" fill className="absolute inset-0 -z-10 w-full h-full object-cover filter blur-2xl scale-105 opacity-30" />
        ) : null}
        <div className="w-full h-full flex items-center justify-center">
          <video
            src={videoUrl}
            poster={posterSrc || undefined}
            // video will scale down to fit within the frame
            style={{ maxHeight: '100%', maxWidth: '60%', objectFit: 'contain', objectPosition: finalPos }}
            controls
            {...(autoPlay ? { autoPlay: true } : {})}
            muted={muted}
            loop={loop}
            playsInline={playsInline}
          />
        </div>
      </div>
    )
  }

  // Default: landscape or unknown -> normal cover behavior
  return (
    <div className={`w-full ${aspectClass} relative overflow-hidden ${rounded ?? ''} ${className}`} style={{ background: '#000' }}>
      {responsiveHybrid && blurredBackground && posterSrc ? (
        <NextImage src={posterSrc} alt="" fill className="absolute inset-0 -z-10 w-full h-full object-cover filter blur-2xl scale-105 opacity-30" />
      ) : null}
      <video
        src={videoUrl}
        poster={posterSrc || undefined}
        className="w-full h-full object-cover"
        style={{ objectPosition: finalPos }}
        controls
        {...(autoPlay ? { autoPlay: true } : {})}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
      />
    </div>
  )
}
