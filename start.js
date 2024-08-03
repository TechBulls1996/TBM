const concurrently = require('concurrently');
const fs = require('fs');
const path = require('path');
const util = require('util');

// Define log file paths
const logsDir = path.join(__dirname, 'logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Define the log file path with current date
const logFilePath = path.join(logsDir, `application-${getDateString()}.log`);

// Create a writable stream for logging
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Function to get the current date in YYYY-MM-DD format
function getDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to get the current timestamp
function getTimestamp() {
  const now = new Date();
  return `${now.toISOString()} -`;
}

// Function to handle logging and process errors with timestamps
function handleProcessOutput(commandName) {
  return {
    stdout: (data) => {
      const message = `${getTimestamp()} [${commandName}] ${data}`;
      logStream.write(message);
      process.stdout.write(message);
    },
    stderr: (data) => {
      const message = `${getTimestamp()} [${commandName} ERROR] ${data}`;
      logStream.write(message);
      process.stderr.write(message);
    },
    error: (error) => {
      const message = `${getTimestamp()} [${commandName} ERROR] ${util.inspect(error)}\n`;
      logStream.write(message);
      process.stderr.write(message);
    }
  };
}

// Function to handle errors from the concurrent processes
function handleConcurrentError(error) {
  const message = `${getTimestamp()} Error running applications: ${util.inspect(error)}\n`;
  logStream.write(message);
  console.error('Error running applications:', error);
}

// Function to clean up old log files
function cleanUpOldLogs() {
  const files = fs.readdirSync(logsDir);
  const now = Date.now();
  const retentionPeriod = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds

  files.forEach(file => {
    const filePath = path.join(logsDir, file);
    const stats = fs.statSync(filePath);
    const fileAge = now - stats.mtimeMs;

    if (fileAge > retentionPeriod) {
      fs.unlinkSync(filePath);
      console.log(`Deleted old log file: ${file}`);
    }
  });
}

// Clean up old logs before starting
cleanUpOldLogs();

// Run both frontend and backend concurrently
concurrently(
  [
    {
      command: 'npm run frontend',
      name: 'frontend',
      prefixColor: 'green',
    },
    {
      command: 'npm run backend:start',
      name: 'backend',
      prefixColor: 'blue',
    },
  ],
  {
    handleInput: true,  // Handle input/output streams
  }
)
  .result
  .then(
    () => {
      const message = `${getTimestamp()} Both frontend and backend are running\n`;
      logStream.write(message);
      console.log('Both frontend and backend are running');
    }
  )
  .catch(handleConcurrentError) // Catch and handle errors
  .finally(() => {
    // Close the log stream when done
    logStream.end();
  });

// Redirect stdout and stderr from the process
process.stdout.on('data', handleProcessOutput('stdout').stdout);
process.stderr.on('data', handleProcessOutput('stderr').stderr);

process.on('uncaughtException', (error) => {
  const message = `${getTimestamp()} Unhandled Exception: ${util.inspect(error)}\n`;
  logStream.write(message);
  console.error('Unhandled Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  const message = `${getTimestamp()} Unhandled Rejection: ${util.inspect(reason)}\n`;
  logStream.write(message);
  console.error('Unhandled Rejection:', reason);
});
