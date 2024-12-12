"use client";

import { searchInteface } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Tooltip } from "react-tooltip";

export default function Search() {
  const [searchData, setSearchData] = useState<searchInteface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useSearchParams();
  const query = params.get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const result = await response.json();
        setSearchData(result);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        setSearchData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (!query) {
    return (
      <div className="flex items-center justify-center h-screen text-violet-700">
        <p className="text-2xl font-semibold">Masukkan kata kunci pencarian</p>
      </div>
    );
  }

  return (
    <Suspense>
      <div className="container mx-auto px-4 py-8">
        <section className="mb-10">
          <h1 className="text-3xl font-semibold text-violet-700 mb-4">
            Hasil Pencarian: "{query}"
          </h1>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-violet-200 animate-pulse h-80 rounded-lg"
                />
              ))}
            </div>
          ) : error ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          ) : searchData.length === 0 ? (
            <div className="text-center text-violet-700">
              <p className="text-xl">Tidak ada hasil yang ditemukan</p>
              <p className="text-sm text-violet-500 mt-2">
                Coba kata kunci lain
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 grid-cols-1 gap-8 w-full">
              {searchData?.map((anime, index) => (
                <Link
                  key={index}
                  href={`/anime/${anime.slug}`}
                  className="bg-gradient-to-br from-violet-300 to-violet-500 overflow-visible shadow-lg rounded-lg b-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative"
                >
                  <div className="relative z-0">
                    {anime.thumbnail ? (
                      <img
                        src={anime.thumbnail}
                        alt={anime.title}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-violet-100 flex items-center justify-center">
                        <span className="text-violet-500">
                          Gambar Tidak Tersedia
                        </span>
                      </div>
                    )}
                    <div className="absolute top-0 right-0 m-2 bg-violet-700 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <span>Status:</span>
                      <span>{anime.status || "Tidak Diketahui"}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-white mb-2 truncate">
                      {anime.title || "Judul Tidak Tersedia"}
                    </h2>
                    <div className="flex flex-col gap-2">
                      <span
                        data-tooltip-id={`genre-tooltip-${index}`}
                        data-tooltip-content={anime.genre || "Tidak diketahui"}
                        className="text-sm text-white"
                      >
                        Genre: {anime.genre || "Tidak diketahui"}
                      </span>
                      <Tooltip
                        id={`genre-tooltip-${index}`}
                        place="top"
                        className="!z-[9999] !absolute !bg-violet-800 !text-white !overflow-hidden !max-w-[300px] !w-auto"
                      />
                      <span className="text-sm font-bold text-yellow-300">
                        Rating: {anime.rating || "N/A"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {searchData.length > 0 && (
          <div className="flex justify-center mt-10">
            <Link
              href="/anime"
              className="px-6 py-2 bg-violet-700 text-white rounded-full hover:bg-violet-900 transition-colors duration-300"
            >
              Jelajahi Lebih Banyak Anime
            </Link>
          </div>
        )}
      </div>
    </Suspense>
  );
}
