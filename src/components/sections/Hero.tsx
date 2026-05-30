'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { loadGsap } from '@/lib/gsap'

const Spline = dynamic(() => import('@splinetool/react-spline/next'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-canvas" />,
})

const SPLINE_SCENE = 'https://prod.spline.design/SdIfFIa71mEY8UTL/scene.splinecode'

const headlineLines = ['Nơi xe của bạn', 'được chăm sóc', 'đúng cách.']

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealItems = root.querySelectorAll<HTMLElement>('[data-hero-reveal]')
    let context: { revert: () => void } | undefined
    let cancelled = false

    void loadGsap().then(({ gsap }) => {
      if (cancelled) return

      if (reducedMotion) {
        gsap.set(revealItems, { yPercent: 0 })
        return
      }

      context = gsap.context(() => {
        gsap.fromTo(
          revealItems,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            delay: 0.15,
          },
        )
      }, root)
    })

    return () => {
      cancelled = true
      context?.revert()
    }
  }, [])

  return (
    <section ref={rootRef} className="relative isolate min-h-screen overflow-hidden bg-canvas" aria-labelledby="hero-heading">
      {/* Spline 3D — desktop only to avoid mobile lag */}
      {isDesktop && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-90">
          <Spline scene={SPLINE_SCENE} />
        </div>
      )}

      {/* Left-to-right fade so text stays readable */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.97)_0%,rgba(0,0,0,0.92)_35%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0.05)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-canvas to-transparent" />

      <div className="container relative z-20 flex min-h-screen items-center pt-[72px]">
        <div className="max-w-3xl py-24">
          <div className="overflow-hidden">
            <p data-hero-reveal className="label-upper text-accent">
              Sửa chữa xe máy chuyên nghiệp · TP.HCM
            </p>
          </div>

          <h1
            id="hero-heading"
            className="mt-7 text-[clamp(34px,8vw,60px)] font-bold uppercase leading-[1.22] tracking-[-0.02em] text-ink md:text-[clamp(40px,5vw,68px)]"
          >
            {headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <span
                  data-hero-reveal
                  className={`block ${i === 1 ? 'text-accent' : ''}`}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-9 max-w-xl overflow-hidden">
            <p data-hero-reveal className="text-base font-light leading-7 text-body md:text-lg">
              Tiếp nhận đúng giờ, kiểm tra kỹ, báo giá trước khi sửa và bàn giao có bảo hành.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 overflow-hidden sm:flex-row">
            <Link data-hero-reveal href="#booking" className="btn-primary">
              Đặt lịch hẹn
              <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
            </Link>
            <Link data-hero-reveal href="#services" className="btn-outline">
              Xem dịch vụ
              <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" aria-hidden="true">
        <span className="h-16 w-px overflow-hidden bg-hairline">
          <span className="block h-8 w-px animate-[scrollLine_1.8s_var(--ease-in-out)_infinite] bg-accent" />
        </span>
      </div>
    </section>
  )
}
