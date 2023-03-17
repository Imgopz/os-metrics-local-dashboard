const express = require('express');
const os = require('os');
const osUtils = require('os-utils');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/metrics', (req, res) => {
  osUtils.cpuUsage(function(cpuUtilization) {
    const memoryUtilization = (1 - os.freemem() / os.totalmem()) * 100;

    res.json({ cpuUtilization, memoryUtilization });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
