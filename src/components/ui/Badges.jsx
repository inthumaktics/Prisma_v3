import { zoneOf, zName } from '../../data/companies';

export function ZonePill({ score, style }) {
  const z = zoneOf(score);
  return (
    <span className={`zone ${z}`} style={style}>
      <span className="d" />
      {zName[z]}
    </span>
  );
}

export function CstTag({ status }) {
  const map = { ok: ['Terverifikasi', 'ok'], dup: ['Terindikasi ganda', 'dup'], rej: ['Ditolak', 'rej'] };
  const [label, cls] = map[status] || ['—', ''];
  return <span className={`cst-tag ${cls}`}>{label}</span>;
}
