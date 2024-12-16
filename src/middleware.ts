import { NextRequest, NextResponse } from "next/server";

const allowedOrigin =
  process.env.NEXT_PUBLIC_BASE_URL || "https://moe.devv.my.id";

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin");

  if (origin && origin !== allowedOrigin) {
    return NextResponse.json(
      {
        error: "Forbidden",
        message: "Requests from this origin are not allowed.",
      },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
