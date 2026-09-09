import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
mkdirSync('.tmp', { recursive: true });
const result = spawnSync(process.execPath, ['node_modules/@playwright/test/cli.js', 'test', ...process.argv.slice(2)], { stdio: 'inherit', env: { ...process.env, TEMP: resolve('.tmp'), TMP: resolve('.tmp') } });
process.exit(result.status ?? 1);
