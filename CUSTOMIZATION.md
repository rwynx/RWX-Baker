# RWX Baker • Customization & Styling Guide

This guide documents the design system, CSS custom properties (variables), layout architecture, and styling hooks available in **RWX Baker**. Whether you are adjusting offsets for a fork, skinning the UI, or fine-tuning elements for custom displays or exports, this document covers every tunable parameter.

---

## Table of Contents

1. [Architecture & Design Principles](#architecture--design-principles)
2. [Color Palette & Theme Variables](#color-palette--theme-variables)
3. [Editor Panel Layout](#editor-panel-layout)
4. [Chat Viewport & Device Frames](#chat-viewport--device-frames)
5. [Message Bubbles & Media Spacing](#message-bubbles--media-spacing)
6. [Topographic Map Decorations](#topographic-map-decorations)
7. [Chat Header & Background Typography](#chat-header--background-typography)
8. [Export Watermark & Stamp Customization](#export-watermark--stamp-customization)
9. [Interactive Buttons & Glow Effects](#interactive-buttons--glow-effects)
10. [DOM Architecture & Component Reference](#dom-architecture--component-reference)
11. [How to Apply Custom Styles](#how-to-apply-custom-styles)
12. [Terminal Mode Variables](#terminal-mode-variables)

---

## Architecture & Design Principles

All positioning and dimension controls in RWX Baker are driven by **CSS Custom Properties (variables)** located in [`rwxbaker-css/style.css`](rwxbaker-css/style.css).

- **Zero Build Step:** Styles are native CSS3. No preprocessors (SASS/LESS) or bundlers are required.
- **Scoped Variables:** Layout offsets are scoped to parent containers (`#editor-panel`, `#phone-frame`, `.chat-header`), allowing overrides without polluting global state.
- **Device Modes:** Switching between Tablet and Phone modes toggles the `.phone-mode` class on the root body/container, cleanly switching dimension sets without breaking message rendering.

---

## Color Palette & Theme Variables

Defined at `:root` level in [`rwxbaker-css/style.css`](rwxbaker-css/style.css):

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--bg-app-backdrop` | `#121315` | Default dark backing tone for the outer application viewport. |
| `--bg-panel` | `#1a1b1e` | Background color for the left editor sidebar. |
| `--bg-panel-card` | `#232428` | Background color for cards and section modules inside the editor panel. |
| `--bg-chat-viewport` | `#212226` | In-game Baker dark chat canvas background color. |
| `--bg-header` | `#28292d` | Chat frame top header bar color. |
| `--bg-footer` | `#28292d` | Chat frame bottom action bar color. |
| `--bg-input` | `#eeecec` | Light background for text inputs and dropdown fields. |
| `--color-text-white` | `#ffffff` | Primary text color. |
| `--color-text-dark` | `#121212` | Dark text color for light input areas and badges. |
| `--color-text-subtle` | `#929398` | Muted / secondary text color for timestamps and labels. |
| `--color-accent-cyan` | `#00beff` | Endfield signature electric cyan accent color. |
| `--color-accent-yellow` | `#ffc800` | Warning, highlighted choices, and primary yellow accent. |
| `--bubble-incoming-src` | `url(...)` | 9-slice image asset path for incoming message speech bubbles. |
| `--bubble-outgoing-src` | `url(...)` | 9-slice image asset path for outgoing message speech bubbles. |

---

## Editor Panel Layout

Position and dimension controls for the left-hand editor sidebar (`#editor-panel`):

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--editor-panel-position-x` | `160px` | Horizontal translation offset (`translateX`) of the editor panel. |
| `--editor-panel-position-y` | `0px` | Vertical translation offset (`translateY`) of the editor panel. |
| `--editor-panel-width` | `480px` | Base width of the editor panel sidebar. |
| `--panel-padding-left` | `18px` | Left inner padding for panel scrollable body. |
| `--panel-padding-right` | `12px` | Right inner padding for panel scrollable body. |
| `--panel-logo-height` | `32px` | Height of the branding logos in the panel header. |
| `--panel-logo-gap` | `4px` | Spacing between brand icons and title text. |
| `--panel-logo-shift-y` | `0px` | Fine vertical alignment tweak for brand logos. |
| `--view-btn-label-display` | `inline` | Display mode for View Mode text labels (`inline` shows text, `none` makes buttons icon-only). |
| `--view-group-justify` | `center` | Flexbox alignment for toolbar button groups (`center`, `flex-start`, `space-between`). |
| `--character-list-max-height` | `165px` | Max height for the multi-character selection list before scrolling (`125px` in single mode). |

---

## Chat Viewport & Device Frames

Controls for the live conversation preview canvas (`#phone-frame`).

### Tablet Mode (Default)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--message-ui-scale` | `1` | Global scale multiplier for the message frame. |
| `--message-position-x` | `200px` | Horizontal offset (`translateX`) of the frame. |
| `--message-position-y` | `0px` | Vertical offset (`translateY`) of the frame. |
| `--message-width` | `945px` | Width of the Tablet viewport (matches in-game aspect ratio). |
| `--message-height` | `800px` | Visible height of the conversation viewport. |

### Phone Mode Overrides (`.phone-mode #phone-frame`)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--message-position-x` | `250px` | Horizontal offset in compact phone view. |
| `--message-position-y` | `0px` | Vertical offset in compact phone view. |
| `--message-width` | `490px` | Width of the Phone viewport. |
| `--message-height` | `800px` | Visible height in phone view. |

---

## Message Bubbles & Media Spacing

Fine-tuning for message spacing, avatar alignment, and media attachments:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--message-avatar-size` | `56px` | Outer square boundary for character avatar frames. |
| `--message-avatar-image-size` | `46px` | Inner circular or clipped avatar picture size. |
| `--message-avatar-gap` | `12px` | Horizontal space between avatar and speech bubble edge. |
| `--message-bubble-shift-y` | `6px` | Vertical alignment shift aligning bubble tails with avatar center. |
| `--message-image-incoming-shift-x` | `9px` | Horizontal alignment shift for incoming image attachments (`6px` in Phone mode). |
| `--message-image-outgoing-shift-x` | `-9px` | Horizontal alignment shift for outgoing image attachments. |
| `--message-image-gap-top` | `2px` | Extra margin above an image bubble (`0px` in Phone mode). |
| `--message-image-gap-bottom` | `4px` | Extra margin below an image bubble. |

> [!TIP]
> **Dynamic Image Resizing:** Image messages support real-time interactive resizing (120px to 480px) via the `.image-resize-handle` on the bottom corner of any image. The chosen dimension is stored directly in `message.imageWidth` and persists across exports and JSON backups.

---

## Topographic Map Decorations

> [!NOTE]
> **Archived Toolbar Controls:** In recent UI updates, the live conversation container adopted an authentic dark frosted glass canvas (`background: rgba(20, 20, 19, 0.78); backdrop-filter: blur(14px);`). Because this subtle dark blur naturally mutes underlying background graphics, the Map Deco On/Off toggle was archived from the default Editor toolbar to keep the header uncluttered. However, the DOM elements (`#chat-bg-decorations`), the CSS variables below, graphic assets (`rwxbaker-assets/deco/deco_sns_tweet_decorate_31.png`), and the JavaScript engine function (`setDecoVisibility(boolean)`) remain fully functional and can be toggled via console, custom script, or uncommented in `index.html`.

Controls for the background topographic isoline patterns (`.chat-bg-decorations`, `.chat-bg-deco-tl`, `.chat-bg-deco-br`):

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--chat-deco-opacity` | `0.70` | Master opacity for both top-left and bottom-right map overlays. |
| `--chat-deco-shift-x` | `0px` | Global horizontal offset for decoration container. |
| `--chat-deco-shift-y` | `0px` | Global vertical offset for decoration container. |
| `--chat-deco-tl-top` | `0px` | Top boundary anchor for the top-left map graphic. |
| `--chat-deco-tl-left` | `0px` | Left boundary anchor for the top-left map graphic. |
| `--chat-deco-tl-width` | `360px` | Display width of top-left map overlay (`220px` in Phone mode). |
| `--chat-deco-tl-height` | `auto` | Height calculation mode for top-left overlay. |
| `--chat-deco-tl-scale` | `1` | Scaling multiplier for top-left overlay. |
| `--chat-deco-tl-rotate` | `0deg` | Rotation angle for top-left overlay. |
| `--chat-deco-tl-opacity` | `1` | Individual opacity multiplier for top-left overlay. |
| `--chat-deco-br-bottom` | `0px` | Bottom boundary anchor for the bottom-right map graphic. |
| `--chat-deco-br-right` | `0px` | Right boundary anchor for the bottom-right map graphic. |
| `--chat-deco-br-width` | `480px` | Display width of bottom-right map overlay (`280px` in Phone mode). |
| `--chat-deco-br-height` | `auto` | Height calculation mode for bottom-right overlay. |
| `--chat-deco-br-scale` | `1` | Scaling multiplier for bottom-right overlay. |
| `--chat-deco-br-rotate` | `0deg` | Rotation angle for bottom-right overlay. |
| `--chat-deco-br-opacity` | `1` | Individual opacity multiplier for bottom-right overlay. |

---

## Chat Header & Background Typography

Controls for the top title bar and background decorative text (`.chat-header`):

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--header-height` | `74px` | Height of the top navigation bar inside `#phone-frame`. |
| `--header-shift-y` | `0px` | Vertical offset for header container. |
| `--baker-top` | `-35px` | Vertical offset of the semi-transparent "BAKER" background typography. |
| `--baker-left` | `45px` | Horizontal offset of the "BAKER" background typography. |
| `--baker-width` | `400px` | Width bounding box of the "BAKER" text. |
| `--baker-height` | `72px` | Height bounding box of the "BAKER" text. |
| `--baker-opacity` | `0.20` | Opacity of the background "BAKER" watermark. |
| `--character-name-x` | `15px` | Horizontal position of the conversation/operator title text. |
| `--character-name-y` | `7px` | Vertical position of the conversation/operator title text. |
| `--header-banner-shift-x` | `30px` | Horizontal shift of the top header brand banner (`0px` in Phone mode). |
| `--header-banner-shift-y` | `0px` | Vertical shift of the top header brand banner. |
| `--header-banner-height` | `60px` | Height of the header brand banner graphic. |
| `--header-blue-lines-width`| `46px` | Width of the cyan vertical graphic stripes. |
| `--header-accent-width` | `200px` | Width of the bottom horizontal cyan accent line. |
| `--header-accent-height`| `4px` | Thickness of the bottom horizontal cyan accent line. |

---

## Export Watermark & Stamp Customization

To distinguish generated dialogue from official game assets and prevent misleading leaks, exported images include a subtle sci-fi telemetry stamp (`.rwx-export-watermark`) placed discreetly in the upper right viewport corner. I wasn't going to include it in the repo but in good faith, I'd like to give everyone the opportunity to customize it.


**Mandatory Fan Work Attribution & Anti-Leak Policy:**
> Please do **NOT** remove, disable, or crop out the export watermark stamp, even in personal or local forks. This stamp exists out of my deepest respect for **Hypergryph**'s intellectual property and to prevent fan-made roleplay/mock conversations from being used as official in-game dialogues, announcements, or fake leaks. Keeping this stamp intact protects both the community and creators, ensuring RWX Baker remains an ethical fan project.

### Design Variations

Four authentic Endfield OS styled watermark stamps are bundled in `rwxbaker-assets/watermarks/`:

| Variation | Asset Filename | Label / Text | Dimensions | Default Status |
| :--- | :--- | :--- | :--- | :--- |
| **V1: Telemetry Strip** | `watermark-v1-telemetry.png` | `// RWX.SYS-01 [TERMINAL]` | 220 × 36 px | Active (Randomized 50%) |
| **V2: Corner HUD** | `watermark-v2-corner-hud.png` | `[RWX.OS // TELEMETRY]` | 240 × 48 px | Bundled in assets |
| **V3: R Glass Badge** | `watermark-v3-badge.png` | `[R] RWX BAKER // GEN` | 260 × 36 px | Bundled in assets |
| **V4: Minimal Stencil** | `watermark-v4-minimal.png` | `RWX // BKR ■ 01` | 180 × 30 px | Active (Randomized 50%) |

### Anti-Tamper Dynamic Injection Architecture

To prevent users from simply deleting or modifying the watermark via browser **Inspect Element**, the watermark element is **never present on the live DOM**. And as I said in the above warning, do not remove edit.

Instead, it is injected directly into `#phone-frame` only for the split-second duration of `domtoimage.toPng(...)` inside `exportConversation()` in [`rwxbaker-js/app.js`](rwxbaker-js/app.js), and immediately stripped in the `finally` block. See how it works below:

```javascript
// 1. Variations, pick one above
const chosenWatermarkSrc = WATERMARK_ASSETS[Math.floor(Math.random() * WATERMARK_ASSETS.length)];

// 2. Preload image asset alongside bubble slices
await Promise.all([..., watermarkImg.onload]);

// 3. Inject only for capture (it doesn't show on the viewport when live)
let exportWatermarkEl = document.createElement("img");
exportWatermarkEl.className = "rwx-export-watermark";
exportWatermarkEl.src = chosenWatermarkSrc;
phoneFrame.appendChild(exportWatermarkEl);

// 4. Capture screenshot/export
await domtoimage.toPng(phoneFrame, ...);

// 5. Instantly clean up in `finally`
finally {
  if (exportWatermarkEl?.parentNode) {
    exportWatermarkEl.parentNode.removeChild(exportWatermarkEl);
  }
}
```

### Styling & CSS Overrides

The position and transparency of the stamp are controlled by `.rwx-export-watermark` in [`rwxbaker-css/style.css`](rwxbaker-css/style.css). Default values already look good and tested many times, but still if you want to change it.

```css
.rwx-export-watermark {
  position: absolute;
  top: 74px;
  right: 36px;
  opacity: 0.50;
  pointer-events: none;
  user-select: none;
  z-index: 99;
  height: auto;
}

.phone-mode .rwx-export-watermark {
  top: 3px;
  left: 48px;
  right: auto;
  max-width: 125px;
}
```

### Interactive Watermark Lab (`watermark-styles.html`)

TLDR: An interactive testing workbench and live code generator is included in the project root: **[`watermark-styles.html`](watermark-styles.html)**. Check the page  for LIVE preview, you can copy the live snippet on the left and use it directly.

- **Real-Time Visual Sandbox:** Switch between all 4 designs, test 4 preset anchors (Header Right, Header Left, Viewport Top, Viewport Bottom), and tweak opacity/scale sliders against a realistic chat preview.
- **Live Code Generator:** Selecting options automatically renders ready-to-copy CSS rules and JS injection snippets in the developer sidebar, making it trivial for local forks to customize or reposition their own stamps.

---

## Interactive Buttons & Glow Effects

Animated conic gradients and glowing borders for primary action buttons:

### Export Button (`.btn-export`)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--export-glow-speed` | `4s` | Duration of one full border beam rotation loop. |
| `--export-glow-direction` | `reverse` | Direction of rotation (`normal` or `reverse`). |
| `--export-glow-intensity` | `0.95` | Opacity of the rotating glow accent. |
| `--export-spark-color` | `#ffe894` | Leading highlight spark color. |
| `--export-core-color` | `#ffffff` | Center bright hotspot color. |
| `--export-beam-color` | `var(--color-accent-cyan)` | Trailing cyan beam color. |
| `--export-tail-color` | `rgba(0, 190, 255, 0.18)` | Soft fading tail color. |
| `--export-gap-angle` | `20deg` | Angular arc size of the rotating light beam. |
| `--export-border-width` | `1.5px` | Outer border thickness. |
| `--export-hover-glow` | `14px` | Drop-shadow blur radius on hover. |

### Hints Button (`.btn-hints`)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--hints-glow-speed` | `3.2s` | Duration of one full border beam rotation loop. |
| `--hints-glow-direction` | `normal` | Direction of rotation. |
| `--hints-glow-intensity` | `0.85` | Opacity of the cyan accent beam. |
| `--hints-glow-spread` | `70deg` | Angular spread of the glow gradient. |
| `--hints-glow-color` | `var(--color-accent-cyan)` | Glow accent color. |
| `--hints-border-width` | `1.5px` | Border line width. |
| `--hints-hover-glow` | `14px` | Drop-shadow blur radius on hover. |

---

## DOM Architecture & Component Reference

The HTML structure in [`index.html`](index.html) is split into two primary viewports within `#app-container`:

### 1. Editor Sidebar (`#editor-panel`)
Hosts all controls, inputs, and conversation layers:

| Selector | Component | Description |
| :--- | :--- | :--- |
| `.view-controls` | Display Toolbar | Unified header row holding Tablet/Phone view mode toggles, divider, and the compact `#btn-launch-terminal` switch. |
| `.backup-section` | Conversation Backup | Save and Load JSON backup buttons (`#btn-save-json`, `#btn-load-json`). |
| `.user-section` | Sender Identity | Switches Endmin avatar gender (Female/Male) or toggles Operator identity. |
| `.character-section`| Character Selector | Single vs. Group chat mode, channel name field, and scrollable operator list. |
| `.context-section` | Multi-Tab Composer | Tab headers for Text, Image, Reaction, and Choice creation, plus edit-mode actions. |
| `.layers-section` | Timeline Layers | Draggable list (`#layers-list`) representing conversation order and active selections. |
| `.export-section` | Export Controls | Resolution mode pills, export mode switches (Screen, Full, Paged), and `#btn-export`. |

### 2. Device Viewport (`#phone-frame`)
The render surface captured by `dom-to-image` during exports:

| Selector | Component | Description |
| :--- | :--- | :--- |
| `.terminal-announce-banner` | Announcement Pill | Floating animated pill aligned above `#phone-frame` linking to Terminal mode; auto-hidden during exports. |
| `.chat-header` | Title Navigation | Displays current speaker/group title, back icon, and the "BAKER" background watermark. |
| `#chat-bg-decorations` | Map Contours | In-game topographic isoline graphics (`.chat-bg-deco-tl`, `.chat-bg-deco-br`). |
| `#chat-viewport` | Message Feed | Scrollable message canvas housing `#message-list` with draggable bubble nodes. |
| `#choice-container` | Choice Pills | Interactive dialogue options rendered inline below NPC messages. |
| `#input-footer` | Action Bar | Mock in-game chat typing bar, sticker/emoji triggers, and send button. |
| `#sticker-panel` | Sticker Drawer | Popover grid containing 168 in-game Endfield stickers. |
| `#emoji-picker-panel` | Emoji Drawer | Popover grid containing 38 in-game Endfield reaction emojis. |

---

## How to Apply Custom Styles

### Option 1: Edit `rwxbaker-css/style.css` Directly
You can tweak any of the default variable values in [`rwxbaker-css/style.css`](rwxbaker-css/style.css) under `:root`, `#editor-panel`, or `#phone-frame`.

### Option 2: Add Custom Overrides in `index.html`
To customize without modifying the source stylesheet, insert an inline `<style>` block in [`index.html`](index.html) after the main stylesheet link:

```html
<style>
  /* Custom centering and color adjustment */
  #phone-frame {
    --message-position-x: 0px; /* Center chat on widescreen setups */
    --message-ui-scale: 1.1;   /* Upscale chat preview by 10% */
  }

  /* Make View Mode toolbar icon-only */
  .view-controls {
    --view-btn-label-display: none;
  }
</style>
```

### Option 3: Dynamic Runtime Overrides via JavaScript
You can dynamically adjust any variable from the browser console or custom scripts:

```javascript
// Example: Change chat preview width on the fly
document.getElementById('phone-frame').style.setProperty('--message-width', '1020px');

// Example: Dim map decorations
document.getElementById('phone-frame').style.setProperty('--chat-deco-opacity', '0.4');
```

---

## Terminal Mode Architecture & Variables

The in-game fullscreen Baker Terminal interface is implemented in [`terminal.html`](terminal.html) with styles isolated in [`rwxbaker-css/terminal.css`](rwxbaker-css/terminal.css) and application state in [`rwxbaker-js/terminal.js`](rwxbaker-js/terminal.js).

### 1. RX Controller & CSS Variable Reference

Terminal Mode layout, dimensions, offsets, and colors are defined at `:root` in [`rwxbaker-css/terminal.css`](rwxbaker-css/terminal.css) using modular RX groups designed for quick, zero-build customization:

#### [RX 1] Standalone Terminal Page Canvas (`terminal.html`)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--terminal-frame-width` | `1590px` | Total width of the combined Terminal frame (Channels + Chat). |
| `--terminal-frame-height` | `860px` | Base height of the Terminal viewport frame. |
| `--terminal-frame-zoom` | `1` | Global UI scale multiplier for Terminal Mode. |
| `--terminal-columns-gap` | `16px` | Horizontal space between Channels sidebar and Main Chat window. |
| `--terminal-topbar-max-width` | `1590px` | Max width for the top navigation bar and system status controls. |

#### [RX 2] Channels Sidebar & Session Cards (Left Column)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--terminal-channels-width` | `460px` | Width of the left Channels / transmissions sidebar. |
| `--terminal-channels-gap` | `10px` | Vertical spacing between session cards in the channels list. |
| `--terminal-channels-bg-opacity` | `0.55` | Background glass tint opacity for the channels column. |
| `--terminal-channels-blur` | `14px` | Backdrop blur intensity for the channels column. |
| `--terminal-channels-opacity` | `1` | Overall channels column opacity. |
| `--terminal-sidebar-gap` | `12px` | Vertical gap between Channels panel and Active Transmitter controls. |
| `--terminal-channels-max-height` | `418px` | Height limit for Channels section (fits 4 session cards before scrolling). |
| `--terminal-session-card-height` | `76px` | Height of each session card item. |
| `--terminal-session-card-opacity` | `1` | Session card base opacity. |
| `--terminal-session-title-size` | `15px` | Channel operator / squad title font size. |
| `--terminal-session-preview-size` | `11.5px` | Recent message snippet font size in session cards. |
| `--terminal-session-preview-emoji-size` | `16px` | Inline emoji dimension in channel session preview text. |
| `--terminal-session-preview-emoji-valign` | `-2.5px` | Vertical alignment offset for inline emojis in channel session cards. |

#### [RX 3] Main Chat Pane (Conversation Window)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--terminal-chat-width` | `1114px` | Width of the main active conversation window. |
| `--terminal-chat-bg-opacity` | `0.78` | Dark background glass tint opacity for active chat viewport. |
| `--terminal-chat-blur` | `14px` | Backdrop blur intensity for active chat viewport. |
| `--terminal-frame-total-width` | `calc(...)` | Dynamically calculated total frame width (Channels + Gap + Chat). |

#### [RX 4] Terminal Header, Notch & Status Color Bars

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--terminal-header-height` | `64px` | Segmented header bar height. |
| `--terminal-header-title-size` | `20px` | Header operator title font size. |
| `--terminal-header-marquee-opacity` | `0.09` | Scrolling Endfield marquee background watermark opacity. |
| `--terminal-notch-height` | `10px` | Top-right angular frame notch accent height. |
| `--terminal-status-bar-opacity` | `1` | 3-color status indicator bar opacity. |
| `--terminal-status-bars-shift-x` | `0px` | 3-color status bars horizontal offset tweak. |
| `--terminal-status-bars-shift-y` | `0px` | 3-color status bars vertical offset tweak. |

#### [RX 5 & 6] Input Composer & Watermark Stamp

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--terminal-input-decor-opacity` | `0.72` | Top serrated corner accent graphic opacity. |
| `--terminal-input-footer-bg-opacity` | `0.94` | Composer input bar background opacity. |
| `--watermark-position-top` | `73px` | Watermark vertical position centered in the gap above message bubble. |
| `--watermark-position-right` | `36px` | Watermark horizontal position aligned to the right. |
| `--watermark-opacity` | `0.50` | Watermark stamp opacity (0 to 1). |

#### [RX 7] Message Bubbles, Typography & Vertical Padding Tuning

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--terminal-message-font-size` | `1.02rem` | Message bubble text font size. |
| `--terminal-message-line-height` | `1.48` | Message bubble text line height. |
| `--terminal-message-max-width` | `68%` | Max width percentage of conversation message bubbles. |
| `--terminal-message-avatar-size` | `56px` | Circular avatar frame outer boundary. |
| `--terminal-message-avatar-image-size` | `46px` | Inner character avatar portrait dimension. |
| `--terminal-bubble-border-radius` | `13px` | Border radius for tail-less continuation bubbles. |
| `--terminal-bubble-padding-top` | `9.5px` | Top padding for messages with tail (increase to nudge text downward). |
| `--terminal-bubble-padding-bottom` | `8.5px` | Bottom padding for messages with tail (decrease to reduce bottom space). |
| `--terminal-bubble-no-tail-padding-top` | `10.5px` | Top padding for tail-less continuation messages. |
| `--terminal-bubble-no-tail-padding-bottom` | `9.5px` | Bottom padding for tail-less continuation messages. |

#### [RX 8] Inline Game Emojis & Alignment

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--terminal-inline-emoji-size` | `24px` | Width & height of inline emojis in message bubbles and choices. |
| `--terminal-inline-emoji-valign` | `-5px` | Vertical alignment for inline emojis in message bubbles (e.g. `-2px`, `-5px`, `middle`). |

#### [RX 9] Terminal Dialogue Choices (Button Pills)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--terminal-choice-pill-max-width` | `480px` | Max width of interactive choice pill buttons. |
| `--terminal-choice-pill-padding-y` | `10px` | Vertical padding of choice pill buttons. |
| `--terminal-choice-pill-padding-x` | `24px` | Horizontal padding of choice pill buttons. |
| `--terminal-choice-font-size` | `0.98rem` | Font size of interactive choice pill buttons. |
| `--terminal-choice-border-radius` | `24px` | Capsule pill border radius. |
| `--terminal-choice-gap` | `8px` | Vertical gap between multiple choice pills. |

#### [RX 10] Terminal Buttons & Theme Colors

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--btn-primary-bg` | `#d0ff00` | Primary action button background (Send Message, Set Choices, Submit). |
| `--btn-primary-text` | `#0b0f15` | Text color on primary action buttons. |
| `--btn-primary-glow` | `rgba(208, 255, 0, 0.4)` | Accent glow aura on primary action buttons. |
| `--btn-secondary-bg` | `rgba(255, 255, 255, 0.08)` | Secondary action button background (Send Sticker, Cancel). |
| `--btn-secondary-border` | `rgba(255, 255, 255, 0.2)` | Border color for secondary action buttons. |
| `--btn-secondary-text` | `#e2e3e8` | Text color for secondary action buttons. |
| `--btn-danger-bg` | `rgba(235, 68, 68, 0.15)` | Danger button background (Delete, Clear, Start Clean). |
| `--btn-danger-border` | `rgba(235, 68, 68, 0.45)` | Border color for danger buttons. |
| `--btn-danger-text` | `#ff6e6e` | Text color for danger buttons. |
| `--btn-new-chat-bg` | `#d0ff00` | Background color for `+ NEW` channel creation button. |
| `--btn-accent-color` | `#d0ff00` | Global signature neon yellow/lime accent color. |
| `--btn-accent-glow` | `rgba(208, 255, 0, 0.4)` | Global accent glow aura color for active buttons and badges. |

### 2. Multi-Channel Sessions & Group Sender Formatting

- **Channel Types:** Supports direct 1-on-1 operator transmissions and multi-operator group channels with custom group names and squad avatars (`rwxbaker-assets/deco/group-channel.webp`).
- **Last Sender Indicator:** For group channels, the session card automatically prepends the last message sender in bold font (`.terminal-session-card__sender`):
  ```css
  .terminal-session-card__sender {
    font-weight: 700;
    color: #ebece9;
    margin-right: 3px;
  }
  ```

### 3. JSON Backup Schema & Cross-Mode Safeguards

Terminal Mode includes dedicated **Save JSON** and **Load JSON** backup capabilities (`#btn-terminal-save-json`, `#btn-terminal-load-json`) as well as drag-and-drop file import (`#json-drop-overlay`).

- **Format Distinction:** Terminal backup files include `mode: "terminal"` and export the complete multi-channel roster array alongside all message histories.
- **Cross-Mode Guards:**
  - If a user attempts to load a Terminal Mode JSON into Studio/Tablet view (`index.html`), the parser detects `mode === "terminal"` and prompts the user to open `terminal.html`.
  - Conversely, attempting to import a single-conversation Tablet JSON into Terminal Mode notifies the user of the format mismatch, preventing corrupted session states.

### 4. Export Engine & Anti-Darkening Architecture

Terminal exports support both **Screen Mode** (captures the active chat viewport) and **Full Terminal Mode** (captures the complete Channels list and active dialogue window together at 2x resolution):

- **Zero Darkening:** When `dom-to-image` renders elements with CSS `backdrop-filter: blur()`, browsers often multiply backdrop layers causing exported images to appear much darker than live screens. Both Studio view and Terminal Mode inject `.is-exporting` rules that temporarily swap `backdrop-filter` with solid linear gradients during capture:
  ```css
  #terminal-main-pane.is-exporting #terminal-window-body {
    background: linear-gradient(180deg, rgba(16, 17, 20, 0.94) 0%, rgba(12, 13, 16, 0.98) 100%) !important;
    backdrop-filter: none !important;
    box-shadow: none !important;
  }
  ```

### 5. Floating Announcement Banner (`.terminal-announce-banner`)

Located in `index.html` directly above `#phone-frame`:

- **Positioning:** Anchored with `position: absolute; bottom: calc(100% + 8px); left: 0; right: auto;`, aligning its left boundary with the blue title stripes of the chat header while hugging its contents.
- **Cyber Animations:** Features dual-layer animated gradient borders (`bannerBorderFlow`), breathing neon aura (`bannerCyberPulse`), and angled ambient sheen sweeps (`bannerSheenSweep`).
- **Dismissal & Persistence:** Clicking the `&times;` close button smoothly fades the banner out and sets `localStorage.setItem("rwx_terminal_banner_dismissed", "true")`.
- **Export Guard:** Automatically hidden during image generation via `.is-exporting .terminal-announce-banner { display: none !important; }`.

