import fs from "fs/promises";
import path from "path";
import { format } from "date-fns";
import ResumeContent from "./resumeContent";

export default async function ResumePage() {
  const filePath = path.join(
    process.cwd(),
    "app",
    "(resume)",
    "resume",
    "page.tsx"
  );
  let lastUpdated = "Unknown";
  try {
    const fileStats = await fs.stat(filePath);
    lastUpdated = format(fileStats.mtime, "yyyy.MM.dd");
  } catch (error) {
    console.error("Error fetching last updated:", error);
  }

  return <ResumeContent lastUpdated={lastUpdated} />;
}
