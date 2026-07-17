import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DM_TOPICS } from '../constants/dmTopics';
import { 
  Leaf, Droplet, AlertCircle, RefreshCw, HelpCircle, 
  Users, Building, ShieldCheck, Shield, Check, ChevronDown, ChevronUp, Sparkles, Star 
} from 'lucide-react';
import { dmF } from '../utils/dmMath';

// Icon mapping for ESRS Topics
const TOPIC_ICONS = {
  E1: <Leaf size={18} style={{ color: 'var(--green)' }} />,
  E2: <AlertCircle size={18} style={{ color: 'var(--red)' }} />,
  E3: <Droplet size={18} style={{ color: '#2E9C8F' }} />,
  E4: <Star size={18} style={{ color: '#5B8C3A' }} />,
  E5: <RefreshCw size={18} style={{ color: '#7A5EA8' }} />,
  S1: <Users size={18} style={{ color: '#4C6EAD' }} />,
  S2: <Building size={18} style={{ color: '#C88A2A' }} />,
  S3: <Users size={18} style={{ color: '#A0475F' }} />,
  S4: <ShieldCheck size={18} style={{ color: '#145858' }} />,
  G1: <Shield size={18} style={{ color: 'var(--green)' }} />
};

export default function MaterialityMatrix({ assessment, activeId, onSubTopicSelect }) {
  const [activeTab, setActiveTab] = useState('e'); // 'e', 's', 'g'
  const [expandedTopic, setExpandedTopic] = useState(null);

  if (!assessment) return null;

  const toggleTopic = (code) => {
    setExpandedTopic(prev => (prev === code ? null : code));
  };

  // Filter topics based on active tab
  const filteredTopics = DM_TOPICS.filter(t => t.p === activeTab);

  // Total topics count helper
  const totalTopics = DM_TOPICS.length;
  const totalSubTopics = DM_TOPICS.reduce((sum, t) => sum + t.subs.length, 0);

  return (
    <div className="mat-card-dashboard mat-section-spacer">
      <style>{`
        .dm-topics-header-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .dm-stat-card {
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }
        .dm-stat-icon-wrapper {
          padding: 10px;
          border-radius: 8px;
          background: rgba(47, 158, 107, 0.08);
          color: var(--green);
          display: flex;
        }
        .dm-stat-info {
          display: flex;
          flex-direction: column;
        }
        .dm-stat-lbl {
          font-size: 11px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .dm-stat-val {
          font-size: 20px;
          font-weight: 800;
          color: var(--ink);
          margin-top: 2px;
        }
        .dm-tabs-container {
          display: flex;
          border-bottom: 1px solid var(--line);
          margin-bottom: 24px;
          gap: 24px;
        }
        .dm-tab-btn {
          padding: 12px 4px;
          font-size: 14px;
          font-weight: 700;
          color: var(--muted);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dm-tab-btn:hover {
          color: var(--green);
        }
        .dm-tab-btn.active {
          color: var(--green);
          border-bottom-color: var(--green);
        }
        .dm-grid-topics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          align-items: start;
        }
        .dm-topic-card {
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 16px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .dm-topic-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.04);
          border-color: rgba(47, 158, 107, 0.25);
        }
        .dm-topic-card-header {
          padding: 20px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .dm-topic-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .dm-topic-badge-code {
          font-size: 11px;
          font-weight: 800;
          color: var(--muted);
          background: #F1F3F5;
          padding: 3px 8px;
          border-radius: 6px;
          font-family: var(--mono);
        }
        .dm-topic-title-area {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .dm-topic-title-text {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.4;
        }
        .dm-topic-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: var(--muted);
          margin-top: 4px;
        }
        .dm-progress-track {
          height: 6px;
          background: var(--ring);
          border-radius: 99px;
          overflow: hidden;
          margin-top: 8px;
        }
        .dm-progress-bar {
          height: 100%;
          border-radius: 99px;
          background: var(--green);
        }
        .dm-subtopics-list {
          padding: 0 16px 16px 16px;
          background: #FAFAFB;
          border-top: 1px dashed var(--line);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .dm-subtopic-mini-card {
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 12px 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .dm-subtopic-mini-card:hover {
          border-color: var(--green);
          box-shadow: 0 2px 6px rgba(47, 158, 107, 0.08);
        }
        .dm-subtopic-mini-card.active {
          border-color: var(--green);
          background: rgba(47, 158, 107, 0.03);
          box-shadow: inset 3px 0 0 var(--green);
        }
        .dm-sub-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
        }
        .dm-sub-name {
          font-size: 12px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.4;
        }
        .dm-sub-metrics {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          margin-top: 4px;
        }
        .dm-sub-metric-box {
          color: var(--muted);
        }
        .dm-sub-metric-val {
          font-weight: 700;
          color: var(--ink);
          margin-left: 4px;
          font-family: var(--mono);
        }
        .dm-legend-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
          padding: 16px;
          background: #FAFAFB;
          border: 1px solid var(--line);
          border-radius: 12px;
        }
        .dm-legend-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid var(--line);
          background: var(--white);
        }
      `}</style>

      {/* HEADER SECTION WITH STATS CARDS */}
      <h2 className="mat-card-title">Double Materiality Topics</h2>
      <p className="mat-card-subtitle" style={{ marginBottom: '24px' }}>
        Daftar lengkap pilar ESG berdasarkan standar European Sustainability Reporting Standards (ESRS). Klik kartu topik untuk melihat sub-topik terperinci.
      </p>

      <div className="dm-topics-header-stats">
        <div className="dm-stat-card">
          <div className="dm-stat-icon-wrapper">
            <Shield size={20} />
          </div>
          <div className="dm-stat-info">
            <span className="dm-stat-lbl">Double Materiality Topics</span>
            <span className="dm-stat-val">{totalTopics} Topics</span>
          </div>
        </div>
        <div className="dm-stat-card">
          <div className="dm-stat-icon-wrapper">
            <Sparkles size={20} />
          </div>
          <div className="dm-stat-info">
            <span className="dm-stat-lbl">Sub-Topics Audited</span>
            <span className="dm-stat-val">{totalSubTopics} Sub-Topics</span>
          </div>
        </div>
        <div className="dm-stat-card">
          <div className="dm-stat-icon-wrapper">
            <ShieldCheck size={20} />
          </div>
          <div className="dm-stat-info">
            <span className="dm-stat-lbl">Verification Status</span>
            <span className="dm-stat-val" style={{ color: 'var(--green)' }}>AI Verified</span>
          </div>
        </div>
      </div>

      {/* TABBED INTERFACE */}
      <div className="dm-tabs-container">
        {[
          { id: 'e', label: 'Environment', count: DM_TOPICS.filter(t => t.p === 'e').length },
          { id: 's', label: 'Social', count: DM_TOPICS.filter(t => t.p === 's').length },
          { id: 'g', label: 'Governance', count: DM_TOPICS.filter(t => t.p === 'g').length }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setExpandedTopic(null); // Reset accordion on tab change
            }}
            className={`dm-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.id === 'e' && <Leaf size={16} />}
            {tab.id === 's' && <Users size={16} />}
            {tab.id === 'g' && <Shield size={16} />}
            {tab.label}
            <span style={{ fontSize: '10px', background: activeTab === tab.id ? 'rgba(47, 158, 107, 0.1)' : '#F1F3F5', padding: '1px 6px', borderRadius: '4px', color: activeTab === tab.id ? 'var(--green)' : 'var(--muted)', fontWeight: 'bold' }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* TOPIC GRID */}
      <div className="dm-grid-topics">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedTopic === topic.code;
          
          // Calculate stats for this topic dynamically based on its subtopics
          const topicSubs = topic.subs;
          const subDetails = topicSubs.map(([id, name]) => {
            const result = assessment[id] || {};
            return { id, name, ...result };
          });

          // Calculate average credibility percentage
          const avgGap = subDetails.reduce((sum, s) => sum + (s.gap || 0), 0) / topicSubs.length;
          const credibilityPercent = Math.max(50, Math.round(100 - (avgGap * 10)));
          
          // Set status label and colors
          let badgeColor = 'var(--green)';
          let statusText = 'Verified';
          if (avgGap >= 3.0) {
            badgeColor = 'var(--red)';
            statusText = 'Divergent';
          } else if (avgGap >= 1.5) {
            badgeColor = 'var(--amber)';
            statusText = 'Needs Review';
          }

          return (
            <div key={topic.code} className="dm-topic-card">
              <div 
                className="dm-topic-card-header"
                onClick={() => toggleTopic(topic.code)}
              >
                <div className="dm-topic-top-row">
                  <span className="dm-topic-badge-code">{topic.code}</span>
                  <span className="zone" style={{ fontSize: '10px', color: badgeColor, background: `${badgeColor}0A`, border: `1px solid ${badgeColor}1B`, padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                    {statusText}
                  </span>
                </div>

                <div className="dm-topic-title-area">
                  <div style={{ marginTop: '2px' }}>
                    {TOPIC_ICONS[topic.code]}
                  </div>
                  <span className="dm-topic-title-text">{topic.name}</span>
                </div>

                <div className="dm-topic-meta-row">
                  <span>{topicSubs.length} Sub-topics</span>
                  <span className="mono" style={{ fontWeight: '700', color: 'var(--ink)' }}>{credibilityPercent}% Credibility</span>
                </div>

                <div className="dm-progress-track">
                  <motion.div 
                    className="dm-progress-bar"
                    style={{ background: badgeColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${credibilityPercent}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--muted)', marginTop: '8px' }}>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* ACCORDION DRAWER */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="dm-subtopics-list">
                      <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700', margin: '12px 0 2px 0', textTransform: 'uppercase' }}>Sub-Topics Detail</div>
                      {subDetails.map((sub) => {
                        const isSubActive = sub.id === activeId;
                        let subBadgeColor = 'var(--green)';
                        let subStatus = 'Verified';
                        if (sub.gap >= 3.0) {
                          subBadgeColor = 'var(--red)';
                          subStatus = 'Divergent';
                        } else if (sub.gap >= 1.5) {
                          subBadgeColor = 'var(--amber)';
                          subStatus = 'Review';
                        }

                        return (
                          <div 
                            key={sub.id}
                            className={`dm-subtopic-mini-card ${isSubActive ? 'active' : ''}`}
                            onClick={() => onSubTopicSelect?.(sub.id)}
                          >
                            <div className="dm-sub-header">
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                <span style={{ color: 'var(--green)', marginTop: '2px', display: 'flex' }}>
                                  <Check size={14} />
                                </span>
                                <span className="dm-sub-name">{sub.name}</span>
                              </div>
                              <span style={{ fontSize: '9px', fontWeight: '700', color: subBadgeColor, background: `${subBadgeColor}0A`, border: `1px solid ${subBadgeColor}15`, padding: '1px 6px', borderRadius: '3px' }}>
                                {subStatus}
                              </span>
                            </div>

                            <div className="dm-sub-metrics">
                              <span className="dm-sub-metric-box">
                                Impact: <strong className="dm-sub-metric-val">{dmF(sub.imNeg)}</strong>
                              </span>
                              <span className="dm-sub-metric-box">
                                Gap: <strong className="dm-sub-metric-val" style={{ color: sub.gap >= 1.5 ? subBadgeColor : 'var(--ink)' }}>+{dmF(sub.gap)}</strong>
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* HORIZONTAL LEGEND CHIPS */}
      <div className="dm-legend-chips">
        <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700', alignSelf: 'center', marginRight: '8px' }}>Pilar Verifikasi:</div>
        
        <div className="dm-legend-chip">
          <svg width="10" height="10" viewBox="0 0 20 20" style={{ marginRight: '2px' }}>
            <circle cx="10" cy="10" r="9" fill="#2F9E6B"/>
            <path d="M10 5.5v9M5.5 10h9" stroke="#fff" strokeWidth="2.2"/>
          </svg>
          Positive Claim
        </div>

        <div className="dm-legend-chip">
          <svg width="10" height="10" viewBox="0 0 20 20" style={{ marginRight: '2px' }}>
            <rect x="2" y="4" width="3.4" height="12" rx="1" fill="#2E9C8F"/>
            <rect x="8.3" y="8" width="3.4" height="8" rx="1" fill="#2E9C8F"/>
            <rect x="14.6" y="1.5" width="3.4" height="14.5" rx="1" fill="#2E9C8F"/>
          </svg>
          Opportunity
        </div>

        <div className="dm-legend-chip">
          <svg width="10" height="10" viewBox="0 0 20 20" style={{ marginRight: '2px' }}>
            <rect x="2" y="4" width="3.4" height="12" rx="1" fill="#D9564C"/>
            <rect x="8.3" y="8" width="3.4" height="8" rx="1" fill="#D9564C"/>
            <rect x="14.6" y="1.5" width="3.4" height="14.5" rx="1" fill="#D9564C"/>
          </svg>
          Risk Exposure
        </div>

        <div className="dm-legend-chip">
          <svg width="10" height="10" viewBox="0 0 20 20" style={{ marginRight: '2px' }}>
            <circle cx="10" cy="10" r="9" fill="#D9564C"/>
            <path d="M5.5 10h9" stroke="#fff" strokeWidth="2.2"/>
          </svg>
          Negative Claim
        </div>

        <div className="dm-legend-chip">
          <svg width="10" height="10" viewBox="0 0 20 20" style={{ marginRight: '2px' }}>
            <circle cx="10" cy="10" r="8.2" fill="none" stroke="#F7B318" strokeWidth="2.4" strokeDasharray="3 2"/>
            <path d="M10 5.6v5.2M10 13.4v.1" stroke="#F7B318" strokeWidth="2.2"/>
          </svg>
          Credibility Gap
        </div>

        <div className="dm-legend-chip">
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)' }} />
          Verified
        </div>
      </div>
    </div>
  );
}
