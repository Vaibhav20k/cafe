import { API } from "../data/cafe";

export async function sendPromptToOpenRouter(prompt, { onDelta, onDone, onError } = {}) {
  // Framework note: this posts to our backend /api/chat, which streams from
  // OpenRouter when OPENROUTER_API_KEY is set, and falls back to the demo
  // sommelier otherwise. To call OpenRouter directly from the client instead,
  // swap this fetch for POST https://openrouter.ai/api/v1/chat/completions
  // with `Authorization: Bearer <key>` and parse the same SSE deltas.
  try {
    const res = await fetch(`${API}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
    });
    if (!res.ok || !res.body) throw new Error(`chat failed: ${res.status}`);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      let idx;
      while ((idx = buf.indexOf("\n\n")) >= 0) {
        const raw = buf.slice(0, idx);
        buf = buf.slice(idx + 2);
        for (const line of raw.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          try {
            const evt = JSON.parse(line.slice(6));
            if (evt.delta && onDelta) onDelta(evt.delta);
            if (evt.done && onDone) onDone(evt);
          } catch (e) {
            /* partial json, ignore */
          }
        }
      }
    }
  } catch (e) {
    console.error && console.error("sarai-chat-error", e);
    if (onError) onError(e);
  }
}
