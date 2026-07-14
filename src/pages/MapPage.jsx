import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { companies, zoneOf, zClr, zName } from '../data/companies';
import { useApp } from '../context/AppContext';

const companiesWithCoords = companies.map(c => {
  // Map SVG coordinates [mx, my] (box 900x420) to Indonesia geographic coordinates
  // Longitude: 95.0 to 141.0
  // Latitude: 6.0 to -11.0
  const lng = 95.0 + (c.mx / 900) * 46.0;
  const lat = 6.0 - (c.my / 420) * 17.0;
  return {
    ...c,
    lngLat: [lng, lat]
  };
});

const sorted = [...companiesWithCoords].sort((a, b) => b.em - a.em);

export default function MapPage() {
  const { openDrawer } = useApp();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (mapRef.current) return;

    // Initialize MapLibre GL Map
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      center: [118.0, -2.5], // Center of Indonesia
      zoom: 4.6, // Fit Indonesian archipelago
      minZoom: 4,
      maxZoom: 15
    });

    // Add navigation controls (Zoom + Pan)
    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');

    mapRef.current = map;

    // Add markers for all companies
    companiesWithCoords.forEach(c => {
      const z = zoneOf(c.score);
      const zoneClass = z === 'g' ? 'map-marker-green' : z === 'y' ? 'map-marker-yellow' : 'map-marker-red';

      // Create Custom Pulse Element
      const el = document.createElement('div');
      el.className = `map-marker ${zoneClass}`;
      el.style.backgroundColor = zClr[z];

      // Create Popup Content
      const popupContent = document.createElement('div');
      popupContent.className = 'map-popup-card';
      popupContent.innerHTML = `
        <div style="font-size: 13px; font-weight: 700; margin-bottom: 2px; color: var(--text);">${c.nm}</div>
        <div style="font-size: 11px; color: var(--muted); margin-bottom: 8px;">${c.sec}</div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; gap: 12px;">
          <div>
            <div style="font-size: 9px; color: var(--muted); text-transform: uppercase;">ESG Score</div>
            <div style="font-size: 16px; font-weight: 800; color: ${zClr[z]};">${c.score}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 9px; color: var(--muted); text-transform: uppercase;">Zona Kredibilitas</div>
            <div style="font-size: 11px; font-weight: 600; color: ${zClr[z]};">${zName[z]}</div>
          </div>
        </div>

        <div style="font-size: 10px; margin-bottom: 10px; display: flex; align-items: center; gap: 4px; color: var(--text);">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${zClr[z]};"></span>
          <strong>Status:</strong> ${c.score >= 75 ? 'Terverifikasi Kredibel' : c.score >= 50 ? 'Butuh Perhatian' : 'Divergensi Tinggi'}
        </div>

        <button class="popup-detail-btn-${c.tk}" style="width: 100%; border: none; padding: 6px 12px; border-radius: 6px; background: var(--teal); color: white; cursor: pointer; font-size: 11px; font-weight: 600; text-align: center; transition: background 0.15s;">
          Lihat Detail
        </button>
      `;

      // Create Popup
      const popup = new maplibregl.Popup({
        closeButton: true,
        closeOnClick: true,
        className: 'maplibre-popup',
        offset: 12
      }).setDOMContent(popupContent);

      // Bind detail button inside popup
      popup.on('open', () => {
        const btn = document.querySelector(`.popup-detail-btn-${c.tk}`);
        if (btn) {
          btn.addEventListener('click', () => {
            openDrawer(c);
          });
        }
      });

      // Initialize Marker
      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(c.lngLat)
        .setPopup(popup)
        .addTo(map);

      markersRef.current[c.tk] = marker;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [openDrawer]);

  const handleCompanyClick = (c) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: c.lngLat,
        zoom: 8,
        essential: true,
        duration: 1500
      });
      
      const marker = markersRef.current[c.tk];
      if (marker) {
        // Toggle popup open
        const popup = marker.getPopup();
        if (popup && !popup.isOpen()) {
          marker.togglePopup();
        }
      }
    }
  };

  return (
    <div className="view">
      <div className="map-grid">
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="chead" style={{ marginBottom: 12 }}>
            <div>
              <h3>Peta Kredibilitas ESG Indonesia</h3>
              <div className="cap">Sebaran fasilitas emiten terpantau satelit secara interaktif</div>
            </div>
          </div>
          
          <div ref={mapContainerRef} className="maplibre-wrap" style={{ flex: 1 }} />
          
          {/* Map Legend */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginTop: 16, 
            padding: '12px 16px', 
            background: 'var(--bg-card-hover)', 
            borderRadius: '8px',
            border: '1px solid var(--line-2)',
            flexWrap: 'wrap',
            gap: 12
          }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text)' }}>
              Legenda Kredibilitas:
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: '11px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="map-marker" style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--green)', border: '1px solid #fff', boxShadow: 'none' }} />
                <span>Tinggi (Score ≥ 75)</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="map-marker" style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--amber)', border: '1px solid #fff', boxShadow: 'none' }} />
                <span>Sedang (Score 50-74)</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="map-marker" style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--red)', border: '1px solid #fff', boxShadow: 'none' }} />
                <span>Rendah (Score &lt; 50)</span>
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="chead">
            <div>
              <h3>Fasilitas Terpantau</h3>
              <div className="cap">Klik untuk memperbesar lokasi peta</div>
            </div>
          </div>
          <div className="maplist">
            {sorted.map(d => {
              const z = zoneOf(d.score);
              return (
                <div className="m" key={d.tk} onClick={() => handleCompanyClick(d)}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: zClr[z], flex: 'none' }}/>
                  <div className="info">
                    <div className="em">{d.tk} · {d.sec}</div>
                    <div className="ee">{d.nm}</div>
                  </div>
                  <div className="val" style={{ color: zClr[z] }}>{d.em.toFixed(1)} Mt</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="disc" style={{ marginTop: 16 }}>
        Peta interaktif menggunakan data koordinat fasilitas riil di Indonesia.
        Divergensi antara emisi tercitra satelit dan laporan ESG menentukan tingkat kredibilitas (warna penanda).
      </p>
    </div>
  );
}
