const puppeteer = require("puppeteer");
const PPTX = require("pptxgenjs");
const path = require("path");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const PPT_WIDTH = 13.33;
const PPT_HEIGHT = 7.5;
const VIEWPORT_WIDTH = 1920;
const VIEWPORT_HEIGHT = 1080;

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: {
      width: VIEWPORT_WIDTH,
      height: VIEWPORT_HEIGHT,
      deviceScaleFactor: 1
    }
  });

  const page = await browser.newPage();
  const pptx = new PPTX();

  pptx.defineLayout({ name: "LAYOUT_16x9", width: PPT_WIDTH, height: PPT_HEIGHT });
  pptx.layout = "LAYOUT_16x9";

  const filePath = `file://${path.resolve("soc-analyst.html")}`;
  await page.goto(filePath, { waitUntil: "networkidle0" });

  /* =========================
     EXPORT-ONLY STYLES
  ========================= */
  await page.addStyleTag({
    content: `
      aside, footer { display: none !important; }

      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: white !important;
      }

      * {
        -webkit-font-smoothing: antialiased !important;
        text-rendering: geometricPrecision !important;
      }

      section[data-slide] {
        width: 1920px !important;
        height: 1080px !important;
        padding: 80px 96px !important;
        box-sizing: border-box !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
      }
    `
  });

  await delay(300);

  const sections = await page.$$(`section[data-slide]`);

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];

    await section.evaluate(el => el.scrollIntoView({ block: "start" }));
    await delay(200);

    /* =========================
       SCREENSHOT
    ========================= */
    const screenshot = await section.screenshot({
      type: "png",
      captureBeyondViewport: false
    });

    const slide = pptx.addSlide();

    slide.addImage({
      data: "data:image/png;base64," + screenshot.toString("base64"),
      x: 0,
      y: 0,
      w: PPT_WIDTH,
      h: PPT_HEIGHT
    });

    /* =========================
       EXTRACT LINKS
    ========================= */
    const links = await section.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll("a[href]"));
      return anchors.map(a => {
        const r = a.getBoundingClientRect();
        return {
          href: a.href,
          text: a.innerText,
          x: r.left,
          y: r.top,
          w: r.width,
          h: r.height
        };
      });
    });

    /* =========================
       ADD CLICKABLE OVERLAYS
    ========================= */
    for (const link of links) {
      if (!link.href || link.w < 5 || link.h < 5) continue;

      const x = (link.x / VIEWPORT_WIDTH) * PPT_WIDTH;
      const y = (link.y / VIEWPORT_HEIGHT) * PPT_HEIGHT;
      const w = (link.w / VIEWPORT_WIDTH) * PPT_WIDTH;
      const h = (link.h / VIEWPORT_HEIGHT) * PPT_HEIGHT;

      slide.addText(" ", {
        x,
        y,
        w,
        h,
        link: { url: link.href },
        fill: { color: "FFFFFF", transparency: 100 }
      });
    }

    /* =========================
       SPEAKER NOTES
    ========================= */
    slide.addNotes(
      `SOC PhD Proposal – Slide ${i + 1}\n\nExplain this section as shown.\nLinks are clickable in presentation mode.`
    );
  }

  await browser.close();
  await pptx.writeFile({ fileName: "SOC_PhD_Proposal_Clickable.pptx" });

  console.log("✅ DONE: SOC_PhD_Proposal_Clickable.pptx");
})();
