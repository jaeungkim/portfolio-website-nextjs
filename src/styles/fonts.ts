import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/pretendard/Pretendard-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/pretendard/Pretendard-SemiBold.woff2",
      weight: "600",
    },
  ],
});
