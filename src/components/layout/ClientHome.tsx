"use client";
import { HomeData } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Card, { CardSkeleton } from "../ui/Card";

export default function ClientHome() {
  const [data, setData] = useState<HomeData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/home");

        if (!response.ok) {
          console.error("Failed to fetch data");
          setLoading(false);
          return;
        }

        const getRes = await response.json();
        setData(getRes);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <section
        id="hero"
        className="flex flex-col md:flex-row items-center justify-between md:mt-0 mt-6 mx-auto md:max-w-5xl w-full md:px-0 px-4"
      >
        <div className="flex flex-col gap-y-2 mt-10 sm:mt-20 w-full md:w-auto text-center md:text-left">
          <h1 className="font-semibold text-2xl sm:text-4xl md:text-5xl text-violet-700">
            Moenime.
          </h1>
          <p className="text-violet-300 text-xs sm:text-sm md:text-base">
            nonton anime dimana saja dan kapan saja!
          </p>
          <Link
            href={"#anime"}
            className="self-center md:self-start mt-3 sm:mt-5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold bg-violet-900 w-fit hover:translate-y-1 transition-all hover:opacity-50 duration-300 text-sm sm:text-base"
          >
            Jelajahi!
          </Link>
        </div>
        <div className="flex w-full md:w-72 items-center mt-6 sm:mt-10 justify-center">
          <img
            src="/test.avif"
            alt="Hero Image"
            className="object-cover w-full max-w-md md:max-w-none bg-blend-screen"
            loading="lazy"
          />
        </div>
      </section>

      <section className="list flex flex-col items-center mt-6 sm:mt-10 w-full">
        <div className="header flex flex-row items-center justify-between w-full md:px-10 px-4">
          <p className="font-semibold text-base sm:text-xl">Anime Terbaru:</p>
          <Link
            href={"/anime"}
            className="hover:text-violet-700 transition-colors text-xs sm:text-sm duration-300"
          >
            Lihat Selengkapnya...
          </Link>
        </div>
        <div
          id="anime"
          className="grid md:grid-cols-3 grid-cols-2 gap-4 sm:gap-8 md:max-w-5xl max-w-80 mt-6 sm:mt-10 mx-auto w-full px-4 md:px-0"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : data?.data.map((anime, index) => (
                <Card
                  key={index}
                  slug={anime.slug}
                  title={anime.title}
                  eps={anime.eps}
                  type={anime.type}
                  uploadDate={anime.uploadDate}
                  image={anime.image}
                />
              ))}
        </div>
      </section>

      <section className="list flex flex-col items-center my-6 sm:my-10 w-full">
        <div className="header flex flex-row items-center justify-between w-full md:px-10 px-4">
          <p className="font-semibold text-base sm:text-xl">Tamat :</p>
          <Link
            href={"/anime"}
            className="hover:text-violet-700 transition-colors text-xs sm:text-sm duration-300"
          >
            Lihat Selengkapnya...
          </Link>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4 sm:gap-8 md:max-w-5xl max-w-80 mt-6 sm:mt-10 mx-auto w-full px-4 md:px-0">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : data?.compeletedData.map((anime, index) => (
                <Card
                  key={index}
                  slug={anime.slug}
                  title={anime.title}
                  eps={anime.eps}
                  type={anime.type}
                  uploadDate={anime.uploadDate}
                  image={anime.image}
                />
              ))}
        </div>
      </section>

      <section
        id="cta"
        className="flex flex-col items-center justify-center gap-y-2 sm:gap-y-4 md:max-w-3xl bg-violet-700 text-white p-4 sm:p-6 mx-auto mt-6 sm:mt-10 md:rounded-full shadow-xl max-w-sm px-6 sm:px-10 md:px-6"
      >
        <h2 className="font-bold text-xl sm:text-2xl text-center">
          Ada pertanyaan?
        </h2>
        <p className="text-center text-xs sm:text-sm px-2 sm:px-4 md:px-0">
          Hubungi kami melalui email dan kami akan segera membantu Anda!
        </p>
        <a
          href="mailto:owner@devv.my.id"
          className="mt-1 sm:mt-2 px-4 sm:px-5 py-1.5 sm:py-2 text-white font-semibold bg-violet-900 rounded-full hover:translate-y-1 transition-all hover:opacity-80 duration-300 text-sm sm:text-base"
        >
          Kirim Email
        </a>
      </section>

      <section
        id="ownership-notice"
        className="relative -z-10 bg-violet-900 py-4 text-center text-xs sm:text-sm pt-20 sm:pt-32 -mt-10 sm:-mt-20 px-4"
      >
        <p>
          Semua data dan konten di website ini adalah milik <b>Otakudesu</b>.
        </p>
      </section>

      <section
        id="credit"
        className="flex flex-col items-center justify-center gap-y-2 sm:gap-y-4 py-4 sm:py-6 bg-violet-900 px-4"
      >
        <h2 className="font-bold text-base sm:text-xl text-center">Credit</h2>
        <p className="text-center text-xs sm:text-sm">
          Website ini dibuat dengan cinta oleh KangBakso.
        </p>
        <ul className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-2 sm:mt-4">
          <li className="text-xs sm:text-sm font-semibold">
            Developer:{" "}
            <span className="text-violet-300 transition-colors duration-300 hover:text-violet-700">
              KangBakso
            </span>
          </li>
          <li className="text-xs sm:text-sm font-semibold">
            Designer:{" "}
            <span className="text-violet-300 transition-colors duration-300 hover:text-violet-700">
              KangBakso
            </span>
          </li>
          <li className="text-xs sm:text-sm font-semibold">
            Content:{" "}
            <Link href={"https://otakudesu.cloud"}>
              <span className="text-violet-300 transition-colors duration-300 hover:text-violet-700">
                Otakudesu
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
