# MediAssist Design Guidelines

## Design Approach: Healthcare Emergency System

**Selected Approach**: Design System (Material Design + Healthcare Best Practices)
**Rationale**: Emergency healthcare applications demand clarity, trust, and speed. Material Design's clear hierarchy, familiar patterns, and accessibility features provide the foundation, customized for medical urgency.

**Key Design Principles**:
- Speed-first: Every element optimized for rapid comprehension
- Trust-building: Medical-grade clarity and professionalism
- Accessibility: High contrast, large touch targets, clear typography
- Mobile-critical: Designed primarily for on-the-go emergency use

---

## Core Design Elements

### A. Color Palette

**Primary Colors** (Medical Professional):
- Primary: 200 85% 45% (Medical Blue - trust, calm, professional)
- Primary Hover: 200 85% 38%
- Background (Dark): 220 18% 12%
- Background (Light): 210 20% 98%

**Semantic Colors** (Emergency Context):
- Emergency Red: 0 85% 60% (urgent alerts, critical care indicators)
- Success Green: 142 70% 45% (confirmed actions, available services)
- Warning Amber: 38 92% 50% (moderate urgency, caution states)
- Info Cyan: 195 85% 55% (informational, specialty indicators)

**Neutral Palette**:
- Text Primary (Dark): 220 18% 95%
- Text Secondary (Dark): 220 15% 70%
- Text Primary (Light): 220 20% 15%
- Text Secondary (Light): 220 15% 45%
- Border: 220 15% 25% (dark) / 220 15% 85% (light)

### B. Typography

**Font Families**:
- Primary: 'Inter' (Google Fonts) - excellent readability, medical-grade clarity
- Monospace: 'JetBrains Mono' - for data fields, contact numbers, distances

**Type Scale**:
- Hero Heading: text-5xl md:text-6xl font-bold (emergency page title)
- Section Heading: text-3xl md:text-4xl font-semibold 
- Card Heading: text-xl font-semibold (hospital names)
- Body Large: text-lg (primary content, condition descriptions)
- Body: text-base (general content)
- Small: text-sm (metadata, supporting info)
- Caption: text-xs (disclaimers, timestamps)

**Font Weights**:
- Bold (700): Headings, hospital names, critical info
- Semibold (600): Subheadings, section titles
- Medium (500): Emphasized body text, labels
- Regular (400): Body text, descriptions

### C. Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing: p-2, gap-2 (within components)
- Standard spacing: p-4, p-6, gap-4 (between related elements)
- Section spacing: p-8, py-12, py-16 (between major sections)
- Generous spacing: py-20, py-24 (hero sections, major dividers)

**Container Strategy**:
- Max width: max-w-7xl (main content area)
- Form max width: max-w-2xl (condition input forms)
- Card grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

**Responsive Breakpoints**:
- Mobile-first: Base styles for mobile (<640px)
- Tablet: md: (768px+) - 2 column grids
- Desktop: lg: (1024px+) - 3 column grids, expanded spacing

### D. Component Library

**Header Component**:
- Sticky header with backdrop blur (sticky top-0 backdrop-blur-md)
- Logo/App name (bold, primary color) + emergency hotline number (always visible)
- Subtle border bottom for definition
- Height: h-16 md:h-20

**Condition Input Form**:
- Large, prominent search-style input with icon
- Autocomplete suggestions dropdown with common conditions
- Clear visual focus states (ring-2 ring-primary)
- Voice input option (microphone icon) for hands-free operation
- Quick condition buttons below input (common emergencies: "Chest Pain", "Stroke Symptoms", "Trauma", "Breathing Issues")

**Hospital Result Cards**:
- Elevated cards with subtle shadow (shadow-lg hover:shadow-xl)
- Card structure (top to bottom):
  - Specialization badge (top-right, colored by type)
  - Hospital name (text-xl font-semibold)
  - Specialization & services (text-sm, icons for emergency services)
  - Distance indicator (large, text-2xl font-bold, primary color)
  - Emergency contact (large text, one-tap call button)
  - Navigate button (full-width, primary color, emergency red on hover)
- Cards appear in order of distance/suitability

**Loading States**:
- Skeleton cards matching hospital card structure
- Pulsing animation (animate-pulse)
- Loading text: "Analyzing condition and finding best hospitals..."
- Gemini AI indicator (small badge showing AI is processing)

**Alert/Status Messages**:
- Emergency banner for critical conditions (bg-emergency-red, white text)
- Info banner for analysis results (bg-info-cyan/10, info text)
- Success confirmation (bg-success-green/10, success text)

**Footer**:
- Emergency disclaimer and medical advice notice
- Emergency hotline numbers (large, always visible)
- App info and data sources
- Background: Slightly darker than main bg

### E. Interaction Patterns

**Micro-interactions** (minimal, purposeful):
- Card hover: Subtle lift (translate-y-[-2px]) + shadow increase
- Button press: Slight scale (active:scale-[0.98])
- Focus states: Clear ring indicators for accessibility
- Form validation: Real-time inline feedback with icons

**Loading & Progress**:
- Linear progress bar at top during AI analysis
- Skeleton screens for hospital results
- Success animations on form submission (checkmark fade-in)

---

## Page-Specific Layouts

### Homepage/Main Interface

**Hero Section** (py-12 md:py-16):
- Compact, focused (not full-height - emergency context)
- Large heading: "Find the Right Hospital, Fast"
- Subheading: "AI-powered emergency hospital recommendations"
- Condition input form (centered, max-w-2xl)
- Trust indicators: "Powered by Gemini AI" + "Real-time hospital data"

**Quick Access Section** (py-8):
- Grid of common emergency condition cards (grid-cols-2 md:grid-cols-4)
- Icon + condition name, one-tap to analyze
- Examples: Cardiac, Stroke, Trauma, Respiratory, Burns, Neurological

**Results Section** (py-8):
- Dynamic: Appears after form submission
- Section heading: "Recommended Hospitals for [Condition]"
- AI analysis summary card (what Gemini detected, severity assessment)
- Hospital cards grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6)

**How It Works** (py-12):
- 3-step visual process (icon + title + description)
- Clean, scannable layout
- Icons: Input → AI Analysis → Hospital Results

---

## Images

**Hero Background** (optional subtle element):
- Abstract medical tech pattern (circuit board + heartbeat line motif)
- Low opacity overlay (opacity-5), doesn't distract
- Alternatively: Clean gradient background (no image needed for speed)

**Condition Category Icons**:
- Use Heroicons medical set (heart, brain, lungs, etc.)
- Large size (w-8 h-8 md:w-10 h-10)
- Primary color with hover state

**Hospital Specialty Icons**:
- Font Awesome medical icons via CDN
- Indicate: 24/7 service, ambulance, ICU, specialist departments
- Small size (w-5 h-5), inline with text

**No large hero image** - prioritize speed and clarity over visual drama. Emergency context demands instant usability.

---

## Accessibility & Emergency Optimization

- Minimum touch target: 44x44px (all buttons, inputs)
- High contrast ratios: WCAG AAA for critical elements
- Clear focus indicators: 3px ring on all interactive elements
- Font size minimum: 16px (no smaller than text-base for body)
- One-hand operation optimized (bottom navigation if needed)
- Dark mode default for night emergencies (toggle available)
- Emergency call buttons: Extra large (min-h-14), distinct color

**Critical UX Principles**:
- Every screen should be usable in <3 seconds
- Primary action always obvious (emergency red or primary blue)
- No unnecessary steps or confirmations in emergency flow
- Persistent emergency hotline access (sticky in header)