/* Shared localStorage helpers for lesson progress. No backend — all client-side. */
(function (global) {
  var KEY = "mfgins_progress_v1";

  function getProgress() {
    try {
      var raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveResult(lessonId, score, total) {
    try {
      var data = getProgress();
      data[lessonId] = {
        score: score,
        total: total,
        completed: true,
        date: new Date().toISOString()
      };
      window.localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      /* localStorage unavailable (private mode, etc.) — fail silently */
    }
  }

  function resetProgress() {
    try {
      window.localStorage.removeItem(KEY);
    } catch (e) {}
  }

  global.MfgInsStorage = {
    getProgress: getProgress,
    saveResult: saveResult,
    resetProgress: resetProgress
  };
})(window);
