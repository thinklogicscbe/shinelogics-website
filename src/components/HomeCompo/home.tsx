import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import {
  SectionContainer,
  GridWrapper,
  LeftGrid,
  RightGrid,
  VideoBox,
  ButtonGroup,
} from "./style";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/home-content`;

interface HomeContent {
  _id: string;
  heroTitle: string;
  mainDescription: string;
  subDescription: string;
  primaryCtaText?: string;
  primaryCtaRoute?: string;
  secondaryCtaText?: string;
  secondaryCtaRoute?: string;
  videos: string[];
}

const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [banner, setBanner] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true); // 🔊 sound state

  const loadBanner = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { "Cache-Control": "no-cache" },
      });

      const list = Array.isArray(res.data?.result)
        ? res.data.result
        : [];

      if (list.length > 0) {
        setBanner({
          ...list[0],
          videos: list[0].videos ?? [],
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

  // ▶️ Ensure autoplay works after refresh
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

  if (loading) {
    return (
      <SectionContainer>
        <p>Loading...</p>
      </SectionContainer>
    );
  }

  if (!banner) return null;

  return (
    <SectionContainer>
      <GridWrapper>
        {/* LEFT GRID */}
        <LeftGrid>
          <h1>{banner.heroTitle}</h1>
          <p className="main-description">{banner.mainDescription}</p>
          <p className="sub-hero">{banner.subDescription}</p>

          <ButtonGroup>
            {/* {banner.primaryCtaText && (
              <button
                className="primary"
                onClick={() =>
                  banner.primaryCtaRoute &&
                  navigate(banner.primaryCtaRoute)
                }
              >
                {banner.primaryCtaText}
              </button>
            )} */}

            {/* {banner.secondaryCtaText && (
              
              <button
                className="secondary"
                onClick={() =>
                  banner.secondaryCtaRoute &&
                  navigate("/service")
                }
              >
                {banner.secondaryCtaText}
              </button>
            )} */}
          </ButtonGroup>
        </LeftGrid>

        {/* RIGHT GRID — HERO VIDEO */}
        <RightGrid>
          {banner.videos.length > 0 && (
            <VideoBox>
              <video
                key={banner.videos[0]} // forces remount if video changes
                ref={videoRef}
                autoPlay
                loop
                muted={muted}
                playsInline
                preload="auto"
                onClick={toggleMute} // click video to unmute
              >
                <source src={banner.videos[0]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* 🔊 Sound Toggle */}
              <button
                className="sound-toggle"
                onClick={toggleMute}
                aria-label="Toggle sound"
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
