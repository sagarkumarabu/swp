(function () {
  const STORAGE_KEY = 'hplFontScale';
  const STEP = 0.1;
  const MIN = 0.8;
  const MAX = 1.5;

  function clamp(value) {
    return Math.min(MAX, Math.max(MIN, value));
  }

  function applyFontScale(value) {
    const scale = clamp(value);
    document.documentElement.style.setProperty('--font-scale', scale.toFixed(2));
    localStorage.setItem(STORAGE_KEY, scale.toFixed(2));
  }

  function getCurrentScale() {
    const stored = parseFloat(localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(stored) ? clamp(stored) : 1;
  }

  function changeFontSize(direction) {
    applyFontScale(getCurrentScale() + direction * STEP);
  }

  window.changeFontSize = changeFontSize;
  applyFontScale(getCurrentScale());
})();
function exportExcel() {
  var table = document.getElementById("summaryTable");
  var rows = table.querySelectorAll("tr");
  var csv = [];

  for (var i = 0; i < rows.length; i++) {
    var row = [], cols = rows[i].querySelectorAll("td, th");
    for (var j = 0; j < cols.length; j++) {
      var data = cols[j].innerText.replace(/"/g, '""');
      row.push('"' + data + '"');
    }
    csv.push(row.join(","));
  }

  var csvString = csv.join("\n");
  var blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  var url = URL.createObjectURL(blob);

  // Ask user for file name
  var fileName = prompt("Enter file name:");
  if (!fileName) {
  return; // fallback if user cancels or leaves blank
  }

  var link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName + ".csv");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
