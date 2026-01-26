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
  },

  {
    file: "soc-analyst.html",
    notes: [
      "Problem context: SOC alert triage as a sensemaking task.",
      "Why triage is difficult: fragmented information and changing information needs.",
      "Current role of AI in SOCs.",
      "Research gap.",
      "Research questions.",
      "Methodology.",
      "Full proposal and Overleaf link."
    ]
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

    /* =========================
       EXPORT-ONLY STYLES
    ========================= */
    await page.addStyleTag({
      content: `
        aside, footer {
          display: none !important;
        }

        body {
          margin: 0 !important;
          background: white !important;
        }

        main {
          padding: 0 !important;
        }
      `
    });

    await delay(300);

    /* =========================
       SOC ANALYST: MULTI-SLIDE
    ========================= */
    if (slideConfig.file === "soc-analyst.html") {
      const sections = await page.$$("main > section");

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];

        const box = await section.boundingBox();
        if (!box) continue;

        const screenshot = await page.screenshot({
          clip: {
            x: Math.max(box.x, 0),
            y: Math.max(box.y, 0),
            width: Math.min(box.width, 1920),
            height: Math.min(box.height, 1080)
          }
        });

        const slide = pptx.addSlide();

        slide.addImage({
          data: "data:image/png;base64," + screenshot.toString("base64"),
          x: 0,
          y: 0,
          w: 13.33,
          h: 7.5
        });

        const note =
          slideConfig.notes && slideConfig.notes[i]
            ? slideConfig.notes[i]
            : `SOC proposal section ${i + 1}`;

        slide.addNotes(note);
      }

      continue;
    }

    /* =========================
       NORMAL SINGLE-SLIDE EXPORT
    ========================= */
    const screenshot = await page.screenshot({ type: "png" });

    const slide = pptx.addSlide();

    slide.addImage({
      data: "data:image/png;base64," + screenshot.toString("base64"),
      x: 0.25,
      y: 0.25,
      w: 12.83,
      h: 7.0
    });

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

    let notesText = slideConfig.notes || "";
    if (slideConfig.confidential) {
      notesText += "\n\nConfidential unpublished work.";
    }

    slide.addNotes(notesText);
  }

  await browser.close();

  await pptx.writeFile({ fileName: "HCI_Presentation_With_Notes.pptx" });

  console.log("✅ Export complete: HCI_Presentation_With_Notes.pptx");
})();
