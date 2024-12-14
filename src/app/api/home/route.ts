import MoeFecher from "@/libs/MoeFetcher";
import * as cheerio from "cheerio";
import { animeData } from "@/types/types";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  try {
    const response = await MoeFecher("/");

    if (!response || !response.data) {
      return Response.json(
        { error: "No data received from source" },
        { status: 404 }
      );
    }

    const $ = cheerio.load(response.data);

    const data: animeData[] = [];
    const compeletedData: animeData[] = [];

    const firstVenz = $(".venz").first();
    const lastVenz = $(".venz").last();

    if (firstVenz.length === 0 || lastVenz.length === 0) {
      return Response.json(
        { error: "Unable to find anime content" },
        { status: 422 }
      );
    }

    firstVenz.find("li .detpost").each((_, element) => {
      try {
        const eps = $(element).find(".epz").text().trim();
        const type = $(element).find(".epztipe").text().trim();
        const uploadDate = $(element).find(".newnime").text().trim();
        const image = $(element).find(".thumbz img").attr("src") || "";
        const title = $(element).find(".jdlflm").text().trim();
        const getSlug = $(element).find("a").attr("href");
        const slug = getSlug
          ? getSlug.trim().split("/anime/")[1].split("/")[0]
          : "";

        if (title) {
          data.push({
            title,
            eps,
            type,
            uploadDate,
            image,
            slug,
          });
        }
      } catch (itemError) {
        console.error(`Error processing ongoing anime item: ${itemError}`);
      }
    });

    lastVenz.find("li .detpost").each((_, element) => {
      try {
        const eps = $(element).find(".epz").text().trim();
        const type = $(element).find(".epztipe").text().trim();
        const uploadDate = $(element).find(".newnime").text().trim();
        const image = $(element).find(".thumbz img").attr("src") || "";
        const title = $(element).find(".jdlflm").text().trim();
        const getSlug = $(element).find("a").attr("href");
        const slug = getSlug
          ? getSlug.trim().split("/anime/")[1].split("/")[0]
          : "";

        if (title) {
          compeletedData.push({
            title,
            eps,
            type,
            uploadDate,
            image,
            slug,
          });
        }
      } catch (itemError) {
        console.error(`Error processing completed anime item: ${itemError}`);
      }
    });

    if (data.length === 0 && compeletedData.length === 0) {
      return Response.json({ error: "No anime data found" }, { status: 204 });
    }

    return Response.json(
      {
        data,
        compeletedData,
        totalOngoing: data.length,
        totalCompleted: compeletedData.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    if (error instanceof TypeError) {
      return Response.json(
        { error: "Network or type error occurred", details: error.message },
        { status: 503 }
      );
    } else if (error instanceof Error) {
      return Response.json(
        { error: "Internal server error", details: error.message },
        { status: 500 }
      );
    } else {
      return Response.json(
        { error: "Unknown error occurred" },
        { status: 400 }
      );
    }
  }
}
