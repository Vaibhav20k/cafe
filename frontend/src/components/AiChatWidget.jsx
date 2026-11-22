import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import { LogoMark } from "./Logo";
import { QUICK_PROMPTS } from "../data/cafe";
import { sendPromptToOpenRouter } from "../lib/ai";

const GREETING = {
  role: "assistant",
  content:
    "Namaste, traveller. I'm the Sarai sommelier — every bean, price and pour on this demo menu lives in my head. What's your mood?",
};

export default function AiChatWidget({ open, setOpen }) {
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [mode, setMode] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming, open]);

  const send = (text) => {
    const prompt = (text ?? input).trim();
    if (!prompt || streaming) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: prompt }, { role: "assistant", content: "" }]);
    setStreaming(true);
    let acc = "";
    sendPromptToOpenRouter(prompt, {
      onDelta: (d) => {
        acc += d;
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      },
      onDone: (evt) => {
        setMode(evt.mode || "demo");
        setStreaming(false);
      },
      onError: (e) => {
        console.error && console.error("widget-error", e);
        if (!acc) {
          setMessages((m) => {
            const copy = [...m];
            copy[copy.length - 1] = {
              role: "assistant",
              content: "The kettle dropped mid-pour — my brain didn't answer. Try once more?",
            };
            return copy;
          });
        }
        setStreaming(false);
      },
    });
  };

  const live = mode === "claude" || mode === "openrouter";

  return (
    <>
      <motion.button
        data-testid="ai-chat-launcher"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-brassantique text-white shadow-2xl shadow-brassantique/40 cursor-pointer"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2.4, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Ask Sarai — AI coffee sommelier"
      >
        <span className="absolute inset-0 rounded-full border border-brassantique/60 animate-ping opacity-20" />
        <Sparkles size={20} strokeWidth={1.8} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="ai-chat-drawer"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 right-0 z-[80] flex h-[85dvh] w-full flex-col overflow-hidden border border-brassantique/30 bg-paper/98 shadow-2xl shadow-brassantique/20 backdrop-blur-2xl sm:bottom-6 sm:right-6 sm:h-[620px] sm:w-[420px] sm:rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-brassantique/20 bg-[#F5EAD9]/80 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-brassantique"><LogoMark size={24} /></span>
                <div>
                  <p className="font-display text-base text-ink">Sarai Sommelier</p>
                  <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-stonemute">
                    <span className={`h-1 w-1 rounded-full ${live ? "bg-emerald-600" : "bg-brassantique animate-pulse-dot"}`} />
                    {mode === "claude"
                      ? "Live on Claude"
                      : mode === "openrouter"
                        ? "Live on OpenRouter"
                        : mode === "demo"
                          ? "Demo mind — Claude-ready"
                          : "Claude-ready"}
                  </p>
                </div>
              </div>
              <button
                data-testid="ai-chat-close-button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-brassantique/25 p-2 text-stonemute transition-colors duration-300 hover:text-ink cursor-pointer"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="chat-scroll flex-1 space-y-4 overflow-y-auto px-5 py-6">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "user" ? (
                    <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-brassantique px-4 py-3 text-sm leading-relaxed text-white shadow-sm">
                      {m.content}
                    </div>
                  ) : (
                    <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-brassantique/15 bg-sand px-4 py-3">
                      {m.content ? (
                        <p className="text-sm leading-relaxed text-ink">{m.content.replace(/\*\*/g, "").replace(/^#+\s/gm, "")}</p>
                      ) : (
                        <div className="flex gap-1.5 py-1">
                          {[0, 1, 2].map((d) => (
                            <motion.span
                              key={d}
                              className="h-1.5 w-1.5 rounded-full bg-brassantique"
                              animate={{ opacity: [0.25, 1, 0.25] }}
                              transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_PROMPTS.map((q) => (
                    <button
                      key={q}
                      data-testid="ai-quick-prompt-chip"
                      onClick={() => send(q)}
                      className="rounded-full border border-brassantique/30 bg-paper px-3.5 py-2 text-left font-mono text-[10px] leading-snug text-brassantique transition-colors duration-300 hover:bg-brassantique hover:text-white cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-3 border-t border-brassantique/20 bg-[#F5EAD9]/60 px-4 py-3"
            >
              <input
                data-testid="ai-chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What are you in the mood for?"
                className="w-full rounded-full border border-brassantique/30 bg-linen px-4 py-3 text-sm text-ink placeholder:text-caption focus:border-brassantique focus:outline-none transition-colors duration-300"
              />
              <button
                data-testid="ai-chat-send-btn"
                type="submit"
                disabled={streaming || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brassantique text-white transition-opacity duration-300 hover:opacity-90 disabled:opacity-40 cursor-pointer"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
