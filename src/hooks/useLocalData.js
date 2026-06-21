import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/useAuth";

export function useLocalData(key, fallback) {
  const { user } = useAuth();
  const [value, setValue] = useState(fallback);
  const fallbackRef = useRef(fallback);
  useEffect(() => {
    fallbackRef.current = fallback;
  });

  useEffect(() => {
    if (!user) return;
    let active = true;
    supabase
      .from("user_data")
      .select("value")
      .eq("user_id", user.id)
      .eq("key", key)
      .maybeSingle()
      .then(({ data }) => {
        if (active) setValue(data ? data.value : fallbackRef.current);
      });
    return () => {
      active = false;
    };
  }, [user, key]);

  function update(next) {
    setValue((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      if (user) {
        supabase
          .from("user_data")
          .upsert({ user_id: user.id, key, value: resolved, updated_at: new Date().toISOString() })
          .then();
      }
      return resolved;
    });
  }

  return [value, update];
}
