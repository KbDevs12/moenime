"use server";
import axios from "axios";

interface ContentData {
  id: number;
  i: number;
  q: string;
}

export async function GetStreamFrame(
  contentBase64: string
): Promise<string | null> {
  try {
    const decodedContent: ContentData = JSON.parse(
      Buffer.from(contentBase64, "base64").toString("utf-8")
    );

    let nonce: string | null = null;

    if (!nonce) {
      const nonceResponse = await axios.post(
        "https://otakudesu.cloud/wp-admin/admin-ajax.php",
        {
          action: "aa1208d27f29ca340c92c66d1926f13f",
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      nonce = nonceResponse.data.data;
    }

    const response = await axios.post(
      "https://otakudesu.cloud/wp-admin/admin-ajax.php",
      {
        ...decodedContent,
        nonce: nonce,
        action: "2a3505c93b0035d3f455df82bf976b84",
      },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const result = Buffer.from(response.data.data, "base64").toString("utf-8");

    return result;
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return null;
  }
}
