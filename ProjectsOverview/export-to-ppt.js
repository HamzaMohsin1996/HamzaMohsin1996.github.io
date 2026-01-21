const puppeteer = require("puppeteer");
const PPTX = require("pptxgenjs");
const path = require("path");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/* =========================
   SLIDE CONFIG + NOTES
========================= */
const slides = [
  {
    file: "index.html",
    notes: "Introduce yourself, background, and structure of the presentation."
  },

  {
    file: "project1.html",
    confidential: true,
    notes: "UAV dispatcher interface overview. Emphasize multitasking, interruptions, and research motivation."
  },
  {
    file: "uavRQ.html",
    confidential: true,
    notes: "Explain research questions and hypotheses related to situational awareness and re-engagement."
  },
  {
    file: "uavMethodology.html",
    confidential: true,
    notes: "Describe experimental design, participants, measures, and within-subjects setup."
  },
  {
    file: "uavresults.html",
    confidential: true,
    notes: "Walk through quantitative results and which hypotheses were supported."
  },
  {
    file: "uavchallanges.html",
    confidential: true,
    notes: "Discuss design challenges, trade-offs, and system limitations."
  },

  {
    file: "teleop.html",
    notes: "Introduce teleoperation study and emergency takeover context."
  },
  {
    file: "teleop-results.html",
    notes: "Explain response time trends, ANOVA results, and qualitative feedback."
  },
  {
    file: "teleop-challenges.html",
    notes: "Reflect on multimodal overload and design decisions."
  },

  {
    file: "fog-interface.html",
    notes: "Present fog interface motivation and distance perception problem."
  },
  {
    file: "fog-results.html",
    notes: "Explain t-test results, trends, and why non-significance still matters."
  },
  {
    file: "fog-challenges.html",
    notes: "Discuss abstraction vs precision and future improvements."
  },

  {
    file: "technicalProjects.html",
    notes: "Summarize methods across projects and position your research profile."
  }
];

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();

  const pptx = new PPTX();
  pptx.defineLayout({ name: "LAYOUT_16x9", width: 13.33, height: 7.5 });
  pptx.layout = "LAYOUT_16x9";

  for (const slideConfig of slides) {
    console.log("▶ Rendering", slideConfig.file);

    const filePath = `file://${path.resolve(slideConfig.file)}`;
    await page.goto(filePath, { waitUntil: "networkidle0" });

    // EXPORT-ONLY STYLES
    await page.addStyleTag({
      content: `
        aside, footer {
          display: none !important;
        }

        body {
          margin: 0 !important;
          overflow: hidden !important;
          background: white !important;
        }

        main,
        #slide-content,
        main > div {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 64px !important;
          box-sizing: border-box !important;
        }
      `
    });

    await delay(300);

    const screenshot = await page.screenshot({ type: "png" });

    const slide = pptx.addSlide();

    // MAIN IMAGE
    slide.addImage({
      data: "data:image/png;base64," + screenshot.toString("base64"),
      x: 0.25,
      y: 0.25,
      w: 12.83,
      h: 7.0
    });

    // CONFIDENTIAL LABEL (UAV ONLY)
    if (slideConfig.confidential) {
      slide.addText(
        "CONFIDENTIAL · UNPUBLISHED MASTER’S THESIS",
        {
          x: 8.0,
          y: 6.9,
          w: 5.0,
          h: 0.4,
          fontSize: 10,
          color: "666666",
          align: "right",
          bold: true
        }
      );
    }

    // SPEAKER NOTES
    let notesText = slideConfig.notes || "";
    if (slideConfig.confidential) {
      notesText += "\n\n⚠️ This slide contains confidential, unpublished thesis work.";
    }

    slide.addNotes(notesText);
  }

  await browser.close();

  await pptx.writeFile({ fileName: "HCI_Presentation_With_Notes.pptx" });

  console.log("✅ Export complete: HCI_Presentation_With_Notes.pptx");
})();
