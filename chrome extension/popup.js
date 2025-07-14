chrome.storage.local.get(null, data => {
  const output = document.getElementById("output");
  for (const site in data) {
    const minutes = Math.round(data[site] / 60000);
    const line = document.createElement("div");
    line.textContent = `${site}: ${minutes} min`;
    output.appendChild(line);
  }
});
