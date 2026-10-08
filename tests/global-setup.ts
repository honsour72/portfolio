import { execFileSync } from 'node:child_process';

export function setup() {
  execFileSync('pnpm', ['build'], {
    cwd: process.cwd(),
    stdio: 'pipe',
  });
}
