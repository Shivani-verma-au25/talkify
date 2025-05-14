import React from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { PaletteIcon } from 'lucide-react'
import { THEMES } from '..'

function ThemeSelector() {
  const { theme, setTheme } = useThemeStore()

  return (
    <div className='dropdown dropdown-end'>
      <button tabIndex={0} className='btn btn-ghost btn-circle'>
        <PaletteIcon className='size-5' />
      </button>
      <div tabIndex={0} className='dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border-base-content/10 max-h-80 overflow-y-auto'>
        <div className='space-y-1'>
          {THEMES.map((themeOpn) => {
            return (
              <button
                key={themeOpn.name}
                className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 transition-colors ${
                  theme === themeOpn.name ? 'bg-primary/10 text-primary' : 'hover:bg-base-content/5'
                }`}
                onClick={() => setTheme(themeOpn.name)}
              >
                <PaletteIcon className='size-4' />
                <span className='text-sm font-medium'>{themeOpn.label}</span>
                {/* theme preview colors */}
                <div className='ml-auto flex gap-2'>
                  {themeOpn.colors.map((color, i) => {
                    return (
                      <span
                        className='size-2 rounded-full'
                        key={i}
                        style={{ backgroundColor: color }}
                      ></span>
                    )
                  })}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ThemeSelector
