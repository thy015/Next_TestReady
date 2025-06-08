'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function useScrollToTop() {
  const pathname = usePathname()
  const mainContentRef = useRef<HTMLElement>(null)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return mainContentRef
}
