## SENTIRTE — Sponsorship Intake Form

A single-page, editorial-style sponsorship application built to the exact spec provided.

### Design system
- Add Google Fonts (Playfair Display italic + regular, Inter 400/500/700) via `index.html`.
- Extend Tailwind with: `hot-pink #E91E63`, `deep-pink #A01457`, `soft-pink #FCE4EC`, `ink #111827`, plus `font-serif: Playfair Display`, `font-sans: Inter`.
- Update `index.css` base body to Inter, ink text on white.
- Reusable `Eyebrow` component: `01 / DATOS GENERALES` style (uppercase, tracking-[0.2em], text-hot-pink, 11px bold).
- Override Shadcn input/textarea/select focus rings to `focus:ring-hot-pink focus:border-hot-pink` with `transition-all duration-300`.

### Layout (`src/pages/Index.tsx`)
Split-screen flex container:

```text
┌──────────────────────┬───────────────────────────────┐
│ LEFT 40% sticky      │ RIGHT 60% scrollable          │
│ soft-pink gradient   │ max-w-[600px] centered        │
│ SENTIRTE wordmark    │ Sections 01–05, divider lines │
│ italic manifesto     │ Submit CTA                    │
│ subtitle paragraph   │                               │
└──────────────────────┴───────────────────────────────┘
```
- Mobile: stacks vertically; left becomes a short hero band.
- Left column: Playfair italic "SENTIRTE" wordmark, short manifesto line, the provided subtitle paragraph.

### Form sections (single component, `src/components/SponsorshipForm.tsx`)
Managed with `react-hook-form` + `zod` for validation; Shadcn primitives.

1. **01 / DATOS GENERALES** — Nombre completo; grid-cols-2: Empresa / Marca + Giro; Ciudad; Página web/redes (url).
2. **02 / CONTACTO** — Email, Teléfono/WhatsApp (grid-cols-2 on md).
3. **03 / INTERÉS** — Tipo de patrocinio as pill ToggleGroup (Económico, En especie, Activación de marca, Asesoría); Rango de inversión as Radio cards (4 options); Objetivo Textarea with helper text.
4. **04 / LOGÍSTICA** — Productos para activación RadioGroup (Sí/No/Tal vez); Aporte en especie Textarea.
5. **05 / SIGUIENTES PASOS** — "¿Agendar llamada?" Switch; conditional Checkboxes (Mañana/Tarde/Noche) revealed via `framer-motion` `AnimatePresence` + layout animation; italic 48-hour footer note.

Sections separated by `border-t border-gray-200` with generous vertical spacing. Each section fades/slides in on mount with subtle `motion.div` stagger.

### Submit + success
- Button: full-width, `bg-hot-pink hover:bg-deep-pink`, `py-6 text-lg font-serif italic`, label "Enviar Solicitud".
- On submit: 1.5s simulated delay, spinner inside button, disabled state.
- On success: form unmounts with fade-out; Success view mounts with framer-motion fade-in:
  - Centered in right column.
  - Heading (Playfair italic, 4xl): "Estás a punto de formar parte de algo grande."
  - Subtext + WhatsApp CTA button (`bg-[#25D366] hover:bg-[#1DA851]`, rounded-full, pulsing, links to `https://wa.me/`). Icon from lucide-react (`MessageCircle`).

### Files to add/change
- `index.html` — add Google Fonts links.
- `tailwind.config.ts` — extend colors + fontFamily.
- `src/index.css` — body font, smooth scroll.
- `src/pages/Index.tsx` — split-screen page, holds form/success state toggle.
- `src/components/SponsorshipForm.tsx` — full form.
- `src/components/SuccessView.tsx` — thank-you state.
- `src/components/Eyebrow.tsx` — small section label helper.

### Tech notes
- Dependencies already present: framer-motion (will add if missing), react-hook-form, zod, all Shadcn primitives listed (Input, Textarea, RadioGroup, Select, Switch, Checkbox, ToggleGroup, Button).
- Client-side only; no backend submission (1.5s `setTimeout`). Validation via zod with trimmed strings, email/url/tel checks, max lengths.
- Fully responsive; sticky left column only on `md+`.
