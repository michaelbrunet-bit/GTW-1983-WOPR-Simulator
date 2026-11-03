# W.O.P.R. // Global Thermonuclear War (1983 NORAD Vector Simulator)

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](https://opensource.org/licenses/MIT)
[![Platform: HTML5 / Win64](https://img.shields.io/badge/Platform-HTML5%20%7C%20Windows%20x64-00d8ff.svg)](#quick-start)
[![Visuals: 1983 Vector CRT](https://img.shields.io/badge/CRT-1983%20HP%201345A%20Vector-38f8ff.svg)](#authentic-1983-wargames-vector-visuals)

An open-source, zero-dependency tribute to the **1983 *WarGames* film** — recreating both David Lightman's **IMSAI 8080 acoustic-coupler dial-in terminal** and the **NORAD Cheyenne Mountain "Big Board" Vector Strategic Simulator** (`W.O.P.R. — War Operation Plan Response`).

 Playable two ways:
1. **🎬 1983 MOVIE MODE** — Experience the authentic 1983 film sequence (`311-555-4855` → `LOGON: Joshua` → `GLOBAL THERMONUCLEAR WAR` → `PRIMARY TARGETS: LAS VEGAS & SEATTLE` → `CPE 1704 TKS` launch-code tumbler lock → `0-Player Tic-Tac-Toe` realization: *"THE ONLY WINNING MOVE IS NOT TO PLAY."*).
2. **⚔️ PLAY THE GAME (STRATEGIC WARGAMER MODE)** — Disables the forced movie cutscene lock (`CPE 1704 TKS`) so you can command the **United States (NORAD/SAC)** or **Soviet Union (General Staff)** in an interactive Cold War strategic nuclear exchange and achieve **Strategic Victory** through C3I Decapitation, Counterforce silo strikes, SSBN stealth second-strike salvos, and Sprint/Galosh ABM defense.

---

## Authentic 1983 *WarGames* Vector Visuals

- **Pure Hollow Glowing Vector Continents**: Modeled after the 1983 film's **HP 1345A / Evans & Sutherland** vector displays on a pitch-black `#000000` oscilloscope background — double-pass cyan phosphor bloom (`#38f8ff`) + crisp inner vector beam (`#d8ffff`) with **zero solid polygon fills**.
- **1983 `+` Calibration Cross-Ticks & Dual Projections**: Toggle between the **NORAD Mercator Big Board** (with oceanic `+` vector calibration ticks and dashed Arctic DEW Line) and **Arctic Polar Over-The-Pole** vector projection.
- **Full-Screen IMSAI 8080 CRT Mode (`🖥️ IMSAI 8080 CRT`)**: Switch at any time to a full-screen 1983 home computer terminal view for war-dialing Sunnyvale (`311-555-4855`) and chatting with `JOSHUA`.
- **NORAD Bottom Vector Status Telemetry Box**: Real-time `GAME TIME ELAPSED`, `ESTIMATED REMAINING`, active war plan, `PRIMARY TARGETS: 01 LAS VEGAS • 02 SEATTLE`, and live `LAUNCH CODE: [ C P E 1 7 0 4 T K S ]` decryption readout.
- **Phosphor CRT Themes & Procedural WebAudio**: Switch between **P1 Cyan-Blue** (1983 NORAD Vector Display), **P39 Tektronix Green**, and **P3 IBM Amber**, complete with synthesized **300-baud Bell 103 modem handshakes**, **DTMF dial tones**, **DEFCON klaxons**, and **MIRV bus separation audio**.

---

## Dual Play Modes

### 1. 🎬 1983 Movie Mode (`MOVIE`)
Click **`🎬 1983 MOVIE MODE`** (and use **`▶ NEXT 1983 MOVIE SCENE`** or type commands directly):
1. War-dial **Sunnyvale, CA (`311-555-4855`)** on the IMSAI 8080 modem.
2. Log in with **`JOSHUA`** (`GREETINGS PROFESSOR FALKEN. SHALL WE PLAY A GAME?`).
3. Type **`LIST GAMES`** to inspect the 15-game 1983 WOPR catalog (`FALKEN'S MAZE`, `CHESS`, `FIGHTER COMBAT`, `GUERRILLA ENGAGEMENT`, `GLOBAL THERMONUCLEAR WAR`, etc.).
4. Select **`GLOBAL THERMONUCLEAR WAR`**, choose **`2. SOVIET UNION`**, and enter **`LAS VEGAS, SEATTLE`** to launch the iconic cross-polar trajectory strike.
5. Watch WOPR escalate to **DEFCON 1** and begin decrypting the **`CPE 1704 TKS`** launch code tumbler lock.
6. Override WOPR by launching **`TIC-TAC-TOE (0 PLAYERS)`**, forcing Joshua to simulate all 24 nuclear war plans (`WINNER: NONE`) until he concludes:
   > *"A STRANGE GAME. THE ONLY WINNING MOVE IS NOT TO PLAY. HOW ABOUT A NICE GAME OF CHESS?"*

### 2. ⚔️ Play The Game — Strategic Wargamer Mode (`WARGAME`)
Click **`⚔️ PLAY THE GAME (WARGAMER)`** in the top-left mode selector:
- **No Forced Cutscenes**: WOPR will not interrupt your campaign with the `CPE 1704 TKS` lock at DEFCON 1.
- **Full Strategic Triad Order of Battle (24 Units)**:
  - **ICBM Silo Wings**: Malmstrom, Minot, F.E. Warren, Whiteman (Minuteman III / Peacekeeper MX) vs. Dombarovsky, Kozelsk, Kartaly, Uzhur (SS-18 Satan / SS-19 Stiletto).
  - **Stealth Ballistic Missile Submarines (SSBNs)**: `USS Ohio`, `USS Michigan`, `USS Florida` vs. `TK-208 Typhoon`, `TK-202 Typhoon`, `K-51 Delta-IV` (hidden from enemy targeting until they fire).
  - **Strategic Bomber Wings & Interceptors**: B-52H Stratofortress & F-15 Eagle vs. Tu-95 Bear & Tu-160 Blackjack on fail-safe airborne alert orbits.
  - **ABM Defense Batteries**: Safeguard Sprint/Spartan (Grand Forks / Cheyenne Mtn) & A-135 Moscow Galosh / S-300P Leningrad.
- **How to Win**:
  - Execute **Decapitation** strikes against enemy Command Bunkers (**Cheyenne Mountain**, **Pentagon**, **Offutt AFB** / **Kremlin**, **Severomorsk**, **Kosvinsky Mountain**) to reduce Enemy Command Authority (`C3I`) to `0%` and paralyze their retaliation!
  - Or execute **Counterforce** strikes to destroy all armed enemy ICBM silos, SSBNs, and bomber wings while defending your homeland with **Auto-ABM / Manual ABM** interceptors.

---

## Quick Start

### Option A: Instant Browser Play (Zero Dependencies)
Clone the repository and open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari):
```bash
git clone https://github.com/michaelbrunet-bit/GTW-1983-WOPR-Simulator.git
cd GTW-1983-WOPR-Simulator
# Open index.html directly in your browser
```

### Option B: Native Windows 64-Bit Desktop App (`GTW_WOPR.exe`)
```powershell
# Launch the standalone Win64 WebView2 Desktop App
.\dist\GTW_WOPR_Win64\GTW_WOPR.exe

# Run the automated 25-point verification suite
node .\tools\verify_gtw.mjs
```

---

## License
Released under the **MIT License** — free to download, play, fork, and study.
