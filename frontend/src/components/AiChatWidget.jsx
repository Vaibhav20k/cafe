import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import { LogoMark } from "./Logo";
import { QUICK_PROMPTS } from "../data/cafe";
import { sendPromptToOpenRouter } from "../lib/ai";

const GREETING = {
  role: "assistant",
  content:
    "Namaste, traveller. I'm the Sarai sommelier — every bean, price and pour on this menu lives in my head. What's your mood?",
};

export default function AiChatWidget({ open, setOpen }) {
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [mode, setMode] = useState(null);
  const sessionId = useRef(Math.random().toString(36).slice(2) + Date.now().toString(36));
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

  return (
    <>
      <motion.button
        data-testid="ai-chat-launcher"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-brass text-obsidian shadow-xl shadow-obsidian/60 cursor-pointer"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2.4, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Ask Sarai — AI coffee sommelier"
      >
        <span className="absolute inset-0 rounded-full border border-brass/60 animate-ping opacity-20" />
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
            className="fixed bottom-0 right-0 z-[80] flex h-[85dvh] w-full flex-col border border-brass/15 bg-obsidian/95 backdrop-blur-2xl sm:bottom-6 sm:right-6 sm:h-[620px] sm:w-[420px] sm:rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-brass/10 bg-coal/80 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-brass"><LogoMark size={24} /></span>
                <div>
                  <p className="font-display text-base text-cream">Sarai Sommelier</p>
                  <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                    <span className={`h-1 w-1 rounded-full ${mode === "openrouter" ? "bg-emerald-400" : "bg-brass animate-pulse-dot"}`} />
                    {mode === "openrouter" ? "Live on OpenRouter" : mode === "demo" ? "Demo mind — OpenRouter-ready" : "OpenRouter-ready"}
                  </p>
                </div>
              </div>
              <button
                data-testid="ai-chat-close-button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-brass/20 p-2 text-stoneish transition-colors duration-300 hover:text-cream cursor-pointer"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="chat-scroll flex-1 space-y-4 overflow-y-auto px-5 py-6">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "user" ? (
                    <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-brass/90 px-4 py-3 text-sm leading-relaxed text-obsidian">
                      {m.content}
                    </div>
                  ) : (
                    <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-brass/15 bg-ember/70 px-4 py-3">
                      {m.content ? (
                        <p className="text-sm leading-relaxed text-cream/90">{m.content}</p>
                      ) : (
                        <div className="flex gap-1.5 py-1">
                          {[0, 1, 2].map((d) => (
                            <motion.span
                              key={d}
                              className="h-1.5 w-1.5 rounded-full bg-brass"
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
                      className="rounded-full border border-brass/25 px-3.5 py-2 text-left font-mono text-[10px] leading-snug text-brass/90 transition-colors duration-300 hover:bg-brass hover:text-obsidian cursor-pointer"
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
              className="flex items-center gap-3 border-t border-brass/10 bg-coal/80 px-4 py-3"
            >
              <input
                data-testid="ai-chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What are you in the mood for?"
                className="w-full rounded-full border border-brass/25 bg-obsidian px-4 py-3 text-sm text-cream placeholder:text-faint focus:border-brass/60 focus:outline-none transition-colors duration-300"
              />
              <button
                data-testid="ai-chat-send-btn"
                type="submit"
                disabled={streaming || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brass text-obsidian transition-opacity duration-300 hover:opacity-90 disabled:opacity-40 cursor-pointer"
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
