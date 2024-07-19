import { Blocks } from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from '../ui/link'
import { ReactNode } from 'react'

const Header = () => (
  <header className="flex justify-between items-center p-4 bg-orange-500 text-white">
    <div className="flex items-center gap-2">
      <Blocks />
      <h1 className="text-xl font-bold">Domain-Driven Designers</h1>
    </div>
    <p className="text-sm">Where awesome Domain-Driven Designers are made</p>
    <Button variant="outline" className="bg-black text-white hover:bg-gray-800">
      Join
    </Button>
  </header>
)

const Navigation = () => (
  <nav className="flex space-x-4 p-4 bg-gray-100">
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

// MainLayout Component
const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className="max-w-3xl mx-auto">
    <Header />
    <Navigation />
    <main className="p-4">{children}</main>
  </div>
)

export { MainLayout }
