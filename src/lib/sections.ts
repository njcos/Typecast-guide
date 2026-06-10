export interface SectionMeta { id: string; label: string; title: string; divider?: boolean }

export const SECTIONS: SectionMeta[] = [
  { id: 'overview', label: '01', title: 'Overview & install' },
  { id: 'panel-anatomy', label: '02', title: 'The panel, top to bottom' },
  { id: 'home', label: '03', title: 'Home / Typecast' },
  { id: 'text', label: '04', title: 'Text' },
  { id: 'tagging', label: '04·', title: 'Tagging window' },
  { id: 'sheets', label: '05', title: 'Sheets' },
  { id: 'dupes', label: '06', title: 'Dupes' },
  { id: 'dupes-all', label: '06·', title: 'Duplicating all languages' },
  { id: 'render', label: '07', title: 'Render' },
  { id: 'cleanup', label: '08', title: 'Cleanup' },
  { id: 'license', label: '09', title: 'License states' },
  { id: 'language-safety', label: '', title: 'Language safety', divider: true },
  { id: 'naming', label: '', title: 'Naming conventions' },
  { id: 'cross-comp', label: '', title: 'Cross-comp matching' },
  { id: 'glossary', label: '', title: 'Glossary & tips' },
  { id: 'troubleshooting', label: '', title: 'Troubleshooting' },
]
