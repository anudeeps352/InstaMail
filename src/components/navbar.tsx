import Image from 'next/image';
import logo from '../../public/Logo.png';
export default function Navbar() {
  return (
    <nav className="flex items-center w-full px-2 py-3 lg:px-9 md:py-5 ">
      <Image src={logo} alt="Logo" width={50} />
    </nav>
  );
}
