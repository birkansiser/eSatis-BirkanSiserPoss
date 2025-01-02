import { useState } from 'react'
import { Skeleton } from '@mui/material'

function OptimizedImage({ src, alt, width, height, ...props }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          animation="wave"
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? 'block' : 'none' }}
        {...props}
      />
    </>
  )
}

export default OptimizedImage 