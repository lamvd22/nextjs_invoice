import type { Metadata } from 'next'
import './globals.css'
import ColorModeSwitcher from '@/components/Sidebar/ColorModeSwitcher'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Blue Verse Invoice',
  description: 'Invoice Demo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <div>
        <div className="flex overflow-hidden h-screen bg-[#F8F8FB] dark:bg-[#0b0b13] dark:text-white">
          <aside className="absolute top-0 left-0 h-screen bg-[#252945] rounded-r-2xl z-10">
            <div className="w-[90px] overflow-auto bg-[#7C5DFA] rounded-r-2xl">
              <Image className="w-[36px] mx-[27px] my-[28px] block absolute" width={28} height={26} src={'/assets/logo.svg'} alt="Logo"/>
              <div className="w-full h-[45px] mt-[45px] bg-[#9277FF] rounded-tl-2xl"></div>
            </div>
            <div className="w-full absolute bottom-0">
              {/* --Dark Mode Switcher-- */}
              <ColorModeSwitcher />
              <div>
                <Link className="block overflow-auto border-t border-solid border-gray-500" href="/">
                  <Image className="rounded-full w-[36px] m-[27px]" width={80} height={80} src={'/assets/image-avatar.jpg'}  alt="Avatar"/>
                </Link>
              </div>
            </div>
          </aside>
          <div className="flex flex-col overflow-y-auto overflow-x-hidden w-screen items-center">
            {children}
          </div>
        </div>
      </div>
      </body>
    </html>
  )
}
