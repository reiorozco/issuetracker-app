import React from "react";

// Sets the light/dark class on <html> before first paint to avoid a theme
// flash (FOUC). Reads the saved preference, falling back to the OS setting.
// Mirrors what next-themes does, without adding a dependency.
const script = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var d=document.documentElement;d.classList.remove('light','dark');d.classList.add(t);d.style.colorScheme=t;}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
