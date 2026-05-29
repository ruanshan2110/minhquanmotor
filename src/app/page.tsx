import { About } from '@/components/sections/About'
import { Booking } from '@/components/sections/Booking'
import { Hero } from '@/components/sections/Hero'
import { Process } from '@/components/sections/Process'
import { Services } from '@/components/sections/Services'
import { Stats } from '@/components/sections/Stats'
import { Testimonials } from '@/components/sections/Testimonials'

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-garage-base">
      <Hero />
      <Services />
      <Stats />
      <About />
      <Process />
      <Testimonials />
      <Booking />
    </main>
  )
}
