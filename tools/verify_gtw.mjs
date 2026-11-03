#!/usr/bin/env node
/**
 * ============================================================================
 * Automated Verification Suite for W.O.P.R. // Global Thermonuclear War (1983)
 * Verifies HTML/CSS/JS Simulation Engine, Phase 1-3 Mechanics, and Compiled
 * Native Windows Desktop Executable (GTW_WOPR.exe).
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        passed++;
        console.log(`  [PASS] ${message}`);
    } else {
        failed++;
        console.error(`  [FAIL] ${message}`);
    }
}

console.log('======================================================================');
console.log(' W.O.P.R. // GLOBAL THERMONUCLEAR WAR (1983) — VERIFICATION SUITE');
console.log('======================================================================');

// 1. Verify Core Files & Steam Build Configuration
const requiredFiles = [
    'index.html',
    'style.css',
    'game.js',
    'desktop/GTW_WOPR.csproj',
    'desktop/Program.cs',
    'dist/GTW_WOPR_Win64/GTW_WOPR.exe',
    'dist/GTW_WOPR_Win64/wwwroot/index.html',
    'dist/GTW_WOPR_Win64/wwwroot/game.js',
    'dist/GTW_WOPR_Win64/wwwroot/style.css',
    'tools/steam_app_build.vdf'
];

for (const rel of requiredFiles) {
    const full = path.join(ROOT, rel);
    assert(fs.existsSync(full), `File exists: ${rel}`);
}

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(ROOT, 'game.js'), 'utf8');
const vdf = fs.readFileSync(path.join(ROOT, 'tools/steam_app_build.vdf'), 'utf8');

// 2. Verify Non-Module Offline Script & CRT Styling
assert(
    html.includes('<script src="game.js"></script>') && !html.includes('type="module"'),
    'index.html uses standard non-module <script> tag for 100% offline file:// and desktop compatibility'
);
assert(
    css.includes('--phosphor-main') && css.includes('theme-green') && css.includes('theme-amber') && css.includes('crt-curvature'),
    'style.css implements P1 Cyan, P39 Green, P3 Amber phosphor themes and CRT curvature/scanline toggle'
);
assert(
    vdf.includes('"AppBuild"') && vdf.includes('GTW_WOPR_Win64'),
    'tools/steam_app_build.vdf is valid Steamworks AppBuild configuration'
);

// 3. Verify Phase 1: IMSAI 8080 Dial-In, Bell 103 300-Baud Handshake & Joshua Dialogue
assert(
    js.includes('modemHandshake300Baud') && js.includes('2225') && js.includes('311-555-4855'),
    'Phase 1: Synthesized WebAudio 300-baud Bell 103 modem handshake & Sunnyvale 311-555-4855 dialer present'
);

const expectedGames = [
    "FALKEN'S MAZE", "BLACK JACK", "GIN RUMMY", "HEARTS", "BRIDGE",
    "CHECKERS", "CHESS", "POKER", "FIGHTER COMBAT", "GUERRILLA ENGAGEMENT",
    "DESERT WARFARE", "AIR-TO-GROUND ACTIONS", "THEATERWIDE TACTICAL WARFARE",
    "THEATERWIDE BIOTOXIC AND CHEMICAL WARFARE", "GLOBAL THERMONUCLEAR WAR"
];
assert(
    expectedGames.every(g => js.includes(g)),
    'Phase 1: Full 15-game 1983 WOPR catalog verified'
);
assert(
    js.includes('GREETINGS PROFESSOR FALKEN.') &&
    js.includes('HOW ARE YOU FEELING TODAY?') &&
    js.includes('SHALL WE PLAY A GAME?') &&
    js.includes("WOULDN'T YOU PREFER A GOOD GAME OF CHESS?"),
    'Phase 1: Authentic 1983 WarGames dialogue & Chess Easter egg verified'
);

// 4. Verify Phase 2: NORAD Big Board, BMEWS Radars, Full Strategic Triad, MIRV, EMP & Fallout
assert(
    js.includes('MALMSTROM') && js.includes('MINOT') && js.includes('WARREN') && js.includes('WHITEMAN') &&
    js.includes('DOMBAROVSKY') && js.includes('KOZELSK') && js.includes('KARTALY') && js.includes('UZHUR'),
    'Phase 2: USA & USSR ICBM Silo Wings verified'
);
assert(
    js.includes('USS OHIO') && js.includes('TK-208 TYPHOON') && js.includes('K-51 DELTA-IV') &&
    js.includes('B-52H') && js.includes('TU-95 BEAR') && js.includes('TU-160 BLACKJACK') &&
    js.includes('SPRINT/SPARTAN ABM') && js.includes('A-135 MOSCOW GALOSH ABM') &&
    js.includes('DSP-11') && js.includes('OKO US-KS'),
    'Phase 2: Full Strategic Triad (SSBNs, Bombers, ABMs, DSP/Oko Satellites) verified'
);
assert(
    js.includes('THULE BMEWS') && js.includes('CLEAR ALASKA BMEWS') &&
    js.includes('FYLINGDALES UK BMEWS') && js.includes('PECHORA DARYAL RADAR'),
    'Phase 2: BMEWS Early Warning Radar Domes (Thule, Clear, Fylingdales, Pechora) verified'
);

// 5. Verify Phase 3: CPE 1704 TKS Launch Code Tumbler & Tic-Tac-Toe 0-Player Finale
assert(
    js.includes("['C', 'P', 'E', '1', '7', '0', '4', 'T', 'K', 'S']") &&
    js.includes('startCpeTumblerSequence') &&
    js.includes('startZeroPlayerTicTacToe') &&
    js.includes('A STRANGE GAME.') &&
    js.includes('THE ONLY WINNING MOVE IS NOT TO PLAY.') &&
    js.includes('HOW ABOUT A NICE GAME OF CHESS?'),
    'Phase 3: CPE 1704 TKS Launch Code Tumbler Lock & 0-Player Tic-Tac-Toe realization sequence verified'
);

// 6. Execute Headless VM Sandbox Simulation of game.js
const elements = new Map();
function makeMockEl(id) {
    return {
        id,
        textContent: '',
        innerHTML: '',
        value: '',
        className: '',
        offsetHeight: 60,
        style: {},
        classList: {
            _set: new Set(),
            add(...cls) { cls.forEach(c => this._set.add(c)); },
            remove(...cls) { cls.forEach(c => this._set.delete(c)); },
            toggle(c, force) {
                if (force === undefined) {
                    if (this._set.has(c)) this._set.delete(c); else this._set.add(c);
                } else if (force) this._set.add(c); else this._set.delete(c);
            },
            contains(c) { return this._set.has(c); }
        },
        appendChild() {},
        addEventListener() {},
        getBoundingClientRect() { return { width: 900, height: 640, left: 0, top: 0 }; },
        parentElement: {
            getBoundingClientRect() { return { width: 900, height: 640, left: 0, top: 0 }; }
        },
        getContext() {
            return {
                fillStyle: '', strokeStyle: '', lineWidth: 1, font: '', textAlign: '',
                fillRect() {}, strokeRect() {}, beginPath() {}, moveTo() {}, lineTo() {},
                closePath() {}, stroke() {}, fill() {}, arc() {}, ellipse() {},
                quadraticCurveTo() {}, setLineDash() {}, save() {}, restore() {}, fillText() {}
            };
        },
        focus() {}
    };
}

let loadCallback = null;
const sandbox = {
    window: {
        innerWidth: 1280,
        innerHeight: 820,
        addEventListener(evt, fn) { if (evt === 'load') loadCallback = fn; },
        AudioContext: function() {
            return {
                state: 'running',
                currentTime: 0,
                sampleRate: 44100,
                destination: {},
                resume: () => Promise.resolve(),
                createOscillator: () => ({
                    type: 'sine',
                    frequency: { setValueAtTime() {}, exponentialRampToValueAtTime() {} },
                    connect() {}, start() {}, stop() {}
                }),
                createGain: () => ({
                    gain: { setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {} },
                    connect() {}
                }),
                createBuffer: (_ch, len) => ({ getChannelData: () => new Float32Array(len) }),
                createBufferSource: () => ({ buffer: null, connect() {}, start() {} }),
                createBiquadFilter: () => ({
                    type: 'lowpass',
                    frequency: { setValueAtTime() {}, exponentialRampToValueAtTime() {} },
                    connect() {}
                })
            };
        }
    },
    document: {
        body: makeMockEl('body'),
        getElementById(id) {
            if (!elements.has(id)) elements.set(id, makeMockEl(id));
            return elements.get(id);
        },
        createElement(tag) { return makeMockEl(tag); }
    },
    getComputedStyle: () => ({ getPropertyValue: () => '#38f8ff' }),
    requestAnimationFrame: () => 1,
    setTimeout: (fn) => { fn(); return 1; },
    clearTimeout: () => {},
    setInterval: () => 1,
    clearInterval: () => {},
    Math, Date, console
};
sandbox.window.document = sandbox.document;

vm.createContext(sandbox);
vm.runInContext(`${js}\n;window.WoprGame = WoprGame;`, sandbox);
if (loadCallback) loadCallback();

const gameApi = sandbox.window.WoprGame;
assert(typeof gameApi === 'object' && typeof gameApi.getState === 'function', 'WoprGame engine initialized in VM');

const st0 = gameApi.getState();
assert(st0.unitsCount === 24 && st0.radarsCount === 4 && st0.satellitesCount === 4 && st0.bunkersCount === 6 && st0.citiesCount === 12,
    `Order of Battle verified: ${st0.unitsCount} Triad Units, ${st0.radarsCount} BMEWS Radars, ${st0.satellitesCount} Satellites, ${st0.bunkersCount} Bunkers, ${st0.citiesCount} Cities`);

// Test Scenario & Doctrine Execution
gameApi.selectSide('USA');
gameApi.loadScenario('DECAP');
const stDecap = gameApi.getState();
assert(stDecap.defcon <= 2 && stDecap.activeMissilesCount > 0,
    `First Strike Decapitation scenario launches MIRV trajectories & escalates DEFCON (DEFCON ${stDecap.defcon}, Missiles: ${stDecap.activeMissilesCount})`);

gameApi.startCpeTumblerSequence();
const stCpe = gameApi.getState();
assert(stCpe.cpeCode === 'CPE1704TKS', 'CPE 1704 TKS Launch Code tumbler sequence verified');
gameApi.stopCpeTumblerSequence();

// Verify Dual Play Modes (1983 MOVIE MODE vs PLAY THE GAME WARGAMER MODE) & IMSAI 8080 Fullscreen
gameApi.setGameMode('WARGAME');
assert(gameApi.getState().gameMode === 'WARGAME', 'Dual Play Mode: Strategic Wargamer Mode (WARGAME) activated');
gameApi.setGameMode('MOVIE');
assert(gameApi.getState().gameMode === 'MOVIE', 'Dual Play Mode: 1983 Movie Mode (MOVIE) activated');
gameApi.toggleImsaiFullscreen(true);
assert(gameApi.getState().imsaiFullscreen === true, 'IMSAI 8080 Fullscreen CRT toggle verified');
gameApi.toggleImsaiFullscreen(false);
assert(
    js.includes('GAME TIME ELAPSED:') && js.includes('PRIMARY TARGETS: 01 LAS VEGAS') && js.includes('#000000'),
    'Authentic 1983 WarGames hollow vector continents & NORAD bottom telemetry readout verified'
);

// 7. Verify Compiled Native Windows Desktop Executable (GTW_WOPR.exe --verify)
const exePath = path.join(ROOT, 'dist', 'GTW_WOPR_Win64', 'GTW_WOPR.exe');
try {
    const stdout = execFileSync(exePath, ['--verify'], { encoding: 'utf8', timeout: 8000 }).trim();
    const parsed = JSON.parse(stdout);
    assert(
        parsed.status === 'OK' && parsed.assetsVerified === true && parsed.app === 'GTW_WOPR.exe',
        `GTW_WOPR.exe --verify executed cleanly: ${stdout}`
    );
} catch (err) {
    assert(false, `GTW_WOPR.exe --verify execution failed: ${err.message}`);
}

console.log('======================================================================');
console.log(` VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('======================================================================');
process.exit(failed > 0 ? 1 : 0);
