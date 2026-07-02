import { readFile, writeFile } from 'node:fs/promises';

const [version, output] = process.argv.slice(2);
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version ?? '')) {
	throw new Error('Usage: node scripts/release-notes.mjs <semver> <output-file>');
}

const changelog = await readFile(new URL('../CHANGELOG.md', import.meta.url), 'utf8');
const lines = changelog.split(/\r?\n/);
const start = lines.findIndex((line) => line.startsWith(`## [${version}]`));
const end = lines.findIndex((line, index) => index > start && line.startsWith('## ['));
const notes =
	start >= 0
		? lines
				.slice(start + 1, end >= 0 ? end : undefined)
				.join('\n')
				.trim()
		: '';
if (!notes) throw new Error(`CHANGELOG.md has no section for ${version}`);
await writeFile(output, `${notes}\n`);
