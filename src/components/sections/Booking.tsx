'use client'

import { FormEvent, ReactNode, useState } from 'react'
import { Check, X } from 'lucide-react'

const phonePattern = /^(0|84)(3|5|7|8|9)\d{8}$/

const serviceOptions = [
  'Sửa chữa động cơ',
  'Thay thế phụ tùng',
  'Bảo dưỡng định kỳ',
  'Sơn xe & làm đẹp',
  'Điện xe & hệ thống',
  'Kiểm tra tổng quát',
]

const commitments = ['Xác nhận qua SMS trong 5 phút', 'Báo giá trước khi sửa', 'Bảo hành 3 tháng']

type BookingFormState = {
  customerName: string
  phone: string
  bikeBrand: string
  services: string[]
  bookingDate: string
  bookingTime: string
  notes: string
}

const initialFormState: BookingFormState = {
  customerName: '',
  phone: '',
  bikeBrand: '',
  services: [],
  bookingDate: '',
  bookingTime: '',
  notes: '',
}

export function Booking() {
  const [form, setForm] = useState<BookingFormState>(initialFormState)
  const [error, setError] = useState('')
  const [bookingCode, setBookingCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (field: keyof BookingFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const toggleService = (service: string) => {
    setForm((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }))
  }

  const validateForm = () => {
    if (!form.customerName.trim()) return 'Vui lòng nhập họ tên.'
    if (!phonePattern.test(form.phone.trim())) return 'Số điện thoại chưa đúng định dạng Việt Nam.'
    if (!form.bikeBrand.trim()) return 'Vui lòng nhập dòng xe.'
    if (form.services.length === 0) return 'Vui lòng chọn ít nhất một dịch vụ.'
    if (!form.bookingDate) return 'Vui lòng chọn ngày đặt lịch.'
    if (!form.bookingTime) return 'Vui lòng chọn giờ đặt lịch.'
    return ''
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.customerName.trim(),
          phone: form.phone.trim(),
          bike_brand: form.bikeBrand.trim(),
          services: form.services,
          booking_date: form.bookingDate,
          booking_time: form.bookingTime,
          notes: form.notes.trim() || null,
        }),
      })

      const result = (await response.json().catch(() => null)) as { success?: boolean; bookingCode?: string; error?: string } | null

      if (!response.ok || !result?.success || !result.bookingCode) {
        throw new Error(result?.error || 'Không thể gửi lịch hẹn lúc này. Vui lòng thử lại sau.')
      }

      setBookingCode(result.bookingCode)
      setForm(initialFormState)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Không thể gửi lịch hẹn lúc này. Vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="booking" className="section-padding bg-surface-soft" aria-labelledby="booking-heading">
      <div className="container grid gap-14 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <p className="label-upper text-accent">Đặt lịch hẹn</p>
          <h2 id="booking-heading" className="mt-5 max-w-md text-[clamp(42px,11vw,80px)] font-bold uppercase leading-[1.08] tracking-[-0.02em] text-ink md:text-[clamp(44px,6vw,80px)]">
            Đến đúng giờ, không chờ đợi.
          </h2>
          <p className="mt-8 max-w-md text-base font-light leading-7 text-body">
            Xe của bạn được tiếp nhận ngay khi bạn đặt chân vào cửa.
          </p>

          <div className="mt-10 border-y border-hairline py-7">
            <ul className="space-y-4">
              {commitments.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-light leading-6 text-body">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <p className="text-sm text-body">Hoặc gọi trực tiếp:</p>
            <a href="tel:0901234567" className="mt-3 inline-block text-2xl font-bold text-ink transition-colors duration-200 ease-out hover:text-accent">
              0901 234 567
            </a>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <form onSubmit={handleSubmit} className="space-y-7" noValidate>
            <div className="grid gap-7 sm:grid-cols-2">
              <Field label="Họ tên" htmlFor="customerName" required>
                <input
                  id="customerName"
                  value={form.customerName}
                  onChange={(event) => updateField('customerName', event.target.value)}
                  className="form-field"
                  autoComplete="name"
                  required
                />
              </Field>
              <Field label="Số điện thoại" htmlFor="phone" required>
                <input
                  id="phone"
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  className="form-field"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                />
              </Field>
            </div>

            <Field label="Dòng xe" htmlFor="bikeBrand" required>
              <input
                id="bikeBrand"
                value={form.bikeBrand}
                onChange={(event) => updateField('bikeBrand', event.target.value)}
                className="form-field"
                required
              />
            </Field>

            <fieldset>
              <legend className="label-upper text-muted">Dịch vụ cần làm *</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {serviceOptions.map((service) => (
                  <label
                    key={service}
                    className="group flex items-center gap-3 border border-hairline px-4 py-3 text-sm text-body transition-[border-color,color,background-color] duration-200 ease-out hover:border-accent hover:text-ink data-[checked]:border-accent data-[checked]:bg-accent-light"
                    data-checked={form.services.includes(service) ? '' : undefined}
                  >
                    <input
                      type="checkbox"
                      checked={form.services.includes(service)}
                      onChange={() => toggleService(service)}
                      className="h-4 w-4 accent-[var(--accent)]"
                    />
                    {service}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-7 sm:grid-cols-2">
              <Field label="Ngày hẹn" htmlFor="bookingDate" required>
                <input
                  id="bookingDate"
                  type="date"
                  value={form.bookingDate}
                  onChange={(event) => updateField('bookingDate', event.target.value)}
                  className="form-field"
                  required
                />
              </Field>
              <Field label="Giờ hẹn" htmlFor="bookingTime" required>
                <select
                  id="bookingTime"
                  value={form.bookingTime}
                  onChange={(event) => updateField('bookingTime', event.target.value)}
                  className="form-field"
                  required
                >
                  <option value="">Chọn khung giờ</option>
                  <option value="07:00">07:00</option>
                  <option value="09:00">09:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="16:00">16:00</option>
                </select>
              </Field>
            </div>

            <Field label="Ghi chú" htmlFor="notes">
              <textarea
                id="notes"
                value={form.notes}
                onChange={(event) => updateField('notes', event.target.value)}
                className="form-field min-h-28 resize-y"
                rows={4}
              />
            </Field>

            <div aria-live="polite" className="min-h-6">
              {error && <p className="text-sm leading-6 text-red-500">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {isSubmitting ? 'Đang gửi lịch hẹn...' : 'Gửi lịch hẹn'}
            </button>
          </form>
        </div>
      </div>

      {bookingCode && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-[rgba(0,0,0,0.72)] px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="booking-success-title">
          <div className="w-full max-w-md border border-hairline bg-surface-card p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="label-upper text-accent">Đã nhận lịch hẹn</p>
                <h3 id="booking-success-title" className="mt-4 text-4xl font-bold uppercase leading-[1.08] text-ink">
                  Cảm ơn bạn.
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setBookingCode('')}
                className="grid h-9 w-9 place-items-center border border-hairline text-body transition-[border-color,color] duration-200 ease-out hover:border-accent hover:text-accent"
                aria-label="Đóng thông báo"
              >
                <X aria-hidden="true" size={16} strokeWidth={1.5} />
              </button>
            </div>
            <p className="mt-7 text-sm font-light leading-6 text-body">
              Mã đặt lịch của bạn là <span className="font-semibold text-ink">{bookingCode}</span>. Minh Quân Motor sẽ xác nhận lại trong thời gian sớm nhất.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

function Field({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-3 block label-upper text-muted">
        {label}
        {required ? ' *' : ''}
      </label>
      {children}
    </div>
  )
}
