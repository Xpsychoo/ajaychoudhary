import { Html, Head, Main, NextScript } from 'next/document'
import { DEFAULT_THEME, THEME_STORAGE_KEY } from '@/store/themeSlice'

// Runs before first paint:
// - `reveal-ready`: [data-reveal] content starts hidden only when JS is on (styles/_scroll-effects.scss)
// - `theme-pending`: a non-default theme is saved, so hide the page until ThemePersistence applies it
//   instead of flashing the default theme first (styles/_theme-scenes.scss)
const bootScript = `(function () {
  var root = document.documentElement;
  root.classList.add('reveal-ready');
  try {
    var saved = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    if (saved && saved !== ${JSON.stringify(DEFAULT_THEME)}) root.classList.add('theme-pending');
  } catch (e) {}
})()`

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
