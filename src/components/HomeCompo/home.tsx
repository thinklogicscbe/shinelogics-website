import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  SectionContainer,
  GridWrapper,
  LeftGrid,
  RightGrid,
  VideoBox,
  ButtonGroup,
} from "./style";

/* ================= API ================= */

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/home-content`;

/* ================= TYPES ================= */

interface HomeContent {
  _id: string;
  heroTitle: string;
  description: string;
  points?: string[];
  buttonText?: string;
  buttonRoute?: string;
  videos: string[];
}

/* ================= COMPONENT ================= */

const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [banner, setBanner] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);

  /* ================= LOAD BANNER ================= */

  const loadBanner = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { "Cache-Control": "no-cache" },
      });

      const list = Array.isArray(res.data?.result) ? res.data.result : [];

      if (list.length > 0) {
        const item = list[0];

        setBanner({
          _id: item._id,
          heroTitle: item.heroTitle,
          description: item.description,
          points: Array.isArray(item.points) ? item.points : [],
          buttonText: item.buttonText,
          buttonRoute: item.buttonRoute,
          videos: Array.isArray(item.videos) ? item.videos : [],
        });
      } else {
        setBanner(null);
      }
    } catch (error) {
      console.error("Failed to load home banner", error);
      setBanner(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanner();
  }, []);

  /* ================= VIDEO AUTOPLAY ================= */

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [banner]);

  const toggleMute = () => {
    if (!videoRef.current) return;

    const next = !muted;
    videoRef.current.muted = next;
    videoRef.current.volume = 1;
    setMuted(next);
  };

  /* ================= STATES ================= */

  if (loading) {
    return (
      <SectionContainer>
        <p>Loading...</p>
      </SectionContainer>
    );
  }

  if (!banner) return null;

  /* ================= RENDER ================= */

  return (
    <SectionContainer>
      <GridWrapper>
        {/* LEFT GRID */}
        <LeftGrid>
          {/* HERO TITLE */}
          <h1>{banner.heroTitle}</h1>

          {/* DESCRIPTION */}
          {banner.description && (
            <p className="main-description">{banner.description}</p>
          )}

          {/* POINTS */}
          {banner.points && banner.points.length > 0 && (
            <ul className="sub-hero">
              {banner.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          )}

          {/* CTA BUTTON */}
          <ButtonGroup>
            {(() => {
              const route = banner.buttonRoute;
              const text = banner.buttonText;

              if (!route || !text) return null;

              return (
                <button className="primary" onClick={() => navigate(route)}>
                  {text}
                </button>
              );
            })()}
          </ButtonGroup>
        </LeftGrid>

        {/* RIGHT GRID — HERO VIDEO */}
        <RightGrid>
          {banner.videos.length > 0 && (
            <VideoBox>
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={muted}
                playsInline
                preload="auto"
              >
                <source src={banner.videos[0]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* 🔊 MUTE / UNMUTE ICON */}
              <button
                onClick={toggleMute}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "20px",
                  transform: "translateY(-50%)",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(0,0,0,0.65)",
                  color: "#fff",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  backdropFilter: "blur(6px)",
                  transition: "all 0.2s ease",
                }}
              >
                {muted ? "🔇" : "🔊"}
              </button>
            </VideoBox>
          )}
        </RightGrid>
      </GridWrapper>
    </SectionContainer>
  );
};

export default Home;
