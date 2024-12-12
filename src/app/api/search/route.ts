import MoeFecher from "@/libs/MoeFetcher";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";
import { searchInteface } from "@/types/types";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const params = req.nextUrl.searchParams;
      const query = params.get("query");

      if (!query) {
        return NextResponse.json(
          { error: "Query parameter is required" },
          { status: 400 }
        );
      }

      const response = await MoeFecher(`/?s=${query}&post_type=anime`);

      if (!response || !response.data) {
        return NextResponse.json(
          { error: "No data received from source" },
          { status: 404 }
        );
      }

      const $ = cheerio.load(response.data);
      const searchResults: searchInteface[] = [];

      $(".venutama .chivsrc li").each((_, element) => {
        const title = $(element).find("h2").text().trim();
        const genre = $(element)
          .find('.set:contains("Genres")')
          .text()
          .replace("Genres :", "")
          .trim();
        const status = $(element)
          .find('.set:contains("Status")')
          .text()
          .replace("Status :", "")
          .trim();
        const rating = $(element)
          .find('.set:contains("Rating")')
          .text()
          .replace("Rating :", "")
          .trim();
        const thumbnail = $(element).find("img").attr("src");
        const slug = $(element)
          .find("h2 a")
          .attr("href")
          ?.trim()
          ?.split("/anime/")[1]
          ?.split("/")[0];

        if (title) {
          searchResults.push({
            title,
            genre,
            status,
            rating,
            thumbnail,
            slug,
          });
        }
      });

      return NextResponse.json(searchResults, { status: 200 });
    } catch (error) {
      console.error("Search API Error:", error);
      return NextResponse.json(
        {
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
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
