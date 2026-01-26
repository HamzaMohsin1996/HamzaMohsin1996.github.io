const puppeteer = require("puppeteer");
const PPTX = require("pptxgenjs");
const path = require("path");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const PPT_WIDTH = 13.33;
const PPT_HEIGHT = 7.5;
const VIEWPORT_WIDTH = 1920;
const VIEWPORT_HEIGHT = 1080;

/* =================================================
   STORY-BASED SPEAKER NOTES (SLIDE BY SLIDE)
================================================= */
const SLIDE_NOTES = [
  // SLIDE 1 — TITLE
  `My research is about how people use interfaces to make important decisions in systems where mistakes matter.
I focus on situations where humans work with intelligent systems under time pressure.
In this talk, I’ll briefly explain my background, my Master’s thesis, and how it leads to my PhD proposal.`,

  // SLIDE 2 — RESEARCH TRAJECTORY
  `I started my career as a front-end engineer and worked on complex software systems.
While doing this, I noticed that interface design strongly affects how people understand information and make decisions.
This became especially clear in systems that are complex or safety-critical.
Because of that, I moved into HCI research, where I now study human–system interaction using experiments and prototypes.
So my background combines software development and research.`,

  // SLIDE 3 — MOTIVATION & FIT
  `I’m interested in how humans and AI work together in situations where decisions must be made quickly.
In my Master’s thesis, I saw that better results did not come from more automation, but from better interaction design.
This led me to focus on sensemaking, responsibility, and re-engagement.
TU Darmstadt is a good fit because the research here connects HCI, AI, and safety-critical systems.`,

  // SLIDE 4 — MASTER’S CONTEXT
  `My Master’s thesis studied emergency dispatchers.
Dispatchers work under high workload, frequent interruptions, and time pressure.
They often have to return to an incident after being interrupted and quickly understand what has changed.
UAVs can provide early aerial information, but existing interfaces are designed for field responders, not for dispatchers.
This creates a problem during re-engagement.`,

  // SLIDE 5 — STUDY DESIGN
  `I conducted a controlled experiment with 29 participants.
The task simulated emergency dispatching with multitasking and enforced interruptions.
The independent variable was the interface: with or without structured UAV information.
The goal was to see how interface design affects re-engagement.`,

  // SLIDE 6 — MEASURES & INSTRUMENTATION
  `I measured situational awareness using SPAM, focusing on accuracy and response time.
I measured re-engagement speed after interruptions.
I also measured workload, subjective awareness, and usability.
The system combined a Unity simulation and a web-based interface.
All events and interactions were logged and synchronized.
This allowed precise analysis of user behavior.`,

  // SLIDE 7 — FINDINGS
  `Structured UAV information improved re-engagement accuracy and response time.
This happened without increasing workload or task time.
One key insight was that continuous video alone is not enough.
How information is presented determines whether users can understand the situation.
This insight motivated my PhD proposal.`,

  // SLIDE 8 — SOC CONTEXT
  `This slide explains the work of SOC analysts.
They review many alerts and decide what needs action.
They work under time pressure and incomplete information.
The analyst remains responsible for the final decision.`,

  // SLIDE 9 — RESEARCH GAP
  `In SOCs, alert triage is a sensemaking process.
Analysts continuously build and update their understanding under time pressure.
Current AI systems focus on throughput and classification.
They do not support how analysts reason or retain responsibility.
There is no empirical model of analyst–AI interaction during triage.`,

  // SLIDE 10 — RESEARCH QUESTIONS
  `First, I ask where cognitive bottlenecks and decision boundaries occur.
Second, I ask how interaction design can support collaboration while keeping humans in control.
Third, I evaluate whether these designs improve decision quality and understanding.`,

  // SLIDE 11 — METHODOLOGY
  `The research follows three phases.
First, I analyze current analyst–AI interaction.
Second, I design interaction mechanisms based on this analysis.
Third, I evaluate these designs in controlled studies.`,

  // SLIDE 12 — EVALUATION & CONTRIBUTION
  `I evaluate decision quality, situational awareness, and the ability to justify decisions.
The contribution is not better automation.
The contribution is better human–AI interaction.
This includes models, design principles, and empirical evidence.`,

  // SLIDE 13 — THANK YOU
  `Thank you for your time.
I’m happy to discuss any part of the work in more detail.`
];

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

  pptx.defineLayout({
    name: "LAYOUT_16x9",
    width: PPT_WIDTH,
    height: PPT_HEIGHT
  });
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

    await section.evaluate(el =>
      el.scrollIntoView({ block: "start", behavior: "instant" })
    );
    await delay(200);

    /* =========================
       SCREENSHOT SLIDE
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
       CLICKABLE LINKS
    ========================= */
    const links = await section.evaluate((sectionEl) => {
      const sectionRect = sectionEl.getBoundingClientRect();
      const anchors = Array.from(sectionEl.querySelectorAll("a[href]"));
      return anchors.map(a => {
        const r = a.getBoundingClientRect();
        return {
          href: a.href,
          x: r.left - sectionRect.left,
          y: r.top - sectionRect.top,
          w: r.width,
          h: r.height
        };
      });
    }, section);

    for (const link of links) {
      if (!link.href || link.w < 6 || link.h < 6) continue;

      slide.addText("", {
        x: (link.x / VIEWPORT_WIDTH) * PPT_WIDTH,
        y: (link.y / VIEWPORT_HEIGHT) * PPT_HEIGHT,
        w: (link.w / VIEWPORT_WIDTH) * PPT_WIDTH,
        h: (link.h / VIEWPORT_HEIGHT) * PPT_HEIGHT,
        link: { url: link.href },
        fill: { color: "FFFFFF", transparency: 100 },
        line: { color: "FFFFFF", transparency: 100 }
      });
    }

    /* =========================
       SPEAKER NOTES
    ========================= */
    const notes =
      SLIDE_NOTES[i] ??
      "Additional explanation will be provided verbally.";

    slide.addNotes(notes);
  }

  await browser.close();
  await pptx.writeFile({
    fileName: "SOC_PhD_Proposal_Clickable_With_Notes.pptx"
  });

  console.log("✅ DONE: SOC_PhD_Proposal_Clickable_With_Notes.pptx");
})();
