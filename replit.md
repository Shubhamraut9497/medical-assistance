# MediAssist - Emergency Hospital Recommendation System

## Overview

MediAssist is an AI-powered emergency healthcare application that helps users find the most suitable hospital based on their medical condition. The system analyzes patient symptoms using Google's Gemini AI and recommends nearby hospitals with appropriate specializations. Built for speed and clarity in emergency situations, the application prioritizes rapid comprehension, trust-building through medical-grade clarity, and accessibility.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React 18 with TypeScript using Vite as the build tool
- Wouter for lightweight client-side routing
- Single-page application structure with component-based architecture

**UI Component System**
- Shadcn/ui components built on Radix UI primitives
- Design system based on Material Design principles customized for healthcare
- Tailwind CSS for styling with CSS variables for theming
- Dark/light mode support with persistent theme storage
- Healthcare-focused color palette:
  - Medical Blue primary (trust/professionalism)
  - Emergency Red for critical alerts
  - Success Green for confirmations
  - Warning Amber for caution states

**State Management**
- TanStack Query (React Query) for server state management
- Local React state for UI interactions
- No global state management library (keeps complexity low)

**Key UI Components**
- `ConditionForm`: Main input interface with quick-select condition buttons
- `HospitalCard`: Displays hospital information with specialization badges
- `AnalysisSummary`: Shows AI analysis results with severity indicators
- `LoadingSkeleton`: Provides feedback during AI analysis
- `ThemeToggle`: Manages dark/light mode switching

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- ESM module system
- Development server with Vite integration for HMR

**API Design Pattern**
- RESTful API endpoints
- JSON request/response format
- Centralized error handling middleware
- Request logging with duration tracking

**Core API Endpoints**
- `POST /api/analyze-condition`: Analyzes patient condition and returns hospital recommendations
- `GET /api/latest-analysis`: Retrieves the most recent condition analysis

**Business Logic Layer**
- `storage.ts`: Data access layer implementing repository pattern
- `gemini.ts`: AI service integration for condition analysis
- Separation of concerns between routes, services, and data access

### Data Storage

**Database System**
- PostgreSQL via Neon serverless
- Drizzle ORM for type-safe database operations
- WebSocket connections for serverless compatibility

**Schema Design**

*Hospitals Table*
- Core hospital information (name, address, contact)
- Specialization categorization (Cardiac, Trauma, Neurological, etc.)
- Geolocation data (latitude/longitude for mapping)
- Emergency services array
- Availability status

*Condition Analyses Table*
- Patient condition input tracking
- AI-analyzed category and severity
- Recommended hospital IDs (array)
- Gemini AI analysis text
- Timestamp for historical tracking

*Progress Analyses Table*
- Links to condition analyses
- Accuracy scoring (1-100)
- AI-generated insights
- Improvement suggestions
- Recommendation quality tracking

**Database Operations**
- Filtered queries by specialization for hospital matching
- Array-based hospital ID lookups
- Chronological sorting for latest analysis retrieval

### AI Integration

**Google Gemini AI Service**
- Model: gemini-2.5-pro for advanced analysis
- Structured JSON response schema enforcement
- Response MIME type: application/json

**Condition Analysis Flow**
1. User submits symptom description
2. Gemini AI analyzes and categorizes condition
3. AI determines severity level (Critical/Moderate/Low)
4. AI recommends required hospital specializations
5. System matches recommendations to database hospitals
6. Results stored for progress tracking

**AI Prompt Engineering**
- Medical triage system prompt for condition categorization
- Structured output with category, severity, analysis, and specializations
- Secondary analysis for accuracy scoring and improvement suggestions

### Authentication & Sessions

Currently not implemented - application is open-access for emergency scenarios. Session infrastructure exists (connect-pg-simple) but authentication is not enforced for rapid emergency access.

## External Dependencies

### AI Services
- **Google Gemini AI** (@google/genai v1.24.0)
  - Medical condition analysis
  - Hospital recommendation intelligence
  - Progress tracking insights
  - API Key required: GEMINI_API_KEY environment variable

### Database & ORM
- **Neon Serverless PostgreSQL** (@neondatabase/serverless v0.10.4)
  - Serverless-optimized PostgreSQL
  - WebSocket-based connections
  - Requires DATABASE_URL environment variable
- **Drizzle ORM** (v0.39.1)
  - Type-safe database operations
  - Schema-first approach with drizzle-zod integration
  - Migration system via drizzle-kit

### UI Component Libraries
- **Radix UI** (Multiple packages v1.x-2.x)
  - Accessible component primitives
  - Dialog, Popover, Select, Toast, and 20+ other components
  - Unstyled base for custom healthcare design
- **Shadcn/ui Configuration**
  - Pre-configured component aliases
  - New York style variant
  - Tailwind integration with CSS variables

### Utility Libraries
- **TanStack Query** (v5.60.5): Server state and caching
- **React Hook Form** (@hookform/resolvers v3.10.0): Form validation
- **Zod**: Schema validation
- **date-fns** (v3.6.0): Date formatting
- **class-variance-authority**: Component variant management
- **clsx** + **tailwind-merge**: Conditional className handling

### Development Tools
- **Vite** (v6.x): Build tool and dev server
- **TypeScript** (v5.x): Type safety
- **ESBuild**: Production bundling
- **PostCSS** with Autoprefixer: CSS processing

### Fonts & Assets
- **Google Fonts**:
  - Inter: Primary typeface for medical clarity
  - JetBrains Mono: Monospace for data fields