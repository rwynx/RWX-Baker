/**
 * RWX Baker - Character Sync
 * 
 * script fetches the latest ops & npcs from the wiki.gg API
 * and updates the rwxbaker-js/characters.js
 * 
 * run locally via `node scripts/sync-characters.mjs`
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const CHARACTERS_JS_PATH = path.join(ROOT_DIR, 'rwxbaker-js', 'characters.js');
const OPERATOR_AVATAR_DIR = path.join(ROOT_DIR, 'rwxbaker-assets', 'avatars', 'operator');
const INDEX_HTML_PATH = path.join(ROOT_DIR, 'index.html');
const CLASSIC_HTML_PATH = path.join(ROOT_DIR, 'classic.html');
const APP_JS_PATH = path.join(ROOT_DIR, 'rwxbaker-js', 'app.js');
const TERMINAL_JS_PATH = path.join(ROOT_DIR, 'rwxbaker-js', 'terminal.js');

const USER_AGENT = 'RWXBaker-SyncBot/1.0 (+https://github.com/rwynx/RWX-Baker)';

// avoid duplication
const KNOWN_ALIASES = {
  'Endministrator': 'skip',
  'Lifeng': 'lifeng',           // local: Li Feng
  'Purrchena': 'purrche',       // local: Purrche
  'Snowshine': 'aurora',        // local: Aurora
};

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function fetchWikiJson(url) {
  const resp = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!resp.ok) {
    throw new Error(`Wiki API error: ${resp.status} ${resp.statusText}`);
  }
  return resp.json();
}

async function getWikiOperators() {
  const url = 'https://endfield.wiki.gg/api.php?action=query&list=categorymembers&cmtitle=Category:Operators&cmlimit=100&format=json';
  const data = await fetchWikiJson(url);
  const members = data?.query?.categorymembers || [];
  return members
    .map(m => m.title)
    .filter(title => !title.startsWith('Category:') && KNOWN_ALIASES[title] !== 'skip');
}

async function getOperatorIconUrl(operatorName) {
  // standard naming for `File:<Name> icon.png`
  const candidateFilenames = [
    `File:${operatorName} icon.png`,
    `File:${operatorName} Icon.png`,
    `File:${operatorName}.png`
  ];

  for (const filename of candidateFilenames) {
    const url = `https://endfield.wiki.gg/api.php?action=query&titles=${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
    const data = await fetchWikiJson(url);
    const pages = data?.query?.pages || {};
    for (const pid of Object.keys(pages)) {
      const page = pages[pid];
      if (page.imageinfo && page.imageinfo[0]?.url) {
        return page.imageinfo[0].url;
      }
    }
  }

  return null;
}

async function downloadImage(url, destPath) {
  const resp = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!resp.ok) {
    throw new Error(`Failed to download image from ${url}: ${resp.status}`);
  }
  const arrayBuffer = await resp.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
}

function bumpVersionAcrossFiles() {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(now.getUTCDate()).padStart(2, '0');
  const dateStr = `${yyyy}${mm}${dd}`;

  let appJs = fs.readFileSync(APP_JS_PATH, 'utf-8');
  const versionMatch = appJs.match(/CURRENT_TUTORIAL_VERSION\s*=\s*"([^"]+)";/);
  let newVersion = `${dateStr}_v1`;

  if (versionMatch) {
    const oldVersion = versionMatch[1];
    if (oldVersion.startsWith(dateStr)) {
      const vNumMatch = oldVersion.match(/_v(\d+)$/);
      const nextV = vNumMatch ? parseInt(vNumMatch[1], 10) + 1 : 2;
      newVersion = `${dateStr}_v${nextV}`;
    }

    appJs = appJs.replace(versionMatch[0], `CURRENT_TUTORIAL_VERSION = "${newVersion}";`);
    fs.writeFileSync(APP_JS_PATH, appJs, 'utf-8');

    let termJs = fs.readFileSync(TERMINAL_JS_PATH, 'utf-8');
    termJs = termJs.replace(/CURRENT_TERMINAL_TEMPLATE_VERSION\s*=\s*"([^"]+)";/, `CURRENT_TERMINAL_TEMPLATE_VERSION = "${newVersion}";`);
    fs.writeFileSync(TERMINAL_JS_PATH, termJs, 'utf-8');

    let indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
    indexHtml = indexHtml.replace(new RegExp(`\\?v=${oldVersion}`, 'g'), `?v=${newVersion}`);
    fs.writeFileSync(INDEX_HTML_PATH, indexHtml, 'utf-8');

    if (fs.existsSync(CLASSIC_HTML_PATH)) {
      let classicHtml = fs.readFileSync(CLASSIC_HTML_PATH, 'utf-8');
      classicHtml = classicHtml.replace(new RegExp(`\\?v=${oldVersion}`, 'g'), `?v=${newVersion}`);
      fs.writeFileSync(CLASSIC_HTML_PATH, classicHtml, 'utf-8');
    }

    console.log(`[Sync] Bumped cache versions to: ${newVersion}`);
  }
}

async function main() {
  console.log('[Sync] Checking Endfield wiki for operator updates...');

  if (!fs.existsSync(CHARACTERS_JS_PATH)) {
    throw new Error(`characters.js not found at ${CHARACTERS_JS_PATH}`);
  }

  const charactersJs = fs.readFileSync(CHARACTERS_JS_PATH, 'utf-8');
  
  const existingNames = new Set();
  const existingIds = new Set();
  const nameMatches = charactersJs.matchAll(/name:\s*"([^"]+)"/g);
  for (const m of nameMatches) existingNames.add(m[1].toLowerCase());
  const idMatches = charactersJs.matchAll(/id:\s*"([^"]+)"/g);
  for (const m of idMatches) existingIds.add(m[1].toLowerCase());

  const wikiOperators = await getWikiOperators();
  console.log(`[Sync] Found ${wikiOperators.length} operators on wiki.`);

  const missingOperators = [];
  for (const opName of wikiOperators) {
    const alias = KNOWN_ALIASES[opName];
    if (alias && existingIds.has(alias)) continue;
    if (existingNames.has(opName.toLowerCase())) continue;
    if (existingIds.has(slugify(opName))) continue;
    missingOperators.push(opName);
  }

  if (missingOperators.length === 0) {
    console.log('[Sync] All operators are up to date! No changes needed.');
    return;
  }

  console.log(`[Sync] Found ${missingOperators.length} missing operator(s):`, missingOperators);

  let newLines = '';
  let addedCount = 0;

  for (const opName of missingOperators) {
    const slug = slugify(opName);
    console.log(`[Sync] Resolving avatar icon for "${opName}"...`);
    const iconUrl = await getOperatorIconUrl(opName);

    let avatarPath = '';
    if (iconUrl) {
      // against adblock triggers (like 'sns' or 'tweet')
      const cleanSlug = slug.replace(/(?:sns|tweet)_?/gi, '') || slug;
      const avatarFileName = `icon_round_chr_${cleanSlug}.png`;
      const localDest = path.join(OPERATOR_AVATAR_DIR, avatarFileName);
      console.log(`[Sync] Downloading ${iconUrl} -> ${avatarFileName}`);
      await downloadImage(iconUrl, localDest);
      avatarPath = `rwxbaker-assets/avatars/operator/${avatarFileName}`;
    } else {
      console.warn(`[Sync] Warning: No icon found for "${opName}". Using fallback generic avatar.`);
      avatarPath = 'rwxbaker-assets/avatars/operator/icon_round_chr_0004_pelica.png';
    }

    newLines += `  ${slug}: { id: "${slug}", name: "${opName}", avatar: "${avatarPath}", isNpc: false },\n`;
    addedCount++;
  }

  if (addedCount > 0) {

    const npcAnchor = '  // NPCs';
    if (!charactersJs.includes(npcAnchor)) {
      throw new Error(`Anchor "${npcAnchor}" not found in characters.js!`);
    }

    const updatedJs = charactersJs.replace(npcAnchor, `${newLines}\n${npcAnchor}`);
    fs.writeFileSync(CHARACTERS_JS_PATH, updatedJs, 'utf-8');
    console.log(`[Sync] Successfully added ${addedCount} new operator(s) to characters.js!`);

    bumpVersionAcrossFiles();
  }
}

main().catch(err => {
  console.error('[Sync Error]', err);
  process.exit(1);
});

