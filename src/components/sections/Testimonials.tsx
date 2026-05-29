import Image from 'next/image'

const testimonials = [
  {
    name: 'Anh Huy Nguyễn',
    bike: 'Honda Wave Alpha',
    quote:
      'Xe bị hụt ga lâu ngày, mang qua Minh Quân được kiểm tra bộ chế hòa khí và vệ sinh trong buổi sáng. Báo giá rõ, nhận xe chạy nhẹ hơn hẳn.',
  },
  {
    name: 'Chị Mai Trần',
    bike: 'Yamaha Grande',
    quote:
      'Mình đặt lịch bảo dưỡng định kỳ, tới nơi không phải chờ. Thợ giải thích từng hạng mục, chỉ thay lọc gió vì đã quá bẩn, giá rất hợp lý.',
  },
  {
    name: 'Anh Quốc Bảo',
    bike: 'Yamaha Exciter 155',
    quote:
      'Xe có tiếng kêu phần nhông sên dĩa, garage kiểm tra và căn chỉnh lại trước khi đề xuất thay. Cách làm rất thẳng thắn, không ép dịch vụ.',
  },
  {
    name: 'Chị Lan Phạm',
    bike: 'Honda Vision',
    quote:
      'Ắc-quy yếu và đèn chập chờn, xử lý xong trong hơn một giờ. Có phiếu bảo hành và dặn kỹ cách theo dõi sau khi về.',
  },
  {
    name: 'Anh Minh Đỗ',
    bike: 'Honda SH Mode',
    quote:
      'Mình làm sơn dặm và đánh bóng. Màu lên đều, không bị bóng quá tay. Xe nhìn sạch và sang hơn nhưng vẫn tự nhiên.',
  },
]

export function Testimonials() {
  return (
    <section className="relative overflow-hidden section-padding bg-canvas" aria-labelledby="testimonials-heading">
      <Image
        src="https://images.unsplash.com/photo-1601307076860-4b4029faf47a?w=1920&q=80&auto=format&fit=crop"
        alt=""
        fill
        className="object-cover opacity-[0.10] mix-blend-luminosity"
        aria-hidden="true"
        priority={false}
      />
      <div className="relative z-10 container">
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <p className="label-upper text-accent">Khách hàng</p>
            <h2 id="testimonials-heading" className="mt-5 max-w-md text-[clamp(42px,11vw,80px)] font-bold uppercase leading-[1.08] tracking-[-0.02em] text-ink md:text-[clamp(44px,6vw,80px)]">
              Những lời khen không cần phóng đại.
            </h2>
          </div>
          <p className="max-w-xl text-base font-light leading-7 text-body md:col-span-5 md:col-start-8">
            Điều chúng tôi muốn khách hàng nhớ không phải là trang trí trong xưởng, mà là cảm giác yên tâm khi nhận lại xe.
          </p>
        </div>

        <div className="mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 [scrollbar-width:thin] md:gap-6">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="min-w-[82vw] snap-start border border-hairline bg-surface-card p-7 sm:min-w-[420px] md:min-w-[520px] md:p-9"
            >
              <div className="flex items-center justify-between gap-4 border-b border-hairline pb-6">
                <div>
                  <h3 className="text-base font-semibold text-ink">{testimonial.name}</h3>
                  <p className="mt-1 label-upper">{testimonial.bike}</p>
                </div>
                <p className="text-[11px] tracking-[0.12em] text-[#F59E0B]" aria-label="5 sao">
                  ★★★★★
                </p>
              </div>
              <blockquote className="mt-8 text-3xl font-light leading-[1.3] text-body md:text-4xl md:leading-[1.24]">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
