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
      { name: 'Python', colors: ['#3672a4', '#ffd248'] },
      { name: 'Vue', colors: ['#41b883', '#35495e'] },
      { name: 'Docker', colors: ['#1d63ed', '#2496ed'] },
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
      { name: '.NET', colors: ['#512bd4', '#9b4dca'] },
      { name: 'ASP.NET', colors: ['#512bd4', '#1ba1e2'] },
      { name: 'Vue', colors: ['#41b883', '#35495e'] },
    ],
  },
]
