export const testimonialsQuery = `*[_type == "testimonial"]{
  athleteName,
  position,
  quote,
  photo{..., asset->, hotspot, crop, alt, focusX, focusY},
  clip{file{asset->}, poster{..., asset->, hotspot, crop}, focusX, focusY, autoplay, muted, loop, playsInline}
}`

export default testimonialsQuery
