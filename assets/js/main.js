/* Homepage: lesson catalog + progress dashboard driven by localStorage. */
var LESSONS = [
  {
    id: "lesson-01",
    num: "01",
    title: "Why Manufacturers Need Specialized Coverage",
    summary: "How manufacturing risk differs from general commercial risk, and the core coverage lines a producer needs to know.",
    href: "lessons/01-introduction.html",
    tag: "Foundations"
  },
  {
    id: "lesson-02",
    num: "02",
    title: "Commercial Property Insurance",
    summary: "Building, business personal property, valuation methods, and the causes-of-loss forms that matter on a plant.",
    href: "lessons/02-property.html",
    tag: "Property"
  },
  {
    id: "lesson-03",
    num: "03",
    title: "General Liability & Product Liability",
    summary: "Premises/operations exposure, completed operations, and why product liability is the defining casualty risk for manufacturers.",
    href: "lessons/03-general-liability.html",
    tag: "Casualty"
  },
  {
    id: "lesson-04",
    num: "04",
    title: "Workers' Compensation in Manufacturing",
    summary: "Classification codes, experience mods, and the safety programs that move the needle on shop-floor risk.",
    href: "lessons/04-workers-comp.html",
    tag: "Workers' Comp"
  },
  {
    id: "lesson-05",
    num: "05",
    title: "Equipment Breakdown Coverage",
    summary: "Why standard property forms exclude mechanical/electrical breakdown, and how EB fills the gap on production equipment.",
    href: "lessons/05-equipment-breakdown.html",
    tag: "Property"
  },
  {
    id: "lesson-06",
    num: "06",
    title: "Business Interruption & Supply Chain",
    summary: "Lost income, extra expense, and contingent business interruption when a supplier or customer goes down instead of you.",
    href: "lessons/06-business-interruption.html",
    tag: "Property"
  },
  {
    id: "lesson-07",
    num: "07",
    title: "Commercial Auto & Inland Marine",
    summary: "Fleet exposure for delivery and field service, plus inland marine for goods in transit, tools, and contractors' equipment.",
    href: "lessons/07-auto-inland-marine.html",
    tag: "Auto & Marine"
  },
  {
    id: "lesson-08",
    num: "08",
    title: "Umbrella & Excess Liability",
    summary: "Why manufacturers carry high limits, how towers are built, and where umbrella policies actually respond.",
    href: "lessons/08-umbrella-excess.html",
    tag: "Casualty"
  },
  {
    id: "lesson-09",
    num: "09",
    title: "Cyber Liability & Environmental Risk",
    summary: "Ransomware hitting OT systems, plus pollution liability for manufacturers handling chemicals, coatings, or waste.",
    href: "lessons/09-cyber-environmental.html",
    tag: "Emerging Risk"
  },
  {
    id: "lesson-10",
    num: "10",
    title: "Building a Complete Insurance Program",
    summary: "Pulling every line into one coherent program and the questions to ask on a manufacturing risk assessment call.",
    href: "lessons/10-building-program.html",
    tag: "Capstone"
  }
];

function renderLessonGrid() {
  var grid = document.getElementById("lesson-grid");
  if (!grid) return;

  var progress = window.MfgInsStorage ? window.MfgInsStorage.getProgress() : {};

  grid.innerHTML = "";
  LESSONS.forEach(function (lesson) {
    var result = progress[lesson.id];
    var card = document.createElement("a");
    card.className = "lesson-card";
    card.href = lesson.href;

    var num = document.createElement("div");
    num.className = "lesson-num";
    num.textContent = "Lesson " + lesson.num;
    card.appendChild(num);

    var h3 = document.createElement("h3");
    h3.textContent = lesson.title;
    card.appendChild(h3);

    var p = document.createElement("p");
    p.textContent = lesson.summary;
    card.appendChild(p);

    var footer = document.createElement("div");
    footer.className = "lesson-card-footer";

    var tag = document.createElement("span");
    tag.className = "badge badge-tag";
    tag.textContent = lesson.tag;
    footer.appendChild(tag);

    var status = document.createElement("span");
    if (result && result.completed) {
      status.className = "badge badge-complete";
      status.textContent = "Done • " + result.score + "/" + result.total;
    } else {
      status.className = "badge badge-todo";
      status.textContent = "Not started";
    }
    footer.appendChild(status);

    card.appendChild(footer);
    grid.appendChild(card);
  });
}

function renderProgressDashboard() {
  var wrap = document.getElementById("progress-dashboard");
  if (!wrap) return;

  var progress = window.MfgInsStorage ? window.MfgInsStorage.getProgress() : {};
  var completedCount = LESSONS.filter(function (l) {
    return progress[l.id] && progress[l.id].completed;
  }).length;
  var total = LESSONS.length;
  var pct = Math.round((completedCount / total) * 100);

  document.getElementById("progress-count").textContent = completedCount + " / " + total + " lessons complete";
  document.getElementById("progress-fill").style.width = pct + "%";
}

document.addEventListener("DOMContentLoaded", function () {
  renderLessonGrid();
  renderProgressDashboard();

  var resetBtn = document.getElementById("reset-progress");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      if (window.confirm("Clear all saved quiz progress on this device?")) {
        window.MfgInsStorage.resetProgress();
        renderLessonGrid();
        renderProgressDashboard();
      }
    });
  }
});
