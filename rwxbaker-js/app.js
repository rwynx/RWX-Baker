/* baker sns editor */

document.addEventListener("DOMContentLoaded", () => {

  const tutorial = window.RWX_TUTORIAL_TEMPLATE || null;
  const CURRENT_TUTORIAL_VERSION = "20261008_v3";

  const state = {
    activeUser: "endminf",
    activeCharacterId: null,
    contextSender: "incoming", 
    conversationMode: "direct",
    groupParticipantIds: [], 
    groupName: "",
    contextType: "text", // "text", "image", "reaction"
    uploadedImageBase64: null,
    selectedMessageId: null,
    messages: [],
    choices: [],
    exportMode: "screen",
  };

  // chat catalog mappedfrom extracted op and npc assets 
  const CHARACTERS = {
    // operators
    typhoeus: { id: "typhoeus", name: "Typhoeus", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0034_typhoea.png", isNpc: false },
    pelica: { id: "pelica", name: "Perlica", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0004_pelica.png", isNpc: false },
    chen: { id: "chen", name: "Chen Qianyu", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0005_chen.png", isNpc: false },
    wolfgard: { id: "wolfgard", name: "Wulfgard", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0006_wolfgd.png", isNpc: false },
    ikut: { id: "ikut", name: "Arclight", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0007_ikut.png", isNpc: false },
    azrila: { id: "azrila", name: "Ember", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0009_azrila.png", isNpc: false },
    seraph: { id: "seraph", name: "Xaihi", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0011_seraph.png", isNpc: false },
    avywenna: { id: "avywenna", name: "Avywenna", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0012_avywen.png", isNpc: false },
    angelina: { id: "angelina", name: "Gilberta", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0013_aglina.png", isNpc: false },
    aurora: { id: "aurora", name: "Aurora", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0014_aurora.png", isNpc: false },
    lifeng: { id: "lifeng", name: "Li Feng", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0015_lifeng.png", isNpc: false },
    laevatain: { id: "laevatain", name: "Laevatain", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0016_laevat.png", isNpc: false },
    yvonne: { id: "yvonne", name: "Yvonne", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0017_yvonne.png", isNpc: false },
    dapan: { id: "dapan", name: "Da Pan", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0018_dapan.png", isNpc: false },
    karin: { id: "karin", name: "Akekuri", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0019_karin.png", isNpc: false },
    meurs: { id: "meurs", name: "Catcher", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0020_meurs.png", isNpc: false },
    whiten: { id: "whiten", name: "Estella", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0021_whiten.png", isNpc: false },
    boundary: { id: "boundary", name: "Fluorite", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0022_bounda.png", isNpc: false },
    antal: { id: "antal", name: "Antal", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0023_antal.png", isNpc: false },
    deepfin: { id: "deepfin", name: "Alesh", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0024_deepfin.png", isNpc: false },
    ardelia: { id: "ardelia", name: "Ardelia", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0025_ardelia.png", isNpc: false },
    lastrite: { id: "lastrite", name: "Last Rite", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0026_lastrite.png", isNpc: false },
    tangtang: { id: "tangtang", name: "Tangtang", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0027_tangtang.png", isNpc: false },
    wulfa: { id: "wulfa", name: "Rossi", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0028_wulfa.png", isNpc: false },
    pograni: { id: "pograni", name: "Pogranichnik", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0029_pograni.png", isNpc: false },
    zhuangfy: { id: "zhuangfy", name: "Zhuang Fangyi", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0030_zhuangfy.png", isNpc: false },
    mifu: { id: "mifu", name: "Mi Fu", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0031_mifu.png", isNpc: false },
    lizhiyan: { id: "lizhiyan", name: "Arcane", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0032_lizhiyan.png", isNpc: false },
    camille: { id: "camille", name: "Camille", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0033_camille.png", isNpc: false },
    liino: { id: "liino", name: "Liino", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0035_liino.png", isNpc: false },
    purrche: { id: "purrche", name: "Purrche", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0038_purrche.png", isNpc: false },

    // NPCs
    npc_ailaizha: { id: "npc_ailaizha", name: "Eliza", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_ailaizha_01.png", isNpc: true },
    npc_aliya: { id: "npc_aliya", name: "Aliya", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_aliya_01.png", isNpc: true },
    npc_andrew: { id: "npc_andrew", name: "Andrew", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_andrew_01.png", isNpc: true },
    npc_angelu: { id: "npc_angelu", name: "Angelu", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_angelu_01.png", isNpc: true },
    npc_buyuan: { id: "npc_buyuan", name: "Buyuan", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_buyuan_01.png", isNpc: true },
    npc_dannier: { id: "npc_dannier", name: "Dannier", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_dannier_01.png", isNpc: true },
    npc_fabian: { id: "npc_fabian", name: "Fabian", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_fabian_01.png", isNpc: true },
    npc_geyipu: { id: "npc_geyipu", name: "Geyipu", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_geyipu_01.png", isNpc: true },
    npc_hanfang: { id: "npc_hanfang", name: "Hanfang", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_hanfang_01.png", isNpc: true },
    npc_hansi: { id: "npc_hansi", name: "Hansi", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_hansi_01.png", isNpc: true },
    npc_hateman: { id: "npc_hateman", name: "Hateman", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_hateman_01.png", isNpc: true },
    npc_helao: { id: "npc_helao", name: "Helao", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_helao_01.png", isNpc: true },
    npc_hongbo: { id: "npc_hongbo", name: "Hongbo", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_hongbo_01.png", isNpc: true },
    npc_kelao: { id: "npc_kelao", name: "Kelao", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_kelao_01.png", isNpc: true },
    npc_lakuier: { id: "npc_lakuier", name: "Lakuier", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_lakuier_01.png", isNpc: true },
    npc_lameng: { id: "npc_lameng", name: "Lameng", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_lameng_01.png", isNpc: true },
    npc_liushuyun: { id: "npc_liushuyun", name: "Liu Shuyun", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_liushuyun_01.png", isNpc: true },
    npc_luoman: { id: "npc_luoman", name: "Luoman", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_luoman_01.png", isNpc: true },
    npc_madina: { id: "npc_madina", name: "Madina", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_madina_01.png", isNpc: true },
    npc_muhui: { id: "npc_muhui", name: "Muhui", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_muhui_01.png", isNpc: true },
    npc_nufuman: { id: "npc_nufuman", name: "Nufuman", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_nufuman_01.png", isNpc: true },
    npc_qinjc: { id: "npc_qinjc", name: "Qin Jingcheng", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_qinjc_01.png", isNpc: true },
    npc_shenjiaoe: { id: "npc_shenjiaoe", name: "Shenjiaoe", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_shenjiaoe_01.png", isNpc: true },
    npc_fiona: { id: "npc_fiona", name: "Fiona", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_spl_fiona_01.png", isNpc: true },
    npc_suosi: { id: "npc_suosi", name: "Suosi", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_suosi_01.png", isNpc: true },
    npc_swordmaster: { id: "npc_swordmaster", name: "Swordmaster", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_swordmaster_01.png", isNpc: true },
    npc_weixidong: { id: "npc_weixidong", name: "Wei Xidong", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_weixidong_01.png", isNpc: true },
    npc_wuduanxue: { id: "npc_wuduanxue", name: "Wu Duanxue", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_wuduanxue_01.png", isNpc: true },
    npc_xiaona: { id: "npc_xiaona", name: "Xiaona", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_xiaona_01.png", isNpc: true },
    npc_yalishanda: { id: "npc_yalishanda", name: "Alexander", avatar: "rwxbaker-assets/avatars/npc/icon_sns_npc_yalishanda_01.png", isNpc: true },
  };

  const USERS = {
    endminf: { id: "endminf", name: "Endmin (F)", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0003_endminf.png" },
    endminm: { id: "endminm", name: "Endmin (M)", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0002_endminm.png" },
  };

  // game stickers, excluding the separate skland sticker set
  const stickerAssetRoot = "rwxbaker-assets/stickers/";
  const STICKERS = [
    "sns_sticker.png",
    "sns_sticker2.png",
    "sns_sticker3.png",
    "sns_sticker4.png",
    ...Array.from({ length: 14 }, (_, i) => `sns_sticker_${String(i + 1).padStart(3, "0")}.png`),
    ...[16, 18, 20, 16, 16, 16, 16, 16, 16].flatMap((count, groupIndex) => {
      const group = String(groupIndex + 1).padStart(2, "0");
      return Array.from({ length: count }, (_, i) => {
        const sticker = String(i + 1).padStart(2, "0");
        return `sns_sticker_${group}_${sticker}.png`;
      });
    }),
  ].map((filename) => stickerAssetRoot + filename);

  // Game Emoji Assets (sns_emoji_001.png to sns_emoji_038.png)
  const GAME_EMOJIS = Array.from({ length: 38 }, (_, i) => {
    const num = String(i + 1).padStart(3, "0");
    return `rwxbaker-assets/emoji/sns_emoji_${num}.png`;
  });

  // dom Elements
  const messageList = document.getElementById("message-list");
  const chatViewport = document.getElementById("chat-viewport");
  const chatHeaderName = document.getElementById("chat-header-name");
  const terminalChatHeaderName = document.getElementById("terminal-chat-header-name");
  const messageInput = document.getElementById("message-input");
  const btnSend = document.getElementById("btn-send");

  // mobile drawer toggle
  const btnToggleEditor = document.getElementById("btn-toggle-editor");
  const editorPanel = document.getElementById("editor-panel");
  const appContainer = document.getElementById("app-container");
  const viewModeButtons = document.querySelectorAll(".view-mode-btn");
  const decoToggleButtons = document.querySelectorAll(".deco-toggle-btn");
  const phoneFrame = document.getElementById("phone-frame");
  const exportModeButtons = document.querySelectorAll(".export-mode-btn");
  const btnExportPng = document.getElementById("btn-export-png");
  const exportBtnText = document.getElementById("export-btn-text");

  const btnSaveJson = document.getElementById("btn-save-json");
  const btnLoadJson = document.getElementById("btn-load-json");
  const inputLoadJson = document.getElementById("input-load-json");
  const jsonDropOverlay = document.getElementById("json-drop-overlay");

  const userSwitcher = document.getElementById("user-switcher");

  const characterListEl = document.getElementById("character-list");
  const characterSearchInput = document.getElementById("character-search-input");


  const contextPanelSection = document.getElementById("context-panel-section");
  const contextSectionTitle = document.getElementById("context-section-title");
  const contextSectionInstruction = document.getElementById("context-section-instruction");
  const btnSenderChar = document.getElementById("btn-context-sender-char");
  const btnSenderUser = document.getElementById("btn-context-sender-user");
  const btnConversationDirect = document.getElementById("btn-conversation-direct");
  const btnConversationGroup = document.getElementById("btn-conversation-group");
  const groupParticipants = document.getElementById("group-participants");
  const groupNameInput = document.getElementById("group-name-input");
  const groupParticipantList = document.getElementById("group-participant-list");
  const contextTypeTabs = document.querySelectorAll(".type-tab");

  const formText = document.getElementById("context-form-text");
  const formImage = document.getElementById("context-form-image");
  const formReaction = document.getElementById("context-form-reaction");
  const formChoices = document.getElementById("context-form-choices");

  const contextTextInput = document.getElementById("context-text-input");
  const btnContextSendText = document.getElementById("btn-context-send-text");

  const contextImageFile = document.getElementById("context-image-file");
  const imagePreviewContainer = document.getElementById("context-image-preview-container");
  const imagePreview = document.getElementById("context-image-preview");
  const btnRemoveImagePreview = document.getElementById("btn-remove-image-preview");
  const btnContextSendImage = document.getElementById("btn-context-send-image");
  const choiceInputOne = document.getElementById("choice-input-one");
  const choiceInputTwo = document.getElementById("choice-input-two");
  const btnContextAddChoices = document.getElementById("btn-context-add-choices");
  const btnContextRemoveChoices = document.getElementById("btn-context-remove-choices");
  const choiceContainer = document.getElementById("choice-container");
  const contextEmojiPicker = document.getElementById("context-emoji-picker");
  const btnCloseContextEmoji = document.getElementById("btn-close-context-emoji");
  const contextEmojiButtons = document.querySelectorAll(".context-emoji-btn");
  let contextEmojiTarget = null;
  let contextEmojiSelectionStart = 0;
  let contextEmojiSelectionEnd = 0;

  function closeContextEmojiPicker() {
    if (contextEmojiPicker) {
      contextEmojiPicker.classList.add("hidden");
    }
  }

  const btnContextOpenStickers = document.getElementById("btn-context-open-stickers");
  const contextStickerPicker = document.getElementById("context-sticker-picker");
  const btnCloseContextSticker = document.getElementById("btn-close-context-sticker");
  const contextStickerGrid = document.getElementById("context-sticker-grid");

  function closeContextStickerPicker() {
    if (contextStickerPicker) {
      contextStickerPicker.classList.add("hidden");
    }
  }

  const reactionTargetSelect = document.getElementById("reaction-target-select");
  const existingReactionsSection = document.getElementById("existing-reactions-section");
  const existingReactionsList = document.getElementById("existing-reactions-list");
  const reactionEmojiPickerGrid = document.getElementById("reaction-emoji-picker-grid");
  const reactionEmojiSelectedPath = document.getElementById("reaction-emoji-selected-path");
  const btnContextAddReaction = document.getElementById("btn-context-add-reaction");

  const contextEditActions = document.getElementById("context-edit-actions");
  const btnContextUpdate = document.getElementById("btn-context-update");
  const btnContextDelete = document.getElementById("btn-context-delete");
  const btnContextCancel = document.getElementById("btn-context-cancel");

  const layersListEl = document.getElementById("layers-list");
  const btnClearConversation = document.getElementById("btn-clear-conversation");

  const btnEmoticon = document.getElementById("btn-emoticon");
  const stickerPanel = document.getElementById("sticker-panel");
  const stickerGrid = document.getElementById("sticker-grid");
  const btnCloseStickers = document.getElementById("btn-close-stickers");

  const btnEmoji = document.getElementById("btn-emoji");
  const emojiPickerPanel = document.getElementById("emoji-picker-panel");
  const emojiGrid = document.getElementById("emoji-grid");
  const btnCloseEmojiPicker = document.getElementById("btn-close-emoji-picker");

  let activeFocusedInput = messageInput;

  [messageInput, contextTextInput].forEach((inputEl) => {
    if (inputEl) {
      inputEl.addEventListener("focus", () => {
        activeFocusedInput = inputEl;
      });
    }
  });

    // init & characters

  function init() {
    let tutorialCleared = false;
    try {
      const installedTutorialVersion = localStorage.getItem("rwx_tutorial_version");
      if (installedTutorialVersion !== CURRENT_TUTORIAL_VERSION && window.RWX_TUTORIAL_TEMPLATE) {
        localStorage.setItem("rwx_tutorial_version", CURRENT_TUTORIAL_VERSION);
        localStorage.removeItem("rwx_tutorial_cleared");
        loadTutorialTemplate();
        setupEventListeners();
        setupTransmissionModal();
        initParticleField();
        initWatermark();
        updateUI();
        return;
      }

      tutorialCleared = localStorage.getItem("rwx_tutorial_cleared") === "true";
      const savedDeco = localStorage.getItem("rwx_chat_deco");
      setDecoVisibility(savedDeco === "on");
      const savedViewMode = localStorage.getItem("rwx_view_mode");
      if (savedViewMode && ["tablet", "phone"].includes(savedViewMode)) {
        setViewMode(savedViewMode);
      } else {
        setViewMode("tablet");
      }
    } catch (e) {}

    const hasPersistent = loadPersistentConversation();

    renderCharacterList();
    renderStickerPicker();
    renderEmojiPicker();
    renderChoices();
    renderContextEmojiPicker();
    renderContextStickerPicker();
    renderReactionEmojiGrid();
    setupEventListeners();
    setupTransmissionModal();
    initParticleField();

    if (hasPersistent && state.messages.length > 0) {
      if (state.conversationMode === "group") {
        if (contextPanelSection) contextPanelSection.classList.add("group-mode-active");
        if (btnConversationDirect) btnConversationDirect.classList.remove("active");
        if (btnConversationGroup) btnConversationGroup.classList.add("active");
      }
      if (groupNameInput) {
        groupNameInput.value = state.groupName || "";
      }
      renderGroupParticipants();
      renderCharacterList();
      renderConversation();
      renderChoices();
    } else if (!tutorialCleared && window.RWX_TUTORIAL_TEMPLATE) {
      loadTutorialTemplate();
      if (btnClearConversation) {
        btnClearConversation.classList.add("highlight-pulse");
      }
    } else {
      renderGroupParticipants();
      renderCharacterList();
      renderConversation();
      renderChoices();
    }

    initWatermark();
    updateUI();
  }

  // anti-temper guard (do not fucking remove this)
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

    //  anti-temper guard for live temper & inspect (do not fucking remove this)
    if (window.MutationObserver && phoneFrame) {
      const observer = new MutationObserver(() => {
        let currentStamp = document.getElementById("live-watermark-stamp");
        if (!currentStamp && phoneFrame) {
          currentStamp = document.createElement("img");
          currentStamp.id = "live-watermark-stamp";
          currentStamp.className = "rwx-export-watermark";
          currentStamp.src = activeWatermarkSrc;
          currentStamp.alt = "RWX // BKR";
          currentStamp.setAttribute("aria-hidden", "true");
          phoneFrame.insertBefore(currentStamp, phoneFrame.firstChild);
        } else if (currentStamp) {
          if (currentStamp.style.display === "none") currentStamp.style.display = "";
          if (currentStamp.style.visibility === "hidden") currentStamp.style.visibility = "";
          if (currentStamp.style.opacity === "0") currentStamp.style.opacity = "";
        }
      });
      observer.observe(phoneFrame, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class"] });
    }
  }

  function renderCharacterList(filterText = "") {
    characterListEl.innerHTML = "";
    const lowerFilter = filterText.toLowerCase().trim();

    Object.values(CHARACTERS).forEach((char) => {
      const displayName = char.isNpc ? `[NPC] ${char.name}` : char.name;

      if (lowerFilter && !displayName.toLowerCase().includes(lowerFilter)) {
        return;
      }

      const item = document.createElement("div");
      item.classList.add("character-item");
      const isInGroup = state.conversationMode === "group" && state.groupParticipantIds.includes(char.id);
      if (char.id === state.activeCharacterId || isInGroup) {
        item.classList.add("active");
      }

      item.innerHTML = `
        <div class="char-info">
          <div class="char-avatar-frame">
            <img class="char-avatar-img" src="${char.avatar}" alt="${char.name}">
          </div>
          <span class="char-name">${displayName}</span>
        </div>
        ${(char.id === state.activeCharacterId || isInGroup) ? '<span class="active-badge">Active</span>' : ''}
      `;

      item.addEventListener("click", () => {
        if (state.conversationMode === "group") {
          const participantIndex = state.groupParticipantIds.indexOf(char.id);
          if (participantIndex >= 0) {
            state.groupParticipantIds.splice(participantIndex, 1);
            if (state.activeCharacterId === char.id) {
              state.activeCharacterId = state.groupParticipantIds.length > 0 ? state.groupParticipantIds[0] : null;
            }
          } else {
            state.groupParticipantIds.push(char.id);
            state.activeCharacterId = char.id;
          }
          renderGroupParticipants();
        } else {
          state.activeCharacterId = char.id;
        }
        renderCharacterList(filterText);
        updateUI();
      });

      characterListEl.appendChild(item);
    });
  }

  function isGroupConversation() {
    const uniqueCharIds = new Set(
      state.messages
        .filter((m) => m.sender === "incoming" && m.characterId)
        .map((m) => m.characterId)
    );
    return uniqueCharIds.size > 1;
  }

  function updateUI() {
    const currentChar = state.activeCharacterId ? CHARACTERS[state.activeCharacterId] : null;

    if (state.conversationMode === "group") {
      if (state.groupName && state.groupName.trim()) {
        chatHeaderName.textContent = state.groupName.trim();
      } else {
        const names = state.groupParticipantIds.map((id) => CHARACTERS[id]?.name).filter(Boolean);
        chatHeaderName.textContent = names.length ? names.join(" & ") : "Select group participants...";
      }
    } else {
      chatHeaderName.textContent = currentChar ? currentChar.name : "Select character...";
    }

    if (terminalChatHeaderName) {
      terminalChatHeaderName.textContent = chatHeaderName.textContent;
    }

    const userBtns = userSwitcher.querySelectorAll(".user-btn");
    userBtns.forEach((btn) => {
      if (btn.dataset.user === state.activeUser) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    renderConversation();
    renderLayersList();
    renderChoices();
    updateReactionTargetSelect();
    if (appContainer && appContainer.classList.contains("terminal-mode")) {
      renderTerminalChannels();
    }
  }

    // drag and drop

  let draggedMessageId = null;

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
    updateUI();
  }

  function clearDropIndicators() {
    document.querySelectorAll(".drop-above, .drop-below").forEach((node) => {
      node.classList.remove("drop-above", "drop-below");
    });
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

  function attachRowDragListeners(rowEl, rowMsgIds) {
    if (!rowMsgIds || rowMsgIds.length === 0) return;

    rowEl.addEventListener("dragover", (e) => {
      if (!draggedMessageId) return;
      if (e.target.closest(".message-item")) return;

      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = "move";

      const rect = rowEl.getBoundingClientRect();
      const isTop = (e.clientY - rect.top) < (rect.height / 2);

      clearDropIndicators();
      if (isTop) {
        rowEl.classList.add("drop-above");
      } else {
        rowEl.classList.add("drop-below");
      }
    });

    rowEl.addEventListener("dragleave", (e) => {
      if (!rowEl.contains(e.relatedTarget)) {
        rowEl.classList.remove("drop-above", "drop-below");
      }
    });

    rowEl.addEventListener("drop", (e) => {
      if (!draggedMessageId) return;
      if (e.target.closest(".message-item")) return;

      e.preventDefault();
      e.stopPropagation();
      const sourceId = draggedMessageId || e.dataTransfer.getData("text/plain");
      const rect = rowEl.getBoundingClientRect();
      const isTop = (e.clientY - rect.top) < (rect.height / 2);
      clearDropIndicators();

      if (sourceId) {
        if (isTop) {
          const firstId = rowMsgIds[0];
          if (firstId && firstId !== sourceId) {
            reorderMessage(sourceId, firstId, true);
          }
        } else {
          const lastId = rowMsgIds[rowMsgIds.length - 1];
          if (lastId && lastId !== sourceId) {
            reorderMessage(sourceId, lastId, false);
          }
        }
      }
    });
  }

    // message rendering

  function renderConversation() {
    messageList.innerHTML = "";

    if (state.messages.length === 0) {
      const emptyPrompt = document.createElement("div");
      emptyPrompt.className = "empty-conversation-prompt";
      emptyPrompt.textContent = "Select a character or make a group chat to begin...";
      messageList.appendChild(emptyPrompt);
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
          const rowMsgIds = Array.from(currentGroup.querySelectorAll(".message-item")).map((el) => el.dataset.id);
          attachRowDragListeners(currentGroup, rowMsgIds);
          messageList.appendChild(currentGroup);
        }

        currentGroup = document.createElement("div");
        currentGroup.classList.add("message-row", msg.sender);

        const avatarCol = document.createElement("div");
        avatarCol.classList.add("avatar-container");
        const avatarFrame = document.createElement("div");
        avatarFrame.classList.add("avatar-frame");
        const img = document.createElement("img");
        img.classList.add("avatar-image");

        if (msg.sender === "incoming") {
          const charObj = CHARACTERS[msg.characterId];
          if (charObj) {
            img.src = charObj.avatar;
            img.alt = charObj.name;
          }
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
        groupContent.classList.add("message-group");

        if (msg.sender === "incoming" && isGroupConversation()) {
          const charObj = CHARACTERS[msg.characterId];
          if (charObj) {
            const nameLabel = document.createElement("span");
            nameLabel.classList.add("group-sender-name");
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
      msgItem.dataset.id = msg.id;
      msgItem.classList.add("message-item");

      if (msg.id === state.selectedMessageId) {
        msgItem.classList.add("selected");
      }

      msgItem.addEventListener("click", (e) => {
        e.stopPropagation();
        selectMessageForEdit(msg.id);
      });

      attachMessageDragListeners(msgItem, msg.id);

      if (msg.type === "image") {
        const imgCard = document.createElement("div");
        imgCard.classList.add("message-image-card");

        const targetWidth = msg.imageWidth || 260;
        imgCard.style.width = `${targetWidth}px`;
        imgCard.style.maxWidth = `${targetWidth}px`;

        const img = document.createElement("img");
        img.src = msg.imageSrc;
        img.alt = "Image Attachment";
        imgCard.appendChild(img);

        const resizeHandle = document.createElement("div");
        resizeHandle.classList.add("image-resize-handle");
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
          }

          document.addEventListener("touchmove", onTouchMove, { passive: false });
          document.addEventListener("touchend", onTouchEnd);
        }, { passive: true });

        imgCard.appendChild(resizeHandle);
        msgItem.appendChild(imgCard);
      } else if (msg.type === "sticker") {
        const stkCard = document.createElement("div");
        stkCard.classList.add("message-sticker-card");
        const img = document.createElement("img");
        img.src = msg.imageSrc;
        img.alt = "Sticker";
        stkCard.appendChild(img);
        msgItem.appendChild(stkCard);
      } else {
        const bubble = document.createElement("div");
        bubble.classList.add("message-bubble");

        const isFirstInGroup = groupContent.children.length === 0;
        if (isFirstInGroup) {
          bubble.classList.add("has-tail");
        } else {
          bubble.classList.add("no-tail");
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
      const rowMsgIds = Array.from(currentGroup.querySelectorAll(".message-item")).map((el) => el.dataset.id);
      attachRowDragListeners(currentGroup, rowMsgIds);
      messageList.appendChild(currentGroup);
    }

    scrollToBottom();
    savePersistentConversation();
  }

    // layers & edit

  function renderLayersList() {
    layersListEl.innerHTML = "";

    if (state.messages.length === 0) {
      layersListEl.innerHTML = '<div class="empty-layers-msg">No messages in conversation.</div>';
      return;
    }

    state.messages.forEach((msg, idx) => {
      const item = document.createElement("div");
      item.classList.add("layer-item");
      if (msg.id === state.selectedMessageId) {
        item.classList.add("selected");
      }

      let senderTag;
      if (msg.sender === "incoming") {
        const charObj = CHARACTERS[msg.characterId];
        senderTag = charObj ? charObj.name : "Char";
      } else {
        senderTag = "User";
      }
      const summaryText = msg.text || (msg.type === "image" ? "[Image]" : "[Sticker]");
      const content = document.createElement("span");
      content.classList.add("layer-item-content");
      content.appendChild(document.createTextNode(`#${idx + 1} [${senderTag}] `));
      const summary = document.createElement("span");
      renderMessageContentWithEmojis(summary, summaryText);
      content.appendChild(summary);

      const grip = document.createElement("span");
      grip.classList.add("layer-drag-handle");
      grip.title = "Drag to reorder";
      grip.textContent = "⋮⋮";

      const typeTag = document.createElement("span");
      typeTag.classList.add("layer-item-tag");
      typeTag.textContent = msg.type;

      item.appendChild(grip);
      item.appendChild(content);
      item.appendChild(typeTag);

      item.addEventListener("click", () => {
        selectMessageForEdit(msg.id);
      });

      attachMessageDragListeners(item, msg.id);

      layersListEl.appendChild(item);
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
    renderLayersList();
  }

  function updateContextActionsVisibility() {
    const isEditing = Boolean(state.selectedMessageId);

    btnContextSendText.classList.add("hidden");
    if (btnContextOpenStickers) btnContextOpenStickers.classList.add("hidden");
    btnContextSendImage.classList.add("hidden");
    btnContextAddReaction.classList.add("hidden");
    btnContextAddChoices.classList.add("hidden");
    btnContextRemoveChoices.classList.add("hidden");
    contextEditActions.classList.add("hidden");

    if (isEditing) {
      closeContextStickerPicker();
      closeContextEmojiPicker();
    }

    if (state.contextType === "reaction") {
      btnContextAddReaction.classList.remove("hidden");
      if (isEditing) {
        contextSectionTitle.textContent = "MESSAGE REACTION";
        if (contextSectionInstruction) {
          contextSectionInstruction.textContent = "• add or remove reactions on target";
          contextSectionInstruction.classList.remove("hidden");
        }
      } else {
        contextSectionTitle.textContent = "COMPOSE CONTEXT";
        if (contextSectionInstruction) {
          contextSectionInstruction.classList.add("hidden");
        }
      }
    } else if (state.contextType === "choices") {
      btnContextAddChoices.classList.remove("hidden");
      btnContextRemoveChoices.classList.remove("hidden");
      if (isEditing) {
        contextSectionTitle.textContent = "QUICK CHOICES";
        if (contextSectionInstruction) {
          contextSectionInstruction.textContent = "• set branching dialogue choices";
          contextSectionInstruction.classList.remove("hidden");
        }
      } else {
        contextSectionTitle.textContent = "COMPOSE CONTEXT";
        if (contextSectionInstruction) {
          contextSectionInstruction.classList.add("hidden");
        }
      }
    } else if (isEditing) {
      contextSectionTitle.textContent = "EDIT MESSAGE";
      if (contextSectionInstruction) {
        contextSectionInstruction.textContent = "• update or cancel to leave edit mode";
        contextSectionInstruction.classList.remove("hidden");
      }
      contextEditActions.classList.remove("hidden");
    } else {
      contextSectionTitle.textContent = "COMPOSE CONTEXT";
      if (contextSectionInstruction) {
        contextSectionInstruction.classList.add("hidden");
      }
      if (state.contextType === "text") {
        btnContextSendText.classList.remove("hidden");
        if (btnContextOpenStickers) btnContextOpenStickers.classList.remove("hidden");
      } else if (state.contextType === "image") {
        btnContextSendImage.classList.remove("hidden");
      }
    }
  }

  function enterEditMode(msg) {
    contextSectionTitle.classList.remove("neon-flash");
    void contextSectionTitle.offsetWidth; // trigger reflow
    contextSectionTitle.classList.add("neon-flash");

    state.contextSender = msg.sender;
    if (msg.sender === "incoming") {
      btnSenderChar.classList.add("active");
      btnSenderUser.classList.remove("active");
      if (msg.characterId) {
        state.activeCharacterId = msg.characterId;
        renderCharacterList();
      }
    } else {
      btnSenderUser.classList.add("active");
      btnSenderChar.classList.remove("active");
    }

    state.contextType = msg.type || "text";
    contextTypeTabs.forEach((tab) => {
      if (tab.dataset.type === state.contextType) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    formText.classList.add("hidden");
    formImage.classList.add("hidden");
    formReaction.classList.add("hidden");
    formChoices.classList.add("hidden");

    if (state.contextType === "text") {
      formText.classList.remove("hidden");
      setInputValueFromStructuredText(contextTextInput, msg.text || "");
    } else if (state.contextType === "image") {
      formImage.classList.remove("hidden");
      if (msg.imageSrc) {
        state.uploadedImageBase64 = msg.imageSrc;
        imagePreview.src = msg.imageSrc;
        imagePreviewContainer.classList.remove("hidden");
        btnContextSendImage.disabled = false;
      }
    } else if (state.contextType === "reaction") {
      formReaction.classList.remove("hidden");
    } else if (state.contextType === "choices") {
      formChoices.classList.remove("hidden");
    }

    updateContextActionsVisibility();
    updateReactionTargetSelect();
  }

  function exitEditMode() {
    state.selectedMessageId = null;

    contextSectionTitle.classList.remove("neon-flash");
    void contextSectionTitle.offsetWidth; // trigger reflow
    contextSectionTitle.classList.add("neon-flash");

    updateContextActionsVisibility();

    setInputValueFromStructuredText(contextTextInput, "");
    setInputValueFromStructuredText(messageInput, "");
    btnRemoveImagePreview.click();

    renderConversation();
    renderLayersList();
    updateReactionTargetSelect();
  }

  function updateReactionTargetSelect() {
    reactionTargetSelect.innerHTML = '<option value="">-- Select a Message --</option>';
    state.messages.forEach((msg, idx) => {
      const opt = document.createElement("option");
      opt.value = msg.id;
      const snippet = msg.text ? msg.text.slice(0, 20) : `[${msg.type}]`;
      opt.textContent = `#${idx + 1}: ${snippet}`;
      if (msg.id === state.selectedMessageId) {
        opt.selected = true;
      }
      reactionTargetSelect.appendChild(opt);
    });

    renderExistingReactionsForTarget();
  }

  function renderExistingReactionsForTarget() {
    if (!existingReactionsSection || !existingReactionsList) return;
    const targetId = reactionTargetSelect.value || state.selectedMessageId;
    const targetMsg = state.messages.find((m) => m.id === targetId);

    if (targetMsg && targetMsg.reactions && targetMsg.reactions.length > 0) {
      existingReactionsSection.classList.remove("hidden");
      existingReactionsList.innerHTML = "";

      targetMsg.reactions.forEach((r, idx) => {
        const item = document.createElement("div");
        item.classList.add("existing-reaction-item");

        if (r.emojiSrc) {
          const img = document.createElement("img");
          img.src = r.emojiSrc;
          img.alt = "Reaction";
          img.classList.add("existing-reaction-img");
          item.appendChild(img);
        } else if (r.emoji) {
          const span = document.createElement("span");
          span.textContent = r.emoji;
          item.appendChild(span);
        }

        if (r.count > 1) {
          const countSpan = document.createElement("span");
          countSpan.classList.add("existing-reaction-count");
          countSpan.textContent = `x${r.count}`;
          item.appendChild(countSpan);
        }

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.classList.add("remove-reaction-btn");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
          targetMsg.reactions.splice(idx, 1);
          updateUI();
        });

        item.appendChild(removeBtn);
        existingReactionsList.appendChild(item);
      });
    } else {
      existingReactionsSection.classList.add("hidden");
      existingReactionsList.innerHTML = "";
    }
  }

    // event handlers

  function setupEventListeners() {
    btnConversationDirect.addEventListener("click", () => {
      closeContextEmojiPicker();
      closeContextStickerPicker();
      state.conversationMode = "direct";
      contextPanelSection.classList.remove("group-mode-active");
      btnConversationDirect.classList.add("active");
      btnConversationGroup.classList.remove("active");
      groupParticipants.classList.add("hidden");
      renderCharacterList();
      updateUI();
    });

    btnConversationGroup.addEventListener("click", () => {
      closeContextEmojiPicker();
      closeContextStickerPicker();
      state.conversationMode = "group";
      contextPanelSection.classList.add("group-mode-active");
      if (state.activeCharacterId && !state.groupParticipantIds.includes(state.activeCharacterId)) {
        state.groupParticipantIds.push(state.activeCharacterId);
      }
      btnConversationGroup.classList.add("active");
      btnConversationDirect.classList.remove("active");
      groupParticipants.classList.remove("hidden");
      renderGroupParticipants();
      renderCharacterList();
      updateUI();
    });

    viewModeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setViewMode(button.dataset.viewMode);
      });
    });

    const btnLaunchTerminal = document.getElementById("btn-launch-terminal");
    if (btnLaunchTerminal) {
      btnLaunchTerminal.addEventListener("click", () => {
        savePersistentConversation();
        window.location.href = "terminal.html";
      });
    }

    const announceBanner = document.getElementById("terminal-announce-banner");
    const bannerCta = document.getElementById("terminal-banner-cta");
    const btnDismissBanner = document.getElementById("btn-dismiss-terminal-banner");

    if (announceBanner) {
      try {
        const isDismissed = localStorage.getItem("rwx_terminal_banner_dismissed") === "true";
        if (!isDismissed) {
          announceBanner.classList.remove("hidden");
        }
      } catch (_) {
        announceBanner.classList.remove("hidden");
      }

      // Whole banner is clickable to launch Terminal Mode
      announceBanner.addEventListener("click", (e) => {
        if (e.target.closest("#btn-dismiss-terminal-banner")) return;
        e.preventDefault();
        savePersistentConversation();
        window.location.href = "terminal.html";
      });

      if (btnDismissBanner) {
        btnDismissBanner.addEventListener("click", (e) => {
          e.stopPropagation();
          announceBanner.classList.add("banner-fade-out");
          setTimeout(() => {
            announceBanner.classList.add("hidden");
            announceBanner.classList.remove("banner-fade-out");
          }, 240);
          try {
            localStorage.setItem("rwx_terminal_banner_dismissed", "true");
          } catch (_) {}
        });
      }
    }

    window.addEventListener("beforeunload", () => {
      savePersistentConversation();
    });

    const btnTerminalNewChat = document.getElementById("btn-terminal-new-chat");
    if (btnTerminalNewChat) {
      btnTerminalNewChat.addEventListener("click", () => {
        openTransmissionModal(false);
      });
    }

    decoToggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setDecoVisibility(button.dataset.deco === "on");
      });
    });

    if (groupNameInput) {
      groupNameInput.addEventListener("input", (e) => {
        state.groupName = e.target.value;
        updateUI();
      });
    }

    if (layersListEl) {
      layersListEl.addEventListener("dragover", (e) => {
        if (!draggedMessageId) return;
        if (e.target === layersListEl) {
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.dropEffect = "move";
        }
      });
      layersListEl.addEventListener("drop", (e) => {
        if (e.target === layersListEl && draggedMessageId) {
          e.preventDefault();
          e.stopPropagation();
          const lastMsg = state.messages[state.messages.length - 1];
          if (lastMsg && lastMsg.id !== draggedMessageId) {
            reorderMessage(draggedMessageId, lastMsg.id, false);
          }
          clearDropIndicators();
        }
      });
    }

    if (chatViewport) {
      chatViewport.addEventListener("dragover", (e) => {
        if (!draggedMessageId) return;
        if (e.target === chatViewport || e.target === messageList) {
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.dropEffect = "move";
        }
      });
      chatViewport.addEventListener("drop", (e) => {
        if ((e.target === chatViewport || e.target === messageList) && draggedMessageId) {
          e.preventDefault();
          e.stopPropagation();
          const lastMsg = state.messages[state.messages.length - 1];
          if (lastMsg && lastMsg.id !== draggedMessageId) {
            reorderMessage(draggedMessageId, lastMsg.id, false);
          }
          clearDropIndicators();
        }
      });
    }

    if (characterSearchInput) {
      characterSearchInput.addEventListener("input", (e) => {
        renderCharacterList(e.target.value);
      });
    }

    const btnCloseEditor = document.getElementById("btn-close-editor");
    const editorBackdrop = document.getElementById("editor-backdrop");

    if (btnToggleEditor) {
      btnToggleEditor.addEventListener("click", () => {
        const isOpen = editorPanel.classList.toggle("open");
        if (editorBackdrop) {
          editorBackdrop.classList.toggle("active", isOpen);
        }
      });
    }

    if (btnCloseEditor) {
      btnCloseEditor.addEventListener("click", () => {
        editorPanel.classList.remove("open");
        if (editorBackdrop) {
          editorBackdrop.classList.remove("active");
        }
      });
    }

    if (editorBackdrop) {
      editorBackdrop.addEventListener("click", () => {
        editorPanel.classList.remove("open");
        editorBackdrop.classList.remove("active");
      });
    }

    const btnHelpModal = document.getElementById("btn-help-modal");
    const helpModal = document.getElementById("help-modal");
    const btnCloseHelp = document.getElementById("btn-close-help");

    if (btnHelpModal && helpModal) {
      btnHelpModal.addEventListener("click", () => {
        helpModal.classList.remove("hidden");
      });
    }

    if (btnCloseHelp && helpModal) {
      btnCloseHelp.addEventListener("click", () => {
        helpModal.classList.add("hidden");
      });
    }

    if (helpModal) {
      helpModal.addEventListener("click", (e) => {
        if (e.target === helpModal) {
          helpModal.classList.add("hidden");
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const transModal = document.getElementById("new-transmission-modal");
        if (transModal && !transModal.classList.contains("hidden")) {
          closeTransmissionModal();
          return;
        }
        if (helpModal && !helpModal.classList.contains("hidden")) {
          helpModal.classList.add("hidden");
        }
        if (editorPanel && editorPanel.classList.contains("open")) {
          editorPanel.classList.remove("open");
          const editorBackdrop = document.getElementById("editor-backdrop");
          if (editorBackdrop) editorBackdrop.classList.remove("active");
        }
      }
      if ((e.key === "j" || e.key === "J") && !e.target.matches("input, textarea, select, [contenteditable]")) {
        const isCurrentlyTerminal = appContainer.classList.contains("terminal-mode");
        setViewMode(isCurrentlyTerminal ? "tablet" : "terminal");
      }
    });

    // Mobile Desktop Recommendation Toast
    const mobileNoticeToast = document.getElementById("mobile-notice-toast");
    const btnDismissNotice = document.getElementById("btn-dismiss-notice");

    if (mobileNoticeToast) {
      let isDismissed = false;
      try {
        isDismissed = localStorage.getItem("rwx_mobile_notice_dismissed") === "true";
      } catch (e) {}

      if (window.innerWidth <= 820 && !isDismissed) {
        let autoDismissTimer = null;

        const dismissNotice = () => {
          if (autoDismissTimer) {
            clearTimeout(autoDismissTimer);
            autoDismissTimer = null;
          }
          mobileNoticeToast.classList.remove("visible");
          mobileNoticeToast.classList.add("fade-out");
          try {
            localStorage.setItem("rwx_mobile_notice_dismissed", "true");
          } catch (e) {}
          setTimeout(() => {
            mobileNoticeToast.classList.add("hidden");
          }, 350);
        };

        // Entrance animation after 800ms
        setTimeout(() => {
          mobileNoticeToast.classList.remove("hidden");
          requestAnimationFrame(() => {
            mobileNoticeToast.classList.add("visible");
          });
        }, 800);

        // Auto-dismiss after 10 seconds if user hasn't closed it
        autoDismissTimer = setTimeout(() => {
          dismissNotice();
        }, 10800);

        if (btnDismissNotice) {
          btnDismissNotice.addEventListener("click", () => {
            dismissNotice();
          });
        }
      }
    }

    userSwitcher.addEventListener("click", (e) => {
      const btn = e.target.closest(".user-btn");
      if (btn) {
        state.activeUser = btn.dataset.user;
        updateUI();
      }
    });

    btnSenderChar.addEventListener("click", () => {
      closeContextEmojiPicker();
      closeContextStickerPicker();
      state.contextSender = "incoming";
      btnSenderChar.classList.add("active");
      btnSenderUser.classList.remove("active");
    });

    btnSenderUser.addEventListener("click", () => {
      closeContextEmojiPicker();
      closeContextStickerPicker();
      state.contextSender = "outgoing";
      btnSenderUser.classList.add("active");
      btnSenderChar.classList.remove("active");
    });

    contextTypeTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        closeContextEmojiPicker();
        closeContextStickerPicker();
        contextTypeTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        state.contextType = tab.dataset.type;

        formText.classList.add("hidden");
        formImage.classList.add("hidden");
        formReaction.classList.add("hidden");
        formChoices.classList.add("hidden");

        if (state.contextType === "text") {
          formText.classList.remove("hidden");
          if (state.selectedMessageId) {
            const selectedMsg = state.messages.find((m) => m.id === state.selectedMessageId);
            if (selectedMsg && selectedMsg.type === "text") {
              setInputValueFromStructuredText(contextTextInput, selectedMsg.text || "");
            }
          }
        }
        if (state.contextType === "image") {
          formImage.classList.remove("hidden");
          if (state.selectedMessageId) {
            const selectedMsg = state.messages.find((m) => m.id === state.selectedMessageId);
            if (selectedMsg && selectedMsg.type === "image" && selectedMsg.imageSrc) {
              state.uploadedImageBase64 = selectedMsg.imageSrc;
              imagePreview.src = selectedMsg.imageSrc;
              imagePreviewContainer.classList.remove("hidden");
              btnContextSendImage.disabled = false;
            }
          }
        }
        if (state.contextType === "reaction") {
          formReaction.classList.remove("hidden");
          if (state.selectedMessageId) {
            reactionTargetSelect.value = state.selectedMessageId;
          }
          renderExistingReactionsForTarget();
        }
        if (state.contextType === "choices") {
          formChoices.classList.remove("hidden");
        }

        updateContextActionsVisibility();
      });
    });

    reactionTargetSelect.addEventListener("change", () => {
      renderExistingReactionsForTarget();
    });

    btnContextSendText.addEventListener("click", () => {
      const text = getInputValueAsStructuredText(contextTextInput).trim();
      if (text && (state.contextSender === "outgoing" || state.activeCharacterId)) {
        addMessage({
          sender: state.contextSender,
          characterId: state.activeCharacterId,
          type: "text",
          text: text,
        });
        setInputValueFromStructuredText(contextTextInput, "");
      }
    });

    function optimizeImageUpload(file, maxDimension = 640) {
      return new Promise((resolve, reject) => {
        if (!file || !file.type.startsWith("image/")) {
          reject(new Error("File is not an image"));
          return;
        }

        // Keep animated GIFs and SVGs uncompressed to preserve animation/vector quality
        if (file.type === "image/gif" || file.type === "image/svg+xml") {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            let { width, height } = img;

            // If already within 2x retina bounds, keep original
            if (width <= maxDimension && height <= maxDimension) {
              resolve(e.target.result);
              return;
            }

            // Scale down preserving aspect ratio
            if (width > height) {
              if (width > maxDimension) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              }
            } else {
              if (height > maxDimension) {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              resolve(e.target.result);
              return;
            }

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0, width, height);

            const isTransparent = file.type === "image/png" || file.type === "image/webp";
            const mime = isTransparent ? "image/png" : "image/jpeg";
            const quality = isTransparent ? undefined : 0.92;

            resolve(canvas.toDataURL(mime, quality));
          };
          img.onerror = () => resolve(e.target.result);
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    contextImageFile.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const optimizedDataUrl = await optimizeImageUpload(file, 640);
          state.uploadedImageBase64 = optimizedDataUrl;
          imagePreview.src = state.uploadedImageBase64;
          imagePreviewContainer.classList.remove("hidden");
          btnContextSendImage.disabled = false;
        } catch (_) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            state.uploadedImageBase64 = evt.target.result;
            imagePreview.src = state.uploadedImageBase64;
            imagePreviewContainer.classList.remove("hidden");
            btnContextSendImage.disabled = false;
          };
          reader.readAsDataURL(file);
        }
      }
    });

    btnRemoveImagePreview.addEventListener("click", () => {
      state.uploadedImageBase64 = null;
      contextImageFile.value = "";
      imagePreviewContainer.classList.add("hidden");
      btnContextSendImage.disabled = true;
    });

    btnContextSendImage.addEventListener("click", () => {
      if (state.uploadedImageBase64 && (state.contextSender === "outgoing" || state.activeCharacterId)) {
        addMessage({
          sender: state.contextSender,
          characterId: state.activeCharacterId,
          type: "image",
          imageSrc: state.uploadedImageBase64,
        });
        btnRemoveImagePreview.click();
      }
    });

    btnContextAddChoices.addEventListener("click", () => {
      const choices = [
        getInputValueAsStructuredText(choiceInputOne).trim(),
        getInputValueAsStructuredText(choiceInputTwo).trim(),
      ].filter(Boolean);
      if (choices.length > 0) {
        state.choices = choices;
        setInputValueFromStructuredText(choiceInputOne, "");
        setInputValueFromStructuredText(choiceInputTwo, "");
        renderChoices();
      }
    });

    btnContextRemoveChoices.addEventListener("click", () => {
      state.choices = [];
      renderChoices();
    });

    contextEmojiButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        closeContextStickerPicker();
        const target = document.getElementById(button.dataset.emojiTarget);
        if (!contextEmojiPicker.classList.contains("hidden") && contextEmojiTarget === target) {
          closeContextEmojiPicker();
          return;
        }
        contextEmojiTarget = target;
        if (contextEmojiTarget instanceof HTMLInputElement) {
          contextEmojiSelectionStart = contextEmojiTarget.selectionStart || 0;
          contextEmojiSelectionEnd = contextEmojiTarget.selectionEnd || 0;
        }
        contextEmojiPicker.classList.remove("hidden");
      });
    });

    if (btnCloseContextEmoji) {
      btnCloseContextEmoji.addEventListener("click", (e) => {
        e.stopPropagation();
        closeContextEmojiPicker();
      });
    }

    const toggleContextStickerPicker = (e) => {
      e.stopPropagation();
      closeContextEmojiPicker();
      if (contextStickerPicker) {
        contextStickerPicker.classList.toggle("hidden");
      }
    };

    if (btnContextOpenStickers) {
      btnContextOpenStickers.addEventListener("click", toggleContextStickerPicker);
    }

    if (btnCloseContextSticker) {
      btnCloseContextSticker.addEventListener("click", (e) => {
        e.stopPropagation();
        closeContextStickerPicker();
      });
    }

    document.addEventListener("click", (e) => {
      if (contextEmojiPicker && !contextEmojiPicker.classList.contains("hidden")) {
        if (!contextEmojiPicker.contains(e.target) && !e.target.closest(".context-emoji-btn")) {
          closeContextEmojiPicker();
        }
      }
      if (contextStickerPicker && !contextStickerPicker.classList.contains("hidden")) {
        if (!contextStickerPicker.contains(e.target) && !e.target.closest("#btn-context-open-stickers")) {
          closeContextStickerPicker();
        }
      }
    });

    btnContextAddReaction.addEventListener("click", () => {
      const targetId = reactionTargetSelect.value || state.selectedMessageId;
      const selectedSrc = reactionEmojiSelectedPath ? reactionEmojiSelectedPath.value : GAME_EMOJIS[0];
      if (targetId && selectedSrc) {
        const msg = state.messages.find((m) => m.id === targetId);
        if (msg) {
          if (!msg.reactions) msg.reactions = [];
          const existing = msg.reactions.find((r) => r.emojiSrc === selectedSrc);
          if (existing) {
            existing.count += 1;
          } else {
            msg.reactions.push({ emojiSrc: selectedSrc, count: 1 });
          }
          updateUI();
        }
      }
    });

    btnSend.addEventListener("click", () => {
      const text = getInputValueAsStructuredText(messageInput).trim();
      if (text) {
        addMessage({
          sender: state.contextSender || "outgoing",
          characterId: state.activeCharacterId,
          type: "text",
          text: text,
        });
        setInputValueFromStructuredText(messageInput, "");
      }
    });

    messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        btnSend.click();
      }
    });

    btnContextUpdate.addEventListener("click", () => {
      if (!state.selectedMessageId) return;
      const selectedMsg = state.messages.find((m) => m.id === state.selectedMessageId);
      if (selectedMsg) {
        // guard--- only text and image can be updated as messages
        if (state.contextType !== "text" && state.contextType !== "image") return;

        selectedMsg.sender = state.contextSender;
        selectedMsg.characterId = state.activeCharacterId;

        if (state.contextType === "image") {
          selectedMsg.type = "image";
          if (state.uploadedImageBase64) {
            selectedMsg.imageSrc = state.uploadedImageBase64;
          }
        } else {
          selectedMsg.type = "text";
          selectedMsg.text = getInputValueAsStructuredText(contextTextInput).trim();
        }

        exitEditMode();
      }
    });

    btnContextDelete.addEventListener("click", () => {
      if (state.selectedMessageId) {
        state.messages = state.messages.filter((m) => m.id !== state.selectedMessageId);
        exitEditMode();
      }
    });

    btnContextCancel.addEventListener("click", () => {
      exitEditMode();
    });

    btnClearConversation.addEventListener("click", () => {
      state.messages = [];
      state.choices = [];
      state.activeCharacterId = null;
      state.groupParticipantIds = [];
      state.groupName = "";
      state.conversationMode = "direct";
      state.selectedMessageId = null;

      if (contextPanelSection) contextPanelSection.classList.remove("group-mode-active");
      if (btnConversationDirect) btnConversationDirect.classList.add("active");
      if (btnConversationGroup) btnConversationGroup.classList.remove("active");
      if (groupParticipants) groupParticipants.classList.add("hidden");
      if (groupNameInput) groupNameInput.value = "";

      setInputValueFromStructuredText(choiceInputOne, "");
      setInputValueFromStructuredText(choiceInputTwo, "");

      exitEditMode();
      btnClearConversation.classList.remove("highlight-pulse");
      try {
        localStorage.setItem("rwx_tutorial_cleared", "true");
      } catch (e) {}

      renderCharacterList(characterSearchInput ? characterSearchInput.value : "");
      renderGroupParticipants();
      renderConversation();
      renderChoices();
      updateUI();
      savePersistentConversation();
    });

    const btnRestoreTutorial = document.getElementById("btn-restore-tutorial");
    if (btnRestoreTutorial) {
      btnRestoreTutorial.addEventListener("click", () => {
        loadTutorialTemplate();
      });
    }

    btnEmoticon.addEventListener("click", () => {
      stickerPanel.classList.toggle("hidden");
      emojiPickerPanel.classList.add("hidden");
    });

    btnCloseStickers.addEventListener("click", () => {
      stickerPanel.classList.add("hidden");
    });

    btnEmoji.addEventListener("click", () => {
      emojiPickerPanel.classList.toggle("hidden");
      stickerPanel.classList.add("hidden");
    });

    btnCloseEmojiPicker.addEventListener("click", () => {
      emojiPickerPanel.classList.add("hidden");
    });

    exportModeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.dataset.exportMode;
        if (!mode) return;
        state.exportMode = mode;
        exportModeButtons.forEach((b) => b.classList.toggle("active", b.dataset.exportMode === mode));
      });
    });

    if (btnExportPng) {
      btnExportPng.addEventListener("click", () => {
        exportConversation();
      });
    }

    if (btnSaveJson) {
      btnSaveJson.addEventListener("click", () => {
        saveConversationAsJson();
      });
    }

    if (btnLoadJson && inputLoadJson) {
      btnLoadJson.addEventListener("click", () => {
        inputLoadJson.value = "";
        inputLoadJson.click();
      });

      inputLoadJson.addEventListener("change", (e) => {
        if (e.target.files && e.target.files.length > 0) {
          loadConversationFromJson(e.target.files[0]);
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
          loadConversationFromJson(file);
        } else {
          alert("Please drop a valid .json conversation backup file.");
        }
      }
    });

    chatViewport.addEventListener("click", (e) => {
      if (!e.target.closest(".message-item") && !e.target.closest("button") && !e.target.closest("input")) {
        if (state.selectedMessageId) {
          state.selectedMessageId = null;
          exitEditMode();
          updateUI();
        }
      }
    });
  }

  function renderGroupParticipants() {
    groupParticipantList.innerHTML = "";
    if (state.groupParticipantIds.length === 0) {
      const empty = document.createElement("span");
      empty.classList.add("group-participants-empty");
      empty.textContent = "Select characters from the list above.";
      groupParticipantList.appendChild(empty);
      return;
    }
    state.groupParticipantIds.forEach((id) => {
      const character = CHARACTERS[id];
      if (!character) return;
      const chip = document.createElement("button");
      chip.type = "button";
      chip.classList.add("group-participant-chip");
      if (id === state.activeCharacterId) chip.classList.add("active");

      const avatar = document.createElement("img");
      avatar.src = character.avatar;
      avatar.alt = character.name;
      const name = document.createElement("span");
      name.textContent = character.name;
      const remove = document.createElement("button");
      remove.type = "button";
      remove.classList.add("group-participant-remove");
      remove.textContent = "✕";

      chip.append(avatar, name, remove);
      chip.addEventListener("click", () => {
        state.activeCharacterId = id;
        renderGroupParticipants();
        renderCharacterList();
        updateUI();
      });
      remove.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        state.groupParticipantIds = state.groupParticipantIds.filter((participantId) => participantId !== id);
        if (state.activeCharacterId === id) {
          state.activeCharacterId = state.groupParticipantIds.length > 0 ? state.groupParticipantIds[0] : null;
        }
        renderGroupParticipants();
        renderCharacterList();
        updateUI();
      });
      groupParticipantList.appendChild(chip);
    });
  }

    // terminal channels

  let activeTerminalChannelId = "channel-current";
  const terminalChannels = [
    {
      id: "channel-current",
      name: "AIC Supervisor Desk",
      avatar: "rwxbaker-assets/deco/group-channel.webp",
      mode: state.conversationMode || "group",
      characterId: state.activeCharacterId || "pelica",
      groupName: state.groupName || "AIC Supervisor Desk",
      groupParticipantIds: state.groupParticipantIds && state.groupParticipantIds.length ? [...state.groupParticipantIds] : ["pelica", "chen", "wolfgard"],
      messages: state.messages,
      choices: state.choices,
    },
    {
      id: "channel-ops-4",
      name: "Endfield Crisis Team",
      avatar: "rwxbaker-assets/deco/group-channel.webp",
      mode: "group",
      characterId: "wolfgard",
      groupName: "Endfield Crisis Team",
      groupParticipantIds: ["pelica", "chen", "wolfgard"],
      messages: [
        {
          id: "m_ops_1",
          sender: "incoming",
          characterId: "wolfgard",
          type: "text",
          text: "Endmin, do you copy? This is a test message for the terminal group feature!",
          imageSrc: null,
          reactions: [],
        },
        {
          id: "m_ops_2",
          sender: "incoming",
          characterId: "pelica",
          type: "text",
          text: "You can create a group channel from above, just hit 'NEW' 💫",
          imageSrc: null,
          reactions: [],
        },
        {
          id: "m_ops_3",
          sender: "incoming",
          characterId: "chen",
          type: "text",
          text: "Easy peasy! Very straightforward huh? Hehe~",
          imageSrc: null,
          reactions: [],
        },
        {
          id: "m_ops_4",
          sender: "incoming",
          characterId: "wolfgard",
          type: "text",
          text: "You can choose the Active Character on the left side.",
          imageSrc: null,
          reactions: [],
        },
      ],
      choices: ["Wow that's easy!", "I'm trying right now."],
    },
    {
      id: "channel-recon",
      name: "Chen Qianyu",
      avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0005_chen.png",
      mode: "direct",
      characterId: "chen",
      groupName: "",
      groupParticipantIds: [],
      messages: [
        {
          id: "m_recon_1",
          sender: "incoming",
          characterId: "chen",
          type: "text",
          text: "Hey there, Endministrator!",
          imageSrc: null,
          reactions: [],
        },
        {
          id: "m_recon_2",
          sender: "incoming",
          characterId: "chen",
          type: "text",
          text: "Hehe, got any new mission for me?",
          imageSrc: null,
          reactions: [],
        },
      ],
      choices: ["Hey there!", "Where are you right now?"],
    },
    {
      id: "channel-logistics",
      name: "Gilberta",
      avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0013_aglina.png",
      mode: "direct",
      characterId: "angelina",
      groupName: "",
      groupParticipantIds: [],
      messages: [
        {
          id: "m_log_1",
          sender: "incoming",
          characterId: "angelina",
          type: "text",
          text: "Hey Endmin! I have a package for you!",
          imageSrc: null,
          reactions: [],
        },
        {
          id: "m_log_2",
          sender: "incoming",
          characterId: "angelina",
          type: "text",
          text: "Should I drop it off at the supply depot or send it to your current location?",
          imageSrc: null,
          reactions: [],
        },
      ],
      choices: ["I'm in Dijiang right now, you can come!", "Ah, give it to Perlica or Chen please."],
    },
  ];

  function syncActiveTerminalChannel() {
    const curCh = terminalChannels.find((c) => c.id === activeTerminalChannelId);
    if (!curCh) return;
    curCh.messages = state.messages;
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

  function renderTerminalChannels() {
    const container = document.getElementById("terminal-session-cards");
    if (!container) return;
    syncActiveTerminalChannel();

    container.innerHTML = "";
    terminalChannels.forEach((ch) => {
      const isSelected = ch.id === activeTerminalChannelId;
      const card = document.createElement("article");
      card.className = `terminal-session-card ${isSelected ? "terminal-session-card--selected" : ""}`;
      card.dataset.channelId = ch.id;

      let previewText = "No messages yet";
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
          const cleanedText = (lastMsg.text || "").replace(/\[emoji:[^\]]+\]/g, "").trim();
          content = cleanedText || (lastMsg.text ? "[Emoji]" : "");
        }

        const isGroup = ch.mode === "group" || (Array.isArray(ch.groupParticipantIds) && ch.groupParticipantIds.length > 0);
        let senderName = "";
        if (isGroup) {
          senderName = "Endmin";
          if (lastMsg.sender === "incoming") {
            const charObj = CHARACTERS[lastMsg.characterId];
            senderName = charObj ? charObj.name : "Operator";
          }
        }
        previewText = content;
      }

      const frameImg = document.createElement("img");
      frameImg.className = "terminal-session-card__frame";
      frameImg.src = "rwxbaker-assets/deco/session-card-frame.webp";
      frameImg.alt = "";

      const faintImg = document.createElement("img");
      faintImg.className = "terminal-session-card__faint";
      faintImg.src = "rwxbaker-assets/deco/session-card-faint.webp";
      faintImg.alt = "";

      const avatarWrapper = document.createElement("div");
      avatarWrapper.className = "terminal-session-card__avatar";
      const avatarImg = document.createElement("img");
      avatarImg.className = "terminal-session-card__avatar-image";
      avatarImg.src = ch.avatar || "rwxbaker-assets/deco/group-channel.webp";
      avatarImg.alt = ch.name;
      avatarWrapper.appendChild(avatarImg);

      const contentDiv = document.createElement("div");
      contentDiv.className = "terminal-session-card__content";

      const titleDiv = document.createElement("div");
      titleDiv.className = "terminal-session-card__title";
      titleDiv.textContent = ch.name;

      const previewDiv = document.createElement("div");
      previewDiv.className = "terminal-session-card__preview";
      if (typeof senderName !== "undefined" && senderName) {
        const senderSpan = document.createElement("span");
        senderSpan.className = "terminal-session-card__sender";
        senderSpan.textContent = `${senderName}: `;
        previewDiv.appendChild(senderSpan);
        previewDiv.appendChild(document.createTextNode(previewText));
      } else {
        previewDiv.textContent = previewText;
      }

      const underlineImg = document.createElement("img");
      underlineImg.className = "terminal-session-card__underline";
      underlineImg.src = "rwxbaker-assets/deco/session-card-underline.webp";
      underlineImg.alt = "";

      contentDiv.appendChild(titleDiv);
      contentDiv.appendChild(previewDiv);
      contentDiv.appendChild(underlineImg);

      const detailImg = document.createElement("img");
      detailImg.className = "terminal-session-card__detail";
      detailImg.src = "rwxbaker-assets/deco/session-card-detail.webp";
      detailImg.alt = "";

      card.appendChild(frameImg);
      card.appendChild(faintImg);
      card.appendChild(avatarWrapper);
      card.appendChild(contentDiv);
      card.appendChild(detailImg);

      card.addEventListener("click", () => {
        if (ch.id !== activeTerminalChannelId) {
          selectTerminalChannel(ch.id);
        }
      });

      container.appendChild(card);
    });
  }

  function selectTerminalChannel(channelId) {
    if (channelId === activeTerminalChannelId) return;

    // 1. Save current state into current active channel
    const prevCh = terminalChannels.find((c) => c.id === activeTerminalChannelId);
    if (prevCh) {
      prevCh.messages = JSON.parse(JSON.stringify(state.messages));
      prevCh.choices = [...state.choices];
      prevCh.mode = state.conversationMode;
      prevCh.characterId = state.activeCharacterId;
      prevCh.groupName = state.groupName;
      prevCh.groupParticipantIds = [...state.groupParticipantIds];
      if (state.conversationMode === "group") {
        prevCh.name = state.groupName && state.groupName.trim() ? state.groupName.trim() : "Group Operation";
        prevCh.avatar = "rwxbaker-assets/deco/group-channel.webp";
      } else {
        const char = state.activeCharacterId ? CHARACTERS[state.activeCharacterId] : null;
        prevCh.name = char ? char.name : "Direct Transmission";
        prevCh.avatar = char ? char.avatar : "rwxbaker-assets/avatars/operator/icon_round_chr_0004_pelica.png";
      }
    }

    // 2. Find target channel
    const nextCh = terminalChannels.find((c) => c.id === channelId);
    if (!nextCh) return;

    activeTerminalChannelId = channelId;

    // 3. Load target channel into state
    state.messages = JSON.parse(JSON.stringify(nextCh.messages || []));
    state.choices = nextCh.choices ? [...nextCh.choices] : [];
    state.conversationMode = nextCh.mode || "direct";
    state.activeCharacterId = nextCh.characterId || null;
    state.groupName = nextCh.groupName || "";
    state.groupParticipantIds = nextCh.groupParticipantIds ? [...nextCh.groupParticipantIds] : [];
    state.selectedMessageId = null;

    // 4. Update conversation mode UI in editor
    if (state.conversationMode === "group") {
      btnConversationGroup.classList.add("active");
      btnConversationDirect.classList.remove("active");
      groupParticipants.classList.remove("hidden");
      contextPanelSection.classList.add("group-mode-active");
      if (groupNameInput) {
        groupNameInput.value = state.groupName || "";
      }
    } else {
      btnConversationDirect.classList.add("active");
      btnConversationGroup.classList.remove("active");
      groupParticipants.classList.add("hidden");
      contextPanelSection.classList.remove("group-mode-active");
    }

    // 5. Re-render UI
    renderCharacterList();
    renderGroupParticipants();
    renderChoices();
    updateUI();
    renderTerminalChannels();
  }

  function createNewTerminalChannel() {
    syncActiveTerminalChannel();

    const newNum = terminalChannels.length + 1;
    const newId = "channel-" + Date.now();
    const newName = `New Channel ${newNum}`;
    const newCh = {
      id: newId,
      name: newName,
      avatar: "rwxbaker-assets/deco/group-channel.webp",
      mode: "direct",
      characterId: "pelica",
      groupName: "",
      groupParticipantIds: [],
      messages: [
        {
          id: "msg_" + Date.now() + "_1",
          sender: "incoming",
          characterId: "pelica",
          type: "text",
          text: `Terminal channel established: ${newName}. Ready for transmission.`,
          imageSrc: null,
          reactions: [],
        },
      ],
      choices: [],
    };

    terminalChannels.push(newCh);
    selectTerminalChannel(newId);
  }

    // transmission modal

  const transmissionModal = document.getElementById("new-transmission-modal");
  const transmissionModalHeading = document.getElementById("transmission-modal-heading");
  const btnCloseTransmissionModal = document.getElementById("btn-close-transmission-modal");
  const modalTabDirect = document.getElementById("modal-tab-direct");
  const modalTabGroup = document.getElementById("modal-tab-group");
  const transmissionGroupConfig = document.getElementById("transmission-group-config");
  const transmissionGroupNameInput = document.getElementById("transmission-group-name");
  const transmissionSelectedChips = document.getElementById("transmission-selected-chips");
  const transmissionCharacterSearch = document.getElementById("transmission-character-search");
  const transmissionCharacterGrid = document.getElementById("transmission-character-grid");
  const btnCancelTransmission = document.getElementById("btn-cancel-transmission");
  const btnSubmitTransmission = document.getElementById("btn-submit-transmission");
  const transmissionSubmitLabel = document.getElementById("transmission-submit-label");

  let modalMode = "direct";
  let modalSelectedCharId = null;
  let modalGroupParticipants = [];
  let modalGroupName = "";
  let modalFilter = "all";
  let modalIsEditing = false;

  function openTransmissionModal(isEdit = false) {
    if (!transmissionModal) return;
    modalIsEditing = isEdit;

    if (isEdit) {
      if (transmissionModalHeading) transmissionModalHeading.textContent = "CHANNEL SETTINGS";
      if (transmissionSubmitLabel) transmissionSubmitLabel.textContent = "APPLY CHANGES";
      modalMode = state.conversationMode || "direct";
      modalSelectedCharId = state.activeCharacterId || "pelica";
      modalGroupParticipants = state.groupParticipantIds && state.groupParticipantIds.length ? [...state.groupParticipantIds] : ["pelica"];
      modalGroupName = state.groupName || "";
    } else {
      if (transmissionModalHeading) transmissionModalHeading.textContent = "NEW TRANSMISSION";
      if (transmissionSubmitLabel) transmissionSubmitLabel.textContent = "ESTABLISH LINK";
      modalMode = "direct";
      modalSelectedCharId = "pelica";
      modalGroupParticipants = ["pelica", "chen"];
      modalGroupName = `Operation Unit ${terminalChannels.length + 1}`;
    }

    if (transmissionGroupNameInput) {
      transmissionGroupNameInput.value = modalGroupName;
    }
    if (transmissionCharacterSearch) {
      transmissionCharacterSearch.value = "";
    }
    modalFilter = "all";
    document.querySelectorAll(".transmission-filter-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === "all");
    });

    setModalMode(modalMode);
    transmissionModal.classList.remove("hidden");
  }

  function closeTransmissionModal() {
    if (transmissionModal) transmissionModal.classList.add("hidden");
  }

  function setModalMode(mode) {
    modalMode = mode;
    if (modalTabDirect) modalTabDirect.classList.toggle("active", mode === "direct");
    if (modalTabGroup) modalTabGroup.classList.toggle("active", mode === "group");
    if (transmissionGroupConfig) {
      transmissionGroupConfig.classList.toggle("hidden", mode !== "group");
    }
    renderModalSelectedChips();
    renderModalCharacterGrid();
  }

  function renderModalSelectedChips() {
    if (!transmissionSelectedChips) return;
    transmissionSelectedChips.innerHTML = "";
    if (modalGroupParticipants.length === 0) {
      transmissionSelectedChips.innerHTML = `<span class="no-participants-hint">Select operators from list below...</span>`;
      return;
    }
    modalGroupParticipants.forEach((pid) => {
      const char = CHARACTERS[pid];
      if (!char) return;
      const chip = document.createElement("span");
      chip.className = "transmission-chip";
      chip.innerHTML = `
        <img class="transmission-chip__avatar" src="${char.avatar}" alt="">
        <span>${char.name}</span>
        <button type="button" class="transmission-chip__remove" title="Remove">&times;</button>
      `;
      chip.querySelector(".transmission-chip__remove").addEventListener("click", (e) => {
        e.stopPropagation();
        modalGroupParticipants = modalGroupParticipants.filter((id) => id !== pid);
        renderModalSelectedChips();
        renderModalCharacterGrid();
      });
      transmissionSelectedChips.appendChild(chip);
    });
  }

  function renderModalCharacterGrid() {
    if (!transmissionCharacterGrid) return;
    transmissionCharacterGrid.innerHTML = "";

    const query = (transmissionCharacterSearch ? transmissionCharacterSearch.value : "").toLowerCase().trim();
    const chars = Object.values(CHARACTERS).filter((char) => {
      if (modalFilter === "operators" && char.isNpc) return false;
      if (modalFilter === "npcs" && !char.isNpc) return false;
      if (query && !char.name.toLowerCase().includes(query)) return false;
      return true;
    });

    chars.forEach((char) => {
      const isSelected = modalMode === "direct"
        ? modalSelectedCharId === char.id
        : modalGroupParticipants.includes(char.id);

      const card = document.createElement("div");
      card.className = `transmission-char-card ${isSelected ? "selected" : ""}`;
      card.innerHTML = `
        <div class="transmission-char-card__avatar">
          <img src="${char.avatar}" alt="${char.name}">
        </div>
        <div class="transmission-char-card__name">${char.name}</div>
        ${isSelected ? '<span class="transmission-char-card__badge">✓</span>' : ""}
      `;

      card.addEventListener("click", () => {
        if (modalMode === "direct") {
          modalSelectedCharId = char.id;
        } else {
          if (modalGroupParticipants.includes(char.id)) {
            modalGroupParticipants = modalGroupParticipants.filter((id) => id !== char.id);
          } else {
            modalGroupParticipants.push(char.id);
          }
          renderModalSelectedChips();
        }
        renderModalCharacterGrid();
      });

      transmissionCharacterGrid.appendChild(card);
    });
  }

  function submitTransmissionModal() {
    if (modalMode === "direct") {
      const charId = modalSelectedCharId || "pelica";
      const char = CHARACTERS[charId] || CHARACTERS.pelica;

      if (modalIsEditing) {
        state.conversationMode = "direct";
        state.activeCharacterId = charId;
        state.groupName = "";
        state.groupParticipantIds = [];
        syncActiveTerminalChannel();
      } else {
        const newId = "channel-" + Date.now();
        const newCh = {
          id: newId,
          name: char.name,
          avatar: char.avatar,
          mode: "direct",
          characterId: charId,
          groupName: "",
          groupParticipantIds: [],
          messages: [
            {
              id: "msg_" + Date.now() + "_1",
              sender: "incoming",
              characterId: charId,
              type: "text",
              text: `Direct link established with ${char.name}. Ready for transmission.`,
              imageSrc: null,
              reactions: [],
            },
          ],
          choices: [],
        };
        terminalChannels.push(newCh);
        selectTerminalChannel(newId);
      }
    } else {
      // Group mode
      const participants = modalGroupParticipants.length > 0 ? [...modalGroupParticipants] : ["pelica", "chen"];
      const gName = (transmissionGroupNameInput ? transmissionGroupNameInput.value.trim() : "") || "Squad Operation";

      if (modalIsEditing) {
        state.conversationMode = "group";
        state.groupName = gName;
        state.groupParticipantIds = participants;
        state.activeCharacterId = participants[0] || "pelica";
        syncActiveTerminalChannel();
      } else {
        const newId = "channel-" + Date.now();
        const newCh = {
          id: newId,
          name: gName,
          avatar: "rwxbaker-assets/deco/group-channel.webp",
          mode: "group",
          characterId: participants[0] || "pelica",
          groupName: gName,
          groupParticipantIds: participants,
          messages: [
            {
              id: "msg_" + Date.now() + "_1",
              sender: "incoming",
              characterId: participants[0] || "pelica",
              type: "text",
              text: `Operation frequency opened for [${gName}]. All squad units online.`,
              imageSrc: null,
              reactions: [],
            },
          ],
          choices: [],
        };
        terminalChannels.push(newCh);
        selectTerminalChannel(newId);
      }
    }

    closeTransmissionModal();
    renderCharacterList();
    renderGroupParticipants();
    updateUI();
    renderTerminalChannels();
  }

  function setupTransmissionModal() {
    if (btnCloseTransmissionModal) {
      btnCloseTransmissionModal.addEventListener("click", closeTransmissionModal);
    }
    if (btnCancelTransmission) {
      btnCancelTransmission.addEventListener("click", closeTransmissionModal);
    }
    if (modalTabDirect) {
      modalTabDirect.addEventListener("click", () => setModalMode("direct"));
    }
    if (modalTabGroup) {
      modalTabGroup.addEventListener("click", () => setModalMode("group"));
    }
    if (btnSubmitTransmission) {
      btnSubmitTransmission.addEventListener("click", submitTransmissionModal);
    }

    if (transmissionCharacterSearch) {
      transmissionCharacterSearch.addEventListener("input", renderModalCharacterGrid);
    }

    const filterBtns = document.querySelectorAll(".transmission-filter-btn");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        modalFilter = btn.dataset.filter || "all";
        renderModalCharacterGrid();
      });
    });

    if (transmissionModal) {
      transmissionModal.addEventListener("click", (e) => {
        if (e.target === transmissionModal) {
          closeTransmissionModal();
        }
      });
    }
  }

  function setViewMode(mode) {
    const isPhone = mode === "phone";
    const isTerminal = mode === "terminal";
    appContainer.classList.toggle("phone-mode", isPhone);
    appContainer.classList.toggle("terminal-mode", isTerminal);
    viewModeButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.viewMode === mode);
    });

    if (btnToggleEditor) {
      const label = btnToggleEditor.querySelector("span");
      if (label) {
        label.textContent = isTerminal ? "⚙️ OPEN EDITOR" : "⚙️ Editor";
      }
    }

    if (isTerminal) {
      renderTerminalChannels();
    }

    try {
      localStorage.setItem("rwx_view_mode", mode);
    } catch (_) {}
  }

  function setDecoVisibility(show) {
    if (phoneFrame) {
      phoneFrame.classList.toggle("hide-chat-deco", !show);
    }
    decoToggleButtons.forEach((button) => {
      button.classList.toggle("active", (button.dataset.deco === "on") === show);
    });
    try {
      localStorage.setItem("rwx_chat_deco", show ? "on" : "off");
    } catch (_) {}
  }

  function renderChoices() {
    choiceContainer.innerHTML = "";

    const hasTutorialClear = state.choices.some(
      (c) => c.includes("start making your own") || c.includes("Clear All")
    );

    if (hasTutorialClear) {
      const clearBtn = document.createElement("button");
      clearBtn.type = "button";
      clearBtn.className = "template-choices-clear-btn";
      clearBtn.title = "Clear conversation and start fresh";
      clearBtn.innerHTML = `<span>Clear All</span>`;

      if (btnClearConversation && btnClearConversation.classList.contains("highlight-pulse")) {
        clearBtn.classList.add("highlight-pulse");
      }

      clearBtn.addEventListener("click", () => {
        if (btnClearConversation) {
          btnClearConversation.click();
        }
      });

      choiceContainer.appendChild(clearBtn);
    }

    state.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.type = "button";
      button.classList.add("choice-pill");
      renderMessageContentWithEmojis(button, choice);

      button.addEventListener("click", () => {
        if (choice.includes("start making your own") || choice.includes("Clear All")) {
          if (btnClearConversation) {
            btnClearConversation.click();
          }
        } else {
          state.choices = [];
          addMessage({
            sender: "outgoing",
            characterId: state.activeCharacterId,
            type: "text",
            text: choice,
          });
          renderChoices();
        }
      });

      choiceContainer.appendChild(button);
    });
    savePersistentConversation();
  }

  function renderContextEmojiPicker() {
    const grid = document.getElementById("context-emoji-grid") || contextEmojiPicker;
    grid.innerHTML = "";
    GAME_EMOJIS.forEach((emojiSrc, idx) => {
      const button = document.createElement("button");
      button.type = "button";
      button.classList.add("context-emoji-item");
      button.title = `Emoji ${idx + 1}`;

      const img = document.createElement("img");
      img.src = emojiSrc;
      img.alt = `Emoji ${idx + 1}`;
      button.appendChild(img);
      button.addEventListener("click", () => {
        if (!contextEmojiTarget) return;
        if (contextEmojiTarget.isContentEditable) {
          insertEmojiAtCursor(emojiSrc, contextEmojiTarget);
        } else {
          const token = `[emoji:${emojiSrc}]`;
          const value = contextEmojiTarget.value;
          contextEmojiTarget.value = value.slice(0, contextEmojiSelectionStart) + token + value.slice(contextEmojiSelectionEnd);
          const cursor = contextEmojiSelectionStart + token.length;
          contextEmojiTarget.focus();
          contextEmojiTarget.setSelectionRange(cursor, cursor);
        }
        closeContextEmojiPicker();
      });
      grid.appendChild(button);
    });
  }

  function renderContextStickerPicker() {
    if (!contextStickerGrid) return;
    contextStickerGrid.innerHTML = "";
    STICKERS.forEach((stkSrc) => {
      const img = document.createElement("img");
      img.src = stkSrc;
      img.alt = "Sticker";
      img.classList.add("context-sticker-item");
      img.addEventListener("click", () => {
        if (state.contextSender === "outgoing" || state.activeCharacterId) {
          addMessage({
            sender: state.contextSender,
            characterId: state.activeCharacterId,
            type: "sticker",
            imageSrc: stkSrc,
          });
        } else {
          alert("Please select a character first.");
        }
        closeContextStickerPicker();
      });
      contextStickerGrid.appendChild(img);
    });
  }

  function addMessage(msgData) {
    const newMsg = {
      id: "msg_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      sender: msgData.sender || "outgoing",
      characterId: msgData.characterId || state.activeCharacterId,
      type: msgData.type || "text",
      text: msgData.text || "",
      imageSrc: msgData.imageSrc || null,
      reactions: msgData.reactions || [],
    };

    state.messages.push(newMsg);
    state.selectedMessageId = null;
    updateUI();
  }

  function renderStickerPicker() {
    stickerGrid.innerHTML = "";
    STICKERS.forEach((stkSrc) => {
      const img = document.createElement("img");
      img.src = stkSrc;
      img.alt = "Sticker";
      img.classList.add("sticker-item");
      img.addEventListener("click", () => {
        addMessage({
          sender: "outgoing",
          characterId: state.activeCharacterId,
          type: "sticker",
          imageSrc: stkSrc,
        });
        stickerPanel.classList.add("hidden");
      });
      stickerGrid.appendChild(img);
    });
  }

  function renderReactionEmojiGrid() {
    if (!reactionEmojiPickerGrid) return;
    reactionEmojiPickerGrid.innerHTML = "";

    GAME_EMOJIS.forEach((emojiSrc, idx) => {
      const item = document.createElement("div");
      item.classList.add("reaction-emoji-item");
      if (idx === 0) item.classList.add("active");

      const img = document.createElement("img");
      img.src = emojiSrc;
      img.alt = `Emoji ${idx + 1}`;

      item.appendChild(img);
      item.addEventListener("click", () => {
        reactionEmojiPickerGrid.querySelectorAll(".reaction-emoji-item").forEach((el) => el.classList.remove("active"));
        item.classList.add("active");
        reactionEmojiSelectedPath.value = emojiSrc;
      });

      reactionEmojiPickerGrid.appendChild(item);
    });
  }

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
      const img = document.createElement("img");
      img.src = emojiSrc;
      img.alt = "Emoji";
      img.classList.add("inline-game-emoji");
      container.appendChild(img);
      lastIndex = emojiRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      container.appendChild(document.createTextNode(text.substring(lastIndex)));
    }
  }

  function renderEmojiPicker() {
    emojiGrid.innerHTML = "";
    GAME_EMOJIS.forEach((emojiSrc, idx) => {
      const item = document.createElement("div");
      item.classList.add("emoji-item-card");

      const img = document.createElement("img");
      img.src = emojiSrc;
      img.alt = `Emoji ${idx + 1}`;
      item.appendChild(img);

      item.addEventListener("click", () => {
        insertEmojiAtCursor(emojiSrc);
        emojiPickerPanel.classList.add("hidden");
      });

      emojiGrid.appendChild(item);
    });
  }

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

  function insertEmojiAtCursor(emojiSrc, targetInput = activeFocusedInput) {
    if (!targetInput) targetInput = messageInput;

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

  function downloadDataUrl(dataUrl, filename) {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // off screen pre-render of 9slice bubbles
  function render9SliceTiled(img, dw, dh, slice) {
    const canvas = document.createElement("canvas");
    canvas.width = dw;
    canvas.height = dh;
    const ctx = canvas.getContext("2d");

    const { top: t, right: r, bottom: b, left: l } = slice;
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    const cw = w - l - r;
    const ch = h - t - b;

    ctx.drawImage(img, 0, 0, l, t, 0, 0, l, t);
    ctx.drawImage(img, w - r, 0, r, t, dw - r, 0, r, t);
    ctx.drawImage(img, 0, h - b, l, b, 0, dh - b, l, b);
    ctx.drawImage(img, w - r, h - b, r, b, dw - r, dh - b, r, b);

    function tileSlice(sx, sy, sw, sh, dx, dy, targetW, targetH) {
      if (targetW <= 0 || targetH <= 0) return;
      for (let x = 0; x < targetW; x += sw) {
        const bw = Math.min(sw, targetW - x);
        for (let y = 0; y < targetH; y += sh) {
          const bh = Math.min(sh, targetH - y);
          ctx.drawImage(img, sx, sy, bw, bh, dx + x, dy + y, bw, bh);
        }
      }
    }

    tileSlice(l, 0, cw, t, l, 0, dw - l - r, t);
    tileSlice(l, h - b, cw, b, l, dh - b, dw - l - r, b);
    tileSlice(0, t, l, ch, 0, t, l, dh - t - b);
    tileSlice(w - r, t, r, ch, dw - r, t, r, dh - t - b);
    tileSlice(l, t, cw, ch, l, t, dw - l - r, dh - t - b);

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

  // for calculating multi-page scroll positions
  function calculatePageScrollPositions() {
    const viewportHeight = chatViewport.clientHeight;
    const maxScroll = Math.max(0, chatViewport.scrollHeight - viewportHeight);

    if (maxScroll === 0) {
      return [0];
    }

    const messageRows = Array.from(messageList.querySelectorAll(".message-row"));
    if (messageRows.length === 0) {
      return [0];
    }

    const scrollPositions = [0];
    let currentScroll = 0;
    const MAX_PAGES = 30;

    while (scrollPositions.length < MAX_PAGES) {
      const bottomEdge = currentScroll + viewportHeight;

      let lastVisibleRow = null;
      for (let i = 0; i < messageRows.length; i++) {
        const row = messageRows[i];
        const rowTop = row.offsetTop;
        const rowBottom = rowTop + row.offsetHeight;

        if (rowTop < bottomEdge && rowBottom > currentScroll) {
          lastVisibleRow = row;
        }
      }

      if (!lastVisibleRow) {
        break;
      }

      const isVeryLastRow = lastVisibleRow === messageRows[messageRows.length - 1];
      const rowBottom = lastVisibleRow.offsetTop + lastVisibleRow.offsetHeight;
      if (isVeryLastRow && rowBottom <= bottomEdge) {
        break;
      }

      // use the previous last message as starting point
      let nextScroll = lastVisibleRow.offsetTop;

      // this is a guard below keep it
      if (nextScroll <= currentScroll) {
        nextScroll = currentScroll + Math.max(50, Math.floor(viewportHeight * 0.5));
      }

      nextScroll = Math.min(nextScroll, maxScroll);

      if (nextScroll <= currentScroll) {
        break;
      }

      scrollPositions.push(nextScroll);
      currentScroll = nextScroll;

      if (currentScroll >= maxScroll) {
        break;
      }
    }

    return scrollPositions;
  }

  // export engine, 9-slice bubble render & dom 2 image export
  async function exportConversation() {
    if (typeof domtoimage === "undefined") {
      alert("dom-to-image library is not loaded. Please refresh the page.");
      return;
    }

    if (!phoneFrame) return;

    const mainPane = document.getElementById("terminal-main-pane") || phoneFrame;
    const terminalWindowBody = document.getElementById("terminal-window-body");

    if (stickerPanel) stickerPanel.classList.add("hidden");
    if (emojiPickerPanel) emojiPickerPanel.classList.add("hidden");
    if (contextEmojiPicker) contextEmojiPicker.classList.add("hidden");
    if (contextStickerPicker) contextStickerPicker.classList.add("hidden");

    if (btnExportPng) btnExportPng.disabled = true;
    const originalBtnText = exportBtnText ? exportBtnText.textContent : "Export";
    if (exportBtnText) exportBtnText.textContent = "Exporting...";

    const originalScrollTop = chatViewport.scrollTop;

    const leftImg = new Image();
    leftImg.src = "rwxbaker-assets/deco/bg_message_left.png";
    const rightImg = new Image();
    rightImg.src = "rwxbaker-assets/deco/bg_message_right.png";

    // Ensure active watermark is loaded and attached (live stamp exists, fallback if removed)
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
      phoneFrame.appendChild(exportWatermarkEl);
    } else {
      liveStamp.src = activeWatermarkSrc;
    }

    const incomingTails = phoneFrame.querySelectorAll(".incoming .message-bubble.has-tail");
    const outgoingTails = phoneFrame.querySelectorAll(".outgoing .message-bubble.has-tail");

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

    const inputDecors = phoneFrame.querySelectorAll(".terminal-input-decoration");
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
      phoneFrame.classList.add("is-exporting");
      if (mainPane) mainPane.classList.add("is-exporting");
      const announceBannerEl = document.getElementById("terminal-announce-banner");
      if (announceBannerEl) announceBannerEl.style.setProperty("display", "none", "important");
      if (terminalWindowBody) {
        terminalWindowBody.style.removeProperty("background");
      }

      if (state.exportMode === "full") {
        // Full chat export (renders entire message viewport)
        phoneFrame.style.height = "auto";
        phoneFrame.style.maxHeight = "none";
        if (mainPane && mainPane !== phoneFrame) {
          mainPane.style.height = "auto";
          mainPane.style.maxHeight = "none";
        }
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

        const scale = (phoneFrame.offsetHeight * 2 > 12000) ? 1 : 2;
        const dataUrl = await domtoimage.toPng(phoneFrame, {
          scale: scale,
          style: {
            transform: "none",
            margin: "0",
            zoom: "1"
          },
          onclone: (cloned) => {
            cloned.style.transform = "none";
            cloned.style.zoom = "1";
          }
        });

        downloadDataUrl(dataUrl, "RWX-Baker-Full.png");

      } else if (state.exportMode === "screen") {
        chatViewport.style.overflow = "hidden";
        messageList.style.transform = `translateY(-${originalScrollTop}px)`;

        await new Promise((resolve) => setTimeout(resolve, 120));

        const dataUrl = await domtoimage.toPng(phoneFrame, {
          scale: 2,
          style: {
            transform: "none",
            margin: "0",
            zoom: "1"
          },
          onclone: (cloned) => {
            cloned.style.transform = "none";
            cloned.style.zoom = "1";
          }
        });

        downloadDataUrl(dataUrl, "RWX-Baker-Screen.png");

      } else if (state.exportMode === "paged") {
        // Multi-page export (renders viewport chunks by calculated scroll positions)
        const pages = calculatePageScrollPositions();

        for (let i = 0; i < pages.length; i++) {
          if (exportBtnText) exportBtnText.textContent = `Page ${i + 1}/${pages.length}...`;
          const scrollPos = pages[i];

          chatViewport.style.overflow = "hidden";
          messageList.style.transform = `translateY(-${scrollPos}px)`;

          await new Promise((resolve) => setTimeout(resolve, 120));

          const dataUrl = await domtoimage.toPng(phoneFrame, {
            scale: 2,
            style: {
              transform: "none",
              margin: "0",
              zoom: "1"
            },
            onclone: (cloned) => {
              cloned.style.transform = "none";
              cloned.style.zoom = "1";
            }
          });

          downloadDataUrl(dataUrl, `RWX-Baker-${i + 1}.png`);

          if (i < pages.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 300));
          }
        }
      }

      if (exportBtnText) exportBtnText.textContent = "Done!";
      await new Promise((resolve) => setTimeout(resolve, 900));
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed: " + (err.message || err));
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

      phoneFrame.classList.remove("is-exporting");
      if (announceBannerEl) announceBannerEl.style.removeProperty("display");
      if (mainPane) {
        mainPane.classList.remove("is-exporting");
        if (mainPane !== phoneFrame) {
          mainPane.style.height = "";
          mainPane.style.maxHeight = "";
        }
      }

      phoneFrame.style.height = "";
      phoneFrame.style.maxHeight = "";
      phoneFrame.style.transform = "";
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

  // save convo state to JSON  
  function saveConversationAsJson() {
    let charName = "Chat";
    if (state.conversationMode === "group") {
      charName = state.groupName ? state.groupName.trim() : "Group";
    } else if (state.activeCharacterId && CHARACTERS[state.activeCharacterId]) {
      charName = CHARACTERS[state.activeCharacterId].name;
    }

    const safeCharName = charName.replace(/\s+/g, "").replace(/[^a-zA-Z0-9_\u00C0-\u017F-]/g, "") || "Endfield";

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;
    const filename = `RWX-BakerChatWith-${safeCharName}-${dateStr}.json`;

    const exportData = {
      app: "RWX Baker",
      mode: "tablet",
      version: "1.0",
      savedAt: now.toISOString(),
      activeUser: state.activeUser,
      activeCharacterId: state.activeCharacterId,
      conversationMode: state.conversationMode,
      groupParticipantIds: state.groupParticipantIds || [],
      groupName: state.groupName || "",
      choices: state.choices || [],
      messages: state.messages || [],
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

  // load convo from JSON & drag drop support
  function loadConversationFromJson(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data) {
          alert("Invalid JSON file.");
          return;
        }

        // Cross-mode check: if file is from Terminal mode
        if (data.mode === "terminal" || (Array.isArray(data.terminalChannels) && !Array.isArray(data.messages))) {
          alert("This JSON file was created in Terminal mode.\nPlease switch to Terminal mode to import this multi-channel scenario.");
          return;
        }

        if (!Array.isArray(data.messages)) {
          alert("Invalid RWX Baker JSON file: 'messages' array not found.");
          return;
        }

        if (data.activeUser && (data.activeUser === "endminf" || data.activeUser === "endminm")) {
          state.activeUser = data.activeUser;
        }

        if (data.activeCharacterId && CHARACTERS[data.activeCharacterId]) {
          state.activeCharacterId = data.activeCharacterId;
        } else {
          state.activeCharacterId = data.activeCharacterId || null;
        }

        if (data.conversationMode === "group") {
          state.conversationMode = "group";
          contextPanelSection.classList.add("group-mode-active");
          btnConversationDirect.classList.remove("active");
          btnConversationGroup.classList.add("active");
          groupParticipants.classList.remove("hidden");
          state.groupParticipantIds = Array.isArray(data.groupParticipantIds) ? data.groupParticipantIds : [];
          state.groupName = data.groupName || "";
          if (groupNameInput) groupNameInput.value = state.groupName;
          renderGroupParticipants();
        } else {
          state.conversationMode = "direct";
          contextPanelSection.classList.remove("group-mode-active");
          btnConversationDirect.classList.add("active");
          btnConversationGroup.classList.remove("active");
          groupParticipants.classList.add("hidden");
          state.groupParticipantIds = [];
          state.groupName = "";
          if (groupNameInput) groupNameInput.value = "";
        }

        state.messages = data.messages || [];
        state.choices = Array.isArray(data.choices) ? data.choices : [];
        state.selectedMessageId = null;
        btnClearConversation.classList.remove("highlight-pulse");

        exitEditMode();
        renderCharacterList(characterSearchInput ? characterSearchInput.value : "");
        renderChoices();
        updateUI();
        scrollToBottom();

      } catch (err) {
        console.error("Failed to parse JSON file:", err);
        alert("Failed to load JSON file. Please ensure it is a valid RWX Baker chat backup.");
      }
    };
    reader.readAsText(file);
  }

    // persistent sync
  function savePersistentConversation() {
    try {
      if (typeof syncActiveTerminalChannel === "function") {
        syncActiveTerminalChannel();
      }
      const payload = {
        activeUser: state.activeUser,
        activeCharacterId: state.activeCharacterId,
        conversationMode: state.conversationMode,
        groupParticipantIds: state.groupParticipantIds || [],
        groupName: state.groupName || "",
        messages: state.messages || [],
        choices: state.choices || [],
        exportMode: state.exportMode || "screen",
        terminalChannels: typeof terminalChannels !== "undefined" ? terminalChannels : [],
        activeTerminalChannelId: typeof activeTerminalChannelId !== "undefined" ? activeTerminalChannelId : null,
        timestamp: Date.now()
      };
      localStorage.setItem("rwx_persistent_conversation", JSON.stringify(payload));
    } catch (e) {
      console.warn("Could not save persistent conversation:", e);
    }
  }

  function loadPersistentConversation() {
    try {
      const raw = localStorage.getItem("rwx_persistent_conversation");
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data || !Array.isArray(data.messages)) return false;

      // If messages only contain a single auto-generated channel telemetry message and tutorial was never cleared, prefer tutorial template
      const isAutoTelemetryOnly =
        data.messages.length === 1 &&
        data.messages[0].text &&
        (data.messages[0].text.includes("established") || data.messages[0].text.includes("Ready for transmission"));

      if (isAutoTelemetryOnly && localStorage.getItem("rwx_tutorial_cleared") !== "true" && window.RWX_TUTORIAL_TEMPLATE) {
        return false;
      }

      state.activeUser = (data.activeUser === "endminf" || data.activeUser === "endminm") ? data.activeUser : "endminf";
      state.activeCharacterId = (data.activeCharacterId && CHARACTERS[data.activeCharacterId]) ? data.activeCharacterId : null;
      state.conversationMode = data.conversationMode || "direct";
      state.groupParticipantIds = Array.isArray(data.groupParticipantIds) ? data.groupParticipantIds : [];
      state.groupName = data.groupName || "";
      state.messages = data.messages || [];
      state.choices = Array.isArray(data.choices) ? data.choices : [];
      state.exportMode = data.exportMode || "screen";

      if (Array.isArray(data.terminalChannels) && data.terminalChannels.length > 0) {
        terminalChannels = data.terminalChannels;
        const ops = terminalChannels.find((c) => c.id === "channel-ops-4" || c.name === "Habitation Sector 4 Ops");
        if (ops) {
          ops.name = "Endfield Crisis Team";
          ops.groupName = "Endfield Crisis Team";
          ops.groupParticipantIds = ["pelica", "chen", "wolfgard"];
          if (Array.isArray(ops.messages)) {
            ops.messages.forEach((m) => {
              if (m.characterId === "boundary") {
                m.characterId = "chen";
                m.text = "Easy peasy! Very straightforward huh? Hehe~";
              } else if (m.characterId === "wolfgard" && m.id === "m_ops_1") {
                m.text = "Endmin, do you copy? This is a test message for the terminal group feature!";
              }
            });
          }
        }
      }
      if (data.activeTerminalChannelId) {
        activeTerminalChannelId = data.activeTerminalChannelId;
      }
      return true;
    } catch (e) {
      console.warn("Could not load persistent conversation:", e);
      return false;
    }
  }

  function loadTutorialTemplate() {
    const tutorial = window.RWX_TUTORIAL_TEMPLATE;
    if (!tutorial) return;
    state.activeUser = tutorial.activeUser || "endminf";
    state.activeCharacterId = tutorial.activeCharacterId || "laevatain";
    state.conversationMode = tutorial.conversationMode || "direct";
    state.groupParticipantIds = Array.isArray(tutorial.groupParticipantIds) ? [...tutorial.groupParticipantIds] : [];
    state.groupName = tutorial.groupName || "";
    state.messages = JSON.parse(JSON.stringify(tutorial.messages || []));
    state.choices = Array.isArray(tutorial.choices) ? [...tutorial.choices] : [];
    state.selectedMessageId = null;

    if (contextPanelSection) contextPanelSection.classList.remove("group-mode-active");
    if (btnConversationDirect) btnConversationDirect.classList.add("active");
    if (btnConversationGroup) btnConversationGroup.classList.remove("active");
    if (groupParticipants) groupParticipants.classList.add("hidden");
    if (groupNameInput) groupNameInput.value = "";

    setInputValueFromStructuredText(choiceInputOne, "");
    setInputValueFromStructuredText(choiceInputTwo, "");

    exitEditMode();
    if (btnClearConversation) btnClearConversation.classList.remove("highlight-pulse");

    try {
      localStorage.removeItem("rwx_tutorial_cleared");
      localStorage.setItem("rwx_tutorial_version", CURRENT_TUTORIAL_VERSION);
    } catch (_) {}

    renderCharacterList(characterSearchInput ? characterSearchInput.value : "");
    renderGroupParticipants();
    renderConversation();
    renderChoices();
    updateUI();
    savePersistentConversation();
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      chatViewport.scrollTop = chatViewport.scrollHeight;
    });
  }

    // particle field
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

    document.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    document.addEventListener("mouseleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    let ripples = [];
    document.addEventListener("click", (e) => {
      // Only ripple on empty background / non-interactive space
      if (e.target.closest("a, button, input, textarea, select, .editor-panel, #phone-frame, .help-modal-card")) return;
      ripples.push({ x: e.clientX, y: e.clientY, born: performance.now() });
    });

    const RIPPLE_LIFE_MS = 900;
    const RIPPLE_MAX_R = 150;

    function drawRipples(now) {
      ripples = ripples.filter((rp) => now - rp.born < RIPPLE_LIFE_MS);
      for (const rp of ripples) {
        const t = (now - rp.born) / RIPPLE_LIFE_MS;
        const r = t * RIPPLE_MAX_R;
        const alpha = 0.5 * (1 - t);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(155,109,255,${alpha})`;
        ctx.lineWidth = 2;
        ctx.arc(rp.x, rp.y, r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(79,195,255,${alpha * 0.7})`;
        ctx.lineWidth = 1;
        ctx.arc(rp.x, rp.y, r * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.02;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const f = (130 - dist) / 130;
          p.x += (dx / dist) * f * 2;
          p.y += (dy / dist) * f * 2;
        }
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
      drawRipples(performance.now());
      requestAnimationFrame(tick);
    }
    tick();
  }

  // Run initialization
  init();
});
