# PROMPT CHO CLAUDE CODE — Minh Quân Motor Website

## Ngữ cảnh
Tôi cần xây dựng website cho thương hiệu sửa chữa xe máy **Minh Quân Motor**.
Đọc kỹ file `DESIGN.md` trong thư mục này trước khi bắt đầu — đó là toàn bộ spec thiết kế.

---

## Yêu cầu tổng quát

Xây dựng một landing page hoàn chỉnh với Next.js 14 App Router, TypeScript, Tailwind CSS.
Aesthetic: **Dark Garage / Industrial Luxury** — tông đen/xám, accent cam, font Bebas Neue.
Không được tạo ra giao diện generic, nhạt nhẽo. Mọi chi tiết phải có chủ ý rõ ràng.

---

## Thứ tự thực hiện (làm đúng thứ tự này)

### Giai đoạn 1 — Setup dự án
1. Cài đặt tất cả packages theo DESIGN.md
2. Cấu hình `tailwind.config.ts` — thêm màu custom, font Bebas Neue + DM Sans
3. Viết `globals.css` — CSS variables, custom cursor styles, scrollbar tối
4. Cấu hình `layout.tsx` — metadata SEO đầy đủ, Google Fonts

### Giai đoạn 2 — Components nền tảng
5. `CustomCursor.tsx` — cursor hình tròn cam, scale khi hover
6. `GSAPProvider.tsx` — đăng ký GSAP plugins
7. `Navbar.tsx` — fixed, transparent → dark khi scroll, mobile hamburger
8. `Footer.tsx`

### Giai đoạn 3 — Sections (theo thứ tự từ trên xuống)
9. `HeroSection.tsx` — Spline 3D background + text overlay + 2 CTA
10. `ServicesSection.tsx` — 6 service cards với hover 3D
11. `StatsSection.tsx` — AnimatedCounter
12. `AboutSection.tsx`
13. `ProcessSection.tsx` — horizontal timeline với SVG line animation
14. `TestimonialSection.tsx` — CSS scroll snap carousel
15. `BookingSection.tsx` — form đặt lịch đầy đủ

### Giai đoạn 4 — Backend
16. `lib/supabase.ts`
17. `api/booking/route.ts` — validate + insert Supabase + gửi email Resend
18. `types/booking.ts`

### Giai đoạn 5 — Hoàn thiện
19. Kết nối tất cả sections vào `page.tsx`
20. Kiểm tra responsive mobile
21. Tối ưu performance (lazy load, dynamic import)

---

## Yêu cầu bắt buộc cho từng component

### HeroSection — Quan trọng nhất
```tsx
// PHẢI dùng dynamic import cho Spline — bắt buộc
import dynamic from 'next/dynamic'
const Spline = dynamic(() => import('@splinetool/react-spline/next'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
})

// Scene URL đã có sẵn:
const SPLINE_SCENE = "https://prod.spline.design/SdIfFIa71mEY8UTL/scene.splinecode"

// Layout:
// - Spline: position absolute, inset-0, z-index 0, pointer-events none
// - Overlay gradient: absolute, inset-0, z-1 (từ trái đen sang transparent)
// - Content: relative, z-2, nằm bên trái, padding-left lớn
// - Headline font-size: clamp(60px, 10vw, 140px), font-family Bebas Neue
```

### BookingForm — Logic quan trọng
```tsx
// Validate số điện thoại VN: /^(0|84)(3|5|7|8|9)\d{8}$/
// Submit flow:
// 1. Validate client-side
// 2. POST /api/booking
// 3. Server: tạo booking_code = "MQ-" + năm + "-" + random 4 số
// 4. Insert vào Supabase
// 5. Gửi email xác nhận qua Resend
// 6. Return { success: true, bookingCode }
// 7. Client: hiện modal thành công với bookingCode
```

### AnimatedCounter
```tsx
// Dùng GSAP để animate số từ 0 đến target
// Chỉ bắt đầu khi element vào viewport (IntersectionObserver hoặc ScrollTrigger)
// Ví dụ: 0 → 5000 trong 2 giây, easing power2.out
```

### ServiceCard — Hover effect
```tsx
// CSS 3D transform on hover:
// transform: perspective(1000px) rotateY(5deg) rotateX(-3deg) translateZ(10px)
// Dùng onMouseMove để tính góc nghiêng theo vị trí chuột
// Không dùng thư viện — tự implement bằng mouse event handlers
```

---

## Màu sắc & Typography

```css
:root {
  --color-bg:        #0a0a0a;
  --color-surface:   #111111;
  --color-surface-2: #1a1a1a;
  --color-border:    #2a2a2a;
  --color-accent:    #f97316;  /* cam */
  --color-accent-2:  #eab308;  /* vàng */
  --color-text:      #ffffff;
  --color-text-muted:#a1a1aa;
}

/* Font usage:
   Bebas Neue → tất cả headings, số lớn, labels nổi bật
   DM Sans    → body text, form labels, navigation
*/
```

---

## Nội dung tiếng Việt cần dùng

### Services
1. **Sửa chữa động cơ** — Chẩn đoán và khắc phục toàn bộ sự cố động cơ
2. **Thay thế phụ tùng** — Phụ tùng chính hãng, giá tốt nhất thị trường
3. **Bảo dưỡng định kỳ** — Gói bảo dưỡng theo km, tăng tuổi thọ xe
4. **Sơn xe & làm đẹp** — Phục hồi màu sắc, đánh bóng, decal theo yêu cầu
5. **Điện xe & hệ thống** — Sửa điện, thay ắc-quy, hệ thống đèn
6. **Kiểm tra tổng quát** — Kiểm tra 30 hạng mục trước mỗi chuyến đi dài

### Stats
- **10+** Năm kinh nghiệm
- **5,000+** Xe đã sửa chữa
- **98%** Khách hàng hài lòng
- **50+** Thương hiệu xe

### Process Steps
1. Tiếp nhận xe & tư vấn miễn phí
2. Kiểm tra chi tiết & báo giá rõ ràng
3. Sửa chữa bởi thợ có chứng chỉ
4. Bàn giao xe & bảo hành 3 tháng

### Testimonials (tạo 5 review giả thực tế)
- Tên VN thật, loại xe cụ thể (Honda Wave, Yamaha Exciter, v.v.)
- Rating 5 sao, nội dung khen ngợi cụ thể (nêu tên dịch vụ, thời gian, giá)

### Shop Info
- Địa chỉ: 123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM
- Điện thoại: 0901 234 567
- Giờ mở cửa: 7:00 - 18:00 (Thứ 2 - Chủ nhật)
- Email: contact@minhquanmotor.vn

---

## Lưu ý kỹ thuật quan trọng

1. **Tất cả components dùng Spline phải có `'use client'`**
2. **GSAP ScrollTrigger phải được đăng ký trong useEffect, không phải top-level**
3. **Form submit phải có loading state và error handling rõ ràng**
4. **Supabase client chỉ khởi tạo một lần trong `lib/supabase.ts`**
5. **Không hardcode API keys — dùng environment variables**
6. **Tất cả text tiếng Việt phải có `lang="vi"` trên html tag**
7. **Image dùng `next/image` với `sizes` prop để responsive**
8. **Mọi animation phải respect `prefers-reduced-motion`**

---

## File .env.local cần tạo (template)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
SHOP_EMAIL=contact@minhquanmotor.vn
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Khi hoàn thành, kiểm tra checklist

- [ ] `npm run build` không có lỗi TypeScript
- [ ] Spline load được trên Hero section
- [ ] Form đặt lịch submit thành công (test với Supabase thật)
- [ ] Email xác nhận được gửi
- [ ] Mobile responsive ổn ở 375px
- [ ] Không có console errors
- [ ] Lighthouse Performance > 70 (Spline sẽ ảnh hưởng score)

---

## Bắt đầu ngay bây giờ

Hãy đọc `DESIGN.md`, sau đó bắt đầu từ **Giai đoạn 1** và làm tuần tự.
Sau mỗi giai đoạn, báo cáo những gì đã xong trước khi tiếp tục.
