'use client'

import { useEffect, useRef } from 'react'

const interactiveSelector = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  '[role="button"]',
  '[data-cursor="hover"]',
].join(',')

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!finePointer.matches || reducedMotion.matches) return

    document.body.classList.add('has-custom-cursor')

    const moveCursor = (event: PointerEvent) => {
      cursor.style.left = `${event.clientX}px`
      cursor.style.top = `${event.clientY}px`
      cursor.classList.add('is-visible')
    }

    const hideCursor = () => {
      cursor.classList.remove('is-visible', 'is-hovering')
    }

    const updateHoverState = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      cursor.classList.toggle('is-hovering', Boolean(target.closest(interactiveSelector)))
    }

    window.addEventListener('pointermove', moveCursor)
    window.addEventListener('pointerover', updateHoverState)
    window.addEventListener('pointerout', updateHoverState)
    document.addEventListener('mouseleave', hideCursor)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', moveCursor)
      window.removeEventListener('pointerover', updateHoverState)
      window.removeEventListener('pointerout', updateHoverState)
      document.removeEventListener('mouseleave', hideCursor)
    }
  }, [])

  return <div ref={cursorRef} aria-hidden="true" className="custom-cursor" />
}
