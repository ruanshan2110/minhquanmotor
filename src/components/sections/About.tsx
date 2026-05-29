import Image from 'next/image'

const principles = [
  'Kiểm tra trước khi kết luận',
  'Báo giá trước khi sửa',
  'Bàn giao kèm bảo hành rõ ràng',
]

export function About() {
  return (
    <section id="about" className="relative overflow-hidden section-padding bg-canvas" aria-labelledby="about-heading">
      <Image
        src="https://images.unsplash.com/photo-1585770799701-5b91cdd70fb9?w=1920&q=80&auto=format&fit=crop"
        alt=""
        fill
        className="object-cover opacity-[0.08] mix-blend-luminosity"
        aria-hidden="true"
        priority={false}
      />
      <div className="relative z-10 container">
        <div className="grid gap-14 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <p className="label-upper text-accent">Về chúng tôi</p>
            <h2 id="about-heading" className="mt-5 max-w-lg text-[clamp(42px,11vw,80px)] font-bold uppercase leading-[1.08] tracking-[-0.02em] text-ink md:text-[clamp(44px,6vw,80px)]">
              Một garage không cần nói quá nhiều.
            </h2>
          </div>

          <div className="space-y-8 md:col-span-6 md:col-start-7">
            <p className="text-xl font-light leading-8 text-body-strong md:text-2xl md:leading-9">
              Minh Quân Motor được xây dựng cho những người muốn chiếc xe được chăm sóc đúng cách: đúng lỗi, đúng phụ tùng, đúng thời gian.
            </p>
            <p className="max-w-2xl text-base font-light leading-7 text-body">
              Chúng tôi không biến việc sửa xe thành một cuộc mặc cả. Xe được tiếp nhận, kiểm tra, giải thích rõ hạng mục cần làm và chỉ bắt đầu khi khách hàng đồng ý.
            </p>

            <div className="grid gap-4 border-y border-hairline py-8 sm:grid-cols-3">
              {principles.map((principle) => (
                <div key={principle}>
                  <span className="block h-px w-10 bg-accent" />
                  <p className="mt-4 text-sm font-light leading-6 text-body">{principle}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="border border-hairline bg-surface-card p-6">
                <p className="label-upper text-accent">Cam kết</p>
                <p className="mt-4 text-sm font-light leading-6 text-body">Không thay phụ tùng khi chưa có xác nhận. Không phát sinh ngoài báo giá.</p>
              </div>
              <div className="border border-hairline bg-surface-card p-6">
                <p className="label-upper text-accent">Bảo hành</p>
                <p className="mt-4 text-sm font-light leading-6 text-body">Mỗi hạng mục sửa chữa được ghi nhận và bảo hành 3 tháng sau bàn giao.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
