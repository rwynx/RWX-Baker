/**
 * RWX Baker - Character, User, and Media Asset Registries
 * Shared across Studio (index.html) and Terminal Mode (terminal.html)
 */

window.CHARACTERS = {
  // Operators
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

window.USERS = {
  endminf: { id: "endminf", name: "Endmin (F)", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0003_endminf.png" },
  endminm: { id: "endminm", name: "Endmin (M)", avatar: "rwxbaker-assets/avatars/operator/icon_round_chr_0002_endminm.png" },
};

const stickerAssetRoot = "rwxbaker-assets/stickers/";
window.STICKERS = [
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

window.GAME_EMOJIS = Array.from({ length: 38 }, (_, i) => {
  const num = String(i + 1).padStart(3, "0");
  return `rwxbaker-assets/emoji/sns_emoji_${num}.png`;
});

