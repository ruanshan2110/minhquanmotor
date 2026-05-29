export const bookingServices = [
  'Sửa chữa động cơ',
  'Thay thế phụ tùng',
  'Bảo dưỡng định kỳ',
  'Sơn xe & làm đẹp',
  'Điện xe & hệ thống',
  'Kiểm tra tổng quát',
] as const

export type BookingService = (typeof bookingServices)[number]

export type BookingRequest = {
  customer_name: string
  phone: string
  bike_brand: string
  plate_number: string | null
  services: BookingService[]
  booking_date: string
  booking_time: string
  notes: string | null
}

export type BookingRecord = BookingRequest & {
  booking_code: string
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
}

export type BookingResponse =
  | {
      success: true
      bookingCode: string
    }
  | {
      success: false
      error: string
    }
