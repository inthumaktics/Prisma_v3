import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Heart,
} from "lucide-react";

// Brand icons are not exported in this version of lucide-react, define them locally as SVGs
function Github({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}


export default function Footer() {
  return (
    <footer className="bg-[#0F3D3E] text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Top Footer */}
        <div className="grid gap-10 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              PRISMA
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/75">
              AI-Powered ESG Intelligence Platform yang membantu
              investor, regulator, perusahaan, dan masyarakat
              memahami kredibilitas ESG melalui analisis berbasis AI,
              blockchain, dan data publik.
            </p>

            <div className="flex gap-3 mt-6">
              <a href="#">
                <Github className="w-5 h-5 hover:text-amber-400 transition" />
              </a>

              <a href="#">
                <Linkedin className="w-5 h-5 hover:text-amber-400 transition" />
              </a>

              <a href="#">
                <Mail className="w-5 h-5 hover:text-amber-400 transition" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4">
              Platform
            </h3>

            <ul className="space-y-3 text-sm text-white/75">
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/market">Market</Link></li>
              <li><Link to="/ranking">Ranking</Link></li>
              <li><Link to="/compare">Compare</Link></li>
              <li><Link to="/map">Map</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">
              Resources
            </h3>

            <ul className="space-y-3 text-sm text-white/75">
              <li><Link to="/education">Education</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><a href="#">Methodology</a></li>
              <li><a href="#">Documentation</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-white/75">

              <div className="flex gap-2 items-center">
                <MapPin size={16} />
                Yogyakarta, Indonesia
              </div>

              <div>
                hello@prisma.id
              </div>

              <div>
                +62 812-3456-7890
              </div>

            </div>
          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-white/10 my-10" />

        {/* Bottom */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} PRISMA • AI-Powered ESG Intelligence Platform
          </p>

          <div className="flex items-center gap-2 text-sm text-white/60">
            Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> for Sustainable Future
          </div>

        </div>

        {/* Disclaimer */}

        <div className="mt-8 rounded-xl bg-white/5 border border-white/10 p-4">

          <p className="text-xs leading-6 text-white/60 text-center">
            <strong>Disclaimer:</strong> PRISMA merupakan prototipe konseptual
            untuk penelitian dan demonstrasi. Seluruh data perusahaan,
            skor ESG, laporan keberlanjutan, serta informasi yang ditampilkan
            merupakan data simulasi dan tidak merepresentasikan kondisi
            perusahaan yang sebenarnya.
          </p>

        </div>

      </div>
    </footer>
  );
}