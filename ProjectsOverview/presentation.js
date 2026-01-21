document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // SLIDES CONFIG (EDIT ONLY THIS)
  // =========================
  const slides = [
    { title: "Title Slide", file: "index.html" },
    { title: "UAV Overview", file: "project1.html" },
    { title: "UAV RQs", file: "uavRQ.html" },
    { title: "UAV Methods", file: "uavMethodology.html" },
    { title: "UAV Results", file: "uavresults.html" },
    { title: "UAV Challenges", file: "uavchallanges.html" },
    { title: "Teleop Overview", file: "teleop.html" },
    { title: "Teleop Results", file: "teleop-results.html" },
    { title: "Fog Interface", file: "fog-interface.html" },
    { title: "Methods Matrix", file: "technicalProjects.html" }
  ];

  // =========================
  // CURRENT SLIDE DETECTION
  // =========================
  const currentFile = (location.pathname.split("/").pop() || "index.html").split("?")[0];
  const currentIndex = slides.findIndex(s => s.file === currentFile);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  // =========================
  // SHELL TARGET
  // =========================
  const shell = document.getElementById("presentation-shell");
  if (!shell) {
    console.warn("[presentation.js] Missing #presentation-shell");
    return;
  }

  // =========================
  // INJECT GLOBAL LAYOUT
  // =========================
  shell.innerHTML = `
    <div class="flex flex-1 overflow-hidden min-h-screen">

      <!-- SIDEBAR -->
      <aside class="w-64 shrink-0 bg-sidebar-bg dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div class="p-4 border-b border-slate-200 dark:border-slate-800">
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Slides</p>
        </div>

        <nav class="flex-1 overflow-y-auto p-3 space-y-1">
          ${slides.map((s, i) => `
            <a href="${s.file}"
               class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
               ${i === safeIndex
                 ? "bg-primary text-white shadow-md shadow-primary/20 font-semibold"
                 : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary"}">
              <span class="material-symbols-outlined text-sm">
                ${i === safeIndex ? "radio_button_checked" : "chevron_right"}
              </span>
              <span>${s.title}</span>
            </a>
          `).join("")}
        </nav>
      </aside>

      <!-- CONTENT + FOOTER STACK -->
      <div class="flex-1 flex flex-col overflow-hidden">

        <!-- CONTENT SLOT -->
        <main id="slide-content" class="flex-1 overflow-y-auto"></main>

        <!-- FOOTER -->
        <footer class="h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button id="prev-slide"
              class="flex items-center gap-2 text-sm font-bold transition-colors
              ${safeIndex <= 0
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-400 hover:text-slate-900 dark:hover:text-white"}">
              <span class="material-symbols-outlined text-base">arrow_back</span>
              Previous
            </button>

            <div class="w-px h-4 bg-slate-200 dark:bg-slate-700"></div>

            <button id="next-slide"
              class="flex items-center gap-2 text-sm font-bold transition-colors
              ${safeIndex >= slides.length - 1
                ? "text-slate-300 cursor-not-allowed"
                : "text-primary hover:text-primary/80"}">
              Next
              <span class="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>

          <div class="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
            Slide ${safeIndex + 1} / ${slides.length}
          </div>
        </footer>

      </div>
    </div>
  `;

  // =========================
  // MOVE SLIDE'S MAIN INTO SLOT
  // IMPORTANT: pick the slide <main>, NOT the injected slot <main>
  // =========================
  const slideMain = document.querySelector("main:not(#slide-content)");
  const slot = document.getElementById("slide-content");

  if (!slideMain) {
    console.warn("[presentation.js] No slide <main> found. Each slide must contain exactly one <main>.");
    return;
  }
  if (!slot) {
    console.warn("[presentation.js] Missing #slide-content slot.");
    return;
  }

  // Move the slide <main> content into the slot
  slot.appendChild(slideMain);

  // OPTIONAL: remove extra padding/bg from slide main if you want the global layout to control it
  // slideMain.classList.remove("flex-1");

  // =========================
  // NAVIGATION HELPERS
  // =========================
  const goTo = (idx) => {
    if (idx < 0 || idx >= slides.length) return;
    location.href = slides[idx].file;
  };

  // =========================
  // FOOTER BUTTONS
  // =========================
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");

  if (prevBtn && safeIndex > 0) prevBtn.addEventListener("click", () => goTo(safeIndex - 1));
  if (nextBtn && safeIndex < slides.length - 1) nextBtn.addEventListener("click", () => goTo(safeIndex + 1));

  // =========================
  // KEYBOARD NAV (ignore typing in inputs)
  // =========================
  document.addEventListener("keydown", (e) => {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || tag === "select") return;

    if (e.key === "ArrowLeft") goTo(safeIndex - 1);
    if (e.key === "ArrowRight") goTo(safeIndex + 1);
  });
});
