import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="flex flex-col items-center justify-center gap-y-2 bg-violet-700 text-white py-6"
    >
      <p className="text-center font-semibold">
        © {new Date().getFullYear()} Moenime. All rights reserved.
      </p>
      <div className="flex gap-x-4">
        <Link
          href="/"
          className="text-sm hover:text-violet-300 transition-colors duration-300"
        >
          Beranda
        </Link>
        <Link
          href="/anime"
          className="text-sm hover:text-violet-300 transition-colors duration-300"
        >
          Anime
        </Link>
        <a
          href="mailto:owner@devv.my.id"
          className="text-sm hover:text-violet-300 transition-colors duration-300"
        >
          Kontak
        </a>
      </div>
    </footer>
  );
}
