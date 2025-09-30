import type { Metadata } from 'next'
import { IBM_Plex_Sans_Thai } from 'next/font/google'
import './globals.css'

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ['thai'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans-thai',
})

export const metadata: Metadata = {
  title: 'Admin Panel - GreenBlueRest Bangkok',
  description: 'ระบบจัดการเนื้อหาและสื่อ GreenBlueRest Bangkok',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className={`${ibmPlexSansThai.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <a href="/admin" className="text-2xl font-bold text-green-600">
                    GreenBlueRest Bangkok
                  </a>
                  <span className="ml-3 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Admin Panel
                  </span>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="/admin" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </a>
                  <a href="/admin/articles" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                    จัดการบทความ
                  </a>
                  <a href="/admin/trips" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                    จัดการทริป
                  </a>
                  <a href="/admin/products" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                    จัดการสินค้า
                  </a>
                  <a href="/admin/operators" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                    จัดการผู้ประกอบการ
                  </a>
                  <a href="/admin/media" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                    จัดการสื่อ
                  </a>
                  <a href="/admin/settings" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                    การตั้งค่า
                  </a>
                </nav>
                <div className="flex items-center space-x-4">
                  <a
                    href="/admin/login"
                    className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    ออกจากระบบ
                  </a>
                </div>
              </div>
            </div>
          </header>
          
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}