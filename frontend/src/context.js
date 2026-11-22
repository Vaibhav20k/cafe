import { createContext, useContext } from "react";

export const ChatCtx = createContext({ openChat: () => {} });
export const useChat = () => useContext(ChatCtx);

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -64, duration: 1.5 });
  else el.scrollIntoView({ behavior: "smooth" });
};
