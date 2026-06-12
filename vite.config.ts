import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative base so the build works under any repo-name subpath
  // (njcos/Typecast-guide and nickcosentino/Typecast-Guide both serve from
  // /<repo>/, and GitHub Pages paths are case-sensitive). This is a hash-anchor
  // site, so the document path stays at /<repo>/ and './asset' resolves right.
  base: './',
  plugins: [react()],
})
