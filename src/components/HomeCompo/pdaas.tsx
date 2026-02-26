import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  PdaasContainer,
  AnimatedImage,
  PdaasContent,
} from "./style";

/* ================= API ================= */

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/home-sections`;

/* ================= TYPES ================= */

interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface HomeSection {
  _id?: string;
  key?: string;
  title: string;
  description: string;
  points: string[];
  media: MediaItem[];
  isActive?: boolean;
}

/* ================= COMPONENT ================= */

const Pdaas = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [section, setSection] = useState<HomeSection | null>(null);
  const [muted, setMuted] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const res = await axios.get(API_URL);
      const sections: HomeSection[] =
        res?.data?.result || res?.data?.data || [];

      if (!sections.length) return;

      const pdaasSection =
        sections.find(
          (item) => item.key === "pdaas" && item.isActive !== false
        ) ||
        sections.find(
          (item) =>
            item.title?.toLowerCase() === "our business" &&
            item.isActive !== false
        ) ||
        sections.find((item) => item.isActive !== false);

      setSection(pdaasSection || null);
    } catch (err) {
      console.error("Failed to fetch PDaaS section", err);
    }
  };

  /* ================= INTERSECTION ANIMATION ================= */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  /* ================= MUTE ================= */

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setMuted(nextMuted);
  };

  if (!section || !section.media?.length) return null;

  const media = section.media[0];

  /* ================= RENDER ================= */

  return (
    <PdaasContainer ref={containerRef}>
      {/* ================= MEDIA ================= */}

      {media.type === "image" ? (
        <AnimatedImage
          src={media.url}
          alt={section.title}
          className={isVisible ? "animate" : ""}
        />
      ) : (
        <div style={{ position: "relative" }}>
          <video
            ref={videoRef}
            src={media.url}
            autoPlay
            muted
            loop
            playsInline
            className={isVisible ? "animate" : ""}
            style={{
              width: "100%",
              maxWidth: "520px",
              borderRadius: "18px",
              objectFit: "cover",
            }}
          />

          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
            style={muteBtn}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      )}

      {/* ================= CONTENT ================= */}

      <PdaasContent>
        <h1>{section.title}</h1>

        {section.description
          ?.split("\n")
          .map((line, i) => <p key={i}>{line}</p>)}

        {section.points?.length > 0 && (
          <ul className="points-list">
            {section.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        )}
      </PdaasContent>
    </PdaasContainer>
  );
};

export default Pdaas;

/* ================= INLINE STYLE ================= */

const muteBtn: React.CSSProperties = {
  position: "absolute",
  bottom: 14,
  right: 14,
  background: "rgba(0,0,0,0.6)",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: 42,
  height: 42,
  cursor: "pointer",
  fontSize: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};