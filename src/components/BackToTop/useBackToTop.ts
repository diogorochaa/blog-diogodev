import { useEffect, useRef, useState } from 'react'

export const useBackToTop = () => {
  const [show, setShow] = useState(true)
  const lastScrollVerticalRef = useRef(0)

  useEffect(() => {
    const handleControlScroll = () => {
      if (window.scrollY === 0) {
        setShow(false)
        return
      }

      if (window.scrollY > lastScrollVerticalRef.current) {
        setShow(false)
      } else {
        setShow(true)
      }

      lastScrollVerticalRef.current = window.scrollY
    }

    window.addEventListener('scroll', handleControlScroll)

    return () => {
      window.removeEventListener('scroll', handleControlScroll)
    }
  }, [])

  return {
    show,
  }
}
