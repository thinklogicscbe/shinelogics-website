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

      const pdaasSection = sections.find(
        (item) =>
          item.title?.toLowerCase() === "our process" &&
          item.isActive !== false
      );

      if (pdaasSection) {
        setSection(pdaasSection);
      }
    } catch (err) {
      console.error("Failed to fetch PDaaS section", err);
    }
  };

  /* ================= INTERSECTION ANIMATION ================= */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* ================= MUTE TOGGLE ================= */

  const toggleMute = () => {
    if (!videoRef.current) return;

    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setMuted(newMuted);
  };

  if (!section || !section.media?.length) return null;

  const media = section.media[0];

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

          {/* 🔊 MUTE / UNMUTE BUTTON */}
          <button
            onClick={toggleMute}
            style={{
              position: "absolute",
              bottom: "14px",
              right: "14px",
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "42px",
              height: "42px",
              cursor: "pointer",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      )}

      {/* ================= CONTENT ================= */}

      <PdaasContent>
        <h1>{section.title}</h1>

        {section.description?.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}

        {section.points?.length > 0 && (
          <ul>
            {section.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        )}
      </PdaasContent>
    </PdaasContainer>
  );
};

export default Pdaas;