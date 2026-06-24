import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/useAuth";

const CHANGE_EVENT = "better-everyday:data-change";

function readCache(storageKey, fallback) {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeCache(storageKey, value) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } catch {
    // localStorage unavailable (e.g. private browsing) — Supabase sync still applies
  }
}

export function useLocalData(key, fallback) {
  const { user } = useAuth();
  const storageKey = `better-everyday:${key}`;
  const [value, setValue] = useState(() => readCache(storageKey, fallback));
  const fallbackRef = useRef(fallback);
  useEffect(() => {
    fallbackRef.current = fallback;
  });

  useEffect(() => {
    function onChange(e) {
      if (e.detail?.storageKey === storageKey) setValue(e.detail.value);
    }
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, [storageKey]);

  useEffect(() => {
    if (!user) return;
    let active = true;
    supabase
      .from("user_data")
      .select("value")
      .eq("user_id", user.id)
      .eq("key", key)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active || error || !data) return;
        setValue(data.value);
        writeCache(storageKey, data.value);
      });
    return () => {
      active = false;
    };
  }, [user, key, storageKey]);

  function update(next) {
    setValue((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      writeCache(storageKey, resolved);
      window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { storageKey, value: resolved } }));
      if (user) {
        supabase
          .from("user_data")
          .upsert(
            { user_id: user.id, key, value: resolved, updated_at: new Date().toISOString() },
            { onConflict: "user_id,key" }
          )
          .then();
      }
      return resolved;
    });
  }

  return [value, update];
}
