'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { loadGsap } from '@/lib/gsap'

const stats = [
  { value: 10, suffix: '+', label: 'Năm kinh nghiệm' },
  { value: 5000, suffix: '+', label: 'Xe đã sửa chữa' },
  { value: 98, suffix: '%', label: 'Khách hàng hài lòng' },
  { value: 50, suffix: '+', label: 'Thương hiệu xe' },
]

type AnimatedCounterProps = {
  value: number
  suffix: string
}

function AnimatedCounter({ value, suffix }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let context: { revert: () => void } | undefined
    let cancelled = false

    void loadGsap().then(({ gsap }) => {
      if (cancelled) return

      if (reducedMotion) {
        setDisplayValue(value)
        return
      }

      const counter = { value: 0 }
      context = gsap.context(() => {
        gsap.to(counter, {
          value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            once: true,
          },
          onUpdate: () => setDisplayValue(Math.round(counter.value)),
        })
      }, element)
    })

    return () => {
      cancelled = true
      context?.revert()
    }
  }, [value])

  const formattedValue = displayValue >= 1000 ? displayValue.toLocaleString('en-US') : displayValue.toString()

  return (
    <span ref={ref}>
      {formattedValue}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="relative overflow-hidden section-padding bg-surface-card" aria-labelledby="stats-heading">
      <Image
        src="https://images.unsplash.com/photo-1644377931361-8a509fa5c4cd?w=1920&q=80&auto=format&fit=crop"
        alt=""
        fill
        className="object-cover opacity-[0.12] mix-blend-luminosity"
        aria-hidden="true"
        priority={false}
      />
      <div className="relative z-10 container grid gap-14 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <p className="label-upper text-accent">Con số</p>
          <h2 id="stats-heading" className="mt-5 max-w-lg text-[clamp(38px,10vw,76px)] font-light leading-[1.18] text-body md:text-[clamp(42px,5.8vw,76px)] md:leading-[1.08]">
            &ldquo;Chúng tôi không đếm năm kinh nghiệm để khoe. Chúng tôi đếm để nhắc mình không được ngừng học.&rdquo;
          </h2>
        </div>

        <div className="grid gap-x-8 gap-y-10 md:col-span-6 md:col-start-7 md:grid-cols-2 md:self-center">
          {stats.map((item) => (
            <div key={item.label} className="border-t border-hairline pt-5">
              <p className="text-[clamp(54px,7vw,92px)] font-bold leading-none text-ink">
                <AnimatedCounter value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-4 label-upper">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
