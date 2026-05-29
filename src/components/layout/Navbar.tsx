'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Dịch vụ', href: '#services' },
  { label: 'Về chúng tôi', href: '#about' },
  { label: 'Quy trình', href: '#process' },
  { label: 'Liên hệ', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 80)
    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 bg-canvas transition-[border-color] duration-[400ms] ease-out ${scrolled ? 'border-b border-hairline' : 'border-b border-transparent'}`}>
      {/* M tricolor stripe */}
      <div className="m-stripe" />

      <div className="container relative z-50 flex h-[72px] items-center justify-between gap-8">
        <Link href="#top" className="group flex items-center gap-3" aria-label="Minh Quân Motor về đầu trang">
          <span className="grid h-9 w-9 place-items-center bg-accent text-[13px] font-bold text-white transition-colors duration-300 ease-out group-hover:bg-accent-hover">
            MQ
          </span>
          <span className="hidden text-[11px] font-bold uppercase tracking-[0.15em] text-ink sm:block">
            Minh Quân Motor
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link text-[12px] font-semibold uppercase tracking-[0.1em] text-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <Link href="#booking" className="btn-primary h-10 px-6 text-[12px]">
            Đặt lịch
          </Link>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center border border-hairline text-ink transition-[border-color,color] duration-200 ease-out hover:border-ink md:hidden"
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" size={18} strokeWidth={1.5} /> : <Menu aria-hidden="true" size={18} strokeWidth={1.5} />}
        </button>
      </div>

      <div
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-40 h-dvh w-[min(84vw,360px)] border-l border-hairline bg-surface-card pt-24 transition-transform duration-[400ms] ease-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        id="mobile-navigation"
      >
        <nav className="flex flex-col px-6" aria-label="Điều hướng mobile">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-t border-hairline py-5 text-[13px] font-semibold uppercase tracking-[0.1em] text-muted transition-colors duration-200 ease-out hover:text-ink"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#booking"
            className="btn-primary mt-6 justify-center text-[12px]"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            Đặt lịch
          </Link>
        </nav>
      </div>
    </header>
  )
}
