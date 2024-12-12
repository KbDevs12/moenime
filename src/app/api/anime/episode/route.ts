import MoeFecher from "@/libs/MoeFetcher";
import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { EpisodeInterfaces } from "@/types/types";

async function handler(req: NextRequest, res: NextResponse) {
  if (req.method === "GET") {
    try {
      const params = req.nextUrl.searchParams;
      const slug = params.get("slug");

      if (!slug) {
        return NextResponse.json(
          { error: "Slug parameter is required" },
          { status: 400 }
        );
      }

      const response = await MoeFecher(`/episode/${slug}`);

      if (!response) {
        return NextResponse.json(
          { error: "No data received from source" },
          { status: 404 }
        );
      }

      const $ = cheerio.load(response.data);

      const extractInfoData = (label: string): string => {
        return $(`.cukder .infozingle p:contains("${label}")`)
          .text()
          .replace(`${label}:`, "")
          .trim();
      };

      const episodeData: EpisodeInterfaces = {
        title: $(".venutama .posttl").text(),
        anyEps: $("select option")
          .map((_, el) => ({
            title: $(el).text() || undefined,
            slug:
              $(el).attr("value")?.split("/episode/")[1]?.split("/")[0] ||
              undefined,
          }))
          .get(),
        prevEps:
          $(".flir a:contains('Previous Eps.')")
            .attr("href")
            ?.split("/episode/")[1]
            .split("/")[0] || undefined,
        allEps:
          $(".flir a:contains('See All Episodes')")
            .attr("href")
            ?.split("/anime/")[1]
            .split("/")[0] || undefined,
        nextPrev:
          $(".flir a:contains('Next Eps.')")
            .attr("href")
            ?.split("/episode/")[1]
            .split("/")[0] || undefined,
        defaultStream:
          $(".responsive-embed-stream iframe").attr("src") || undefined,
        mirrorStream: {
          tigaEnam: { mega: "", odstream: "" },
          empatLapan: { mega: "", odstream: "" },
          tujuhDua: { mega: "", odstream: "" },
        },
        info: {
          thumbnail: $(".cukder img").attr("src"),
          type: extractInfoData("Tipe"),
          credit: extractInfoData("Credit"),
          encoder: extractInfoData("Encoder"),
          duration: extractInfoData("Duration"),
          genres: extractInfoData("Genres"),
        },
      };

      const extractMirrorLinks = (selector: any, resolution: string) => {
        return {
          mega:
            $(selector)
              .find(`.${resolution} li:contains("mega") a`)
              .attr("data-content") || "",
          odstream:
            $(selector)
              .find(`.${resolution} li:contains("odstream") a`)
              .attr("data-content") || "",
        };
      };

      const streamEl = $(".mirrorstream");
      episodeData.mirrorStream.tigaEnam = extractMirrorLinks(streamEl, "m360p");
      episodeData.mirrorStream.empatLapan = extractMirrorLinks(
        streamEl,
        "m480p"
      );
      episodeData.mirrorStream.tujuhDua = extractMirrorLinks(streamEl, "m720p");

      return NextResponse.json({ data: episodeData }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        {
          error: "An error occurred while processing the request",
          details: error,
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method not Allowed." },
      { status: 405 }
    );
  }
}

export { handler as GET };
