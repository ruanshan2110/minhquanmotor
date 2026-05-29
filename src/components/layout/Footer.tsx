import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = [
  { label: 'Dịch vụ', href: '#services' },
  { label: 'Về chúng tôi', href: '#about' },
  { label: 'Quy trình', href: '#process' },
  { label: 'Đặt lịch', href: '#booking' },
]

const contactItems = [
  {
    icon: MapPin,
    label: 'Địa chỉ',
    value: '123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM',
  },
  {
    icon: Phone,
    label: 'Điện thoại',
    value: '0901 234 567',
    href: 'tel:0901234567',
  },
  {
    icon: Clock,
    label: 'Giờ mở cửa',
    value: '7:00 - 18:00 (Thứ 2 - Chủ nhật)',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@minhquanmotor.vn',
    href: 'mailto:contact@minhquanmotor.vn',
  },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-surface-soft text-body">
      <div className="m-stripe" />
      <div className="container py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="#top" className="inline-flex items-center gap-3" aria-label="Minh Quân Motor về đầu trang">
              <span className="grid h-10 w-10 place-items-center bg-accent text-[13px] font-bold text-white">
                MQ
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink">Minh Quân Motor</span>
            </Link>
            <p className="mt-8 max-w-sm text-sm font-light leading-7 text-body">
              Sửa chữa và bảo dưỡng xe máy với quy trình rõ ràng, báo giá trước khi làm và bảo hành sau bàn giao.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Liên kết footer">
            <p className="label-upper text-ink">Điều hướng</p>
            <div className="mt-6 flex flex-col items-start gap-4">
              {footerLinks.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link text-sm text-body hover:text-ink">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="md:col-span-4">
            <p className="label-upper text-ink">Liên hệ</p>
            <div className="mt-6 space-y-5">
              {contactItems.map((item) => {
                const Icon = item.icon
                const content = (
                  <span className="group flex gap-3 text-sm leading-6 text-body transition-colors duration-200 ease-out hover:text-ink">
                    <Icon aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-muted transition-colors duration-200 ease-out group-hover:text-body" strokeWidth={1.5} />
                    <span>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                        {item.label}
                      </span>
                      <span className="mt-1 block">{item.value}</span>
                    </span>
                  </span>
                )

                return item.href ? (
                  <a key={item.label} href={item.href}>
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 Minh Quân Motor. All rights reserved.</p>
          <p className="font-bold uppercase tracking-[0.15em]">Precision over noise</p>
        </div>
      </div>
    </footer>
  )
}
