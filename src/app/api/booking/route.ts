import { randomInt } from 'node:crypto'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabaseClient } from '@/lib/supabase'
import { bookingServices, BookingRecord, BookingRequest, BookingResponse } from '@/types/booking'

const phonePattern = /^(0|84)(3|5|7|8|9)\d{8}$/
const timeSlots = new Set(['07:00', '09:00', '11:00', '14:00', '16:00'])
const serviceSet = new Set<string>(bookingServices)

type ValidationResult =
  | { ok: true; data: BookingRequest }
  | { ok: false; error: string }

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return json({ success: false, error: 'Dữ liệu gửi lên không hợp lệ.' }, 400)
  }

  const validation = validateBooking(payload)
  if (!validation.ok) {
    return json({ success: false, error: validation.error }, 400)
  }

  try {
    const bookingCode = createBookingCode()
    const booking: BookingRecord = {
      ...validation.data,
      booking_code: bookingCode,
      status: 'pending',
    }

    const supabase = getSupabaseClient()
    const { error: insertError } = await supabase.from('bookings').insert(booking)

    if (insertError) {
      return json({ success: false, error: 'Không thể lưu lịch hẹn. Vui lòng thử lại sau.' }, 500)
    }

    await sendConfirmationEmail(booking)

    return json({ success: true, bookingCode }, 201)
  } catch (error) {
    const message = error instanceof Error && error.message.includes('configured')
      ? 'Máy chủ chưa được cấu hình đầy đủ biến môi trường.'
      : 'Không thể gửi lịch hẹn lúc này. Vui lòng thử lại sau.'

    return json({ success: false, error: message }, 500)
  }
}

function validateBooking(payload: unknown): ValidationResult {
  if (!isRecord(payload)) return { ok: false, error: 'Dữ liệu gửi lên không hợp lệ.' }

  const customerName = normalizeRequiredText(payload.customer_name)
  if (!customerName) return { ok: false, error: 'Vui lòng nhập họ tên.' }

  const phone = normalizeRequiredText(payload.phone)
  if (!phonePattern.test(phone)) return { ok: false, error: 'Số điện thoại chưa đúng định dạng Việt Nam.' }

  const bikeBrand = normalizeRequiredText(payload.bike_brand)
  if (!bikeBrand) return { ok: false, error: 'Vui lòng nhập dòng xe.' }

  const services = payload.services
  if (!Array.isArray(services) || services.length === 0) {
    return { ok: false, error: 'Vui lòng chọn ít nhất một dịch vụ.' }
  }

  if (!services.every((service): service is BookingRequest['services'][number] => typeof service === 'string' && serviceSet.has(service))) {
    return { ok: false, error: 'Dịch vụ được chọn không hợp lệ.' }
  }

  const bookingDate = normalizeRequiredText(payload.booking_date)
  if (!isValidDate(bookingDate)) return { ok: false, error: 'Ngày đặt lịch không hợp lệ.' }

  const bookingTime = normalizeRequiredText(payload.booking_time)
  if (!timeSlots.has(bookingTime)) return { ok: false, error: 'Giờ đặt lịch không hợp lệ.' }

  return {
    ok: true,
    data: {
      customer_name: customerName,
      phone,
      bike_brand: bikeBrand,
      plate_number: normalizeNullableText(payload.plate_number),
      services,
      booking_date: bookingDate,
      booking_time: bookingTime,
      notes: normalizeNullableText(payload.notes),
    },
  }
}

function normalizeRequiredText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeNullableText(value: unknown) {
  if (value === null || value === undefined) return null
  if (typeof value !== 'string') return null

  const normalized = value.trim()
  return normalized ? normalized : null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const date = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

function createBookingCode() {
  const year = new Date().getFullYear()
  const randomDigits = randomInt(0, 10000)

  return `MQ-${year}-${randomDigits.toString().padStart(4, '0')}`
}

async function sendConfirmationEmail(booking: BookingRecord) {
  const apiKey = process.env.RESEND_API_KEY
  const shopEmail = process.env.SHOP_EMAIL ?? 'contact@minhquanmotor.vn'

  if (!apiKey) {
    throw new Error('Resend API key is not configured.')
  }

  const resend = new Resend(apiKey)
  const subject = `Lịch hẹn mới ${booking.booking_code}`
  const html = createBookingEmailHtml(booking)

  const { error } = await resend.emails.send({
    from: `Minh Quân Motor <${shopEmail}>`,
    to: [shopEmail],
    subject,
    html,
  })

  if (error) {
    throw new Error('Unable to send confirmation email.')
  }
}

function createBookingEmailHtml(booking: BookingRecord) {
  return `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6">
      <h1 style="font-size:24px;margin:0 0 16px">Lịch hẹn ${escapeHtml(booking.booking_code)}</h1>
      <p><strong>Khách hàng:</strong> ${escapeHtml(booking.customer_name)}</p>
      <p><strong>Điện thoại:</strong> ${escapeHtml(booking.phone)}</p>
      <p><strong>Dòng xe:</strong> ${escapeHtml(booking.bike_brand)}</p>
      <p><strong>Biển số:</strong> ${escapeHtml(booking.plate_number ?? 'Không cung cấp')}</p>
      <p><strong>Dịch vụ:</strong> ${booking.services.map(escapeHtml).join(', ')}</p>
      <p><strong>Ngày giờ:</strong> ${escapeHtml(booking.booking_date)} lúc ${escapeHtml(booking.booking_time)}</p>
      <p><strong>Ghi chú:</strong> ${escapeHtml(booking.notes ?? 'Không có')}</p>
    </div>
  `
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function json(body: BookingResponse, status: number) {
  return NextResponse.json(body, { status })
}
