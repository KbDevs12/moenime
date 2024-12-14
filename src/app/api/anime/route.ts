import MoeFecher from "@/libs/MoeFetcher";
import { NextRequest } from "next/server";
import * as cheerio from "cheerio";
import { AnimeEpsData } from "@/types/types";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const params = req.nextUrl.searchParams;
      const slug = params.get("slug");

      if (!slug) {
        return Response.json(
          { error: "Slug parameter is required" },
          { status: 400 }
        );
      }

      const response = await MoeFecher(`/anime/${slug}`);

      if (!response || !response.data) {
        return Response.json(
          { error: "No data received from source" },
          { status: 404 }
        );
      }

      const $ = cheerio.load(response.data);
      const data: AnimeEpsData = {
        thumbnail: $("#venkonten .fotoanime img").attr("src"),
        title: undefined,
        japaneseTitle: undefined,
        score: undefined,
        producer: undefined,
        type: undefined,
        status: undefined,
        totalEps: undefined,
        duration: undefined,
        releaseDate: undefined,
        studio: undefined,
        genre: undefined,
        synopsis: undefined,
        eps: [],
        recommendedAnime: [],
      };

      const $infozone = $(".infozingle p");

      $infozone.each((_, element) => {
        const $element = $(element);
        const text = $element.text().trim();

        if (text.startsWith("Judul:")) {
          data.title = text.replace("Judul:", "").trim();
        } else if (text.startsWith("Japanese:")) {
          data.japaneseTitle = text.replace("Japanese:", "").trim();
        } else if (text.startsWith("Skor:")) {
          data.score = text.replace("Skor:", "").trim();
        } else if (text.startsWith("Produser:")) {
          data.producer = text.replace("Produser:", "").trim();
        } else if (text.startsWith("Tipe:")) {
          data.type = text.replace("Tipe:", "").trim();
        } else if (text.startsWith("Status:")) {
          data.status = text.replace("Status:", "").trim();
        } else if (text.startsWith("Total Episode:")) {
          data.totalEps = text.replace("Total Episode:", "").trim();
        } else if (text.startsWith("Durasi:")) {
          data.duration = text.replace("Durasi:", "").trim();
        } else if (text.startsWith("Tanggal Rilis:")) {
          data.releaseDate = text.replace("Tanggal Rilis:", "").trim();
        } else if (text.startsWith("Studio:")) {
          data.studio = text.replace("Studio:", "").trim();
        } else if (text.startsWith("Genre:")) {
          data.genre = text.replace("Genre:", "").trim();
        }
      });

      data.synopsis = $(".sinopc").text().trim() || undefined;

      $(".episodelist li").each((_, element) => {
        const $ep = $(element).find("a");
        const epsDate = $(element).find(".zeebr").text();
        data.eps.push({
          epsTitle: $ep.text()?.trim(),
          epsSlug:
            $ep.attr("href")?.split("/episode/")[1]?.split("/")[0] ||
            $ep.attr("href")?.split("/lengkap/")[1]?.split("/")[0],
          epsDate,
        });
      });

      $(".isi-anime").each((_, element) => {
        const isi = $(element);
        data.recommendedAnime.push({
          recommendedTitle: isi.find(".judul-anime").text(),
          recommendedImage: isi.find("img").attr("src") || "",
          recommendedSlug: isi
            .find("a")
            .attr("href")
            ?.split("/anime/")[1]
            .split("/")[0],
        });
      });

      return Response.json({ data }, { status: 200 });
    } catch (error) {
      console.error("Error fetching anime details:", error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  } else {
    return Response.json(
      {
        error: "method not allowed",
        message: "This endpoint only supports GET requests.",
      },
      { status: 405 }
    );
  }
}
