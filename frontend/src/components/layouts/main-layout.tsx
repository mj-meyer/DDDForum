import { Blocks } from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from '../ui/link'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  return (
    <header className="flex justify-between items-center p-4 bg-orange-500 text-white">
      <div className="flex items-center gap-3">
        <Blocks className="size-10" />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Domain-Driven Designers</h1>
          <p className="text-xs">
            Where awesome Domain-Driven Designers are made
          </p>
        </div>
      </div>
      {location.pathname !== '/register' && (
        <Link to="/register">
          <Button
            variant="outline"
            className="bg-black text-white border-orange-400 hover:bg-black/60 hover:text-white"
          >
            Join
          </Button>
        </Link>
      )}
    </header>
  )
}

const Navigation = () => (
  <nav className="flex space-x-4 p-4 bg-slate-100">
    <Link to="/" className="font-bold">
      Popular
    </Link>
    <Link to="/new" className="text-gray-500">
      New
    </Link>
    <Link to="/submit" className="text-blue-500">
      submit
    </Link>
  </nav>
)

export const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className="w-full h-full">
    <div className="max-w-3xl mx-auto h-full">
      <Header />
      <Navigation />
      <main className="p-4">{children}</main>
    </div>
  </div>
)
