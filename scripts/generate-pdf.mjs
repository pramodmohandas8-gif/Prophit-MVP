import puppeteer from "puppeteer-core";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const TOTAL_SLIDES = 18;
const BASE = "http://localhost:3004";
const WIDTH = 1920;
const HEIGHT = 1080;

async function run() {
  console.log("Launching Chrome...");
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new",
    args: [`--window-size=${WIDTH},${HEIGHT}`],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });

  // Use the main deck page and navigate with arrow keys
  // But simpler: visit each standalone page and print each as a single-page PDF, then merge

  // Strategy: Create one HTML page, navigate to each slide, add to a combined PDF
  // Actually simplest: navigate to the deck page, iterate through slides, and print

  // Navigate to deck page
  console.log("Loading deck...");
  await page.goto(`${BASE}/deck`, { waitUntil: "networkidle0", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1500));

  // We'll use CDP to create a PDF with all slides by:
  // 1. Screenshot each slide as a data URL
  // 2. Build an HTML document
  // 3. Print to PDF using file:// with a temp HTML

  const screenshots = [];

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    if (i > 0) {
      await page.keyboard.press("ArrowRight");
      await new Promise((r) => setTimeout(r, 800));
    }
    const num = String(i + 1).padStart(2, "0");
    console.log(`Capturing slide ${num}/${TOTAL_SLIDES}...`);
    const buf = await page.screenshot({ type: "png", fullPage: false });
    screenshots.push(buf);
  }

  console.log("Generating PDF...");

  // Open a new page and build the PDF directly using individual goto + emulateMediaType
  const pdfPage = await browser.newPage();
  await pdfPage.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });

  // Write a temp HTML file with embedded images
  const { writeFileSync, unlinkSync } = await import("fs");
  const tmpPath = join(__dirname, "..", "_deck-temp.html");

  const imgTags = screenshots
    .map((buf) => {
      const b64 = buf.toString("base64");
      return `<div style="page-break-after:always;width:1920px;height:1080px;overflow:hidden"><img src="data:image/png;base64,${b64}" style="width:100%;height:100%;display:block;object-fit:cover"/></div>`;
    })
    .join("");

  const html = `<!DOCTYPE html><html><head><style>*{margin:0;padding:0}@page{size:1920px 1080px;margin:0}</style></head><body>${imgTags}</body></html>`;
  writeFileSync(tmpPath, html);

  await pdfPage.goto(`file://${tmpPath}`, { waitUntil: "load", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2000));

  const outPath = join(__dirname, "..", "PropHit-Deck.pdf");
  await pdfPage.pdf({
    path: outPath,
    width: "1920px",
    height: "1080px",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  unlinkSync(tmpPath);
  await browser.close();
  console.log(`\nDone! PDF saved to: ${outPath}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
