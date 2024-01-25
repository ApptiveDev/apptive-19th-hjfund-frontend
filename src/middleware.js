import { NextResponse } from "next/server";

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-next-url", request.url);

  return NextResponse.next({
    request: {
      ...request,
      headers: requestHeaders,
    },
  });
}
