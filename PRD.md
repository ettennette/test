# PRD.md – Meeting Summary & Follow-up Generator

## 1. App Overview

**Meeting Summary & Follow-up Generator** is an AI-powered productivity tool that transforms raw meeting content—transcripts or notes—into polished summaries, actionable tasks, and assigned responsibilities. It streamlines post-meeting workflows and boosts accountability by enabling seamless integrations with communication and project management platforms.

### Key Features

- Paste or upload Zoom/Teams/Meet transcripts or notes
- Auto-generate concise meeting summaries
- Highlight key action points with owner assignments and deadlines
- Push tasks to Slack, email, Notion, Jira, or Linear
- Fast, responsive, and clean UI for effortless post-meeting clarity

---

## 2. User Stories

### 🧑‍💼 End Users (Team Members / Managers)

- As a user, I want to drop meeting notes and get a quick summary so I can move on with my day.
- As a user, I want clear action points with deadlines so I don't miss follow-ups.
- As a user, I want to assign owners to tasks automatically based on meeting content.
- As a user, I want to push summarized tasks to our existing stack (Slack, Jira, etc.).
- As a user, I want the interface to be clean, minimal, and mobile-responsive.

### 👩‍🔧 Admin/IT

- As an admin, I want to ensure integrations are secure and compliant with org policies.
- As an admin, I want to access logs of pushed tasks for auditing.

---

## 3. Technical Requirements

### Functional
- Upload transcript (.txt, .docx, .md, or via integrations)
- Natural language processing to summarize notes
- AI-generated bullet points with:
  - Summary
  - Action items
  - Owner detection
  - Suggested due dates
- Integrations:
  - Slack (send summary to channel or DM)
  - Email (Gmail, Outlook)
  - Linear, Jira, Notion (task creation)
- User authentication (OAuth with Google & Microsoft)
- Export summary as .pdf or .md

### Non-Functional
- Secure data handling (GDPR-compliant)
- Responsive performance (<2s processing for typical transcript)
- 99.9% uptime SLA
- Audit trail for AI decisions (transparency logs)
- Autosave for draft summaries

---

## 4. Design System

The design language aligns with Spacent's aesthetic: modern, Scandinavian minimalism, bright whites, soft grays, warm neutrals, and subtle accent colors.

### 🎨 Colors

| Token        | HEX     | Usage                         |
| ------------ | ------- | ----------------------------- |
| primaryWhite | #FFFFFF | Backgrounds, canvas default   |
| softGray     | #F4F4F4 | Inputs, container backgrounds |
| accentBeige  | #F3EDE3 | Hover states, soft highlights |
| charcoalGray | #333333 | Primary text                  |
| lightGray    | #D9D9D9 | Dividers, borders             |
| goldYellow   | #F6BE00 | CTA buttons, key accents      |
| linkBlue     | #007AFF | Hyperlinks and actions        |
| errorRed     | #E03E36 | Error and alert states        |
| successGreen | #00C48C | Success messages              |

### 🔤 Typography

| Style         | Font         | Size | Weight | Use Case          |
| ------------- | ------------ | ---- | ------ | ----------------- |
| Display XL    | Barlow, sans | 40px | Bold   | Hero titles       |
| Heading L     | Barlow, sans | 28px | Bold   | Section headers   |
| Heading M     | Barlow, sans | 22px | Bold   | Subheaders        |
| Body Regular  | Barlow, sans | 16px | Normal | Body content      |
| Caption Small | Barlow, sans | 12px | Medium | Labels, footnotes |

### 📐 Spacing System

| Token       | Pixels | Description                     |
| ----------- | ------ | ------------------------------- |
| spacing-2xs | 4px    | Icon margin, tight gaps         |
| spacing-xs  | 8px    | Micro spacing, tight elements   |
| spacing-s   | 12px   | Compact component spacing       |
| spacing-m   | 16px   | Default margin and padding      |
| spacing-l   | 24px   | Card separation, section breaks |
| spacing-xl  | 32px   | Major content dividers          |

### 🧩 Components

**1. Navigation Bar**

- Logo left, product links center, login right
- Hamburger menu for mobile

**2. File Upload Dropzone**

- Paste transcript or notes in text format
- Or drag and drop interface with file-type support
- Accepts `.txt`, `.docx`, `.md`, `.srt`

**3. Summary Display Card**

- White card with tabs: Summary / Action Items / Deadlines
- Editable inline, simple hover feedback

**4. Action Item Row**

- Task title, owner (dropdown), deadline (picker), integration buttons

**5. CTA Button**

- Primary: filled gold (`#F6BE00`)
- Secondary: outline with hover fill

**6. Snackbar / Toast**

- Slide-up confirmations (green for success, red for error, beige for neutral)

**7. Integration Chips**

- Rounded pill-style: Slack, Jira, Notion, Linear logos

**8. Loader & Empty States**

- Soft spinner with instructional message: "Drop in your notes to get started"

### 🔖 Logo & Branding

- Logo: minimalist wordmark in top-left
- Font: Barlow across all text
- Imagery: neutral-toned photography (optional)
- Favicon: abstract dark molecular shape

---

## 5. UX Guidelines

### 🧼 Clean & Minimal UI

- Use whitespace liberally
- Avoid color overload, keep screens focused on single actions

### 📱 Responsive Design

- Mobile-first layout
- Breakpoints:
  - Mobile: ≤ 480px
  - Tablet: 481–768px
  - Desktop: > 768px
- Full-width buttons on mobile
- Content stack collapse on small screens

### ✅ Clear User Feedback

- All async actions (upload, generate) show loading
- Use toast/snackbar to confirm actions
- Inline error and success validation for forms and fields

---

## 6. Success Metrics

| Metric                                  | Goal        |
| --------------------------------------- | ----------- |
| Summary generation time                 | < 5 seconds |
| Task accuracy (owner, date detection)   | > 90%       |
| Percentage of users exporting tasks     | > 70%       |
| CSAT (customer satisfaction) score      | > 4.5 / 5   |
| DAU/WAU Daily/Weekly active users ratio | > 30%       |

### Product Success
- 50% reduction in manual meeting follow-up work (user survey)
- Adoption in teams of 10+ members
- 10,000+ monthly summaries generated in 6 months
- Slack/Email push feature used in >60% of sessions

### Usability Goals
- Task completion time < 3 mins
- User error rate < 2%
- Onboarding NPS > 45
- Accessibility WCAG AA compliance

---

## 7. Notes

- **Accessibility**: All components must meet WCAG 2.1 AA
- **Language Support**: English default
- **Data Handling**: Ephemeral processing unless explicitly saved
- **Fallback UX**: Clear messaging when integrations are unavailable
- **Dark Mode**: Not in MVP; consider for V2 based on user interest
- **AI-generated content must include a disclaimer and "Edit before sending" toggle
- **Use collapsible sections for long summaries