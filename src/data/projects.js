// Project portfolio data for the home view.
// Each project renders as a summary card plus a row of technology chips.
// Edit freely — colors are conic-gradient border stops used by GradientBorderCard.

export const projects = [
  {
    name: 'VortexDL',
    tagline: 'Self-hosted video downloader',
    description:
      'A self-hosted video downloader built on FastAPI and Vue 3. Wraps yt-dlp behind a full authentication system, background job processing, and optional delivery to remote machines over SFTP.',
    features: [
      'yt-dlp download queue with configurable concurrent workers',
      'JWT auth with refresh rotation, 2FA (TOTP), and API keys',
      'Real-time job progress via Server-Sent Events',
      'Optional SFTP delivery to admin-managed remote machines',
      'Admin panel with user management and an append-only audit log',
    ],
    githubUrl: 'https://github.com/PeterKelemen2/VortexDL',
    cardColors: ['#3b82f6', '#a855f7', '#ec4899', '#f97316'],
    technologies: [
      {
        name: 'Python',
        colors: ['#3672a4', '#ffd248'],
        techDescription:
          'The entire backend is written in Python 3.12 using FastAPI. It powers the async download workers (yt-dlp), JWT-based authentication with TOTP and refresh-token rotation, rate limiting via slowapi, and SFTP delivery using asyncssh. SQLAlchemy 2.0 with async SQLite is used for persistence.',
      },
      {
        name: 'Vue',
        colors: ['#41b883', '#35495e'],
        techDescription:
          'The frontend is a Vue 3 SPA (Composition API) built with Vite and Tailwind CSS 4. It connects to the FastAPI backend over a Server-Sent Events stream for real-time job progress, manages state with Pinia, and provides the full download queue UI, admin panel, and profile management.',
      },
      {
        name: 'Docker',
        colors: ['#1d63ed', '#2496ed'],
        techDescription:
          'The entire application ships as a single Docker image. supervisord runs nginx (static SPA + reverse proxy) and uvicorn (FastAPI) side-by-side. A single compose.yml with three bind-mounted directories is all that is needed to run the service in production.',
      },
    ],
  },
  {
    name: 'DotNetObd',
    tagline: 'Real-time OBD-II dashboard',
    description:
      'A full-stack .NET and Vue 3 solution that reads live OBD-II data from a car via an ELM327 adapter, visualises it on a real-time dashboard, and exposes it through a REST + Server-Sent Events API.',
    features: [
      'Dependency-free .NET core library for ELM327 PID queries',
      'ASP.NET minimal API with a background polling scheduler',
      'Vue 3 dashboard with animated SVG gauges over an SSE stream',
      'Simulation mode for development without a real vehicle',
      'Optional Spotify now-playing integration via OAuth 2.0',
    ],
    githubUrl: 'https://github.com/PeterKelemen2/DotNetObd',
    cardColors: ['#512bd4', '#7b2fbe', '#1ba1e2'],
    technologies: [
      {
        name: '.NET',
        colors: ['#512bd4', '#9b4dca'],
        techDescription:
          'The core DotNetObd library is a dependency-free .NET 10 package that abstracts ELM327 serial communication. It exposes a typed PID model (RPM, speed, coolant temp, MAF, fuel calculations), an ObdService with an in-memory cache, and a PidSchedule that groups PIDs by poll interval and supports delta-triggered burst polling. Designed to be published as a standalone NuGet package.',
      },
      {
        name: 'ASP.NET',
        colors: ['#512bd4', '#1ba1e2'],
        techDescription:
          'DotNetObd.Api is an ASP.NET 10 minimal-API project that exposes the OBD data over REST and a Server-Sent Events stream. An ObdBackgroundService drives the ELM327 polling loop and writes snapshots to an in-memory store, while a SimulatorBackgroundService replays recorded data for development without a real vehicle. Optional Spotify now-playing integration is available via OAuth 2.0.',
      },
      {
        name: 'Vue',
        colors: ['#41b883', '#35495e'],
        techDescription:
          'The dashboard-frontend is a Vue 3 SPA (Composition API) built with Vite. It consumes the ASP.NET SSE stream via a useObdSnapshot composable and renders live data through animated SVG arc gauges. Additional views cover settings (serial port config), a schedule editor, a Spotify now-playing card, and a component library reference.',
      },
    ],
  },
]
