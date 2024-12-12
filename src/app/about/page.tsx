import { Code, Laptop, Zap } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-violet-500">About Me</h1>

        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-violet-500">
            Web Scraping Project
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Selamat datang di website hasil eksplorasi saya dalam dunia web
            scraping! Proyek ini merupakan perjalanan pembelajaran mengekstraksi
            data dari{" "}
            <span className="text-violet-500 font-bold">otakudesu.cloud</span>,
            sebuah situs berbagi informasi anime yang menarik.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center">
            <Laptop className="mx-auto text-violet-500 mb-4" size={64} />
            <h3 className="text-xl font-semibold mb-2 text-violet-500">
              Teknologi
            </h3>
            <p>
              Menggunakan teknik web scraping modern dengan perpustakaan Python
              terkini.
            </p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center">
            <Code className="mx-auto text-violet-500 mb-4" size={64} />
            <h3 className="text-xl font-semibold mb-2 text-violet-500">
              Proses
            </h3>
            <p>
              Mengekstraksi dan mengolah data secara efisien dari berbagai
              halaman web.
            </p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center">
            <Zap className="mx-auto text-violet-500 mb-4" size={64} />
            <h3 className="text-xl font-semibold mb-2 text-violet-500">
              Tujuan
            </h3>
            <p>
              Mengubah data mentah menjadi informasi bermakna dan terstruktur.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 bg-opacity-50 rounded-lg p-6">
          <h2 className="text-3xl font-semibold mb-4 text-violet-500">
            Disclaimer
          </h2>
          <p className="text-lg leading-relaxed">
            Proyek ini murni untuk tujuan pendidikan dan pengembangan
            keterampilan. Seluruh data diambil dari{" "}
            <span className="text-violet-500 font-bold">otakudesu.cloud</span>
            dengan tujuan belajar dan menghormati sumber asli.
          </p>
        </div>
      </div>
    </div>
  );
}
