// Define your slides in order
const slides = [
    "index.html",
    "background.html",
    "core-motivation.html",
    "thesis-problem.html",
    "thesismethods.html",
    "insights.html",
    "key-projects.html",
    "skills.html",
    "future.html",
    "fitwithteam.html",
];

// Get current filename
const current = window.location.pathname.split("/").pop();

// Find current slide index
const index = slides.indexOf(current);

// Update Breadcrumb
const breadcrumb = document.getElementById("breadcrumb");
if (breadcrumb) {
    breadcrumb.textContent = `Slide ${index + 1} of ${slides.length}`;
}

// Button references
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Prev Button
if (index > 0) {
    prevBtn.onclick = () => {
        window.location.href = slides[index - 1];
    };
} else {
    prevBtn.disabled = true;
    prevBtn.classList.add("opacity-40", "cursor-not-allowed");
}

// Next Button
if (index < slides.length - 1) {
    nextBtn.onclick = () => {
        window.location.href = slides[index + 1];
    };
} else {
    nextBtn.disabled = true;
    nextBtn.classList.add("opacity-40", "cursor-not-allowed");
}
