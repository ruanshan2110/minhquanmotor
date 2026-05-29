import { ArrowUpRight } from 'lucide-react'

const services = [
  {
    title: 'Sửa chữa động cơ',
    description: 'Chẩn đoán và khắc phục toàn bộ sự cố động cơ',
  },
  {
    title: 'Thay thế phụ tùng',
    description: 'Phụ tùng chính hãng, giá tốt nhất thị trường',
  },
  {
    title: 'Bảo dưỡng định kỳ',
    description: 'Gói bảo dưỡng theo km, tăng tuổi thọ xe',
  },
  {
    title: 'Sơn xe & làm đẹp',
    description: 'Phục hồi màu sắc, đánh bóng, decal theo yêu cầu',
  },
  {
    title: 'Điện xe & hệ thống',
    description: 'Sửa điện, thay ắc-quy, hệ thống đèn',
  },
  {
    title: 'Kiểm tra tổng quát',
    description: 'Kiểm tra 30 hạng mục trước mỗi chuyến đi dài',
  },
]

export function Services() {
  return (
    <section id="services" className="section-padding bg-canvas" aria-labelledby="services-heading">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <p className="label-upper text-accent">Dịch vụ</p>
            <h2 id="services-heading" className="mt-5 max-w-sm text-[clamp(42px,12vw,72px)] font-bold uppercase leading-[1.08] tracking-[-0.02em] text-ink md:text-[clamp(44px,6vw,72px)]">
              Ít lời. Làm đúng.
            </h2>
          </div>
          <p className="max-w-2xl text-base font-light leading-7 text-body md:col-span-6 md:col-start-7">
            Mỗi hạng mục được kiểm tra bằng quy trình rõ ràng, báo giá trước khi sửa và chỉ thay thế khi thật sự cần thiết.
          </p>
        </div>

        <div className="mt-16 border-b border-hairline">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group relative border-t border-hairline px-0 py-8 transition-[background-color,border-color,padding] duration-200 ease-out hover:border-accent hover:bg-surface-card md:px-8 md:hover:px-10"
            >
              <span className="pointer-events-none absolute left-0 top-3 text-6xl font-bold leading-none text-accent-light opacity-60 md:left-8 md:text-7xl">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="relative grid items-center gap-6 md:grid-cols-12">
                <div className="md:col-span-5 md:col-start-2">
                  <h3 className="text-4xl font-bold uppercase leading-[1.08] tracking-[-0.01em] text-ink md:text-5xl">{service.title}</h3>
                </div>
                <p className="max-w-xl text-sm font-light leading-6 text-body md:col-span-5 md:text-base">{service.description}</p>
                <div className="md:col-span-1 md:justify-self-end">
                  <span className="grid h-9 w-9 place-items-center bg-accent-light transition-colors duration-200 ease-out group-hover:bg-accent">
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-accent transition-[color,transform] duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                      strokeWidth={1.5}
                    />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
