import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { CustomCursor } from '@/components/CustomCursor'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { GSAPProvider } from '@/components/providers/GSAPProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Minh Quân Motor | Sửa chữa xe máy chuyên nghiệp tại TP.HCM',
    template: '%s | Minh Quân Motor',
  },
  description:
    'Minh Quân Motor cung cấp dịch vụ sửa chữa, bảo dưỡng và chăm sóc xe máy chuyên nghiệp tại TP.HCM với quy trình rõ ràng, báo giá minh bạch và bảo hành 3 tháng.',
  applicationName: 'Minh Quân Motor',
  keywords: [
    'Minh Quân Motor',
    'sửa xe máy Quận 7',
    'bảo dưỡng xe máy TP.HCM',
    'sửa chữa xe máy chuyên nghiệp',
    'đặt lịch sửa xe máy',
  ],
  authors: [{ name: 'Minh Quân Motor' }],
  creator: 'Minh Quân Motor',
  publisher: 'Minh Quân Motor',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: '/',
    siteName: 'Minh Quân Motor',
    title: 'Minh Quân Motor | Sửa chữa xe máy chuyên nghiệp tại TP.HCM',
    description:
      'Đặt lịch sửa chữa và bảo dưỡng xe máy tại Minh Quân Motor: tiếp nhận đúng giờ, báo giá trước khi sửa và bảo hành 3 tháng.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="bg-canvas font-sans text-body antialiased">
        <GSAPProvider>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </GSAPProvider>
      </body>
    </html>
  )
}
