import Footer from './components/Footer'
import Navbar from './components/Navbar'

export default function Home() {
  const navbarLinks = [
    { href: '/', key: 'test', name: 'test' },
    { href: '/', key: 'test2', name: 'test2' },
  ]
  return (
    <main>
      <Navbar links={navbarLinks} />
      <div className=" min-h-screen">hello</div>
      <Footer />
    </main>
  )
}
