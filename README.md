# RWX Baker • Arknights: Endfield Message Generator/Dialogue Maker

> **An in-browser recreation and message generator for *Arknights: Endfield* "Baker" messaging app.**

[![Live Tool](https://img.shields.io/badge/Live_App-baker.rwyn.ch-ffd200.svg?style=flat&logoColor=black)](https://baker.rwyn.ch/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Trackers](https://img.shields.io/badge/Trackers-Zero-brightgreen.svg)](privacy.html)
[![Client-Side Only](https://img.shields.io/badge/Processing-100%25%20Client--Side-orange.svg)](privacy.html)
[![Fan Project](https://img.shields.io/badge/Project-Non--Commercial%20Fan%20Work-lightgrey.svg)](notice.html)

First and foremost, GLORY TO HYPERGRYPH!<br>GLORY TO THE COMMUNITY OF PLAYERS WHO MAKE THIS UNIVERSE THRIVE.

**RWX Baker** is a lightweight and pixel-faithful *(god it was painful)* web tool that lets you craft mock conversations, roleplay dialogues, and story scenarios using the in-game *Baker* SNS app styling from **Arknights: Endfield**. In short, an **Arknights: Endfield** message generator.

*RWX (ar-vi-ex) comes from RWyn (ar-win) eXperimenting, like any other tool, app or bot of mine.*

---
<br>
<p align="center" style="display: flex; justify-content: center; align-items: center; gap: 20px;">
  <img src="rwxbaker-assets/ui/extra-backups/favicon-bakerVer-noBlankSpace.png" width="32%" alt="RWX Logo">
  <img src="showcase/endfield-logo.png" width="24%" alt="Endfield Logo">
</p>

## Table of Contents

- [Features](#features)
- [Want to run it locally?](#want-to-run-it-locally)
- [Repository Structure](#repository-structure)
- [Customization & Theming](#customization--theming)
- [Contributing](#contributing)
- [Disclaimer & Intellectual Property](#disclaimer--intellectual-property)

## Features

- **Faithful Design:** *Meticulously* replicated UI styling, speech bubbles (9-slice scalable), custom fonts (*HarmonyOS Sans* & *Bender*), and very similar visual accents.<br>*I'm not touching CSS for a long time. I'm losing my mind...*
- **Complete Character List:**
  - 33 Playable Operators (Perlica, Chen Qianyu, Wulfgard, Ember, Yvonne, etc.)<br>
  - 30 Game NPCs (Eliza, Dannier, Alexander, Fiona, etc.)<br><br>
  <img src="showcase/character-list.gif" width="40%" alt="character-list"><br>
  - Endmin (Female & Male) identity toggles.<br><br>
  <img src="showcase/user-identity.png" width="40%" alt="user-identity"><br><br>
- **Stickers & Emojis:**
  - Full collection of **168 game stickers** with searchable/grid picker (excluding skland stickers).
  - **38 game emojis** for in-text embedding and message reactions.<br><br>
  <img src="showcase/emojis-stickers1.png" width="40%" alt="emojis-stickers1"><br><img src="showcase/emojis-stickers2.png" width="40%" alt="showcase/emojis-stickers2"><br><img src="showcase/stickers.png" width="40%" alt="sticker-levi"><br>

- **Single & Group Conversations:**
  - Toggle between 1-on-1 chats and multi-character group channels.
  - Custom group titles and dynamic speaker switching.<br><br><img src="showcase/chat-mode.png" width="30%" alt="chat-mode"><br>
  - Group chat example:<br><br>
  <img src="showcase/group-chat.png" width="50%" alt="group-chat">
- **Interactive Dialogue Composer** *(Skuqre take notes)*:
  - Standard speech bubbles for incoming & outgoing.
  - Image bubbles, yes you can send images with **real-time drag resizing**.<br><br><img src="showcase/image-msg.gif" width="40%" alt="image-msg"><br>
  - Dialogue choices, you can add 1 or 2 choices like the in-game version.<br>Clicking on it will send it as a message/reply.<br><br><img src="showcase/choices.png" width="50%" alt="choices"><br>
  - Emoji reactions attached to individual messages.<br>Yes you can react to messages just like in-game version of the app.<br><br><img src="showcase/reactions.png" width="40%" alt="reactions"><br>
  - Quick inline editing (click any message or layer to modify text or sender).<br>Compose Context mode automatically switches to Edit Mode when a message is selected.<br><br><img src="showcase/edit-mode.gif" width="40%" alt="edit-mode">
- **Drag-and-Drop Reordering:**
  - Reorder messages directly in the conversation viewport, click and hold the message bubble and move around,<br>Or via the **Conversation Layers** panel on bottom left, click and move the selected message.<br><br><img src="showcase/reorder-msg.gif" width="50%" alt="reorder-msg">
- **High-Resolution PNG Export:**
  - **Screen Mode:** Captures the current visible frame. Set as default, captures the render on the screen at that moment.
  - **Full Chat Mode:** Stitches the entire conversation from start to finish into a single continuous image.<br>Not recommended for very long conversations. For those try Multi-Page mode instead. 
  - **Multi-Page Mode:** Automatically segments long conversations into sequential slides (`RWX-Baker-1.png`, `RWX-Baker-2.png`, etc.) with continuity overlap for social media carousels.
  - **Anti-Leak Telemetry Stamp:** Exports automatically include a subtle Endfield OS telemetry stamp (`// RWX.SYS-01` or `RWX // BKR ■ 01`) dynamically rendered during capture to verify fan/community origin.<br><br>Click on the HINTS button see more tips about these export options.<br><br>
  ![ExampleExportOptions](showcase/export-options.gif)
- **Dual Viewports:** Switch seamlessly between **Tablet** and **Phone** aspect modes.<br>Note: Phone mode is currently a bit broken, since I initially started making this tool for the actual, in-game size of the Baker, not compact Phone version. But I will hopefully fix it in the future. For now, use it only for small 1 on 1 chats. That shouldn't break anything.<br><br><img src="showcase/switch-views.png" width="45%" alt="Description of image">
- **100% Private & Client-Side:** No sign-ups, no cookies, no advertising, and no analytics. Every keystroke and image export is processed strictly within your local browser.

---

## Want to run it locally?

RWX Baker has **zero build dependencies**, it runs directly out of the box using vanilla HTML, CSS, and JS.<br>I wanted it to be this way from the start. Anyone can easily run it.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rwynx/RWX-Baker.git
   cd RWX-Baker
   ```

2. **Serve the directory:**
   Use any lightweight local HTTP server to avoid CORS restrictions:

   *Python:*
   ```bash
   python -m http.server 8000
   ```

   *Node.js:*
   ```bash
   npx serve .
   ```

   Or use the VS Code Live Server extension I guess.

3. **Open in your browser:**
   ```
   http://localhost:8000
   ```

---

## Repository Structure

```
├── index.html                           # main editor
├── watermark-styles.html                # interactive watermark lab & code generator
├── CUSTOMIZATION.md                     # CSS variables, offsets & styling guide
├── privacy.html                         
├── notice.html                          
├── LICENSE                              
├── showcase                             # example screenshots
├── rwxbaker-css/
│   └── style.css                        # complete studio & preview styling
├── rwxbaker-js/
│   ├── app.js                           # app core logic & state
│   └── dom-to-image-more.min.js         # client-side image rendering engine
└── rwxbaker-assets/                     # only used bundle (~8.9 MB)
    ├── avatars/                         # operator & NPC portraits
    ├── deco/                            # chat bubble skins & frame graphics
    ├── emoji/                           # game emojis
    ├── fonts/                           # harmonyOS sans & bender web fonts
    ├── icons/                           # UI action icons
    ├── stickers/                        # 168 game stickers (excluding skland stickers)
    ├── ui/                              # site assets/backgrounds etc.
    └── watermarks/                      # 4 sci-fi OS export watermark stamps
```

---

## Customization & Theming

Want to do some lazy edits/tweaks to layout? Adjust chat dimensions, or skin the UI? I took my damn time and put everything together, all sizing and offset parameters are *cleanly* exposed via native CSS variables. You can check this **[customization guide](CUSTOMIZATION.md)** for details on stuff like:
- Adjusting device frames like left (editor) and right (message) panel sizes, locations (tablet vs. phone aspect ratios)
- Bubble alignments, avatars, and media offsets (stickers, images etc.)
- Header asset controls, move the chat header assets around (especially phone view asset pos needs help)
- Topographic map decoration controls and opacity
- Export watermark stamp styles, positions, and live tuning workbench ([watermark-styles.html](watermark-styles.html))
- Glow effects, animated button borders, and color themes
- And some other stuff

---

## Contributing

Contributions are welcomed. If you'd like to help:
- Adding newly released characters, NPCs, or stickers as the game updates
- Reporting UI rendering bugs or recommending workflow
- Submitting localization or accessibility improvements

Feel free to open an **issue** or submit a **pull request**.

---

## Disclaimer & Intellectual Property

First and foremost, GLORY TO HYPERGRYPH!

- **RWX Baker** is an independent, non-commercial fan creation developed for creative entertainment and community storytelling purposes under fair fan-use principles.
- No ads, no trackers, no logins, no analytics, no donations, nothing.<br>**RWX Baker is fully FREE and will always be this way.**
- *Arknights: Endfield*, the "Baker" communication system (instant messaging app), character names, designs, lore, and related trademarks are the sole and exclusive intellectual property of **HYPERGRYPH Co., Ltd.** and **GRYPHLINE Pte. Ltd.**
- This project is **not** affiliated with, endorsed by, or sponsored by HYPERGRYPH or GRYPHLINE.
- Source code is licensed under the [MIT License](LICENSE). Third-party game intellectual property remains with their respective copyright holders.

For details, see [NOTICE](notice.html) and [PRIVACY](privacy.html).
