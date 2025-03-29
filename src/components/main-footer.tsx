"use client";

import logoLexicon from "@/assets/lexicon.png";
import logoUnicordoba from "@/assets/UNICOR.png";
import logoGicafs from "@/assets/gicafs.jpeg";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-200 text-white py-6 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
                {/* Logo 1 */}
                <Image
                    src={logoLexicon}
                    alt="logoLexicon"
                    width={80}
                    height={80}
                    className="object-contain"
                />

                {/* Logo 2 */}
                <Image
                    src={logoUnicordoba}
                    alt="Logo unicordoba"
                    width={80}
                    height={80}
                    className="object-contain"
                />

                {/* Logo 3 */}
                <Image
                    src={logoGicafs}
                    alt="Logo gicafs"
                    width={80}
                    height={80}
                    className="object-contain"
                />
            </div>
            <p className="text-center mt-4 text-sm text-gray-400">
                © {new Date().getFullYear()} Diccionario Kogui
            </p>
        </footer>
    );
};

export default Footer;
