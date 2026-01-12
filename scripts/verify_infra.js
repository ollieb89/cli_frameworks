const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("Verifying Infrastructure...");

try {
  // Check for critical configuration files
  assert(fs.existsSync('turbo.json'), 'turbo.json is missing');
  assert(fs.existsSync('pnpm-workspace.yaml'), 'pnpm-workspace.yaml is missing');
  
  // Check package.json for required devDependencies
  assert(fs.existsSync('package.json'), 'package.json is missing');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  assert(pkg.devDependencies && pkg.devDependencies.turbo, 'turbo is not listed in devDependencies');
  
  console.log("Infrastructure Verification Passed!");
} catch (e) {
  console.error("Infrastructure Verification Failed:", e.message);
  process.exit(1);
}
