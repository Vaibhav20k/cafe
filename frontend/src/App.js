import { useEffect, useState, Component } from "react";
import Lenis from "lenis";
import "./App.css";
import { ChatCtx } from "./context";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeRibbon from "./components/MarqueeRibbon";
import StorySection from "./components/StorySection";
import RitualSection from "./components/RitualSection";
import MenuSection from "./components/MenuSection";
import LocationHours from "./components/LocationHours";
import Footer from "./components/Footer";
import AiChatWidget from "./components/AiChatWidget";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-linen text-ink">
          <p className="font-serif2 text-xl italic">The kettle hiccuped. Refresh to pour again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function Page() {
  const [ready, setReady] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const openChat = () => setChatOpen(true);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (t) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <ChatCtx.Provider value={{ openChat }}>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgressBar />
      <div className="grain" aria-hidden />
      <Navbar onAsk={openChat} />
      <main className="bg-linen text-ink selection:bg-brassantique selection:text-white">
        <Hero ready={ready} onAsk={openChat} />
        <MarqueeRibbon />
        <StorySection />
        <RitualSection />
        <MenuSection />
        <LocationHours />
      </main>
      <Footer />
      <AiChatWidget open={chatOpen} setOpen={setChatOpen} />
    </ChatCtx.Provider>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-linen text-ink">
      <ErrorBoundary>
        <Page />
      </ErrorBoundary>
    </div>
  );
}
