import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import { RiNetflixFill } from 'react-icons/ri';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black' : 'bg-transparent'
    }`}>
      <div className="px-4 md:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <RiNetflixFill className="w-8 h-8 text-red-600" />
            <span className="text-2xl font-bold text-white ml-2">NETFLIX</span>
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/" className="text-white hover:text-gray-300 transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/acara-tv" className="text-white hover:text-gray-300 transition">
                  Acara TV
                </Link>
              </li>
              <li>
                <Link href="/film" className="text-white hover:text-gray-300 transition">
                  Film
                </Link>
              </li>
              <li>
                <Link href="/terbaru" className="text-white hover:text-gray-300 transition">
                  Terbaru
                </Link>
              </li>
              <li>
                <Link href="/unduhan" className="text-white hover:text-gray-300 transition">
                  Unduhan Saya
                </Link>
              </li>
            </ul>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white">
            Masuk
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Daftar
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
