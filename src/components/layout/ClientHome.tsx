"use client";
import { HomeData } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "../ui/Card";

export default function ClientHome() {
  const [data, setData] = useState<HomeData>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/home");

        if (!response) console.log("something wrong.");

        const getRes = await response.json();
        setData(getRes);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <section
        id="hero"
        className="flex flex-col md:flex-row items-center justify-between md:mt-0 mt-10 mx-auto md:max-w-5xl w-full md:px-0 px-8"
      >
        <div className="flex flex-col gap-y-2 mt-20 w-full md:w-auto text-center md:text-left">
          <h1 className="font-semibold md:text-5xl text-3xl text-violet-700">
            Moenime.
          </h1>
          <p className="text-violet-300 md:text-base text-sm">
            nonton anime dimana saja dan kapan saja!
          </p>
          <Link
            href={"#anime"}
            className="self-center md:self-start mt-5 px-5 py-2 rounded-full font-semibold bg-violet-900 w-fit hover:translate-y-1 transition-all hover:opacity-50 duration-300"
          >
            Jelajahi!
          </Link>
        </div>
        <div className="flex w-full md:w-72 items-center mt-10 justify-center">
          <img
            src="/test.avif"
            alt=""
            className="object-cover w-full max-w-md md:max-w-none bg-blend-screen"
          />
        </div>
      </section>

      <section className="list flex flex-col items-center mt-10 w-full">
        <div className="header flex flex-row items-center justify-between w-full md:px-10 px-4">
          <p className="font-semibold text-xl">Anime Terbaru:</p>
          <Link
            href={"/anime"}
            className="hover:text-violet-700 transition-colors text-sm duration-300"
          >
            Lihat Selengkapnya...
          </Link>
        </div>
        <div
          id="anime"
          className="grid md:grid-cols-3 grid-cols-1 gap-8 md:max-w-5xl max-w-80 mt-10 mx-auto w-full px-4 md:px-0"
        >
          {data?.data.map((anime, index) => (
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

      <section className="list flex flex-col items-center my-10 w-full">
        <div className="header flex flex-row items-center justify-between w-full md:px-10 px-4">
          <p className="font-semibold text-xl">Tamat :</p>
          <Link
            href={"/anime"}
            className="hover:text-violet-700 transition-colors text-sm duration-300"
          >
            Lihat Selengkapnya...
          </Link>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 md:max-w-5xl max-w-80 mt-10 mx-auto w-full px-4 md:px-0">
          {data?.compeletedData.map((anime, index) => (
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
        className="flex flex-col items-center justify-center gap-y-4 md:max-w-3xl bg-violet-700 text-white p-6 mx-auto mt-10 md:rounded-full shadow-xl max-w-sm px-10 md:px-6"
      >
        <h2 className="font-bold text-2xl text-center">Ada pertanyaan?</h2>
        <p className="text-center text-sm px-4 md:px-0">
          Hubungi kami melalui email dan kami akan segera membantu Anda!
        </p>
        <a
          href="mailto:owner@devv.my.id"
          className="mt-2 px-5 py-2 text-white font-semibold bg-violet-900 rounded-full hover:translate-y-1 transition-all hover:opacity-80 duration-300"
        >
          Kirim Email
        </a>
      </section>

      <section
        id="ownership-notice"
        className="relative -z-10 bg-violet-900 py-4 text-center text-sm pt-32 -mt-20 px-4"
      >
        <p>
          Semua data dan konten di website ini adalah milik <b>Otakudesu</b>.
        </p>
      </section>

      <section
        id="credit"
        className="flex flex-col items-center justify-center gap-y-4 py-6 bg-violet-900 px-4"
      >
        <h2 className="font-bold text-xl text-center">Credit</h2>
        <p className="text-center text-sm">
          Website ini dibuat dengan cinta oleh KangBakso.
        </p>
        <ul className="flex flex-wrap justify-center gap-6 mt-4">
          <li className="text-sm font-semibold">
            Developer:{" "}
            <span className="text-violet-300 transition-colors duration-300 hover:text-violet-700">
              KangBakso
            </span>
          </li>
          <li className="text-sm font-semibold">
            Designer:{" "}
            <span className="text-violet-300 transition-colors duration-300 hover:text-violet-700">
              KangBakso
            </span>
          </li>
          <li className="text-sm font-semibold">
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
