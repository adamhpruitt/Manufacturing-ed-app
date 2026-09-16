/*
 * Renders a knowledge-check quiz into #quiz-container.
 * Expects two globals defined by the lesson page before this script loads:
 *   window.LESSON_ID   - string, e.g. "lesson-02"
 *   window.QUIZ_DATA   - array of { question, options: [...], correct: index, explain: string }
 */
(function () {
  var container = document.getElementById("quiz-container");
  if (!container || !window.QUIZ_DATA || !window.LESSON_ID) return;

  var quizData = window.QUIZ_DATA;
  var lessonId = window.LESSON_ID;

  function renderQuestion(q, index) {
    var wrap = document.createElement("div");
    wrap.className = "quiz-question";
    wrap.dataset.index = index;

    var qText = document.createElement("p");
    qText.className = "q-text";
    qText.textContent = (index + 1) + ". " + q.question;
    wrap.appendChild(qText);

    var optWrap = document.createElement("div");
    optWrap.className = "quiz-options";

    q.options.forEach(function (opt, optIndex) {
      var label = document.createElement("label");
      var input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + index;
      input.value = optIndex;
      label.appendChild(input);
      var span = document.createElement("span");
      span.textContent = opt;
      label.appendChild(span);
      optWrap.appendChild(label);
    });

    wrap.appendChild(optWrap);

    var explain = document.createElement("p");
    explain.className = "q-explain";
    explain.textContent = q.explain || "";
    wrap.appendChild(explain);

    return wrap;
  }

  quizData.forEach(function (q, index) {
    container.appendChild(renderQuestion(q, index));
  });

  var actions = document.createElement("div");
  actions.className = "quiz-actions";

  var submitBtn = document.createElement("button");
  submitBtn.type = "button";
  submitBtn.className = "btn btn-primary";
  submitBtn.textContent = "Check my answers";
  actions.appendChild(submitBtn);

  var retryBtn = document.createElement("button");
  retryBtn.type = "button";
  retryBtn.className = "btn btn-secondary";
  retryBtn.textContent = "Retake quiz";
  retryBtn.style.display = "none";
  actions.appendChild(retryBtn);

  container.appendChild(actions);

  var resultBox = document.createElement("div");
  resultBox.className = "quiz-result";
  container.appendChild(resultBox);

  function grade() {
    var score = 0;
    var allAnswered = true;

    quizData.forEach(function (q, index) {
      var selected = container.querySelector('input[name="q' + index + '"]:checked');
      var questionEl = container.querySelector('.quiz-question[data-index="' + index + '"]');
      var labels = questionEl.querySelectorAll(".quiz-options label");
      var explain = questionEl.querySelector(".q-explain");

      if (!selected) {
        allAnswered = false;
        return;
      }

      var chosen = parseInt(selected.value, 10);
      labels.forEach(function (label, optIndex) {
        label.classList.remove("correct", "incorrect");
        if (optIndex === q.correct) {
          label.classList.add("correct");
        } else if (optIndex === chosen && chosen !== q.correct) {
          label.classList.add("incorrect");
        }
      });

      if (chosen === q.correct) score++;
      explain.classList.add("show");
    });

    if (!allAnswered) {
      resultBox.className = "quiz-result show fail";
      resultBox.textContent = "Please answer every question before checking your results.";
      return;
    }

    var total = quizData.length;
    var pct = Math.round((score / total) * 100);
    var passed = pct >= 70;

    resultBox.className = "quiz-result show " + (passed ? "pass" : "fail");
    resultBox.textContent = "You scored " + score + " / " + total + " (" + pct + "%). " +
      (passed ? "Nice work — lesson marked complete." : "Review the explanations above and retake when ready (70% needed to mark complete).");

    if (window.MfgInsStorage) {
      window.MfgInsStorage.saveResult(lessonId, score, total);
    }

    submitBtn.style.display = "none";
    retryBtn.style.display = "inline-block";

    container.querySelectorAll('input[type="radio"]').forEach(function (input) {
      input.disabled = true;
    });
  }

  submitBtn.addEventListener("click", grade);

  retryBtn.addEventListener("click", function () {
    container.querySelectorAll('input[type="radio"]').forEach(function (input) {
      input.disabled = false;
      input.checked = false;
    });
    container.querySelectorAll(".quiz-options label").forEach(function (label) {
      label.classList.remove("correct", "incorrect");
    });
    container.querySelectorAll(".q-explain").forEach(function (el) {
      el.classList.remove("show");
    });
    resultBox.className = "quiz-result";
    resultBox.textContent = "";
    submitBtn.style.display = "inline-block";
    retryBtn.style.display = "none";
  });
})();
