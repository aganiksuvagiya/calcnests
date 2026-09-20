import { ImageResponse } from "next/og";
import { ogImageContent, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/ogImageTemplate";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function OpengraphImage() {
  return new ImageResponse(
    ogImageContent("All Calculators", "Money, math, home, education, date & time, and everyday tools."),
    size
  );
}
