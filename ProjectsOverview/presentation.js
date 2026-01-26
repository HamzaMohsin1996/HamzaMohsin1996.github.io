document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     SLIDES CONFIG
  ========================= */
  const slides = [
    { title: "Title Slide", file: "index.html" },

    { title: "UAV Overview", file: "project1.html", confidential: true },
    { title: "UAV RQs", file: "uavRQ.html", confidential: true },
    { title: "UAV Methods", file: "uavMethodology.html", confidential: true },
    { title: "UAV Results", file: "uavresults.html", confidential: true },
    { title: "UAV Challenges", file: "uavchallanges.html", confidential: true },

    { title: "Teleop Overview", file: "teleop.html" },
    { title: "Teleop Results", file: "teleop-results.html" },
    { title: "Teleop Challenges", file: "teleop-challenges.html" },

    { title: "Fog Interface", file: "fog-interface.html" },
    { title: "Fog Results", file: "fog-results.html" },
    { title: "Fog Challenges", file: "fog-challenges.html" },

    { title: "Methods Matrix", file: "technicalProjects.html" },
    { title: "PhD Proposal", file: "soc-analyst.html" }
  ];

  /* =========================
     CURRENT SLIDE
  ========================= */
  const currentFile =
    (location.pathname.split("/").pop() || "index.html").split("?")[0];

  const currentIndex = slides.findIndex(s => s.file === currentFile);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  const isConfidential = slides[safeIndex]?.confidential === true;

  /* =========================
     SCROLLABLE SLIDE CHECK
     (Only PhD proposal)
  ========================= */
  const isScrollableSlide = currentFile === "soc-analyst.html";

  /* =========================
     SHELL TARGET
  ========================= */
  const shell = document.getElementById("presentation-shell");
  if (!shell) return;

  /* =========================
     GLOBAL LAYOUT
  ========================= */
  shell.innerHTML = `
    <div class="flex flex-1 min-h-screen
      ${isScrollableSlide ? "overflow-auto" : "overflow-hidden"}
      ${isConfidential ? "confidential-watermark" : ""}">

      <!-- SIDEBAR -->
      <aside class="w-64 shrink-0 bg-sidebar-bg border-r border-slate-200 flex flex-col">
        <div class="p-4 border-b border-slate-200">
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Slides
          </p>
        </div>

        <nav class="flex-1 overflow-y-auto p-3 space-y-1">
          ${slides.map((s, i) => `
            <a href="${s.file}"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
              ${i === safeIndex
                ? "bg-primary text-white shadow-md shadow-primary/20 font-semibold"
                : "text-slate-500 hover:bg-slate-100 hover:text-primary"}">
              <span class="material-symbols-outlined text-sm">
                ${i === safeIndex ? "radio_button_checked" : "chevron_right"}
              </span>
              <span>${s.title}</span>
              ${s.confidential
                ? `<span class="ml-auto text-[9px] bg-red-600 text-white px-2 py-0.5 rounded font-black uppercase">Conf.</span>`
                : ""}
            </a>
          `).join("")}
        </nav>
      </aside>

      <!-- CONTENT -->
      <div class="flex-1 flex flex-col overflow-hidden">

        <main id="slide-content"
          class="
            px-12 py-10
            ${isScrollableSlide
              ? "overflow-y-auto items-start justify-start"
              : "h-[calc(100vh-64px)] flex items-center justify-center"}
          ">
        </main>

        <!-- FOOTER -->
        <footer class="h-16 bg-white border-t border-slate-200 px-8 flex items-center justify-between">

          <div class="flex items-center gap-4">
            <button id="prev-slide"
              class="flex items-center gap-2 text-sm font-bold transition-colors
              ${safeIndex <= 0
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-400 hover:text-slate-900"}">
              <span class="material-symbols-outlined">arrow_back</span>
              Previous
            </button>

            <div class="w-px h-4 bg-slate-200"></div>

            <button id="next-slide"
              class="flex items-center gap-2 text-sm font-bold transition-colors
              ${safeIndex >= slides.length - 1
                ? "text-slate-300 cursor-not-allowed"
                : "text-primary hover:text-primary/80"}">
              Next
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <button id="fullscreen-toggle"
            class="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100">
            Fullscreen
          </button>

          <div class="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Slide ${safeIndex + 1} / ${slides.length}
          </div>
        </footer>

      </div>
    </div>
  `;

  /* =========================
     MOVE SLIDE CONTENT
  ========================= */
  const slideMain = document.querySelector("main:not(#slide-content)");
  const slot = document.getElementById("slide-content");
  if (slideMain && slot) slot.appendChild(slideMain);

  /* =========================
     FULLSCREEN (LOCKED MODE)
  ========================= */
  let allowFullscreenExit = false;

  const enterFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => {
          sessionStorage.setItem("presentationMode", "true");
          allowFullscreenExit = false;
        })
        .catch(() => {});
    }
  };

  const exitFullscreen = () => {
    allowFullscreenExit = true;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  document.getElementById("fullscreen-toggle")?.addEventListener("click", () => {
    document.fullscreenElement ? exitFullscreen() : enterFullscreen();
  });

  document.addEventListener("fullscreenchange", () => {
    if (
      sessionStorage.getItem("presentationMode") === "true" &&
      !document.fullscreenElement &&
      !allowFullscreenExit
    ) {
      setTimeout(() => {
        document.documentElement.requestFullscreen().catch(() => {});
      }, 50);
    }

    if (!document.fullscreenElement) {
      sessionStorage.removeItem("presentationMode");
    }
  });

  if (sessionStorage.getItem("presentationMode") === "true") {
    setTimeout(() => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    }, 100);
  }

  /* =========================
     NAVIGATION
  ========================= */
  const goTo = (idx) => {
    if (idx < 0 || idx >= slides.length) return;
    location.href = slides[idx].file;
  };

  document.getElementById("prev-slide")?.addEventListener("click", () => {
    goTo(safeIndex - 1);
  });

  document.getElementById("next-slide")?.addEventListener("click", () => {
    goTo(safeIndex + 1);
  });

  document.addEventListener("keydown", (e) => {
    const tag = e.target?.tagName?.toLowerCase();
    if (["input", "textarea", "select"].includes(tag)) return;

    if (["ArrowLeft", "ArrowRight", " ", "Enter"].includes(e.key)) {
      e.preventDefault();
    }

    if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
      goTo(safeIndex + 1);
    }

    if (e.key === "ArrowLeft") {
      goTo(safeIndex - 1);
    }

    if (e.key === "f" || e.key === "F") {
      document.fullscreenElement ? exitFullscreen() : enterFullscreen();
    }
  });
});

/* =========================
   CONFIDENTIAL WATERMARK
========================= */
const style = document.createElement("style");
style.innerHTML = `
  .confidential-watermark::after {
    content: "CONFIDENTIAL · UNPUBLISHED MASTER’S THESIS";
    position: fixed;
    bottom: 22px;
    right: 128px;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: red;
    pointer-events: none;
    z-index: 9999;
  }
`;
document.head.appendChild(style);
