import { spawnSync } from 'child_process';

console.log('Verifying CLI Build and Logic...');

// 1. Verify Build
console.log('1. Running Build...');
const build = spawnSync('pnpm', ['build'], { stdio: 'inherit', encoding: 'utf-8' });
if (build.status !== 0) {
  console.error('Build Failed');
  process.exit(1);
}

// 2. Verify Tests (which cover the interactive logic via mocks)
console.log('2. Running Tests...');
const test = spawnSync('pnpm', ['test'], { 
  env: { ...process.env, CI: 'true' },
  stdio: 'inherit',
  encoding: 'utf-8' 
});

if (test.status !== 0) {
  console.error('Tests Failed');
  process.exit(1);
}

console.log('CLI Verification (Build + Tests) Passed!');
console.log('For interactive verification, please run: node packages/cli/dist/index.js');