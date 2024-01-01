import { headers } from "next/headers";

export const useUserAgent = () => {
  const header = headers();

  const userAgent = header.get("User-Agent");
  const isMobile = /Mobile/.test(userAgent);

  return { userAgent, isMobile };
}

export const UserAgentComponent = ({
  desktop,
  mobile,
}) => {
  const { isMobile } = useUserAgent();
  return isMobile ? mobile : desktop;
}