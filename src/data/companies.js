import { RAW_GENERATED } from "../../prisma-data.js";

const LOGO_COLORS = ["#2F9E6B","#2E8B7E","#145858","#7A5EA8","#C88A2A","#5B8C3A","#B0553F","#417C86","#8A6A22","#A0475F","#4C6EAD","#1C7B72"];

const RAW = RAW_GENERATED;

const HASH_CHARS = "0123456789abcdef";

export const companies = RAW.map((r, i) => {
  const tk = r[0], nm = r[1], sec = r[2], score = r[3], fin = r[4],
        imp = r[5], conf = r[6], trend = r[7], claims = r[8],
        mx = r[9], my = r[10], em = r[11];
  const ini = tk.slice(0, 2);
  const col = LOGO_COLORS[i % LOGO_COLORS.length];
  let hash = "0x";
  for (let j = 0; j < 40; j++) hash += HASH_CHARS[(i * 7 + j * 13) % 16];
  const ts = `2026-06-${String(9 + (i % 19)).padStart(2,"0")}T0${i % 9}:${String(10 + i).slice(-2)}:00Z`;
  const hist = [
    score - trend * 3,
    score - 5 + (i % 3),
    score - 2,
    score - 1,
    score - (trend < 0 ? 1 : -1),
    score
  ];
  return { tk, nm, sec, score, fin, imp, conf, trend, claims, mx, my, em, ini, col, hash, ts, hist };
});

export const zoneOf = s => s >= 75 ? "g" : s >= 50 ? "y" : "r";
export const zName = { g: "Hijau", y: "Kuning", r: "Merah" };
export const zClr  = { g: "#2F9E6B", y: "#F7B318", r: "#D9564C" };
export const sColor = s => s >= 75 ? "var(--green)" : s >= 50 ? "var(--amber)" : "var(--red)";
