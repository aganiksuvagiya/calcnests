import { SITE_NAME } from "@/lib/seo";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png";

/** Shared visual template for every generated Open Graph / Twitter image. */
export function ogImageContent(title: string, subtitle: string) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
        background: "#ffffff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "#4f46e5",
            color: "#ffffff",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          C
        </div>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#0f172a" }}>{SITE_NAME}</div>
      </div>
      <div style={{ display: "flex", marginTop: 48, fontSize: 60, fontWeight: 800, color: "#0f172a", maxWidth: 1000 }}>
        {title}
      </div>
      <div style={{ display: "flex", marginTop: 20, fontSize: 32, color: "#64748b" }}>{subtitle}</div>
    </div>
  );
}
