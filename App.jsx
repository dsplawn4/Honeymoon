import { useState } from 'react'
import { destinations, legInfo, flights } from './data.js'

const G = "#D4A84B"
const GDIM = "rgba(212,168,75,0.25)"
const BG = "#0C0B09"
const SURF = "#141210"
const MUTED = "#7A7060"
const TEXT = "#E8E0D0"

function ImageGrid({ images }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, background: "#000" }}>
      {images.map((img, i) => (
        <div key={i} style={{ position: "relative", overflow: "hidden", background: "#1a1714" }}>
          <img
            src={img.url}
            alt={img.caption}
            style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
            onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex" }}
          />
          <div style={{ display: "none", aspectRatio: "4/3", alignItems: "center", justifyContent: "center", background: "#1a1714", fontSize: 10, color: MUTED }}>
            {img.caption}
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.65))", padding: "20px 8px 6px", fontSize: 9, color: "rgba(255,255,255,0.75)", letterSpacing: 1 }}>
            {img.caption}
          </div>
        </div>
      ))}
    </div>
  )
}

function DestCard({ dest }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border: `1px solid ${open ? "rgba(212,168,75,0.4)" : "rgba(255,255,255,0.07)"}`, marginBottom: 3, transition: "border-color 0.3s" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ display: "grid", gridTemplateColumns: "70px 1fr 32px", alignItems: "center", gap: 12, padding: "18px 20px", cursor: "pointer", background: open ? "rgba(212,168,75,0.07)" : SURF, userSelect: "none" }}
      >
        <div>
          <div style={{ fontSize: 9, letterSpacing: 2, color: MUTED, marginBottom: 3 }}>{dest.days}</div>
          <div style={{ fontSize: 9, letterSpacing: 2, color: G }}>{dest.dates}</div>
        </div>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: dest.type === "summit" ? 15 : 17, fontWeight: dest.type === "summit" ? 700 : 400, color: dest.type === "summit" ? G : TEXT, lineHeight: 1.3 }}>
          {dest.name}
        </div>
        <div style={{ width: 28, height: 28, border: `1px solid ${open ? GDIM : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: open ? G : MUTED, fontSize: 20, transform: open ? "rotate(45deg)" : "none", transition: "all 0.25s", flexShrink: 0 }}>
          +
        </div>
      </div>

      {open && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <ImageGrid images={dest.images} />
            <div style={{ padding: "24px 20px", background: SURF, overflowY: "auto", maxHeight: 500 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 14, fontStyle: "italic", color: G, marginBottom: 12, lineHeight: 1.45 }}>
                "{dest.tagline}"
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.8, color: MUTED, marginBottom: 18 }}>{dest.overview}</p>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 8, letterSpacing: 4, textTransform: "uppercase", color: G, marginBottom: 8 }}>Itinerary</div>
                {dest.itinerary.map((item, i) => (
                  <div key={i} style={{ fontSize: 11, lineHeight: 1.6, color: TEXT, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: 8 }}>
                    <span style={{ color: G, flexShrink: 0 }}>–</span>{item}
                  </div>
                ))}
              </div>

              {dest.wildlife.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 8, letterSpacing: 4, textTransform: "uppercase", color: G, marginBottom: 8 }}>Wildlife</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {dest.wildlife.map((w, i) => (
                      <span key={i} style={{ padding: "3px 8px", border: `1px solid ${GDIM}`, fontSize: 10, color: G, background: "rgba(212,168,75,0.05)" }}>{w}</span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ background: "rgba(212,168,75,0.05)", borderLeft: `2px solid ${G}`, padding: "12px 14px" }}>
                <div style={{ fontSize: 8, letterSpacing: 4, textTransform: "uppercase", color: G, marginBottom: 5 }}>{dest.tip.label}</div>
                <div style={{ fontSize: 11, lineHeight: 1.7, color: MUTED }}>{dest.tip.text}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState(1)
  const tabs = [["01 — Africa", 1], ["02 — Egypt & Petra", 2], ["03 — Vietnam", 3], ["Flights", 4]]

  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT, fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>

      {/* HERO */}
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 64px",
        background: `linear-gradient(to bottom, rgba(12,11,9,0.2) 0%, rgba(12,11,9,0.65) 55%, ${BG} 100%), url('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=80') center/cover no-repeat`
      }}>
        <div style={{ padding: "0 40px" }}>
          <div style={{ fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: G, marginBottom: 16 }}>September 6 — November 10, 2025</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(56px,11vw,120px)", fontWeight: 900, lineHeight: 0.88, letterSpacing: -2, marginBottom: 22 }}>
            The <em style={{ fontStyle: "italic", color: G, fontWeight: 400 }}>Grand</em><br />Tour
          </h1>
          <div style={{ fontSize: 11, letterSpacing: 3, color: MUTED, textTransform: "uppercase", marginBottom: 40 }}>Lima · Africa · Egypt · Petra · Vietnam</div>
          <div style={{ display: "flex", gap: 40 }}>
            {[["66", "Days"], ["3", "Legs"], ["14", "Stops"], ["5", "Continents"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 38, fontWeight: 700, color: G, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: MUTED, marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NAV */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(12,11,9,0.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", overflowX: "auto" }}>
        {tabs.map(([label, t]) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "18px 20px", fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
            color: tab === t ? G : MUTED,
            borderBottom: tab === t ? `2px solid ${G}` : "2px solid transparent",
            background: "none", border: "none",
            borderBottom: tab === t ? `2px solid ${G}` : "2px solid transparent",
            cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Jost', sans-serif", fontWeight: 400
          }}>{label}</button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px 80px" }}>

        {tab <= 3 && (() => {
          const info = legInfo[tab]
          const dests = destinations.filter(d => d.leg === tab)
          const dividers = { 1: "End of Leg 01 · Victoria Falls → Cairo", 2: "End of Leg 02 · Amman → Doha → Hanoi", 3: "End of Leg 03 · Phu Quoc → Doha → Lima" }
          return (
            <div style={{ paddingTop: 56 }}>
              <div style={{ marginBottom: 44 }}>
                <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: G, marginBottom: 12 }}>{info.label}</div>
                <div style={{ display: "inline-block", background: "rgba(212,168,75,0.15)", border: `1px solid ${GDIM}`, padding: "4px 14px", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: G, marginBottom: 16 }}>{info.badge}</div>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(34px,6vw,62px)", fontWeight: 700, lineHeight: 1, marginBottom: 16 }}>
                  {info.title} <em style={{ fontStyle: "italic", color: G, fontWeight: 400 }}>{info.em}</em>
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: MUTED, maxWidth: 560 }}>{info.desc}</p>
              </div>
              {dests.map(d => <DestCard key={d.id} dest={d} />)}
              <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "48px 0 0", opacity: 0.5 }}>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GDIM})` }} />
                <div style={{ fontSize: 8, letterSpacing: 4, textTransform: "uppercase", color: G, whiteSpace: "nowrap" }}>{dividers[tab]}</div>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${GDIM})` }} />
              </div>
            </div>
          )
        })()}

        {tab === 4 && (
          <div style={{ paddingTop: 56 }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 700, marginBottom: 36 }}>
              Key <em style={{ fontStyle: "italic", color: G, fontWeight: 400 }}>Flights</em>
            </h2>
            {flights.map((f, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 32px 1fr 140px", alignItems: "center", gap: 12, padding: "14px 20px", background: SURF, border: "1px solid rgba(255,255,255,0.07)", marginBottom: 2 }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: G }}>{f.from}</div>
                  <div style={{ fontSize: 10, color: MUTED, marginTop: 1 }}>{f.fromCity}</div>
                </div>
                <div />
                <div style={{ textAlign: "center", color: MUTED, fontSize: 14 }}>→</div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: G }}>{f.to}</div>
                  <div style={{ fontSize: 10, color: MUTED, marginTop: 1 }}>{f.toCity}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: TEXT }}>{f.date}</div>
                  <div style={{ fontSize: 10, color: MUTED, marginTop: 2 }}>{f.note}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
