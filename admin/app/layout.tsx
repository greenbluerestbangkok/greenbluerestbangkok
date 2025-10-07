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
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-lg">
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="flex items-center justify-center h-16 bg-green-600 text-white">
                <h1 className="text-xl font-bold">GreenBlueRest</h1>
              </div>
              
              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4">
                <div className="px-3 mb-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                    เมนูหลัก
                  </p>
                  
                  <a href="/" className="flex items-center px-4 py-2 mb-1 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors">
                    <span className="font-medium">Dashboard</span>
                  </a>
                  
                  <a href="/trips" className="flex items-center px-4 py-2 mb-1 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors">
                    <span className="font-medium">จัดการทริป</span>
                  </a>
                  
                  <a href="/products" className="flex items-center px-4 py-2 mb-1 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors">
                    <span className="font-medium">จัดการสินค้า</span>
                  </a>
                  
                  <a href="/articles" className="flex items-center px-4 py-2 mb-1 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors">
                    <span className="font-medium">จัดการบทความ</span>
                  </a>
                  
                  <a href="/videos" className="flex items-center px-4 py-2 mb-1 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors">
                    <span className="font-medium">จัดการวิดีโอ</span>
                  </a>
                  
                  <a href="/entrepreneurs" className="flex items-center px-4 py-2 mb-1 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors">
                    <span className="font-medium">ผู้ประกอบการ</span>
                  </a>
                </div>
                
                <div className="px-3 mb-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                    เครื่องมือ
                  </p>
                  
                  <a href="/media" className="flex items-center px-4 py-2 mb-1 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors">
                    <span className="font-medium">จัดการสื่อ</span>
                  </a>
                  
                  <a href="/analytics" className="flex items-center px-4 py-2 mb-1 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors">
                    <span className="font-medium">สถิติ</span>
                  </a>
                  
                  <a href="/settings" className="flex items-center px-4 py-2 mb-1 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors">
                    <span className="font-medium">การตั้งค่า</span>
                  </a>
                </div>
              </nav>
              
              {/* User Section */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Admin</p>
                    <p className="text-xs text-gray-500">ผู้ดูแลระบบ</p>
                  </div>
                </div>
                
                <a
                  href="/login"
                  className="flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                >
                  ออกจากระบบ
                </a>
              </div>
            </div>
          </aside>
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Header */}
            <header className="bg-white shadow-sm">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    ระบบจัดการเนื้อหา
                  </h2>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      {new Date().toLocaleDateString('th-TH', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <a
                      href="/login"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                    >
                      เข้าสู่ระบบ
                    </a>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}