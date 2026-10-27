// Comprobación rápida de enlaces locales y anclas de index.html.
// Uso: node scripts/check.mjs
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const css = readFileSync(join(root, 'css', 'styles.css'), 'utf8');
const problems = [];

const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

for (const [, attr, value] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(value)) continue;
    if (value.startsWith('#')) {
        if (!ids.has(value.slice(1))) problems.push(`Ancla sin destino: ${value}`);
    } else if (!existsSync(join(root, value))) {
        problems.push(`Archivo inexistente (${attr}): ${value}`);
    }
}

for (const [, value] of css.matchAll(/url\("?([^")]+)"?\)/g)) {
    if (value.startsWith('data:')) continue;
    if (!existsSync(join(root, 'css', value))) problems.push(`Recurso CSS inexistente: ${value}`);
}

const seen = new Set();
for (const [, id] of html.matchAll(/\sid="([^"]+)"/g)) {
    if (seen.has(id)) problems.push(`id duplicado: ${id}`);
    seen.add(id);
}

if (problems.length) {
    console.error(problems.join('\n'));
    process.exit(1);
}
console.log('OK: enlaces locales, anclas y recursos CSS comprobados.');
