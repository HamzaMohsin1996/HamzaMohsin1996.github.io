/* ============================================================================================
   STUDY CHECKLIST ENGINE – JSON → INTERACTIVE → CONDITION STAGES → EXPORT
   ============================================================================================ */

// =========================
// CHECKLIST DATA (JSON)
// =========================
const checklistData = {
    sections: [
      {
        id: "01",
        title: "Pre-Study Setup",
        steps: [
          { title: "Welcome participants for study." },
          { title: "Consent form for participants." },
          { title: "Demographic form." },
          { title: "Provide training scenario (index_training_scenario.html)." },
          { title: "Prepare training scenario in Unity." },
          { title: "Prepare eye-tracking for participants." },
        ],
      },
      {
        id: "02",
        title: "Main Task — Scenario 1",
        steps: [
          { title: "Start main task & begin gaze recording." },
          { title: "Scenario 1 completed." },
          { title: "Download CSV & rename." },
          { title: "Download gaze file & rename." },
          { title: "Administer SART & SUS questionnaires." },
        ],
      },
      {
        id: "03",
        title: "Main Task — Scenario 2",
        steps: [
          { title: "Prepare Unity for second scenario." },
          { title: "Start gaze recording again with new data file." },
          { title: "Unity loaded." },
          { title: "Scenario 2 completed → download CSV file." },
          { title: "Stop gaze recording." },
        ],
      },
      {
        id: "04",
        title: "Post-Study",
        steps: [
          { title: "Administer post-study questionnaire." },
          { title: "Begin interview questions." },
          { title: "Record voice & save data." },
          { title: "Debrief the participant." },
        ],
      },
    ],
  };
  
  // =========================
  // SESSION MODEL
  // =========================
  let studySession = {
    participantId: "",
    conditionStage1: "",
    conditionStage2: "",
    startTime: new Date().toISOString(),
    actions: [],
  };
  
  let checklistItems = [];
  let participantInput;
  let conditionInput;
  let progressLabel;
  let progressFraction;
  let progressBar;
  let downloadBtn;
  let checklistContainer;
  
  let conditionStage = 1; // 1 = first condition, 2 = second
  let firstCondition = "";
  
  // =========================
  // BUILD CHECKLIST FROM JSON
  // =========================
  function buildChecklistFromData() {
    const container = document.getElementById("checklist-container");
    const template = document.getElementById("check-item-template");
  
    let stepIndex = 0;
  
    checklistData.sections.forEach((section) => {
      const sectionEl = document.createElement("section");
      sectionEl.id = "section" + section.id;
  
      const headerHTML = `
        <div class="flex items-center gap-3 mb-4 sticky top-0 
          bg-gray-50 dark:bg-background-dark/95 backdrop-blur py-3 z-10 border-b border-transparent dark:border-white/5">
          <span class="flex items-center justify-center size-6 rounded bg-primary/20 text-primary text-xs font-bold">
            ${section.id}
          </span>
          <h4 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            ${section.title}
          </h4>
        </div>
      `;
      sectionEl.innerHTML = headerHTML;
  
      const stepsWrapper = document.createElement("div");
      stepsWrapper.className = "flex flex-col gap-3";
  
      section.steps.forEach((step) => {
        const clone = template.content.cloneNode(true);
        const titleEl = clone.querySelector(".step-title");
        const checkbox = clone.querySelector(".checklist-checkbox");
  
        titleEl.textContent = step.title;
        checkbox.dataset.stepId = stepIndex.toString();
        stepIndex++;
  
        stepsWrapper.appendChild(clone);
      });
  
      sectionEl.appendChild(stepsWrapper);
      container.appendChild(sectionEl);
    });
  }
  
  // =========================
  // RECORD ACTION INTO TIMELINE
  // =========================
  function recordAction(type, details) {
    studySession.actions.push({
      type,
      details,
      timestamp: new Date().toISOString(),
    });
  }
  
  // =========================
  // PROGRESS UPDATE
  // =========================
  function updateProgressUI() {
    const completedCount = checklistItems.filter((cb) => cb.checked).length;
    const totalCount = checklistItems.length;
  
    const percent =
      totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  
    progressLabel.textContent = percent + "%";
    progressFraction.textContent = `${completedCount} / ${totalCount}`;
    progressBar.style.width = percent + "%";
  }
  
  // =========================
  // SECTION HELPERS
  // =========================
  function disableSection(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("checklist-disabled");
  }
  
  function enableSection(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("checklist-disabled");
  }
  
  // =========================
  // EXPORT RESEARCH LOG
  // =========================
  function exportStudyLog() {
    studySession.endTime = new Date().toISOString();
    const fileName = `StudyLog_${studySession.participantId || "Unknown"}.json`;
    const content = JSON.stringify(studySession, null, 2);
  
    const blob = new Blob([content], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
  
  // =========================
  // MAIN INIT
  // =========================
  window.addEventListener("DOMContentLoaded", () => {
    // 1) Build checklist UI from JSON
    buildChecklistFromData();
  
    // 2) Grab elements
    checklistContainer = document.getElementById("checklist-container");
    checklistItems = Array.from(
      document.querySelectorAll("input.checklist-checkbox")
    );
    participantInput = document.getElementById("participantId");
    conditionInput = document.getElementById("studyCondition");
    progressLabel = document.getElementById("progressPercent");
    progressFraction = document.getElementById("progressFraction");
    progressBar = document.getElementById("progressBar");
    downloadBtn = document.getElementById("downloadLogBtn");
  
    // 3) Reset session & UI
    checklistItems.forEach((cb) => (cb.checked = false));
    studySession = {
      participantId: "",
      conditionStage1: "",
      conditionStage2: "",
      startTime: new Date().toISOString(),
      actions: [],
    };
    updateProgressUI();
  
    // Start: everything disabled (container already has checklist-disabled)
    disableSection("section01");
    disableSection("section02");
    disableSection("section03");
    disableSection("section04");
    downloadBtn.disabled = true;
  
    // ========= STAGE 1: PID + first condition → unlock section 01 + 02 =========
    function unlockStage1() {
      if (conditionStage !== 1) return;
  
      const hasPID = participantInput.value.trim() !== "";
      const hasCondition = conditionInput.value.trim() !== "";
  
      if (hasPID && hasCondition) {
        // Remove global lock from container
        checklistContainer.classList.remove("checklist-disabled");
  
        firstCondition = conditionInput.value;
        studySession.conditionStage1 = firstCondition;
  
        enableSection("section01");
        enableSection("section02");
      }
    }
  
    // Participant ID input
    participantInput.addEventListener("input", () => {
      studySession.participantId = participantInput.value.trim();
      recordAction("participant-id-update", {
        value: studySession.participantId,
      });
      unlockStage1();
    });
  
    // Condition selection
    conditionInput.addEventListener("change", () => {
      recordAction("condition-update", {
        stage: conditionStage,
        value: conditionInput.value,
      });
  
      if (conditionStage === 1) {
        unlockStage1();
      } else if (conditionStage === 2) {
        // Second condition selection
        if (conditionInput.value === firstCondition) {
          alert("You must choose a DIFFERENT condition than the first one.");
          conditionInput.value = "";
          return;
        }
  
        studySession.conditionStage2 = conditionInput.value;
        enableSection("section03");
      }
    });
  
    // ========= SECTION 02 COMPLETE → move to stage 2 =========
    function checkSection02Complete() {
      const sec2Checks = Array.from(
        document.querySelectorAll("#section02 .checklist-checkbox")
      );
      const done = sec2Checks.length > 0 && sec2Checks.every((cb) => cb.checked);
  
      if (done && conditionStage === 1) {
        alert("Scenario 1 complete — now select the SECOND condition.");
  
        disableSection("section01");
        disableSection("section02");
  
        conditionStage = 2;
        conditionInput.disabled = false;
        conditionInput.value = "";
      }
    }
  
    // ========= SECTION 03 COMPLETE → enable 04 =========
    function checkSection03Complete() {
      const sec3Checks = Array.from(
        document.querySelectorAll("#section03 .checklist-checkbox")
      );
      const done = sec3Checks.length > 0 && sec3Checks.every((cb) => cb.checked);
  
      if (done) {
        enableSection("section04");
      }
    }
  
    // ========= SECTION 04 COMPLETE → enable download =========
    function checkSection04Complete() {
      const sec4Checks = Array.from(
        document.querySelectorAll("#section04 .checklist-checkbox")
      );
      const done = sec4Checks.length > 0 && sec4Checks.every((cb) => cb.checked);
  
      if (done) {
        downloadBtn.disabled = false;
      }
    }
  
    // ========= CHECKBOX HANDLERS (logging + progress + stage logic) =========
    checklistItems.forEach((cb) => {
      cb.addEventListener("change", () => {
        const id = cb.dataset.stepId;
        const label = cb.closest("label");
        const titleText =
          label.querySelector(".step-title")?.textContent?.trim() || "";
  
        if (cb.checked) {
          recordAction("step-completed", { id, step: titleText });
        } else {
          recordAction("step-unchecked", { id, step: titleText });
        }
  
        // Stage transitions
        checkSection02Complete();
        checkSection03Complete();
        checkSection04Complete();
  
        // Progress UI
        updateProgressUI();
      });
    });
  
    // Download button
    downloadBtn.addEventListener("click", exportStudyLog);
  });
  