import { readFileSync, existsSync, statSync } from 'fs';
import { resolve, dirname } from 'path';

function isFile(p) {
  try { return statSync(p).isFile(); } catch { return false; }
}

function scanFile(filePath, visited = new Set(), depth = 0) {
  if (visited.has(filePath) || depth > 10) return [];
  visited.add(filePath);

  if (!existsSync(filePath) || !isFile(filePath)) {
    return [{ MISSING_FILE: filePath }];
  }

  const content = readFileSync(filePath, 'utf8');
  const importRegex = /from\s+['"]([^'"]+)['"]/g;
  const issues = [];
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const imp = match[1];
    if (!imp.startsWith('.')) continue;

    const dir = dirname(filePath);
    const candidates = [
      resolve(dir, imp + '.ts'),
      resolve(dir, imp + '.tsx'),
      resolve(dir, imp + '/index.ts'),
      resolve(dir, imp + '/index.tsx'),
      resolve(dir, imp),
    ];

    const found = candidates.find(c => isFile(c));
    if (!found) {
      issues.push({ SOURCE: filePath.replace('C:/portfolio/portfolio-website/src/', ''), BROKEN_IMPORT: imp });
    } else {
      const subIssues = scanFile(found, visited, depth + 1);
      issues.push(...subIssues);
    }
  }
  return issues;
}

const start = 'C:/portfolio/portfolio-website/src/components/MainContainer.tsx';
const issues = scanFile(start);

if (issues.length === 0) {
  console.log('✅ No broken relative imports found in MainContainer chain.');
} else {
  console.log('❌ BROKEN IMPORTS FOUND:');
  issues.forEach(i => console.log(JSON.stringify(i)));
}
