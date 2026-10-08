/**
 * RWX Baker - Terminal Mode Logic (terminal.html)
 * dedicated to the terminal mode, this script handles all the logic for the terminal view
 * i might nuke this later and merge it with main script but for now, for simplicity, i keep it separate
 * again, please do NOT use inline styles or hardcoded values in html, use the css variables instead
 */

document.addEventListener("DOMContentLoaded", () => {
  const CHARACTERS = window.CHARACTERS || {};
  const USERS = window.USERS || {};
  const STICKERS = window.STICKERS || [];
  const GAME_EMOJIS = window.GAME_EMOJIS || [];

  // state
  const state = {
    activeUser: "endminf",
    activeCharacterId: "laevatain",
    conversationMode: "direct",
    groupParticipantIds: [],
    groupName: "",
    messages: [],
    choices: [],
    currentSender: "outgoing", // "outgoing" (Endmin) or "incoming" (Operator)
    selectedMessageId: null,
    exportMode: "screen",
  };

  let terminalChannels = [];
  let activeTerminalChannelId = "channel-main";
  let draggedMessageId = null;

  // dom elements
  const phoneFrame = document.getElementById("phone-frame");
  const sessionCardsContainer = document.getElementById("terminal-session-cards");
  const messageList = document.getElementById("message-list");
  const chatViewport = document.getElementById("chat-viewport");
  const terminalChatHeaderName = document.getElementById("terminal-chat-header-name");
  const choiceContainer = document.getElementById("chat-choices-container") || document.getElementById("choice-container");
  const messageInput = document.getElementById("message-input");
  const btnSend = document.getElementById("btn-send");
  const btnSenderToggle = document.getElementById("btn-sender-toggle");
  const senderIndicatorName = document.getElementById("sender-indicator-name");
  const btnTerminalNewChat = document.getElementById("btn-terminal-new-chat");
  const btnTerminalTutorial = document.getElementById("btn-terminal-tutorial");
  const btnTerminalClearChat = document.getElementById("btn-terminal-clear-chat");
  const btnTerminalStartClean = document.getElementById("btn-terminal-start-clean");
  const btnReturnStudio = document.getElementById("btn-return-studio");
  const btnSaveJson = document.getElementById("btn-terminal-save-json");
  const btnLoadJson = document.getElementById("btn-terminal-load-json");
  const inputLoadJson = document.getElementById("input-terminal-load-json");
  const jsonDropOverlay = document.getElementById("json-drop-overlay");
  const terminalClock = document.getElementById("terminal-top-clock");

    const btnExportPng = document.getElementById("btn-export-png");
  const exportBtnText = document.getElementById("export-btn-text");
  const exportModeBtns = document.querySelectorAll(".export-mode-btn");

    const editActionsContainer = document.getElementById("terminal-context-edit-actions");
  const btnEditUpdate = document.getElementById("btn-terminal-edit-update");
  const btnEditDelete = document.getElementById("btn-terminal-edit-delete");
  const btnEditCancel = document.getElementById("btn-terminal-edit-cancel");

    const transmissionModal = document.getElementById("new-transmission-modal");
  const transmissionModalHeading = document.getElementById("transmission-modal-heading");
  const btnCloseTransmissionModal = document.getElementById("btn-close-transmission-modal");
  const btnCancelTransmission = document.getElementById("btn-cancel-transmission");
  const btnSubmitTransmission = document.getElementById("btn-submit-transmission");
  const modalTabDirect = document.getElementById("modal-tab-direct");
  const modalTabGroup = document.getElementById("modal-tab-group");
  const transmissionGroupConfig = document.getElementById("transmission-group-config");
  const transmissionGroupNameInput = document.getElementById("transmission-group-name");
  const transmissionSelectedChips = document.getElementById("transmission-selected-chips");
  const transmissionCharacterSearch = document.getElementById("transmission-character-search");
  const transmissionCharacterGrid = document.getElementById("transmission-character-grid");

    const speakerCardEndmin = document.getElementById("speaker-card-endmin");
  const speakerCardOperator = document.getElementById("speaker-card-operator");
  const ctrlEndminAvatar = document.getElementById("terminal-ctrl-endmin-avatar");
  const ctrlEndminName = document.getElementById("terminal-ctrl-endmin-name");
  const userBtnEndminF = document.getElementById("terminal-user-endminf");
  const userBtnEndminM = document.getElementById("terminal-user-endminm");
  const btnOpenCharModal = document.getElementById("btn-terminal-open-char-modal");
  const ctrlCharAvatar = document.getElementById("terminal-ctrl-char-avatar");
  const ctrlCharName = document.getElementById("terminal-ctrl-char-name");

    const squadRoster = document.getElementById("terminal-squad-roster");
  const squadCount = document.getElementById("terminal-squad-count");
  const squadMembersStrip = document.getElementById("terminal-squad-members-strip");
  const btnAddSquadMember = document.getElementById("btn-terminal-add-squad-member");

    const charModal = document.getElementById("terminal-character-modal");
  const btnCloseCharModal = document.getElementById("btn-close-char-modal");
  const btnCancelCharModal = document.getElementById("btn-cancel-char-modal");
  const charModalSearchInput = document.getElementById("terminal-char-search-input");
  const charModalGrid = document.getElementById("terminal-char-modal-grid");
  let charModalFilter = "all";

    const composeStudio = document.getElementById("terminal-compose-studio");
  const terminalStudioTitle = document.getElementById("terminal-studio-title");
  const contextTypeTabs = document.querySelectorAll(".terminal-context-tab");
  const contextFormText = document.getElementById("terminal-context-form-text");
  const contextFormImage = document.getElementById("terminal-context-form-image");
  const contextFormChoices = document.getElementById("terminal-context-form-choices");
  const contextFormReaction = document.getElementById("terminal-context-form-reaction");

  const contextTextInput = document.getElementById("terminal-context-text-input");
  const btnInlineEmojiToggle = document.getElementById("btn-terminal-inline-emoji-toggle");
  const inlineEmojiBar = document.getElementById("terminal-inline-emoji-bar");
  const contextEmojisRow = document.getElementById("terminal-context-emojis");
  const btnContextSendText = document.getElementById("btn-terminal-context-send-text");
  const btnContextStickersToggle = document.getElementById("btn-terminal-context-stickers-toggle");
  const stickersPalette = document.getElementById("terminal-stickers-palette");

  const contextImageFile = document.getElementById("terminal-context-image-file");
  const contextImgPreview = document.getElementById("terminal-context-img-preview");
  const contextImgTag = document.getElementById("terminal-context-img-tag");
  const btnRemoveContextImg = document.getElementById("btn-remove-context-img");
  const btnContextSendImage = document.getElementById("btn-terminal-context-send-image");
  let contextPendingImageSrc = null;

  const contextChoice1 = document.getElementById("terminal-context-choice-1");
  const contextChoice2 = document.getElementById("terminal-context-choice-2");
  const choicesEmojiBar = document.getElementById("terminal-choices-emoji-bar");
  const choicesEmojisRow = document.getElementById("terminal-choices-emojis");
  const btnCloseChoicesEmoji = document.getElementById("btn-close-terminal-choices-emoji");
  const choiceEmojiBtns = document.querySelectorAll(".terminal-choice-emoji-btn");
  let activeChoiceEmojiTarget = null;
  const btnContextAddChoices = document.getElementById("btn-terminal-context-add-choices");
  const btnContextClearChoices = document.getElementById("btn-terminal-context-clear-choices");

  const contextReactionTarget = document.getElementById("terminal-context-reaction-target");
  const contextReactionEmojis = document.getElementById("terminal-context-reaction-emojis");
  const btnContextAddReaction = document.getElementById("btn-terminal-context-add-reaction");
  let contextSelectedReactionEmoji = "rwxbaker-assets/emoji/sns_emoji_001.png";

  function getInputValueAsStructuredText(element) {
    if (!element) return "";
    let structured = "";

    function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        structured += node.nodeValue;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === "IMG" && node.classList.contains("inline-game-emoji")) {
          const src = node.getAttribute("src") || "";
          structured += `[emoji:${src}]`;
        } else if (node.tagName === "BR") {
          structured += "\n";
        } else if (node.tagName === "DIV" || node.tagName === "P") {
          if (structured.length > 0 && !structured.endsWith("\n")) {
            structured += "\n";
          }
          node.childNodes.forEach(walk);
        } else {
          node.childNodes.forEach(walk);
        }
      }
    }

    element.childNodes.forEach(walk);
    return structured;
  }

  function setInputValueFromStructuredText(element, text) {
    if (!element) return;
    element.innerHTML = "";
    if (!text) return;

    const emojiRegex = /\[emoji:([^\]]+)\]/g;
    let lastIndex = 0;
    let match;

    while ((match = emojiRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const textChunk = text.substring(lastIndex, match.index);
        element.appendChild(document.createTextNode(textChunk));
      }

      let emojiSrc = match[1];
      if (emojiSrc.startsWith("extracted/")) {
        emojiSrc = emojiSrc.replace(/^extracted\//, "rwxbaker-assets/");
      }
      const img = document.createElement("img");
      img.src = emojiSrc;
      img.alt = "Emoji";
      img.classList.add("inline-game-emoji");
      element.appendChild(img);

      lastIndex = emojiRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      element.appendChild(document.createTextNode(text.substring(lastIndex)));
    }
  }

  function insertEmojiAtCursor(emojiSrc, targetInput = contextTextInput) {
    if (!targetInput) return;

    const img = document.createElement("img");
    img.src = emojiSrc;
    img.alt = "Emoji";
    img.classList.add("inline-game-emoji");

    targetInput.focus();
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      if (targetInput.contains(range.commonAncestorContainer)) {
        range.deleteContents();
        range.insertNode(img);
        range.setStartAfter(img);
        range.setEndAfter(img);
        sel.removeAllRanges();
        sel.addRange(range);
        return;
      }
    }

    targetInput.appendChild(document.createTextNode(" "));
    targetInput.appendChild(img);
  }

  let modalMode = "direct";
  let modalSelectedCharId = "pelica";
  let modalGroupParticipants = ["pelica", "chen"];
  let modalGroupName = "";
  let modalFilter = "all";

  // storage & persistence
  const CURRENT_TERMINAL_TEMPLATE_VERSION = "20261008_v1";

  function loadPersistentState() {
    const installedVersion = localStorage.getItem("rwx_terminal_template_version");
    const isCleared = localStorage.getItem("rwx_terminal_tutorial_cleared") === "true";

    // Auto-migrate to new default template version if user hasn't explicitly clicked START CLEAN
    if (installedVersion !== CURRENT_TERMINAL_TEMPLATE_VERSION && !isCleared) {
      localStorage.setItem("rwx_terminal_template_version", CURRENT_TERMINAL_TEMPLATE_VERSION);
      const termTpl = (typeof window !== "undefined" && window.RWX_TERMINAL_TEMPLATE) ? window.RWX_TERMINAL_TEMPLATE : null;
      if (termTpl && Array.isArray(termTpl.terminalChannels) && termTpl.terminalChannels.length > 0) {
        terminalChannels = JSON.parse(JSON.stringify(termTpl.terminalChannels));
        activeTerminalChannelId = termTpl.activeTerminalChannelId || terminalChannels[0].id;
        state.activeUser = (termTpl.activeUser === "endminf" || termTpl.activeUser === "endminm") ? termTpl.activeUser : "endminf";
        syncChannelToState(activeTerminalChannelId);
        savePersistentState();
        return;
      }
    }

    try {
      const raw = localStorage.getItem("rwx_terminal_persistent_state");
      if (raw) {
        const data = JSON.parse(raw);
        if (data) {
          state.activeUser = (data.activeUser === "endminf" || data.activeUser === "endminm") ? data.activeUser : "endminf";
          state.activeCharacterId = data.activeCharacterId || "pelica";
          state.conversationMode = data.conversationMode || "direct";
          state.groupParticipantIds = Array.isArray(data.groupParticipantIds) ? data.groupParticipantIds : [];
          state.groupName = data.groupName || "";
          state.messages = Array.isArray(data.messages) ? data.messages : [];
          state.choices = Array.isArray(data.choices) ? data.choices : [];

          if (Array.isArray(data.terminalChannels) && data.terminalChannels.length > 0) {
            terminalChannels = data.terminalChannels;
          }
          if (data.activeTerminalChannelId) {
            activeTerminalChannelId = data.activeTerminalChannelId;
          }
        }
      }
    } catch (e) {
      console.warn("Terminal: Could not parse persistent state:", e);
    }

        if (terminalChannels && terminalChannels.length > 0) {
      syncChannelToState(activeTerminalChannelId);
    } else {
      const termTpl = (typeof window !== "undefined" && window.RWX_TERMINAL_TEMPLATE && localStorage.getItem("rwx_terminal_tutorial_cleared") !== "true")
        ? window.RWX_TERMINAL_TEMPLATE
        : null;

      if (termTpl && Array.isArray(termTpl.terminalChannels) && termTpl.terminalChannels.length > 0) {
        terminalChannels = JSON.parse(JSON.stringify(termTpl.terminalChannels));
        activeTerminalChannelId = termTpl.activeTerminalChannelId || terminalChannels[0].id;
        state.activeUser = (termTpl.activeUser === "endminf" || termTpl.activeUser === "endminm") ? termTpl.activeUser : "endminf";
      } else {
        const fresh = createFreshDefaultChannel();
        terminalChannels = [fresh];
        activeTerminalChannelId = fresh.id;
      }
    }

        syncChannelToState(activeTerminalChannelId);
  }

  function savePersistentState() {
    try {
      syncStateToActiveChannel();
      const payload = {
        activeUser: state.activeUser,
        activeCharacterId: state.activeCharacterId,
        conversationMode: state.conversationMode,
        groupParticipantIds: state.groupParticipantIds || [],
        groupName: state.groupName || "",
        messages: state.messages || [],
        choices: state.choices || [],
        exportMode: "screen",
        terminalChannels: terminalChannels,
        activeTerminalChannelId: activeTerminalChannelId,
        timestamp: Date.now()
      };
      localStorage.setItem("rwx_terminal_persistent_state", JSON.stringify(payload));
    } catch (e) {
      console.warn("Terminal: Could not save persistent state:", e);
    }
  }

  function syncStateToActiveChannel() {
    const curCh = terminalChannels.find((c) => c.id === activeTerminalChannelId);
    if (!curCh) return;
    curCh.messages = JSON.parse(JSON.stringify(state.messages));
    curCh.choices = [...state.choices];
    curCh.mode = state.conversationMode;
    curCh.characterId = state.activeCharacterId;
    curCh.groupName = state.groupName;
    curCh.groupParticipantIds = [...state.groupParticipantIds];

    if (state.conversationMode === "group") {
      curCh.name = state.groupName && state.groupName.trim() ? state.groupName.trim() : "Group Operation";
      curCh.avatar = "rwxbaker-assets/deco/group-channel.webp";
    } else {
      const char = state.activeCharacterId ? CHARACTERS[state.activeCharacterId] : null;
      curCh.name = char ? char.name : "Direct Transmission";
      curCh.avatar = char ? char.avatar : "rwxbaker-assets/avatars/operator/icon_round_chr_0004_pelica.png";
    }
  }

  function syncChannelToState(channelId) {
    let ch = terminalChannels.find((c) => c.id === channelId);
    if (!ch) {
      ch = terminalChannels[0];
      if (!ch) return;
      activeTerminalChannelId = ch.id;
    }
    state.messages = JSON.parse(JSON.stringify(ch.messages || []));
    state.choices = Array.isArray(ch.choices) ? [...ch.choices] : [];
    state.conversationMode = ch.mode || "direct";
    state.groupName = ch.groupName || "";
    state.groupParticipantIds = Array.isArray(ch.groupParticipantIds) ? [...ch.groupParticipantIds] : [];
    state.activeCharacterId = ch.characterId || (state.groupParticipantIds[0] || "laevatain");
    if (state.conversationMode === "group" && state.groupParticipantIds.length > 0) {
      if (!state.groupParticipantIds.includes(state.activeCharacterId)) {
        state.activeCharacterId = state.groupParticipantIds[0];
      }
    }
  }

  // channel list & switching

  function formatPreviewWithEmojis(text) {
    if (!text) return "";
    const emojiRegex = /\[emoji:([^\]]+)\]/g;
    let result = "";
    let lastIndex = 0;
    let match;

    while ((match = emojiRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        result += escapeHtml(text.substring(lastIndex, match.index));
      }
      let emojiSrc = match[1];
      if (emojiSrc.startsWith("extracted/")) {
        emojiSrc = emojiSrc.replace(/^extracted\//, "rwxbaker-assets/");
      }
      if (emojiSrc.includes("/rwxbaker-assets/")) {
        emojiSrc = "rwxbaker-assets/" + emojiSrc.split("/rwxbaker-assets/")[1];
      }
      result += `<img class="inline-game-emoji inline-preview-emoji" src="${escapeHtml(emojiSrc)}" alt="Emoji">`;
      lastIndex = emojiRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      result += escapeHtml(text.substring(lastIndex));
    }
    return result;
  }

  function renderTerminalChannels() {
    if (!sessionCardsContainer) return;
    syncStateToActiveChannel();
    sessionCardsContainer.innerHTML = "";

    terminalChannels.forEach((ch) => {
      const isSelected = ch.id === activeTerminalChannelId;
      const card = document.createElement("article");
      card.className = `terminal-session-card ${isSelected ? "terminal-session-card--selected" : ""}`;
      card.dataset.channelId = ch.id;

      let previewHtml = "No transmissions yet";
      if (ch.messages && ch.messages.length > 0) {
        const lastMsg = ch.messages[ch.messages.length - 1];
        let content = "";
        if (lastMsg.type === "image") {
          content = "[Image transmitted]";
        } else if (lastMsg.type === "reaction") {
          content = "[Reaction signal]";
        } else if (lastMsg.type === "sticker") {
          content = "[Sticker]";
        } else {
          content = formatPreviewWithEmojis(lastMsg.text || "");
        }

        const isGroup = ch.mode === "group" || (Array.isArray(ch.groupParticipantIds) && ch.groupParticipantIds.length > 0);
        if (isGroup) {
          let senderName = "Endmin";
          if (lastMsg.sender === "incoming") {
            const charObj = CHARACTERS[lastMsg.characterId];
            senderName = charObj ? charObj.name : "Operator";
          }
          previewHtml = `<span class="terminal-session-card__sender">${escapeHtml(senderName)}:</span> ${content}`;
        } else {
          previewHtml = content;
        }
      }

      card.innerHTML = `
        <img class="terminal-session-card__frame" src="rwxbaker-assets/deco/session-card-frame.webp" alt="" aria-hidden="true">
        <img class="terminal-session-card__faint" src="rwxbaker-assets/deco/session-card-faint.webp" alt="" aria-hidden="true">
        <div class="terminal-session-card__avatar">
          <img class="terminal-session-card__avatar-image" src="${ch.avatar || 'rwxbaker-assets/avatars/operator/icon_round_chr_0004_pelica.png'}" alt="${ch.name}">
        </div>
        <div class="terminal-session-card__content">
          <h3 class="terminal-session-card__title">${ch.name}</h3>
          <p class="terminal-session-card__preview">${previewHtml}</p>
          <img class="terminal-session-card__underline" src="rwxbaker-assets/deco/session-card-underline.webp" alt="" aria-hidden="true">
        </div>
        <img class="terminal-session-card__detail" src="rwxbaker-assets/deco/session-card-detail.webp" alt="" aria-hidden="true">
        <button type="button" class="terminal-card-delete-btn" data-channel-id="${ch.id}" title="Delete conversation channel">✕</button>
      `;

      card.addEventListener("click", () => {
        selectTerminalChannel(ch.id);
      });

      const deleteBtn = card.querySelector(".terminal-card-delete-btn");
      if (deleteBtn) {
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          deleteTerminalChannel(ch.id);
        });
      }

      sessionCardsContainer.appendChild(card);
    });
  }

  function createFreshDefaultChannel() {
    const char = CHARACTERS.laevatain || { name: "Laevatain", id: "laevatain", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0016_laevat.png" };
    return {
      id: "channel_" + Date.now(),
      name: char.name,
      avatar: char.avatar,
      mode: "direct",
      characterId: char.id,
      groupName: "",
      groupParticipantIds: [],
      messages: [],
      choices: []
    };
  }

  function deleteTerminalChannel(channelId) {
    const idx = terminalChannels.findIndex((c) => c.id === channelId);
    if (idx === -1) return;

    if (terminalChannels.length <= 1) {
      exitEditMode();
      const fresh = createFreshDefaultChannel();
      terminalChannels = [fresh];
      activeTerminalChannelId = fresh.id;
      syncChannelToState(fresh.id);
      renderTerminalChannels();
      renderConversation();
      renderChoices();
      updateHeader();
      updateControlCharDisplay();
      updateActiveSpeakerCards();
      renderSquadRoster();
      savePersistentState();
      return;
    }

    terminalChannels.splice(idx, 1);
    if (activeTerminalChannelId === channelId) {
      exitEditMode();
      const nextCh = terminalChannels[Math.max(0, idx - 1)] || terminalChannels[0];
      activeTerminalChannelId = nextCh.id;
      syncChannelToState(activeTerminalChannelId);
      renderConversation();
      renderChoices();
      updateHeader();
      updateControlCharDisplay();
      updateActiveSpeakerCards();
      renderSquadRoster();
    }

    renderTerminalChannels();
    savePersistentState();
  }

  function clearAllTerminalChannels() {
    if (!confirm("Are you sure you want to delete all channels and conversations?")) return;
    try {
      localStorage.setItem("rwx_terminal_tutorial_cleared", "true");
    } catch (_) {}
    exitEditMode();
    const fresh = createFreshDefaultChannel();
    terminalChannels = [fresh];
    activeTerminalChannelId = fresh.id;
    syncChannelToState(fresh.id);
    renderTerminalChannels();
    renderConversation();
    renderChoices();
    updateHeader();
    updateControlCharDisplay();
    updateActiveSpeakerCards();
    renderSquadRoster();
    savePersistentState();
  }

  function selectTerminalChannel(channelId) {
    if (channelId === activeTerminalChannelId) return;
    exitEditMode();
    syncStateToActiveChannel();
    activeTerminalChannelId = channelId;
    syncChannelToState(channelId);
    renderTerminalChannels();
    renderConversation();
    renderChoices();
    updateHeader();
    updateControlCharDisplay();
    updateActiveSpeakerCards();
    renderSquadRoster();
    savePersistentState();
  }

  // drag drop & edit helpers

  function clearDropIndicators() {
    document.querySelectorAll(".drop-above, .drop-below").forEach((node) => {
      node.classList.remove("drop-above", "drop-below");
    });
  }

  function reorderMessage(sourceId, targetId, insertBefore = true) {
    if (!sourceId || !targetId || sourceId === targetId) return;
    const sourceIndex = state.messages.findIndex((m) => m.id === sourceId);
    const targetIndex = state.messages.findIndex((m) => m.id === targetId);
    if (sourceIndex === -1 || targetIndex === -1) return;

    const [movedMessage] = state.messages.splice(sourceIndex, 1);
    let newIndex = state.messages.findIndex((m) => m.id === targetId);
    if (!insertBefore) {
      newIndex += 1;
    }
    state.messages.splice(newIndex, 0, movedMessage);
    state.selectedMessageId = movedMessage.id;
    renderConversation();
    savePersistentState();
  }

  function attachMessageDragListeners(el, msgId) {
    el.setAttribute("draggable", "true");
    el.dataset.id = msgId;

    el.addEventListener("dragstart", (e) => {
      draggedMessageId = msgId;
      e.dataTransfer.effectAllowed = "all";
      e.dataTransfer.setData("text/plain", msgId);
      setTimeout(() => {
        el.classList.add("dragging");
      }, 0);
    });

    el.addEventListener("dragend", () => {
      draggedMessageId = null;
      document.querySelectorAll(".dragging").forEach((node) => node.classList.remove("dragging"));
      clearDropIndicators();
    });

    el.addEventListener("dragover", (e) => {
      if (!draggedMessageId) return;
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = "move";

      if (draggedMessageId === msgId) return;

      const rect = el.getBoundingClientRect();
      const isTop = (e.clientY - rect.top) < (rect.height / 2);

      clearDropIndicators();
      if (isTop) {
        el.classList.add("drop-above");
      } else {
        el.classList.add("drop-below");
      }
    });

    el.addEventListener("dragleave", (e) => {
      if (!el.contains(e.relatedTarget)) {
        el.classList.remove("drop-above", "drop-below");
      }
    });

    el.addEventListener("drop", (e) => {
      if (!draggedMessageId) return;
      e.preventDefault();
      e.stopPropagation();
      const sourceId = draggedMessageId || e.dataTransfer.getData("text/plain");
      const rect = el.getBoundingClientRect();
      const isTop = (e.clientY - rect.top) < (rect.height / 2);
      clearDropIndicators();
      if (sourceId && sourceId !== msgId) {
        reorderMessage(sourceId, msgId, isTop);
      }
    });
  }

  function selectMessageForEdit(id) {
    state.selectedMessageId = id;
    const selectedMsg = state.messages.find((m) => m.id === id);
    if (selectedMsg) {
      enterEditMode(selectedMsg);
    } else {
      exitEditMode();
    }
    renderConversation();
  }

  function enterEditMode(msg) {
    state.currentSender = msg.sender;
    if (msg.sender === "incoming" && msg.characterId) {
      state.activeCharacterId = msg.characterId;
      updateControlCharDisplay();
    }
    updateSenderIndicator();
    updateActiveSpeakerCards();

    if (terminalStudioTitle) {
      terminalStudioTitle.textContent = "EDIT MODE // TRANSMISSION";
      terminalStudioTitle.classList.remove("neon-flash");
      void terminalStudioTitle.offsetWidth;
      terminalStudioTitle.classList.add("neon-flash");
    }
    if (composeStudio) {
      composeStudio.classList.add("is-editing");
    }

    const type = msg.type || "text";
    switchContextTab(type);

    if (type === "text" && contextTextInput) {
      setInputValueFromStructuredText(contextTextInput, msg.text || "");
      contextTextInput.focus();
    } else if (type === "image" && msg.imageSrc) {
      contextPendingImageSrc = msg.imageSrc;
      if (contextImgTag) contextImgTag.src = msg.imageSrc;
      if (contextImgPreview) contextImgPreview.classList.remove("hidden");
      if (btnContextSendImage) btnContextSendImage.disabled = false;
    }

    if (editActionsContainer) {
      editActionsContainer.classList.remove("hidden");
    }
  }

  function exitEditMode() {
    state.selectedMessageId = null;
    if (terminalStudioTitle) {
      terminalStudioTitle.textContent = "COMPOSE CONTEXT";
      terminalStudioTitle.classList.remove("neon-flash");
    }
    if (composeStudio) {
      composeStudio.classList.remove("is-editing");
    }
    if (editActionsContainer) {
      editActionsContainer.classList.add("hidden");
    }
    if (contextTextInput) {
      setInputValueFromStructuredText(contextTextInput, "");
    }
    contextPendingImageSrc = null;
    if (contextImageFile) contextImageFile.value = "";
    if (contextImgPreview) contextImgPreview.classList.add("hidden");
    if (btnContextSendImage) btnContextSendImage.disabled = true;
    renderConversation();
  }

  // conversation rendering

  function renderConversation() {
    if (!messageList) return;
    messageList.innerHTML = "";

    if (!state.messages || state.messages.length === 0) {
      return;
    }

    let currentGroup = null;

    state.messages.forEach((msg, idx) => {
      const prevMsg = state.messages[idx - 1];
      const isNewRow =
        !prevMsg ||
        prevMsg.sender !== msg.sender ||
        (msg.sender === "incoming" && prevMsg.characterId !== msg.characterId);

      if (isNewRow) {
        if (currentGroup) {
          messageList.appendChild(currentGroup);
        }

        currentGroup = document.createElement("div");
        currentGroup.className = `message-row ${msg.sender}`;

        const avatarCol = document.createElement("div");
        avatarCol.className = "avatar-container";
        const avatarFrame = document.createElement("div");
        avatarFrame.className = "avatar-frame";
        const img = document.createElement("img");
        img.className = "avatar-image";

        if (msg.sender === "incoming") {
          const charObj = CHARACTERS[msg.characterId] || CHARACTERS[state.activeCharacterId] || CHARACTERS.pelica;
          img.src = charObj ? charObj.avatar : "rwxbaker-assets/avatars/operator/icon_round_chr_0004_pelica.png";
          img.alt = charObj ? charObj.name : "Operator";
        } else {
          const userObj = USERS[state.activeUser] || USERS.endminf;
          img.src = userObj.avatar;
          img.alt = userObj.name;
        }

        avatarFrame.appendChild(img);
        avatarCol.appendChild(avatarFrame);

        if (msg.sender === "incoming") {
          currentGroup.appendChild(avatarCol);
        }

        const groupContent = document.createElement("div");
        groupContent.className = "message-group";

        if (msg.sender === "incoming" && state.conversationMode === "group") {
          const charObj = CHARACTERS[msg.characterId];
          if (charObj) {
            const nameLabel = document.createElement("span");
            nameLabel.className = "group-sender-name";
            nameLabel.textContent = charObj.name;
            groupContent.appendChild(nameLabel);
          }
        }

        currentGroup.appendChild(groupContent);

        if (msg.sender === "outgoing") {
          currentGroup.appendChild(avatarCol);
        }
      }

      const groupContent = currentGroup.querySelector(".message-group");
      const msgItem = document.createElement("div");
      msgItem.className = "message-item";
      msgItem.dataset.id = msg.id;

      if (msg.id === state.selectedMessageId) {
        msgItem.classList.add("selected");
      }

      msgItem.addEventListener("click", (e) => {
        e.stopPropagation();
        selectMessageForEdit(msg.id);
      });

      attachMessageDragListeners(msgItem, msg.id);

      const isFirstInGroup = groupContent.querySelectorAll(".message-item").length === 0;

      if (msg.type === "image") {
        const imgCard = document.createElement("div");
        imgCard.className = "message-image-card";

        const targetWidth = msg.imageWidth || 260;
        imgCard.style.width = `${targetWidth}px`;
        imgCard.style.maxWidth = `${targetWidth}px`;

        const img = document.createElement("img");
        img.src = msg.imageSrc;
        img.alt = "Attachment";
        imgCard.appendChild(img);

        const resizeHandle = document.createElement("div");
        resizeHandle.className = "image-resize-handle";
        resizeHandle.title = "Drag to resize image (120px - 480px)";

        resizeHandle.addEventListener("mousedown", (e) => {
          e.stopPropagation();
          e.preventDefault();

          const startX = e.clientX;
          const startWidth = imgCard.offsetWidth;
          const isOutgoing = msg.sender === "outgoing";

          document.body.classList.add("is-resizing-image");

          function onMouseMove(moveEvt) {
            const deltaX = isOutgoing ? (startX - moveEvt.clientX) : (moveEvt.clientX - startX);
            const newWidth = Math.min(Math.max(Math.round(startWidth + deltaX), 120), 480);
            imgCard.style.width = `${newWidth}px`;
            imgCard.style.maxWidth = `${newWidth}px`;
          }

          function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            document.body.classList.remove("is-resizing-image");
            msg.imageWidth = imgCard.offsetWidth;
            savePersistentState();
          }

          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
        });

        resizeHandle.addEventListener("touchstart", (e) => {
          e.stopPropagation();
          const touch = e.touches[0];
          const startX = touch.clientX;
          const startWidth = imgCard.offsetWidth;
          const isOutgoing = msg.sender === "outgoing";

          function onTouchMove(moveEvt) {
            if (moveEvt.touches.length === 0) return;
            const currentX = moveEvt.touches[0].clientX;
            const deltaX = isOutgoing ? (startX - currentX) : (currentX - startX);
            const newWidth = Math.min(Math.max(Math.round(startWidth + deltaX), 120), 480);
            imgCard.style.width = `${newWidth}px`;
            imgCard.style.maxWidth = `${newWidth}px`;
          }

          function onTouchEnd() {
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
            msg.imageWidth = imgCard.offsetWidth;
            savePersistentState();
          }

          document.addEventListener("touchmove", onTouchMove, { passive: true });
          document.addEventListener("touchend", onTouchEnd);
        });

        imgCard.appendChild(resizeHandle);
        msgItem.appendChild(imgCard);
      } else if (msg.type === "sticker") {
        const stkCard = document.createElement("div");
        stkCard.className = "message-sticker-card";
        const img = document.createElement("img");
        img.src = msg.imageSrc;
        img.alt = "Sticker";
        stkCard.appendChild(img);
        msgItem.appendChild(stkCard);
      } else {
        const bubble = document.createElement("div");
        bubble.className = "message-bubble";
        if (isFirstInGroup) {
          bubble.classList.add("has-tail");
        } else {
          bubble.classList.add("no-tail");
        }
        if (msg.text && msg.text.includes("[emoji:")) {
          bubble.classList.add("has-inline-emoji");
        }
        renderMessageContentWithEmojis(bubble, msg.text || "");
        msgItem.appendChild(bubble);
      }

      if (msg.reactions && msg.reactions.length > 0) {
        const reactionsWrap = document.createElement("div");
        reactionsWrap.classList.add("msg-reactions");
        msg.reactions.forEach((r) => {
          const rPill = document.createElement("div");
          rPill.classList.add("msg-reaction-badge");

          if (r.emojiSrc) {
            const eImg = document.createElement("img");
            eImg.src = r.emojiSrc;
            eImg.alt = "Reaction Emoji";
            eImg.classList.add("reaction-emoji-img");
            rPill.appendChild(eImg);
          } else if (r.emoji) {
            const eTxt = document.createElement("span");
            eTxt.textContent = r.emoji;
            rPill.appendChild(eTxt);
          }

          if (r.count > 1) {
            const countSpan = document.createElement("span");
            countSpan.classList.add("reaction-count");
            countSpan.textContent = r.count;
            rPill.appendChild(countSpan);
          }

          reactionsWrap.appendChild(rPill);
        });

        msgItem.style.position = "relative";
        msgItem.appendChild(reactionsWrap);
      }

      groupContent.appendChild(msgItem);
    });

    if (currentGroup) {
      messageList.appendChild(currentGroup);
    }

    scrollToBottom();
  }

  function renderChoices() {
    if (!choiceContainer) return;
    choiceContainer.innerHTML = "";

    const hasTutorialClear = state.choices.some(
      (c) => c.includes("START CLEAN") || c.includes("CLEAR deletes this chat") || c.includes("Clear All") || c.includes("start clean")
    );

    if (hasTutorialClear) {
      const actionsGroup = document.createElement("div");
      actionsGroup.className = "terminal-choices-actions-group";

      const clearBtn = document.createElement("button");
      clearBtn.type = "button";
      clearBtn.className = "template-choices-clear-btn highlight-pulse";
      clearBtn.title = "Clear current chat only";
      clearBtn.innerHTML = `<span>CLEAR</span>`;
      clearBtn.addEventListener("click", () => {
        clearTerminalConversation();
      });

      const startCleanBtn = document.createElement("button");
      startCleanBtn.type = "button";
      startCleanBtn.className = "template-choices-clear-btn terminal-start-clean-choice-btn highlight-pulse";
      startCleanBtn.title = "Delete ALL channels and chats (Start clean)";
      startCleanBtn.innerHTML = `<span>START CLEAN</span>`;
      startCleanBtn.addEventListener("click", () => {
        try {
          localStorage.setItem("rwx_terminal_tutorial_cleared", "true");
        } catch (_) {}
        clearAllTerminalChannels();
      });

      actionsGroup.appendChild(clearBtn);
      actionsGroup.appendChild(startCleanBtn);
      choiceContainer.appendChild(actionsGroup);
    }

    state.choices.forEach((choiceText) => {
      const pill = document.createElement("button");
      pill.type = "button";
      pill.className = "choice-pill";
      renderMessageContentWithEmojis(pill, choiceText);

      pill.addEventListener("click", () => {
        if (choiceText.includes("START CLEAN deletes all chats/groups") || choiceText.includes("start clean")) {
          // If user specifically clicked the choice that mentions CLEAR / START CLEAN
          state.choices = [];
          renderChoices();
        } else {
          state.choices = [];
          appendMessage({
            sender: "outgoing",
            characterId: state.activeCharacterId,
            type: "text",
            text: choiceText
          });
          renderChoices();
        }
      });

      choiceContainer.appendChild(pill);
    });
  }

  function clearTerminalConversation() {
    state.messages = [];
    state.choices = [];
    try {
      localStorage.setItem("rwx_terminal_tutorial_cleared", "true");
    } catch (_) {}
    syncStateToActiveChannel();
    renderConversation();
    renderChoices();
    savePersistentState();
  }

  function loadTutorialTemplate() {
    exitEditMode();
    const termTpl = window.RWX_TERMINAL_TEMPLATE;
    if (termTpl && Array.isArray(termTpl.terminalChannels) && termTpl.terminalChannels.length > 0) {
      terminalChannels = JSON.parse(JSON.stringify(termTpl.terminalChannels));
      activeTerminalChannelId = termTpl.activeTerminalChannelId || terminalChannels[0].id;
      state.activeUser = (termTpl.activeUser === "endminf" || termTpl.activeUser === "endminm") ? termTpl.activeUser : "endminf";
      try {
        localStorage.removeItem("rwx_terminal_tutorial_cleared");
        localStorage.setItem("rwx_terminal_template_version", CURRENT_TERMINAL_TEMPLATE_VERSION);
      } catch (_) {}
      syncChannelToState(activeTerminalChannelId);
      renderTerminalChannels();
      renderConversation();
      renderChoices();
      updateHeader();
      updateControlCharDisplay();
      updateActiveSpeakerCards();
      renderSquadRoster();
      savePersistentState();
      scrollToBottom();
      return;
    }
    const tutorial = window.RWX_TUTORIAL_TEMPLATE;
    if (!tutorial) return;
    state.activeUser = tutorial.activeUser || "endminf";
    state.activeCharacterId = tutorial.activeCharacterId || "laevatain";
    state.conversationMode = tutorial.conversationMode || "direct";
    state.groupParticipantIds = Array.isArray(tutorial.groupParticipantIds) ? [...tutorial.groupParticipantIds] : [];
    state.groupName = tutorial.groupName || "";
    state.messages = JSON.parse(JSON.stringify(tutorial.messages || []));
    state.choices = Array.isArray(tutorial.choices) ? [...tutorial.choices] : [];
    state.currentSender = "incoming";

    try {
      localStorage.removeItem("rwx_terminal_tutorial_cleared");
    } catch (_) {}

    const curCh = terminalChannels.find((c) => c.id === activeTerminalChannelId);
    if (curCh) {
      curCh.messages = JSON.parse(JSON.stringify(state.messages));
      curCh.choices = [...state.choices];
      curCh.characterId = state.activeCharacterId;
      curCh.mode = state.conversationMode;
      curCh.name = "Laevatain";
      const char = CHARACTERS.laevatain;
      if (char) curCh.avatar = char.avatar;
    }

    renderTerminalChannels();
    renderConversation();
    renderChoices();
    updateHeader();
    updateControlCharDisplay();
    updateActiveSpeakerCards();
    renderSquadRoster();
    savePersistentState();
  }

  function updateHeader() {
    if (!terminalChatHeaderName) return;
    if (state.conversationMode === "group") {
      terminalChatHeaderName.textContent = state.groupName && state.groupName.trim()
        ? state.groupName.trim()
        : "Group Operation";
    } else {
      const char = state.activeCharacterId ? CHARACTERS[state.activeCharacterId] : null;
      terminalChatHeaderName.textContent = char ? char.name : "Direct Transmission";
    }
  }

  function updateActiveSpeakerCards() {
    const isOutgoing = state.currentSender === "outgoing";
    if (speakerCardEndmin) {
      speakerCardEndmin.classList.toggle("is-active", isOutgoing);
    }
    if (speakerCardOperator) {
      speakerCardOperator.classList.toggle("is-active", !isOutgoing);
    }

    const statusEndmin = document.getElementById("speaker-status-endmin");
    const statusOperator = document.getElementById("speaker-status-operator");
    if (statusEndmin) {
      statusEndmin.textContent = isOutgoing ? "● ACTIVE" : "STANDBY";
    }
    if (statusOperator) {
      statusOperator.textContent = !isOutgoing ? "● ACTIVE" : "STANDBY";
    }

    if (contextTextInput) {
      const u = USERS[state.activeUser] || USERS.endminf;
      const char = CHARACTERS[state.activeCharacterId] || CHARACTERS.pelica;
      const ph = isOutgoing ? `Send a message as ${u.name}...` : `Send a message as ${char.name}...`;
      contextTextInput.setAttribute("data-placeholder", ph);
      if (contextTextInput.placeholder !== undefined) {
        contextTextInput.placeholder = ph;
      }
    }
    updateSquadChipsHighlight();
  }

  function updateSenderIndicator() {
    if (senderIndicatorName) {
      if (state.currentSender === "outgoing") {
        const u = USERS[state.activeUser] || USERS.endminf;
        senderIndicatorName.textContent = `${u.name} (Endmin)`;
        if (btnSenderToggle) btnSenderToggle.classList.remove("incoming-mode");
      } else {
        const c = CHARACTERS[state.activeCharacterId] || CHARACTERS.pelica;
        senderIndicatorName.textContent = `${c.name} (${state.conversationMode === "group" ? "Squad Unit" : "Operator"})`;
        if (btnSenderToggle) btnSenderToggle.classList.add("incoming-mode");
      }
    }
    updateActiveSpeakerCards();
  }

  function updateUserButtons() {
    if (userBtnEndminF) userBtnEndminF.classList.toggle("active", state.activeUser === "endminf");
    if (userBtnEndminM) userBtnEndminM.classList.toggle("active", state.activeUser === "endminm");
    const u = USERS[state.activeUser] || USERS.endminf;
    if (ctrlEndminAvatar && u) ctrlEndminAvatar.src = u.avatar;
    if (ctrlEndminName && u) ctrlEndminName.textContent = u.name;
    updateSenderIndicator();
    updateActiveSpeakerCards();
  }

  function updateControlCharDisplay() {
    const char = CHARACTERS[state.activeCharacterId] || CHARACTERS.laevatain;
    if (ctrlCharAvatar && char) ctrlCharAvatar.src = char.avatar;
    if (ctrlCharName && char) ctrlCharName.textContent = char.name;
    const freqEl = document.getElementById("speaker-freq-operator");
    if (freqEl) {
      freqEl.textContent = state.conversationMode === "group" ? "RX // SQUAD" : "RX // OPERATOR";
    }
    updateSenderIndicator();
    updateActiveSpeakerCards();
  }

  // squad roster

  function renderSquadRoster() {
    if (!squadRoster || !squadMembersStrip) return;
    const isGroup = state.conversationMode === "group";
    squadRoster.classList.toggle("hidden", !isGroup);
    if (!isGroup) return;

    const participants = Array.isArray(state.groupParticipantIds) ? state.groupParticipantIds : [];
    if (squadCount) {
      squadCount.textContent = `(${participants.length})`;
    }

    squadMembersStrip.innerHTML = "";
    if (participants.length === 0) {
      squadMembersStrip.innerHTML = `<span class="terminal-squad-empty-hint">No squad members assigned. Click + ADD UNIT to assign operators.</span>`;
      return;
    }

    participants.forEach((id) => {
      const char = CHARACTERS[id];
      if (!char) return;
      const isCurrentActive = state.activeCharacterId === id && state.currentSender === "incoming";

      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = `terminal-squad-chip ${isCurrentActive ? "is-active" : ""}`;
      chip.dataset.id = id;
      chip.title = `Switch active transmitter to ${char.name}`;

      chip.innerHTML = `
        <div class="terminal-squad-chip__avatar">
          <img src="${char.avatar}" alt="${char.name}">
        </div>
        <span class="terminal-squad-chip__name">${char.name}</span>
        <button type="button" class="terminal-squad-chip__remove" title="Remove ${char.name} from squad">&times;</button>
      `;

      chip.addEventListener("click", (e) => {
        if (e.target.closest(".terminal-squad-chip__remove")) return;
        state.activeCharacterId = id;
        state.currentSender = "incoming";
        updateControlCharDisplay();
        updateSquadChipsHighlight();
        savePersistentState();
      });

      const removeBtn = chip.querySelector(".terminal-squad-chip__remove");
      if (removeBtn) {
        removeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          e.preventDefault();
          state.groupParticipantIds = state.groupParticipantIds.filter((pId) => pId !== id);
          const ch = terminalChannels.find((c) => c.id === activeTerminalChannelId);
          if (ch) {
            ch.groupParticipantIds = [...state.groupParticipantIds];
          }
          if (state.activeCharacterId === id) {
            state.activeCharacterId = state.groupParticipantIds.length > 0 ? state.groupParticipantIds[0] : "laevatain";
          }
          updateControlCharDisplay();
          renderSquadRoster();
          savePersistentState();
        });
      }

      squadMembersStrip.appendChild(chip);
    });
  }

  function updateSquadChipsHighlight() {
    if (!squadMembersStrip) return;
    const chips = squadMembersStrip.querySelectorAll(".terminal-squad-chip");
    chips.forEach((chip) => {
      const id = chip.dataset.id;
      const isCurrentActive = state.activeCharacterId === id && state.currentSender === "incoming";
      chip.classList.toggle("is-active", isCurrentActive);
    });
  }

  // character modal

  let charModalMode = "select";

  function openCharacterModal(mode = "select") {
    if (!charModal) return;
    charModalMode = mode;
    charModalFilter = "all";
    if (charModalSearchInput) charModalSearchInput.value = "";
    const modalHeaderTitle = document.querySelector("#terminal-character-modal .transmission-modal-title h3");
    if (modalHeaderTitle) {
      modalHeaderTitle.textContent = mode === "squad_add" ? "ADD OPERATOR TO GROUP" : "SELECT ACTIVE OPERATOR";
    }
    document.querySelectorAll("#terminal-character-modal .transmission-filter-btn").forEach((b) => {
      b.classList.toggle("active", (b.dataset.filter || "all") === "all");
    });
    renderCharModalGrid();
    charModal.classList.remove("hidden");
    charModal.setAttribute("aria-hidden", "false");
  }

  function closeCharacterModal() {
    if (!charModal) return;
    charModal.classList.add("hidden");
    charModal.setAttribute("aria-hidden", "true");
  }

  function renderCharModalGrid() {
    if (!charModalGrid) return;
    charModalGrid.innerHTML = "";
    const query = (charModalSearchInput ? charModalSearchInput.value.trim().toLowerCase() : "");
    const charList = Object.values(CHARACTERS);

    const filtered = charList.filter((c) => {
      if (charModalFilter === "operators" && c.isNpc) return false;
      if (charModalFilter === "npcs" && !c.isNpc) return false;
      if (query && !c.name.toLowerCase().includes(query)) return false;
      return true;
    });

    filtered.forEach((char) => {
      const isSelected = state.activeCharacterId === char.id;
      const card = document.createElement("div");
      card.className = `transmission-char-card ${isSelected ? "selected" : ""}`;
      card.dataset.id = char.id;
      card.innerHTML = `
        <div class="transmission-char-card__avatar">
          <img src="${char.avatar}" alt="${char.name}">
        </div>
        <span class="transmission-char-card__name">${char.name}</span>
      `;

      card.addEventListener("click", () => {
        state.activeCharacterId = char.id;
        state.currentSender = "incoming";

                const ch = terminalChannels.find((c) => c.id === activeTerminalChannelId);
        if (ch && ch.mode !== "group") {
          ch.characterId = char.id;
          ch.name = char.name;
          ch.avatar = char.avatar;
          renderTerminalChannels();
          updateHeader();
        } else if (ch && ch.mode === "group") {
          if (!state.groupParticipantIds.includes(char.id)) {
            state.groupParticipantIds.push(char.id);
            ch.groupParticipantIds = [...state.groupParticipantIds];
          }
          renderSquadRoster();
        }

        updateControlCharDisplay();
        savePersistentState();
        closeCharacterModal();
      });

      charModalGrid.appendChild(card);
    });
  }

  // inline composer

  function switchContextTab(type) {
    contextTypeTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.contextType === type));
    if (contextFormText) contextFormText.classList.toggle("hidden", type !== "text");
    if (contextFormImage) contextFormImage.classList.toggle("hidden", type !== "image");
    if (contextFormChoices) contextFormChoices.classList.toggle("hidden", type !== "choices");
    if (choicesEmojiBar && type !== "choices") choicesEmojiBar.classList.add("hidden");
    if (inlineEmojiBar && type !== "text") inlineEmojiBar.classList.add("hidden");
    if (contextFormReaction) {
      contextFormReaction.classList.toggle("hidden", type !== "reaction");
      if (type === "reaction") {
        populateContextReactionTargets();
        populateContextReactionEmojis();
      }
    }
  }

  function populateContextEmojis() {
    if (!contextEmojisRow || contextEmojisRow.children.length > 0) return;
    GAME_EMOJIS.forEach((src) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "terminal-quick-emoji-btn";
      btn.title = "Insert Emoji";
      btn.innerHTML = `<img src="${src}" alt="Emoji">`;
      btn.addEventListener("click", () => {
        if (!contextTextInput) return;
        insertEmojiAtCursor(src, contextTextInput);
      });
      contextEmojisRow.appendChild(btn);
    });
  }

  function populateChoiceEmojis() {
    if (!choicesEmojisRow || choicesEmojisRow.children.length > 0) return;
    GAME_EMOJIS.forEach((src) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "terminal-quick-emoji-btn";
      btn.title = "Insert Emoji";
      btn.innerHTML = `<img src="${src}" alt="Emoji">`;
      btn.addEventListener("click", () => {
        const target = activeChoiceEmojiTarget || contextChoice1;
        if (!target) return;
        insertEmojiAtCursor(src, target);
      });
      choicesEmojisRow.appendChild(btn);
    });
  }

  function populateContextStickers() {
    if (!stickersPalette || stickersPalette.children.length > 0) return;
    STICKERS.forEach((src) => {
      const item = document.createElement("div");
      item.className = "terminal-sticker-item";
      item.title = "Send Sticker";
      item.innerHTML = `<img src="${src}" alt="Sticker">`;
      item.addEventListener("click", () => {
        appendMessage({
          sender: state.currentSender,
          characterId: state.activeCharacterId,
          type: "sticker",
          imageSrc: src
        });
        stickersPalette.classList.add("hidden");
        scrollToBottom();
      });
      stickersPalette.appendChild(item);
    });
  }

  function populateContextReactionTargets() {
    if (!contextReactionTarget) return;
    contextReactionTarget.innerHTML = '<option value="">-- Select a message to react to --</option>';
    state.messages.forEach((msg, idx) => {
      const opt = document.createElement("option");
      opt.value = msg.id;
      const senderLabel = msg.sender === "outgoing" ? "Endmin" : (CHARACTERS[msg.characterId]?.name || "Operator");
      const snippet = msg.type === "image" ? "[Image]" : (msg.text ? msg.text.substring(0, 36) + "..." : "[Transmission]");
      opt.textContent = `#${idx + 1} (${senderLabel}): ${snippet}`;
      contextReactionTarget.appendChild(opt);
    });
  }

  function populateContextReactionEmojis() {
    if (!contextReactionEmojis || contextReactionEmojis.children.length > 0) return;
    GAME_EMOJIS.slice(0, 24).forEach((src) => {
      const opt = document.createElement("div");
      opt.className = `terminal-reaction-opt ${src === contextSelectedReactionEmoji ? "selected" : ""}`;
      opt.innerHTML = `<img src="${src}" alt="Reaction">`;
      opt.addEventListener("click", () => {
        contextReactionEmojis.querySelectorAll(".terminal-reaction-opt").forEach((o) => o.classList.remove("selected"));
        opt.classList.add("selected");
        contextSelectedReactionEmoji = src;
      });
      contextReactionEmojis.appendChild(opt);
    });
  }

  function appendMessage(msgData) {
    const newId = "term_m_" + Date.now();
    const newMsg = {
      id: newId,
      sender: msgData.sender || state.currentSender,
      characterId: msgData.characterId || state.activeCharacterId || "pelica",
      type: msgData.type || "text",
      text: msgData.text || "",
      imageSrc: msgData.imageSrc || null,
      reactions: []
    };

    state.messages.push(newMsg);
    renderConversation();
    renderTerminalChannels();
    savePersistentState();
  }

  function scrollToBottom() {
    if (!chatViewport) return;
    requestAnimationFrame(() => {
      chatViewport.scrollTop = chatViewport.scrollHeight;
    });
  }

  // text & emoji helpers

  function renderMessageContentWithEmojis(container, text) {
    container.innerHTML = "";
    const emojiRegex = /\[emoji:([^\]]+)\]/g;
    let lastIndex = 0;
    let match;

    while ((match = emojiRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        container.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
      }
      let emojiSrc = match[1];
      if (emojiSrc.startsWith("extracted/")) {
        emojiSrc = emojiSrc.replace(/^extracted\//, "rwxbaker-assets/");
      }
      if (emojiSrc.includes("/rwxbaker-assets/")) {
        emojiSrc = "rwxbaker-assets/" + emojiSrc.split("/rwxbaker-assets/")[1];
      }
      const emojiImg = document.createElement("img");
      emojiImg.src = emojiSrc;
      emojiImg.alt = "Emoji";
      emojiImg.className = "inline-game-emoji inline-message-emoji";
      container.appendChild(emojiImg);
      lastIndex = emojiRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      container.appendChild(document.createTextNode(text.substring(lastIndex)));
    }
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // transmission modal

  function openTransmissionModal() {
    if (!transmissionModal) return;
    modalMode = "direct";
    modalSelectedCharId = "pelica";
    modalGroupParticipants = ["pelica", "chen"];
    modalGroupName = `Operation Unit ${terminalChannels.length + 1}`;

    if (transmissionGroupNameInput) transmissionGroupNameInput.value = modalGroupName;
    if (transmissionCharacterSearch) transmissionCharacterSearch.value = "";
    modalFilter = "all";

    updateModalTabs();
    renderModalCharacterGrid();
    renderModalSelectedChips();

    transmissionModal.classList.remove("hidden");
    transmissionModal.setAttribute("aria-hidden", "false");
  }

  function closeTransmissionModal() {
    if (!transmissionModal) return;
    transmissionModal.classList.add("hidden");
    transmissionModal.setAttribute("aria-hidden", "true");
  }

  function updateModalTabs() {
    if (modalTabDirect) modalTabDirect.classList.toggle("active", modalMode === "direct");
    if (modalTabGroup) modalTabGroup.classList.toggle("active", modalMode === "group");
    if (transmissionGroupConfig) {
      transmissionGroupConfig.classList.toggle("hidden", modalMode !== "group");
    }
  }

  function renderModalCharacterGrid() {
    if (!transmissionCharacterGrid) return;
    transmissionCharacterGrid.innerHTML = "";

    const query = (transmissionCharacterSearch ? transmissionCharacterSearch.value.trim().toLowerCase() : "");
    const charList = Object.values(CHARACTERS);

    const filtered = charList.filter((c) => {
      if (modalFilter === "operators" && c.isNpc) return false;
      if (modalFilter === "npcs" && !c.isNpc) return false;
      if (query && !c.name.toLowerCase().includes(query)) return false;
      return true;
    });

    filtered.forEach((char) => {
      const isSelected = modalMode === "direct"
        ? modalSelectedCharId === char.id
        : modalGroupParticipants.includes(char.id);

      const card = document.createElement("div");
      card.className = `transmission-char-card ${isSelected ? "selected" : ""}`;
      card.dataset.id = char.id;

      let badgeHtml = "";
      if (modalMode === "group" && isSelected) {
        const idx = modalGroupParticipants.indexOf(char.id) + 1;
        badgeHtml = `<span class="transmission-char-card__badge">${idx}</span>`;
      }

      card.innerHTML = `
        <div class="transmission-char-card__avatar">
          <img src="${char.avatar}" alt="${char.name}">
        </div>
        <span class="transmission-char-card__name">${char.name}</span>
        ${badgeHtml}
      `;

      card.addEventListener("click", () => {
        if (modalMode === "direct") {
          modalSelectedCharId = char.id;
          renderModalCharacterGrid();
        } else {
          const idx = modalGroupParticipants.indexOf(char.id);
          if (idx > -1) {
            modalGroupParticipants.splice(idx, 1);
          } else {
            modalGroupParticipants.push(char.id);
          }
          renderModalCharacterGrid();
          renderModalSelectedChips();
        }
      });

      transmissionCharacterGrid.appendChild(card);
    });
  }

  function renderModalSelectedChips() {
    if (!transmissionSelectedChips) return;
    transmissionSelectedChips.innerHTML = "";

    if (modalGroupParticipants.length === 0) {
      transmissionSelectedChips.innerHTML = '<span class="no-participants-hint">Select operators from the list below...</span>';
      return;
    }

    modalGroupParticipants.forEach((id) => {
      const char = CHARACTERS[id];
      if (!char) return;
      const chip = document.createElement("div");
      chip.className = "transmission-chip";
      chip.innerHTML = `
        <img src="${char.avatar}" alt="${char.name}">
        <span>${char.name}</span>
        <button type="button" aria-label="Remove">&times;</button>
      `;
      chip.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = modalGroupParticipants.indexOf(id);
        if (idx > -1) modalGroupParticipants.splice(idx, 1);
        renderModalCharacterGrid();
        renderModalSelectedChips();
      });
      transmissionSelectedChips.appendChild(chip);
    });
  }

  function handleCreateTransmission() {
    const newId = "channel-" + Date.now();

    if (modalMode === "direct") {
      const char = CHARACTERS[modalSelectedCharId] || CHARACTERS.laevatain;
      const newCh = {
        id: newId,
        name: char.name,
        avatar: char.avatar,
        mode: "direct",
        characterId: char.id,
        groupName: "",
        groupParticipantIds: [],
        messages: [],
        choices: []
      };
      terminalChannels.push(newCh);
      selectTerminalChannel(newId);
    } else {
      const participants = modalGroupParticipants.length > 0 ? [...modalGroupParticipants] : ["laevatain", "chen"];
      const gName = (transmissionGroupNameInput ? transmissionGroupNameInput.value.trim() : "") || "Squad Operation";
      const newCh = {
        id: newId,
        name: gName,
        avatar: "rwxbaker-assets/deco/group-channel.webp",
        mode: "group",
        characterId: participants[0] || "laevatain",
        groupName: gName,
        groupParticipantIds: participants,
        messages: [],
        choices: []
      };
      terminalChannels.push(newCh);
      selectTerminalChannel(newId);
    }

    closeTransmissionModal();
  }

  // event listeners

  function setupEventListeners() {
        if (btnSend && messageInput) {
      btnSend.addEventListener("click", () => {
        const text = messageInput.value.trim();
        if (!text) return;
        appendMessage({ text });
        messageInput.value = "";
      });

      messageInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          btnSend.click();
        }
      });
    }

        if (btnSenderToggle) {
      btnSenderToggle.addEventListener("click", () => {
        state.currentSender = state.currentSender === "outgoing" ? "incoming" : "outgoing";
        updateSenderIndicator();
      });
    }

        if (btnTerminalNewChat) {
      btnTerminalNewChat.addEventListener("click", () => {
        openTransmissionModal();
      });
    }

    const btnClearChannels = document.getElementById("btn-terminal-clear-channels");
    if (btnClearChannels) {
      btnClearChannels.addEventListener("click", () => {
        clearAllTerminalChannels();
      });
    }

    if (btnTerminalTutorial) {
      btnTerminalTutorial.addEventListener("click", () => {
        loadTutorialTemplate();
      });
    }

    if (btnTerminalClearChat) {
      btnTerminalClearChat.addEventListener("click", () => {
        clearAllTerminalChannels();
      });
    }

    if (btnTerminalStartClean) {
      btnTerminalStartClean.addEventListener("click", () => {
        try {
          localStorage.setItem("rwx_terminal_tutorial_cleared", "true");
        } catch (_) {}
        clearAllTerminalChannels();
      });
    }

        if (btnReturnStudio) {
      btnReturnStudio.addEventListener("click", (e) => {
        e.preventDefault();
        savePersistentState();
        window.location.href = "index.html";
      });
    }

    if (btnSaveJson) {
      btnSaveJson.addEventListener("click", () => {
        saveTerminalScenarioAsJson();
      });
    }

    if (btnLoadJson && inputLoadJson) {
      btnLoadJson.addEventListener("click", () => {
        inputLoadJson.value = "";
        inputLoadJson.click();
      });

      inputLoadJson.addEventListener("change", (e) => {
        if (e.target.files && e.target.files.length > 0) {
          loadTerminalScenarioFromJson(e.target.files[0]);
        }
      });
    }

    let dragCounter = 0;
    function isJsonFileDrag(e) {
      if (draggedMessageId) return false;
      if (!e.dataTransfer) return false;
      const types = Array.from(e.dataTransfer.types || []);
      return types.includes("Files");
    }

    window.addEventListener("dragenter", (e) => {
      if (!isJsonFileDrag(e)) return;
      e.preventDefault();
      dragCounter++;
      if (jsonDropOverlay) jsonDropOverlay.classList.remove("hidden");
      if (phoneFrame) phoneFrame.classList.add("drag-over-json");
    });

    window.addEventListener("dragover", (e) => {
      if (!isJsonFileDrag(e)) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    });

    window.addEventListener("dragleave", (e) => {
      if (!isJsonFileDrag(e)) return;
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) {
        dragCounter = 0;
        if (jsonDropOverlay) jsonDropOverlay.classList.add("hidden");
        if (phoneFrame) phoneFrame.classList.remove("drag-over-json");
      }
    });

    window.addEventListener("drop", (e) => {
      if (!isJsonFileDrag(e)) return;
      e.preventDefault();
      dragCounter = 0;
      if (jsonDropOverlay) jsonDropOverlay.classList.add("hidden");
      if (phoneFrame) phoneFrame.classList.remove("drag-over-json");

      const files = e.dataTransfer ? e.dataTransfer.files : null;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.name.endsWith(".json") || file.type === "application/json") {
          loadTerminalScenarioFromJson(file);
        } else {
          alert("Please drop a valid .json scenario backup file.");
        }
      }
    });

        if (btnCloseTransmissionModal) btnCloseTransmissionModal.addEventListener("click", closeTransmissionModal);
    if (btnCancelTransmission) btnCancelTransmission.addEventListener("click", closeTransmissionModal);
    if (btnSubmitTransmission) btnSubmitTransmission.addEventListener("click", handleCreateTransmission);

    if (modalTabDirect) {
      modalTabDirect.addEventListener("click", () => {
        modalMode = "direct";
        updateModalTabs();
        renderModalCharacterGrid();
      });
    }

    if (modalTabGroup) {
      modalTabGroup.addEventListener("click", () => {
        modalMode = "group";
        updateModalTabs();
        renderModalCharacterGrid();
      });
    }

    if (transmissionCharacterSearch) {
      transmissionCharacterSearch.addEventListener("input", () => {
        renderModalCharacterGrid();
      });
    }

    document.querySelectorAll(".transmission-filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".transmission-filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        modalFilter = btn.dataset.filter || "all";
        renderModalCharacterGrid();
      });
    });

        if (speakerCardEndmin) {
      speakerCardEndmin.addEventListener("click", () => {
        state.currentSender = "outgoing";
        updateActiveSpeakerCards();
        updateSenderIndicator();
        savePersistentState();
      });
    }

    if (speakerCardOperator) {
      speakerCardOperator.addEventListener("click", (e) => {
        if (e.target.closest("#btn-terminal-open-char-modal")) return;
        state.currentSender = "incoming";
        updateActiveSpeakerCards();
        updateSenderIndicator();
        savePersistentState();
      });
    }

        if (userBtnEndminF) {
      userBtnEndminF.addEventListener("click", (e) => {
        e.stopPropagation();
        state.activeUser = "endminf";
        state.currentSender = "outgoing";
        updateUserButtons();
        renderConversation();
        savePersistentState();
      });
    }

    if (userBtnEndminM) {
      userBtnEndminM.addEventListener("click", (e) => {
        e.stopPropagation();
        state.activeUser = "endminm";
        state.currentSender = "outgoing";
        updateUserButtons();
        renderConversation();
        savePersistentState();
      });
    }

        if (btnOpenCharModal) {
      btnOpenCharModal.addEventListener("click", () => openCharacterModal("select"));
    }
    if (btnAddSquadMember) {
      btnAddSquadMember.addEventListener("click", () => openCharacterModal("squad_add"));
    }
    if (btnCloseCharModal) btnCloseCharModal.addEventListener("click", closeCharacterModal);
    if (btnCancelCharModal) btnCancelCharModal.addEventListener("click", closeCharacterModal);

    if (charModalSearchInput) {
      charModalSearchInput.addEventListener("input", renderCharModalGrid);
    }

    document.querySelectorAll("#terminal-character-modal .transmission-filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#terminal-character-modal .transmission-filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        charModalFilter = btn.dataset.filter || "all";
        renderCharModalGrid();
      });
    });

        [transmissionModal, charModal].forEach((modal) => {
      if (modal) {
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.classList.add("hidden");
            modal.setAttribute("aria-hidden", "true");
          }
        });
      }
    });

        contextTypeTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        switchContextTab(tab.dataset.contextType);
      });
    });

        if (btnInlineEmojiToggle && inlineEmojiBar) {
      btnInlineEmojiToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        inlineEmojiBar.classList.toggle("hidden");
        populateContextEmojis();
      });

      const btnCloseTerminalEmoji = document.getElementById("btn-close-terminal-emoji");
      if (btnCloseTerminalEmoji) {
        btnCloseTerminalEmoji.addEventListener("click", () => {
          inlineEmojiBar.classList.add("hidden");
        });
      }

      document.addEventListener("click", (e) => {
        if (!inlineEmojiBar.classList.contains("hidden")) {
          const wrap = document.querySelector(".terminal-context-input-wrap");
          if (wrap && !wrap.contains(e.target)) {
            inlineEmojiBar.classList.add("hidden");
          }
        }
      });
    }

        function sendContextTextMessage() {
      if (!contextTextInput) return;
      const text = getInputValueAsStructuredText(contextTextInput).trim();
      if (!text) return;
      appendMessage({
        sender: state.currentSender,
        characterId: state.activeCharacterId,
        type: "text",
        text
      });
      setInputValueFromStructuredText(contextTextInput, "");
      scrollToBottom();
    }

    if (btnContextSendText) {
      btnContextSendText.addEventListener("click", sendContextTextMessage);
    }

    if (contextTextInput) {
      contextTextInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          if (state.selectedMessageId && btnEditUpdate) {
            btnEditUpdate.click();
          } else {
            sendContextTextMessage();
          }
        }
      });
    }

        if (btnContextStickersToggle && stickersPalette) {
      btnContextStickersToggle.addEventListener("click", () => {
        stickersPalette.classList.toggle("hidden");
        populateContextStickers();
      });
    }

        if (contextImageFile) {
      contextImageFile.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          contextPendingImageSrc = ev.target.result;
          if (contextImgTag) contextImgTag.src = contextPendingImageSrc;
          if (contextImgPreview) contextImgPreview.classList.remove("hidden");
          if (btnContextSendImage) btnContextSendImage.disabled = false;
        };
        reader.readAsDataURL(file);
      });
    }

    if (btnRemoveContextImg) {
      btnRemoveContextImg.addEventListener("click", () => {
        contextPendingImageSrc = null;
        if (contextImageFile) contextImageFile.value = "";
        if (contextImgPreview) contextImgPreview.classList.add("hidden");
        if (btnContextSendImage) btnContextSendImage.disabled = true;
      });
    }

    if (btnContextSendImage) {
      btnContextSendImage.addEventListener("click", () => {
        if (!contextPendingImageSrc) return;
        appendMessage({
          sender: state.currentSender,
          characterId: state.activeCharacterId,
          type: "image",
          imageSrc: contextPendingImageSrc
        });
        contextPendingImageSrc = null;
        if (contextImageFile) contextImageFile.value = "";
        if (contextImgPreview) contextImgPreview.classList.add("hidden");
        btnContextSendImage.disabled = true;
        scrollToBottom();
      });
    }

        choiceEmojiBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const targetId = btn.dataset.choiceTarget;
        const targetEl = document.getElementById(targetId);
        if (!choicesEmojiBar) return;

        if (!choicesEmojiBar.classList.contains("hidden") && activeChoiceEmojiTarget === targetEl) {
          choicesEmojiBar.classList.add("hidden");
          return;
        }

        activeChoiceEmojiTarget = targetEl;
        choicesEmojiBar.classList.remove("hidden");
        populateChoiceEmojis();
      });
    });

    if (btnCloseChoicesEmoji && choicesEmojiBar) {
      btnCloseChoicesEmoji.addEventListener("click", () => {
        choicesEmojiBar.classList.add("hidden");
      });
    }

    document.addEventListener("click", (e) => {
      if (choicesEmojiBar && !choicesEmojiBar.classList.contains("hidden")) {
        const wrap = document.getElementById("terminal-context-form-choices");
        if (wrap && !wrap.contains(e.target)) {
          choicesEmojiBar.classList.add("hidden");
        }
      }
    });

    [contextChoice1, contextChoice2].forEach((choiceEl) => {
      if (choiceEl) {
        choiceEl.addEventListener("focus", () => {
          activeChoiceEmojiTarget = choiceEl;
        });
      }
    });

    if (btnContextAddChoices) {
      btnContextAddChoices.addEventListener("click", () => {
        const c1 = contextChoice1 ? (contextChoice1.isContentEditable ? getInputValueAsStructuredText(contextChoice1).trim() : contextChoice1.value.trim()) : "";
        const c2 = contextChoice2 ? (contextChoice2.isContentEditable ? getInputValueAsStructuredText(contextChoice2).trim() : contextChoice2.value.trim()) : "";
        const newChoices = [c1, c2].filter(Boolean);
        if (newChoices.length > 0) {
          state.choices = newChoices;
          renderChoices();
          savePersistentState();
        }
        if (contextChoice1) {
          if (contextChoice1.isContentEditable) setInputValueFromStructuredText(contextChoice1, "");
          else contextChoice1.value = "";
        }
        if (contextChoice2) {
          if (contextChoice2.isContentEditable) setInputValueFromStructuredText(contextChoice2, "");
          else contextChoice2.value = "";
        }
        if (choicesEmojiBar) choicesEmojiBar.classList.add("hidden");
      });
    }

    if (btnContextClearChoices) {
      btnContextClearChoices.addEventListener("click", () => {
        state.choices = [];
        renderChoices();
        savePersistentState();
        if (contextChoice1) {
          if (contextChoice1.isContentEditable) setInputValueFromStructuredText(contextChoice1, "");
          else contextChoice1.value = "";
        }
        if (contextChoice2) {
          if (contextChoice2.isContentEditable) setInputValueFromStructuredText(contextChoice2, "");
          else contextChoice2.value = "";
        }
        if (choicesEmojiBar) choicesEmojiBar.classList.add("hidden");
      });
    }

        if (btnContextAddReaction) {
      btnContextAddReaction.addEventListener("click", () => {
        const targetId = contextReactionTarget ? contextReactionTarget.value : "";
        if (!targetId || !contextSelectedReactionEmoji) return;
        const msg = state.messages.find((m) => m.id === targetId);
        if (msg) {
          if (!Array.isArray(msg.reactions)) msg.reactions = [];
          const existing = msg.reactions.find((r) => r.emojiSrc === contextSelectedReactionEmoji);
          if (existing) {
            existing.count = (existing.count || 1) + 1;
          } else {
            msg.reactions.push({ emojiSrc: contextSelectedReactionEmoji, count: 1 });
          }
          renderConversation();
          savePersistentState();
          populateContextReactionTargets();
        }
      });
    }

        if (chatViewport) {
      chatViewport.addEventListener("click", (e) => {
        if (!e.target.closest(".message-item") && !e.target.closest("#terminal-compose-studio")) {
          if (state.selectedMessageId) {
            exitEditMode();
          }
        }
      });
    }

        if (btnEditUpdate) {
      btnEditUpdate.addEventListener("click", () => {
        if (!state.selectedMessageId) return;
        const msg = state.messages.find((m) => m.id === state.selectedMessageId);
        if (!msg) return;

        msg.sender = state.currentSender;
        msg.characterId = state.activeCharacterId;

        const activeTab = document.querySelector(".terminal-context-tab.active");
        const type = activeTab ? activeTab.dataset.contextType : (msg.type || "text");

        if (type === "image" && contextPendingImageSrc) {
          msg.type = "image";
          msg.imageSrc = contextPendingImageSrc;
          delete msg.text;
        } else {
          msg.type = "text";
          msg.text = getInputValueAsStructuredText(contextTextInput).trim();
        }

        savePersistentState();
        exitEditMode();
      });
    }

    if (btnEditDelete) {
      btnEditDelete.addEventListener("click", () => {
        if (!state.selectedMessageId) return;
        state.messages = state.messages.filter((m) => m.id !== state.selectedMessageId);
        savePersistentState();
        exitEditMode();
      });
    }

    if (btnEditCancel) {
      btnEditCancel.addEventListener("click", () => {
        exitEditMode();
      });
    }

        exportModeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        exportModeBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.exportMode = btn.dataset.exportMode || "screen";
      });
    });

    if (btnExportPng) {
      btnExportPng.addEventListener("click", () => {
        exportConversationAsPng();
      });
    }

    window.addEventListener("beforeunload", () => {
      savePersistentState();
    });
  }

  // png export

  function downloadDataUrl(dataUrl, filename) {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function render9SliceTiled(img, dw, dh, slice) {
    const canvas = document.createElement("canvas");
    canvas.width = dw;
    canvas.height = dh;
    const ctx = canvas.getContext("2d");

    const sw = img.naturalWidth || img.width;
    const sh = img.naturalHeight || img.height;

    const sL = slice.left;
    const sR = slice.right;
    const sT = slice.top;
    const sB = slice.bottom;

    const dL = sL;
    const dR = sR;
    const dT = sT;
    const dB = sB;

    const swMid = sw - sL - sR;
    const shMid = sh - sT - sB;
    const dwMid = dw - dL - dR;
    const dhMid = dh - dT - dB;

        ctx.drawImage(img, 0, 0, sL, sT, 0, 0, dL, dT);
    ctx.drawImage(img, sw - sR, 0, sR, sT, dw - dR, 0, dR, dT);
    ctx.drawImage(img, 0, sh - sB, sL, sB, 0, dh - dB, dL, dB);
    ctx.drawImage(img, sw - sR, sh - sB, sR, sB, dw - dR, dh - dB, dR, dB);

        if (dwMid > 0) {
      ctx.drawImage(img, sL, 0, swMid, sT, dL, 0, dwMid, dT);
      ctx.drawImage(img, sL, sh - sB, swMid, sB, dL, dh - dB, dwMid, dB);
    }
    if (dhMid > 0) {
      ctx.drawImage(img, 0, sT, sL, shMid, 0, dT, dL, dhMid);
      ctx.drawImage(img, sw - sR, sT, sR, shMid, dw - dR, dT, dR, dhMid);
    }

        if (dwMid > 0 && dhMid > 0) {
      ctx.drawImage(img, sL, sT, swMid, shMid, dL, dT, dwMid, dhMid);
    }

    return canvas.toDataURL("image/png");
  }

  function renderInputDecoration(img, dw, dh) {
    const canvas = document.createElement("canvas");
    const h = dh || 16;
    canvas.width = dw;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    const sw = img.naturalWidth || img.width || 1312;
    const sh = img.naturalHeight || img.height || 16;
    const sliceRight = 36;

    const dwMid = dw - sliceRight;
    if (dwMid > 0) {
      ctx.drawImage(img, 0, 0, sw - sliceRight, sh, 0, 0, dwMid, h);
    }
    ctx.drawImage(img, sw - sliceRight, 0, sliceRight, sh, dw - sliceRight, 0, sliceRight, h);

    return canvas.toDataURL("image/png");
  }

  function calculatePageScrollPositions() {
    const viewportHeight = chatViewport.clientHeight;
    const maxScroll = Math.max(0, chatViewport.scrollHeight - viewportHeight);
    if (maxScroll === 0) return [0];

    const messageRows = Array.from(messageList.querySelectorAll(".message-row"));
    if (messageRows.length === 0) return [0];

    const scrollPositions = [0];
    let currentScroll = 0;
    const MAX_PAGES = 30;

    while (currentScroll < maxScroll && scrollPositions.length < MAX_PAGES) {
      const targetScroll = currentScroll + viewportHeight;
      if (targetScroll >= maxScroll) {
        scrollPositions.push(maxScroll);
        break;
      }
      let bestBreak = targetScroll;
      for (let i = 0; i < messageRows.length; i++) {
        const row = messageRows[i];
        const rowTop = row.offsetTop;
        const rowBottom = rowTop + row.offsetHeight;
        if (rowTop < targetScroll && rowBottom > targetScroll) {
          bestBreak = rowTop;
          break;
        }
      }
      if (bestBreak <= currentScroll) {
        bestBreak = currentScroll + viewportHeight;
      }
      scrollPositions.push(bestBreak);
      currentScroll = bestBreak;
    }
    return scrollPositions;
  }

  // watermark telemetry
  const WATERMARK_ASSETS = [
    "rwxbaker-assets/watermarks/watermark-v1-telemetry.png",
    "rwxbaker-assets/watermarks/watermark-v4-minimal.png"
  ];
  let activeWatermarkSrc = WATERMARK_ASSETS[Math.floor(Math.random() * WATERMARK_ASSETS.length)];

  function initWatermark() {
    const liveStamp = document.getElementById("live-watermark-stamp");
    if (liveStamp) {
      liveStamp.src = activeWatermarkSrc;
    }

    const mainPane = document.getElementById("terminal-main-pane") || phoneFrame;
    if (window.MutationObserver && mainPane) {
      const observer = new MutationObserver(() => {
        let currentStamp = document.getElementById("live-watermark-stamp");
        if (!currentStamp && mainPane) {
          currentStamp = document.createElement("img");
          currentStamp.id = "live-watermark-stamp";
          currentStamp.className = "rwx-export-watermark";
          currentStamp.src = activeWatermarkSrc;
          currentStamp.alt = "RWX // BKR";
          currentStamp.setAttribute("aria-hidden", "true");
          mainPane.insertBefore(currentStamp, mainPane.firstChild);
        } else if (currentStamp) {
          if (currentStamp.getAttribute("src") !== activeWatermarkSrc) {
            currentStamp.src = activeWatermarkSrc;
          }
          if (getComputedStyle(currentStamp).display === "none") {
            currentStamp.style.display = "block";
          }
          if (getComputedStyle(currentStamp).visibility === "hidden") {
            currentStamp.style.visibility = "visible";
          }
          const op = parseFloat(getComputedStyle(currentStamp).opacity);
          if (isNaN(op) || op < 0.2) {
            currentStamp.style.opacity = "0.45";
          }
        }
      });
      observer.observe(mainPane, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class", "src"] });
    }
  }

  function captureBlurredVideoFrame() {
    try {
      const video = document.querySelector(".bg-video");
      if (!video || !video.videoWidth) return null;
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = Math.round(640 * (video.videoHeight / video.videoWidth)) || 360;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
            ctx.filter = "blur(14px) brightness(0.78) contrast(0.82)";
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(18, 19, 23, 0.72)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg", 0.92);
    } catch (e) {
      return null;
    }
  }

  async function exportConversationAsPng() {
    if (typeof domtoimage === "undefined") {
      alert("dom-to-image library not loaded.");
      return;
    }

    const mainPane = document.getElementById("terminal-main-pane") || phoneFrame;
    const terminalWindowBody = document.getElementById("terminal-window-body");

    if (btnExportPng) btnExportPng.disabled = true;
    const originalBtnText = exportBtnText ? exportBtnText.textContent : "Export";
    if (exportBtnText) exportBtnText.textContent = "Exporting...";

    const originalScrollTop = chatViewport ? chatViewport.scrollTop : 0;

    const leftImg = new Image();
    leftImg.src = "rwxbaker-assets/deco/bg_message_left.png";
    const rightImg = new Image();
    rightImg.src = "rwxbaker-assets/deco/bg_message_right.png";
    const watermarkImg = new Image();
    watermarkImg.src = activeWatermarkSrc;
    const inputTopDecoImg = new Image();
    inputTopDecoImg.src = "rwxbaker-assets/deco/conversation-input-top.webp";

    await Promise.all([
      new Promise((res) => { if (leftImg.complete) res(); else leftImg.onload = res; }),
      new Promise((res) => { if (rightImg.complete) res(); else rightImg.onload = res; }),
      new Promise((res) => { if (watermarkImg.complete) res(); else watermarkImg.onload = res; }),
      new Promise((res) => { if (inputTopDecoImg.complete) res(); else inputTopDecoImg.onload = res; })
    ]);

    let exportWatermarkEl = null;
    const liveStamp = document.getElementById("live-watermark-stamp");
    if (!liveStamp || !liveStamp.parentNode) {
      exportWatermarkEl = document.createElement("img");
      exportWatermarkEl.id = "live-watermark-stamp";
      exportWatermarkEl.className = "rwx-export-watermark";
      exportWatermarkEl.src = activeWatermarkSrc;
      exportWatermarkEl.alt = "RWX // BKR";
      exportWatermarkEl.setAttribute("aria-hidden", "true");
      mainPane.insertBefore(exportWatermarkEl, mainPane.firstChild);
    } else {
      liveStamp.src = activeWatermarkSrc;
    }

    // export uses dark css background like tablet mode
    if (terminalWindowBody) {
      terminalWindowBody.style.removeProperty("background");
    }

    const incomingTails = mainPane.querySelectorAll(".incoming .message-bubble.has-tail");
    const outgoingTails = mainPane.querySelectorAll(".outgoing .message-bubble.has-tail");
    const modifiedBubbles = [];

    incomingTails.forEach((bubble) => {
      const dw = bubble.offsetWidth;
      const dh = bubble.offsetHeight;
      if (dw <= 0 || dh <= 0) return;
      const dataUrl = render9SliceTiled(leftImg, dw, dh, { top: 20, right: 20, bottom: 18, left: 30 });
      modifiedBubbles.push({
        element: bubble,
        borderImage: bubble.style.borderImage,
        borderStyle: bubble.style.borderStyle,
        borderWidth: bubble.style.borderWidth,
        borderColor: bubble.style.borderColor,
        backgroundImage: bubble.style.backgroundImage,
        backgroundOrigin: bubble.style.backgroundOrigin,
        backgroundClip: bubble.style.backgroundClip,
        backgroundSize: bubble.style.backgroundSize,
        backgroundRepeat: bubble.style.backgroundRepeat,
      });
      bubble.style.borderImage = "none";
      bubble.style.borderStyle = "solid";
      bubble.style.borderWidth = "3px";
      bubble.style.borderColor = "transparent";
      bubble.style.backgroundImage = `url("${dataUrl}")`;
      bubble.style.backgroundOrigin = "border-box";
      bubble.style.backgroundClip = "border-box";
      bubble.style.backgroundSize = `${dw}px ${dh}px`;
      bubble.style.backgroundRepeat = "no-repeat";
    });

    outgoingTails.forEach((bubble) => {
      const dw = bubble.offsetWidth;
      const dh = bubble.offsetHeight;
      if (dw <= 0 || dh <= 0) return;
      const dataUrl = render9SliceTiled(rightImg, dw, dh, { top: 20, right: 30, bottom: 18, left: 20 });
      modifiedBubbles.push({
        element: bubble,
        borderImage: bubble.style.borderImage,
        borderStyle: bubble.style.borderStyle,
        borderWidth: bubble.style.borderWidth,
        borderColor: bubble.style.borderColor,
        backgroundImage: bubble.style.backgroundImage,
        backgroundOrigin: bubble.style.backgroundOrigin,
        backgroundClip: bubble.style.backgroundClip,
        backgroundSize: bubble.style.backgroundSize,
        backgroundRepeat: bubble.style.backgroundRepeat,
      });
      bubble.style.borderImage = "none";
      bubble.style.borderStyle = "solid";
      bubble.style.borderWidth = "3px";
      bubble.style.borderColor = "transparent";
      bubble.style.backgroundImage = `url("${dataUrl}")`;
      bubble.style.backgroundOrigin = "border-box";
      bubble.style.backgroundClip = "border-box";
      bubble.style.backgroundSize = `${dw}px ${dh}px`;
      bubble.style.backgroundRepeat = "no-repeat";
    });

    const targetScope = (state.exportMode === "terminal" ? (phoneFrame || mainPane) : mainPane);
    const inputDecors = targetScope.querySelectorAll(".terminal-input-decoration");
    const modifiedDecors = [];

    inputDecors.forEach((decor) => {
      const dw = decor.offsetWidth;
      if (dw <= 0) return;
      const targetHeight = 16;
      const dataUrl = renderInputDecoration(inputTopDecoImg, dw, targetHeight);
      modifiedDecors.push({
        element: decor,
        borderImage: decor.style.borderImage,
        borderStyle: decor.style.borderStyle,
        borderWidth: decor.style.borderWidth,
        backgroundImage: decor.style.backgroundImage,
        backgroundSize: decor.style.backgroundSize,
        backgroundRepeat: decor.style.backgroundRepeat,
        backgroundPosition: decor.style.backgroundPosition,
        height: decor.style.height,
        transform: decor.style.transform
      });
      decor.style.borderImage = "none";
      decor.style.borderStyle = "none";
      decor.style.borderWidth = "0";
      decor.style.backgroundImage = `url("${dataUrl}")`;
      decor.style.backgroundSize = `${dw}px ${targetHeight}px`;
      decor.style.backgroundRepeat = "no-repeat";
      decor.style.backgroundPosition = "left center";
      decor.style.height = `${targetHeight}px`;
      decor.style.transform = "translateY(-110%)";
    });

    try {
      mainPane.classList.add("is-exporting");
      if (phoneFrame) phoneFrame.classList.add("is-exporting");

      const origPaneWidth = mainPane.offsetWidth;

      if (state.exportMode === "terminal") {
        const targetElement = phoneFrame || mainPane;
        targetElement.classList.add("is-exporting-terminal");

        chatViewport.style.overflow = "hidden";
        messageList.style.transform = `translateY(-${originalScrollTop}px)`;

        await new Promise((resolve) => setTimeout(resolve, 160));

        const dataUrl = await domtoimage.toPng(targetElement, {
          scale: 2,
          style: { transform: "none", margin: "0", zoom: "1" },
          onclone: (cloned) => {
            cloned.style.transform = "none";
            cloned.style.zoom = "1";
          }
        });

        downloadDataUrl(dataUrl, "RWX-Terminal-Desktop.png");

      } else if (state.exportMode === "full") {
        mainPane.style.width = origPaneWidth + "px";
        mainPane.style.height = "auto";
        mainPane.style.maxHeight = "none";
        if (terminalWindowBody) {
          terminalWindowBody.style.height = "auto";
          terminalWindowBody.style.maxHeight = "none";
          terminalWindowBody.style.flex = "none";
        }
        chatViewport.style.height = "auto";
        chatViewport.style.maxHeight = "none";
        chatViewport.style.flex = "none";
        chatViewport.style.overflow = "visible";
        messageList.style.transform = "none";

        await new Promise((resolve) => setTimeout(resolve, 150));

        const scale = (mainPane.offsetHeight * 2 > 12000) ? 1 : 2;
        const dataUrl = await domtoimage.toPng(mainPane, {
          scale: scale,
          style: { transform: "none", margin: "0" },
          onclone: (cloned) => { cloned.style.transform = "none"; }
        });

        downloadDataUrl(dataUrl, "RWX-Terminal-Full.png");

      } else if (state.exportMode === "screen") {
        chatViewport.style.overflow = "hidden";
        messageList.style.transform = `translateY(-${originalScrollTop}px)`;

        await new Promise((resolve) => setTimeout(resolve, 120));

        const dataUrl = await domtoimage.toPng(mainPane, {
          scale: 2,
          style: { transform: "none", margin: "0" },
          onclone: (cloned) => { cloned.style.transform = "none"; }
        });

        downloadDataUrl(dataUrl, "RWX-Terminal-Screen.png");

      } else if (state.exportMode === "paged") {
        const pages = calculatePageScrollPositions();

        for (let i = 0; i < pages.length; i++) {
          if (exportBtnText) exportBtnText.textContent = `Page ${i + 1}/${pages.length}...`;
          const scrollPos = pages[i];

          chatViewport.style.overflow = "hidden";
          messageList.style.transform = `translateY(-${scrollPos}px)`;

          await new Promise((resolve) => setTimeout(resolve, 120));

          const dataUrl = await domtoimage.toPng(mainPane, {
            scale: 2,
            style: { transform: "none", margin: "0" },
            onclone: (cloned) => { cloned.style.transform = "none"; }
          });

          downloadDataUrl(dataUrl, `RWX-Terminal-${i + 1}.png`);

          if (i < pages.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 300));
          }
        }
      }

      if (exportBtnText) exportBtnText.textContent = "Done!";
      await new Promise((resolve) => setTimeout(resolve, 900));
    } catch (err) {
      console.error("Terminal export failed:", err);
      alert("Terminal export failed: " + (err.message || err));
    } finally {
      modifiedBubbles.forEach(({ element, borderImage, borderStyle, borderWidth, borderColor, backgroundImage, backgroundOrigin, backgroundClip, backgroundSize, backgroundRepeat }) => {
        element.style.borderImage = borderImage;
        element.style.borderStyle = borderStyle;
        element.style.borderWidth = borderWidth;
        element.style.borderColor = borderColor;
        element.style.backgroundImage = backgroundImage;
        element.style.backgroundOrigin = backgroundOrigin;
        element.style.backgroundClip = backgroundClip;
        element.style.backgroundSize = backgroundSize;
        element.style.backgroundRepeat = backgroundRepeat;
      });

      modifiedDecors.forEach(({ element, borderImage, borderStyle, borderWidth, backgroundImage, backgroundSize, backgroundRepeat, backgroundPosition, height, transform }) => {
        element.style.borderImage = borderImage;
        element.style.borderStyle = borderStyle;
        element.style.borderWidth = borderWidth;
        element.style.backgroundImage = backgroundImage;
        element.style.backgroundSize = backgroundSize;
        element.style.backgroundRepeat = backgroundRepeat;
        element.style.backgroundPosition = backgroundPosition;
        element.style.height = height;
        element.style.transform = transform;
      });

      mainPane.classList.remove("is-exporting");
      if (phoneFrame) {
        phoneFrame.classList.remove("is-exporting");
        phoneFrame.classList.remove("is-exporting-terminal");
      }
      mainPane.classList.remove("is-exporting-terminal");

      mainPane.style.width = "";
      mainPane.style.height = "";
      mainPane.style.maxHeight = "";
      if (terminalWindowBody) {
        terminalWindowBody.style.height = "";
        terminalWindowBody.style.maxHeight = "";
        terminalWindowBody.style.flex = "";
        terminalWindowBody.style.removeProperty("background");
        terminalWindowBody.style.backgroundImage = "";
        terminalWindowBody.style.backgroundSize = "";
        terminalWindowBody.style.backgroundPosition = "";
      }
      chatViewport.style.height = "";
      chatViewport.style.maxHeight = "";
      chatViewport.style.flex = "";
      chatViewport.style.overflow = "";
      messageList.style.transform = "";
      chatViewport.scrollTop = originalScrollTop;

      if (exportWatermarkEl && exportWatermarkEl.parentNode) {
        exportWatermarkEl.parentNode.removeChild(exportWatermarkEl);
        exportWatermarkEl = null;
      }

      if (btnExportPng) btnExportPng.disabled = false;
      if (exportBtnText) exportBtnText.textContent = originalBtnText;
    }
  }

  // particle field

  function initLiveClock() {
    if (!terminalClock) return;
    function update() {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      terminalClock.textContent = `SYS TIME // ${hh}:${mm}:${ss}`;
    }
    update();
    setInterval(update, 1000);
  }

  function initParticleField() {
    const canvas = document.getElementById("field");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, particles = [];
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function initParticles() {
      particles = [];
      const count = Math.min(90, Math.floor((w * h) / 13000));
      const colors = ["155,109,255", "79,195,255", "255,110,199"];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.4 + 0.3,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          c: colors[Math.floor(Math.random() * colors.length)],
          tw: Math.random() * Math.PI * 2,
        });
      }
    }
    initParticles();

    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.02;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        const alpha = 0.3 + Math.sin(p.tw) * 0.2;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c},${Math.max(0.08, alpha)})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  // scenario JSON backup (SAVE & LOAD)
  function saveTerminalScenarioAsJson() {
    syncStateToActiveChannel();
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;
    const filename = `RWX-Terminal-Scenario-${dateStr}.json`;

    const exportData = {
      app: "RWX Baker",
      mode: "terminal",
      version: "1.0",
      savedAt: now.toISOString(),
      activeUser: state.activeUser,
      activeTerminalChannelId: activeTerminalChannelId,
      terminalChannels: terminalChannels
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function loadTerminalScenarioFromJson(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data) {
          alert("Invalid JSON file.");
          return;
        }

        // Cross-mode guard: if file was created in Tablet mode
        if (data.mode === "tablet" || (!Array.isArray(data.terminalChannels) && Array.isArray(data.messages))) {
          alert("This JSON file was created in Tablet mode.\nPlease use Tablet mode to load single-conversation backups.");
          return;
        }

        if (!Array.isArray(data.terminalChannels) || data.terminalChannels.length === 0) {
          alert("Invalid RWX Terminal JSON: 'terminalChannels' array not found or empty.");
          return;
        }

        terminalChannels = data.terminalChannels;
        if (data.activeUser && (data.activeUser === "endminf" || data.activeUser === "endminm")) {
          state.activeUser = data.activeUser;
        }

        const targetChannelId = data.activeTerminalChannelId && terminalChannels.some((c) => c.id === data.activeTerminalChannelId)
          ? data.activeTerminalChannelId
          : terminalChannels[0].id;

        selectTerminalChannel(targetChannelId);
        renderTerminalChannels();
        savePersistentState();
        scrollToBottom();

      } catch (err) {
        console.error("Failed to parse Terminal JSON file:", err);
        alert("Failed to load JSON file. Please ensure it is a valid RWX Terminal scenario backup.");
      }
    };
    reader.readAsText(file);
  }

  // init

  function init() {
    loadPersistentState();
    renderTerminalChannels();
    renderConversation();
    renderChoices();
    updateHeader();
    updateSenderIndicator();
    updateUserButtons();
    updateControlCharDisplay();
    updateActiveSpeakerCards();
    renderSquadRoster();
    setupEventListeners();
    initWatermark();
    initLiveClock();
    initParticleField();
  }

  init();
});
