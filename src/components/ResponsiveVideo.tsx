"use client"
import { useRef } from 'react'

type ResponsiveVideoProps = {
  /** Direct video URL (mp4/webm) from Sanity or other host */
  src?: string
  /** Optional Mux playbackId. If provided, component will render Mux player iframe. */
  muxPlaybackId?: string
  /** Poster image URL */
  poster?: string
  /** object-fit: 'cover' | 'contain' */
  fit?: 'cover' | 'contain'
  /** object-position like '50% 35%' */
  position?: string
  /** If true, show native video controls */
  controls?: boolean
  /** Autoplay (muted autoplay in many browsers) */
  autoPlay?: boolean
  /** Loop the video */
  loop?: boolean
  /** Muted */
  muted?: boolean
  /** playsInline */
  playsInline?: boolean
  /** Tailwind classes to apply to container */
  className?: string
  /** width/height fallback aspect (e.g. "16/9" or "9/16"). If omitted, component will try to read intrinsic size when possible. */
  aspect?: '16/9' | '9/16' | '4/5' | '1/1'
}

/**
 * ResponsiveVideo
 * - preserves aspect ratio using Tailwind (aspect-* / aspect-[9/16]) or style
 * - supports object-fit (cover/contain) and object-position via inline styles
 * - supports both direct video URLs and Mux playbackId (renders mux player)
 * - avoids stretching by placing video inside an aspect-preserving container
 */
export default function ResponsiveVideo(props: ResponsiveVideoProps) {
  const {
    src,
    muxPlaybackId,
    poster,
    fit = 'cover',
    position = '50% 50%',
    controls = true,
    autoPlay = false,
    loop = false,
    muted = true,
    playsInline = true,
    className = '',
    aspect = '16/9',
  } = props

  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Map aspect token to Tailwind / style
  const aspectClass = {
    '16/9': 'aspect-video',
    '9/16': 'aspect-[9/16]',
    '4/5': 'aspect-[4/5]',
    '1/1': 'aspect-square',
  }[aspect]

  // If muxPlaybackId is provided, render Mux iframe player (simple embed)
    if (muxPlaybackId) {
    const srcUrl = `https://stream.mux.com/${muxPlaybackId}.m3u8`
    // Note: For full Mux Player features, use @mux/mux-player-react or the Mux SDK.
    return (
      <div className={`w-full ${aspectClass} relative overflow-hidden ${className}`}>
        <video
          // Using the HLS url here; on many platforms you may prefer to use an HLS-enabled player
          src={srcUrl}
          poster={poster}
          className={`w-full h-full`}
          style={{ objectFit: fit, objectPosition: position }}
          controls={controls}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          ref={videoRef}
        />
      </div>
    )
  }

  // Otherwise render a native video element (mp4 or other direct URL)
  return (
    <div className={`w-full ${aspectClass} relative overflow-hidden ${className}`}>
      <video
        src={src}
        poster={poster}
        className={`w-full h-full`}
        style={{ objectFit: fit, objectPosition: position }}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        ref={videoRef}
      />
    </div>
  )
}

/*
Usage examples:

// 1) Cover behavior (default) — will crop to fill the frame but preserve aspect
<ResponsiveVideo
  src="https://cdn.sanity.io/files/PROJECT_ID/production/my-video.mp4"
  poster="https://cdn.sanity.io/images/PROJECT_ID/production/my-poster.jpg"
  fit="cover"
  position="50% 35%" // move vertical focus up to avoid cropping heads
  aspect="16/9"
/>

// 2) Contain behavior — will letterbox/pillarbox to avoid cropping
<ResponsiveVideo
  src="https://cdn.sanity.io/files/PROJECT_ID/production/my-vertical-video.mp4"
  poster="https://cdn.sanity.io/images/PROJECT_ID/production/my-poster.jpg"
  fit="contain"
  position="50% 35%"
  aspect="9/16"
/>

Notes:
- If you need Mux advanced features (signed playback, thumbnails, analytics), use the @mux/mux-player-react lib and provide playbackId + policy tokens as needed.
- To use Sanity asset references, use your image/url helper (e.g. use buildImageUrl for posters and pass the file asset url for src).
*/
