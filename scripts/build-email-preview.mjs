import { spawnSync } from 'node:child_process';

const result = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], {
  env: { ...process.env, EMAIL_PREVIEW: '1' },
  stdio: 'inherit',
});

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
