#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

// Test configuration
const testConfig = {
  browsers: ['chromium', 'firefox', 'webkit'],
  testSuites: [
    { name: 'Authentication', file: 'auth.spec.ts' },
    { name: 'Job Listings', file: 'jobs.spec.ts' },
    { name: 'Applications', file: 'applications.spec.ts' },
    { name: 'Dashboard', file: 'dashboard.spec.ts' },
    { name: 'Responsive Design', file: 'responsive.spec.ts' },
    { name: 'API Integration', file: 'api.spec.ts' }
  ]
};

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Test results storage
const testResults = {
  passed: 0,
  failed: 0,
  skipped: 0,
  duration: 0,
  suites: []
};

async function runTest(suite, browser) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    console.log(`${colors.blue}Running ${suite.name} tests on ${browser}...${colors.reset}`);
    
    const playwright = spawn('npx', [
      'playwright', 
      'test', 
      `tests/e2e/${suite.file}`,
      '--project', 
      browser,
      '--reporter', 
      'json'
    ], {
      shell: true,
      stdio: 'pipe'
    });

    let output = '';
    let errorOutput = '';

    playwright.stdout.on('data', (data) => {
      output += data.toString();
    });

    playwright.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    playwright.on('close', (code) => {
      const duration = Date.now() - startTime;
      
      if (code === 0) {
        console.log(`${colors.green}✓ ${suite.name} on ${browser} passed (${duration}ms)${colors.reset}`);
        testResults.passed++;
      } else {
        console.log(`${colors.red}✗ ${suite.name} on ${browser} failed (${duration}ms)${colors.reset}`);
        testResults.failed++;
        if (errorOutput) {
          console.log(`${colors.red}Error: ${errorOutput}${colors.reset}`);
        }
      }
      
      testResults.suites.push({
        name: suite.name,
        browser,
        status: code === 0 ? 'passed' : 'failed',
        duration,
        output,
        error: errorOutput
      });
      
      resolve();
    });
  });
}

async function generateReport() {
  const reportPath = path.join(__dirname, 'test-report.html');
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Integration Test Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      background-color: #f5f5f5;
    }
    .header {
      background-color: #333;
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .summary {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
    }
    .summary-card {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      flex: 1;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .summary-card h3 {
      margin-top: 0;
    }
    .passed { color: #4caf50; }
    .failed { color: #f44336; }
    .skipped { color: #ff9800; }
    .test-suite {
      background-color: white;
      margin-bottom: 20px;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .test-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .status-badge {
      padding: 5px 10px;
      border-radius: 4px;
      color: white;
      font-size: 12px;
    }
    .status-passed { background-color: #4caf50; }
    .status-failed { background-color: #f44336; }
    .browser-badge {
      background-color: #2196f3;
      color: white;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 12px;
      margin-left: 10px;
    }
    .duration {
      color: #666;
      font-size: 14px;
    }
    pre {
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Integration Test Report</h1>
    <p>Generated on: ${new Date().toLocaleString()}</p>
    <p>Total Duration: ${testResults.duration}ms</p>
  </div>
  
  <div class="summary">
    <div class="summary-card">
      <h3 class="passed">Passed</h3>
      <h2>${testResults.passed}</h2>
    </div>
    <div class="summary-card">
      <h3 class="failed">Failed</h3>
      <h2>${testResults.failed}</h2>
    </div>
    <div class="summary-card">
      <h3>Total Tests</h3>
      <h2>${testResults.passed + testResults.failed}</h2>
    </div>
  </div>
  
  <h2>Test Results</h2>
  ${testResults.suites.map(suite => `
    <div class="test-suite">
      <div class="test-header">
        <div>
          <strong>${suite.name}</strong>
          <span class="browser-badge">${suite.browser}</span>
        </div>
        <div>
          <span class="status-badge status-${suite.status}">${suite.status.toUpperCase()}</span>
          <span class="duration">${suite.duration}ms</span>
        </div>
      </div>
      ${suite.error ? `<pre class="failed">${suite.error}</pre>` : ''}
    </div>
  `).join('')}
</body>
</html>
  `;
  
  await fs.writeFile(reportPath, html);
  console.log(`\n${colors.cyan}Test report generated: ${reportPath}${colors.reset}`);
}

async function runAllTests() {
  console.log(`${colors.magenta}Starting Integration Tests${colors.reset}\n`);
  const startTime = Date.now();
  
  // Install browsers if needed
  console.log(`${colors.yellow}Ensuring Playwright browsers are installed...${colors.reset}`);
  await new Promise((resolve) => {
    const install = spawn('npx', ['playwright', 'install'], {
      shell: true,
      stdio: 'inherit'
    });
    install.on('close', resolve);
  });
  
  // Run tests sequentially to avoid conflicts
  for (const suite of testConfig.testSuites) {
    for (const browser of testConfig.browsers) {
      try {
        await runTest(suite, browser);
      } catch (error) {
        console.error(`${colors.red}Error running ${suite.name} on ${browser}: ${error}${colors.reset}`);
        testResults.failed++;
      }
    }
  }
  
  testResults.duration = Date.now() - startTime;
  
  // Generate report
  await generateReport();
  
  // Print summary
  console.log(`\n${colors.magenta}Test Summary:${colors.reset}`);
  console.log(`${colors.green}Passed: ${testResults.passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${testResults.failed}${colors.reset}`);
  console.log(`Total Duration: ${testResults.duration}ms`);
  
  // Exit with appropriate code
  process.exit(testResults.failed > 0 ? 1 : 0);
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error(`${colors.red}Unhandled error: ${error}${colors.reset}`);
  process.exit(1);
});

// Run tests
runAllTests();
