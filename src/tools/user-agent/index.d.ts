
export declare const useUserAgent: () => {
  isMobile: boolean;
  userAgent: string;
};

export declare const UserAgentComponent: React.FC<{
  mobile?: React.ReactNode;
  desktop?: React.ReactNode;
}>;