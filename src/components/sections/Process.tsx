'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { loadGsap } from '@/lib/gsap'

const steps = [
  'Tiếp nhận xe & tư vấn miễn phí',
  'Kiểm tra chi tiết & báo giá rõ ràng',
  'Sửa chữa bởi thợ có chứng chỉ',
  'Bàn giao xe & bảo hành 3 tháng',
]

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const path = pathRef.current
    if (!section || !path) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const length = path.getTotalLength()
    let context: { revert: () => void } | undefined
    let cancelled = false

    void loadGsap().then(({ gsap }) => {
      if (cancelled) return

      gsap.set(path, { strokeDasharray: length, strokeDashoffset: reducedMotion ? 0 : length })

      if (reducedMotion) return

      context = gsap.context(() => {
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
        })

        gsap.fromTo(
          '[data-process-step]',
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              once: true,
            },
          },
        )
      }, section)
    })

    return () => {
      cancelled = true
      context?.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="process" className="relative section-padding overflow-hidden bg-surface-soft" aria-labelledby="process-heading">
      <Image
        src="https://images.unsplash.com/photo-1714013582481-55b134dccd72?w=1920&q=80&auto=format&fit=crop"
        alt=""
        fill
        className="object-cover opacity-[0.10] mix-blend-luminosity"
        aria-hidden="true"
        priority={false}
      />
      <div className="relative z-10 container">
        <div className="max-w-2xl">
          <p className="label-upper text-accent">Quy trình</p>
          <h2 id="process-heading" className="mt-5 text-[clamp(42px,11vw,80px)] font-bold uppercase leading-[1.08] tracking-[-0.02em] text-ink md:text-[clamp(44px,6vw,80px)]">
            Mọi bước đều có lý do.
          </h2>
          <p className="mt-7 text-base font-light leading-7 text-body">
            Quy trình ngắn gọn để bạn biết xe đang ở đâu, vì sao cần sửa và khi nào có thể nhận lại.
          </p>
        </div>

        <div className="relative mt-16 md:mt-24">
          <svg className="pointer-events-none absolute left-0 top-8 hidden h-16 w-full md:block" viewBox="0 0 1200 80" fill="none" aria-hidden="true" preserveAspectRatio="none">
            <path ref={pathRef} d="M0 40 C 210 12, 380 68, 570 40 S 930 12, 1200 40" stroke="var(--accent)" strokeWidth="1" />
          </svg>

          <div className="grid gap-8 md:grid-cols-4 md:gap-6">
            {steps.map((step, index) => (
              <article key={step} data-process-step className="relative border-t border-hairline pt-8 md:border-t-0 md:pt-0">
                <div className="flex h-16 w-16 items-center justify-center border border-hairline-strong bg-surface-card text-4xl font-bold leading-none text-accent">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <span className="absolute left-6 top-[62px] hidden h-3 w-3 bg-accent md:block" aria-hidden="true" />
                <h3 className="mt-8 max-w-xs text-xl font-semibold leading-7 text-ink">{step}</h3>
                <p className="mt-5 text-sm font-light leading-6 text-body">
                  {index === 0 && 'Ghi nhận tình trạng xe, nhu cầu của bạn và tư vấn hướng kiểm tra ban đầu.'}
                  {index === 1 && 'Kiểm tra từng hạng mục, giải thích lỗi và gửi báo giá trước khi bắt đầu.'}
                  {index === 2 && 'Thực hiện sửa chữa bằng phụ tùng phù hợp, giữ lại linh kiện đã thay nếu bạn cần xem.'}
                  {index === 3 && 'Chạy thử, bàn giao, hướng dẫn theo dõi và ghi nhận bảo hành sau sửa chữa.'}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
