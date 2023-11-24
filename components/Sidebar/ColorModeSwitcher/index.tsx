'use client'
import useColorMode from '@/hooks/useColorMode'

const ColorModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <button
      className="mx-[35px] my-[24px]"
      onClick={() => {
        if (typeof setColorMode === 'function') {
          setColorMode(colorMode === 'light' ? 'dark' : 'light')
        }
      }}
    >
      <img src={colorMode === 'light' ? '/assets/icon-moon.svg' : '/assets/icon-sun.svg'}/>
    </button>
  )
}

export default ColorModeSwitcher