const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

app.post("/export-ppt", (req, res) => {
  exec("node export-to-ppt.js", (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Export failed");
    }
    res.send("OK");
  });
});

app.listen(PORT, () => {
  console.log(`▶ PPT Export server running at http://localhost:${PORT}`);
});
