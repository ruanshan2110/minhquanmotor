'use client'

import { ReactNode, useEffect } from 'react'
import { loadGsap } from '@/lib/gsap'

export function GSAPProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    void loadGsap()
  }, [])

  return children
}
