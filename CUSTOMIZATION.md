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
7. [Chat Header & Watermark Elements](#chat-header--watermark-elements)
8. [Interactive Buttons & Glow Effects](#interactive-buttons--glow-effects)
9. [DOM Architecture & Component Reference](#dom-architecture--component-reference)
10. [How to Apply Custom Styles](#how-to-apply-custom-styles)

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

Controls for the optional in-game background topographic isoline patterns (`.chat-deco-wrapper`, `.chat-deco-tl`, `.chat-deco-br`):

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

## Chat Header & Watermark Elements

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
| `.view-controls` | Display Toolbar | Unified row holding Tablet/Phone view mode toggles and Map Deco On/Off switches. |
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
| `.chat-header` | Title Navigation | Displays current speaker/group title, back icon, and the "BAKER" background watermark. |
| `.chat-deco-wrapper`| Map Contours | In-game topographic isoline graphics (`.chat-deco-tl`, `.chat-deco-br`). |
| `#chat-viewport` | Message Feed | Scrollable message canvas housing `#message-list` with draggable bubble nodes. |
| `#quick-choices` | Choice Pills | Interactive dialogue options rendered inline below NPC messages. |
| `.chat-input-footer`| Action Bar | Mock in-game chat typing bar, sticker/emoji triggers, and send button. |
| `#sticker-picker-drawer`| Sticker Drawer | Popover grid containing 168 in-game Endfield stickers. |
| `#emoji-picker-drawer` | Emoji Drawer | Popover grid containing 38 in-game Endfield reaction emojis. |

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
