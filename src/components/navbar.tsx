import { IconBook, IconBrain, IconMoon, IconPencil, IconSun, IconTools } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

export default function Navbar() {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'winter'
        return localStorage.getItem('theme') || 'winter'
    })

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [theme])

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === 'theme' && e.newValue) {
                setTheme(e.newValue)
            }
        }
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [])

    const toggleTheme = () => {
        setTheme(t => (t === 'night' ? 'winter' : 'night'))
    }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li><a href="/essay-generator"><IconPencil className='w-4 h-4 -mr-1' />Essay generator</a></li>
                        <li><a href="/dictionary"><IconBook className='w-4 h-4 -mr-1' />Dictionary</a></li>
                        <li><a href="/grammar"><IconBrain className='w-4 h-4 -mr-1' />Grammar</a></li>
                        <li>
                            <a><IconTools className='w-4 h-4 -mr-1' />Tools</a>
                            <ul className="p-2">
                                <li><a href="/flashcards">Flashcards</a></li>
                                <li><a href="/calendar">Calendar</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <a href='./' className="btn btn-ghost text-xl font-bold group">
                    HELL
                    <span className="ml-1 text-xs opacity-0 group-hover:opacity-60 transition">
                        🔥
                    </span>
                </a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a href="/essay-generator"><IconPencil className='w-4 h-4 -mr-1' />Essay generator</a></li>
                    <li><a href="/dictionary"><IconBook className='w-4 h-4 -mr-1' />Dictionary</a></li>
                    <li><a href="/grammar"><IconBrain className='w-4 h-4 -mr-1' />Grammar</a></li>
                    <li>
                        <details>
                            <summary><IconTools className='w-4 h-4 -mr-1' />Tools</summary>
                            <ul className="p-2 bg-base-100 w-40 z-1">
                                <li><a href="/flashcards">Flashcards</a></li>
                                <li><a href="/calendar">Calendar</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>

            <div className="navbar-end">
                <button
                    className="btn btn-square btn-ghost"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {theme === 'winter' ? <IconMoon /> : <IconSun />}
                </button>
            </div>
        </div>
    )
}
