// lib/cmsBus.ts

export const CMS_CHANNEL_NAME = "jitseetec_cms_channel";

export function notifyCmsUpdate(sectionKeyOrCollection?: string) {
  if (typeof window !== "undefined") {
    // 1. Custom event for current window
    window.dispatchEvent(
      new CustomEvent("jitseetec_cms_update", {
        detail: { key: sectionKeyOrCollection },
      })
    );

    // 2. BroadcastChannel for cross-tab instant broadcast
    if ("BroadcastChannel" in window) {
      try {
        const bc = new BroadcastChannel(CMS_CHANNEL_NAME);
        bc.postMessage({ type: "CMS_UPDATE", key: sectionKeyOrCollection });
        bc.close();
      } catch (e) {
        localStorage.setItem("jitseetec_cms_ping", Date.now().toString());
      }
    } else {
      localStorage.setItem("jitseetec_cms_ping", Date.now().toString());
    }
  }
}

export function subscribeToCmsUpdate(callback: (key?: string) => void) {
  if (typeof window === "undefined") return () => {};

  const handleCustomEvent = (e: any) => {
    callback(e.detail?.key);
  };

  window.addEventListener("jitseetec_cms_update", handleCustomEvent);

  let bc: BroadcastChannel | null = null;
  if ("BroadcastChannel" in window) {
    try {
      bc = new BroadcastChannel(CMS_CHANNEL_NAME);
      bc.onmessage = (event) => {
        if (event.data?.type === "CMS_UPDATE") {
          callback(event.data?.key);
        }
      };
    } catch (e) {
      // ignore
    }
  }

  const handleStorage = (e: StorageEvent) => {
    if (e.key === "jitseetec_cms_ping") {
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener("jitseetec_cms_update", handleCustomEvent);
    window.removeEventListener("storage", handleStorage);
    if (bc) {
      bc.close();
    }
  };
}
