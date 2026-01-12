const fs = require('fs');
const assert = require('assert');

console.log("Verifying Shared Tooling...");

try {
  // Check for TypeScript config
  assert(fs.existsSync('tsconfig.json'), 'tsconfig.json is missing');
  
  // Check for ESLint config
  // Checking for common formats
  const eslintExists = fs.existsSync('.eslintrc.json') || fs.existsSync('.eslintrc.js') || fs.existsSync('eslint.config.js') || fs.existsSync('eslint.config.mjs');
  assert(eslintExists, 'ESLint configuration is missing');

  // Check for Prettier config
  const prettierExists = fs.existsSync('.prettierrc') || fs.existsSync('.prettierrc.json') || fs.existsSync('.prettierrc.js');
  assert(prettierExists, 'Prettier configuration is missing');

  // Check package.json for scripts
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  assert(pkg.scripts.lint, 'lint script is missing in package.json');
  assert(pkg.scripts.format, 'format script is missing in package.json');
  
  console.log("Shared Tooling Verification Passed!");
} catch (e) {
  console.error("Shared Tooling Verification Failed:", e.message);
  process.exit(1);
}
