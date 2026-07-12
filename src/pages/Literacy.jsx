import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { articles, videos, glossary, sources } from '../data/education';

export default function Literacy() {
  const { openModal } = useApp();

  const openArticle = (i) => {
    const a = articles[i];
    openModal(
      <>
        <div className="mtop" style={{ background: a.col }}>
          <span className="cat">{a.c} · {a.r}</span>
        </div>
        <div className="mb">
          <h3>{a.t}</h3>
          <p>{a.s}</p>
          <p style={{ color: 'var(--faint)', fontSize: 12 }}>Artikel edukatif — bagian dari Ruang Literasi PRISMA (konten ilustratif).</p>
        </div>
      </>
    );
  };

  const openVideo = (i) => {
    const v = videos[i];
    openModal(
      <>
        <div className="mtop" style={{ background: v.col, height: 200, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
          <div className="play">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#145858"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div className="mb">
          <h3>{v.title}</h3>
          <p>Durasi {v.duration}. Video penjelas singkat untuk investor ritel &amp; publik.</p>
          <p style={{ color: 'var(--faint)', fontSize: 12 }}>Pemutar video ilustratif (prototipe).</p>
        </div>
      </>
    );
  };

  return (
    <div className="view">
      {/* Hero Banner */}
      <div className="lit-hero">
        <div className="l">
          <div className="k">Sorotan</div>
          <h3>Greenwashing dalam 3 menit</h3>
          <p>Pahami mengapa laporan keberlanjutan yang tebal belum tentu jujur — dan bagaimana membaca skor kredibilitas untuk melihat perbedaannya.</p>
          <button className="btn pri" style={{ marginTop: 18 }} onClick={() => openArticle(0)}>Tonton sekarang ▸</button>
        </div>
        <div className="r" style={{ background: 'linear-gradient(150deg,#C8E0CA,#9FCBA6)' }}>
          <div className="play" onClick={() => openArticle(0)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#145858"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="sec-h">
        <div className="k">Panduan Singkat</div>
        <h2>Bacaan untuk semua orang</h2>
        <p>Materi terbuka untuk investor ritel, mahasiswa, dan publik — karena kepercayaan pasar butuh pemahaman, bukan sekadar angka.</p>
      </div>
      <div className="artgrid">
        {articles.map((a, i) => (
          <div className="art" key={i} onClick={() => openArticle(i)}>
            <div className="thumb" style={{ background: a.col }}>
              <span className="cat">{a.c}</span>
            </div>
            <div className="b">
              <h4>{a.t}</h4>
              <div className="meta">
                <span>📖 {a.r}</span>
                <span>Baca →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Videos */}
      <div className="sec-h">
        <div className="k">Video Penjelas</div>
        <h2>Belajar cepat lewat video</h2>
      </div>
      <div className="vidgrid">
        {videos.map((v, i) => (
          <div className="vid" key={i} onClick={() => openVideo(i)}>
            <div className="th" style={{ background: v.col }}>
              <div className="pl">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#145858"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span className="dur">{v.duration}</span>
            </div>
            <div className="b">{v.title}</div>
          </div>
        ))}
      </div>

      {/* Glossary + Sources */}
      <div className="grid g-2" style={{ marginTop: 24 }}>
        <div className="card">
          <div className="chead">
            <div>
              <h3>Glosarium ESG</h3>
              <div className="cap">Istilah penting, dijelaskan sederhana</div>
            </div>
          </div>
          <GlossaryList />
        </div>
        <div className="card">
          <div className="chead">
            <div>
              <h3>Perpustakaan Sumber Tepercaya</h3>
              <div className="cap">Regulasi &amp; standar resmi, dikurasi</div>
            </div>
          </div>
          <SourceList />
        </div>
      </div>
    </div>
  );
}

function GlossaryList() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="gloss">
      {glossary.map(([term, def], i) => (
        <div className={`item${openIdx === i ? ' open' : ''}`} key={i}>
          <button className="q" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
            {term}
            <span className="ic">
              <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.8" fill="none">
                <path d="M8 3v10M3 8h10"/>
              </svg>
            </span>
          </button>
          <div className="a">{def}</div>
        </div>
      ))}
    </div>
  );
}

function SourceList() {
  return (
    <div>
      {sources.map(([name, org]) => (
        <div className="srcrow" key={name}>
          <span className="ic">
            <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="#145858" strokeWidth="1.5">
              <path d="M4 3h7l3 3v9H4z"/><path d="M11 3v3h3"/>
            </svg>
          </span>
          <div className="info">
            <div className="nm">{name}</div>
            <div className="og">{org}</div>
          </div>
          <span className="go">Buka →</span>
        </div>
      ))}
    </div>
  );
}
