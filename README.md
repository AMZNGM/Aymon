<div align="center">

# Ahmed Ayman - Aymon

### Multidisciplinary Visual Artist

_"I shut my eyes to see"_

[![Live Demo](https://img.shields.io/badge/Live-aymon.work-black?style=for-the-badge&logo=vercel)](https://www.aymon.work/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Explore-blue?style=for-the-badge)](https://www.aymon.work/work)

</div>

---

## 🎨 Overview

**Ahmed Ayman**, known as **Aymon**, is a Cairo-born visual artist (est. 2003) who has spent over a decade mastering the art of visual storytelling. From photography and filmmaking to graphic design and 3D art, Aymon's work is characterized by powerful visuals and a deep emotional resonance.

This web application serves as his digital canvas, showcasing his diverse portfolio and providing a platform for collaboration with major figures in the music and advertising industries.

## ✨ Key Features

- **Dynamic Portfolio**: A curated showcase of 3D designs, films, and photography.
- **Immersive UI/UX**: High-end animations and 3D interactions powered by GSAP and React Three Fiber.
- **Admin Dashboard**: Secure management of portfolio items and site content.
- **Contact Integration**: A seamless communication channel for collaborations.
- **Responsive Design**: optimized for all devices, from mobile to desktop.

## 🛠️ Tech Stack

### Frontend & Framework

- **[Next.js 16](https://nextjs.org/)**: React framework for production-grade apps.
- **[React 19](https://react.dev/)**: For building interactive user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: Static typing for safer and better development.
- **[Tailwind CSS 4](https://tailwindcss.com/)**: Utility-first CSS framework for modern styling.

### Animation & 3D

- **[GSAP](https://greensock.com/gsap/)**: Professional-grade JavaScript animations.
- **[Motion](https://motion.dev/)**: For elegant React animations.
- **[React Three Fiber](https://r3f.docs.pmnd.rs/)** & **[Drei](https://github.com/pmndrs/drei)**: 3D scene management in React.
- **[Lenis](https://lenis.darkroom.engineering/)**: Smooth scrolling for enhanced UX.
- **[Swapy](https://swapy.berkaysariay.com/)**: For interactive drag-and-drop layouts.
- **[Lucide Icons](https://lucide.dev/)**: Beautifully simple pixel-perfect icons.

### Backend & Tools

- **[Firebase](https://firebase.google.com/)**: Database and authentication services.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/AMZNGM/aymon.git
    cd aymon
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following:

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

    NEXT_PUBLIC_SITE_URL=https://aymon.work/

    SMTP_HOST=your_smtp_host
    SMTP_PORT=587
    SMTP_EMAIL=your_email@example.com
    SMTP_PASSWORD=your_password
    RECIPIENT_EMAIL=recipient@example.com
    ```

### Development

Run the development server:

```bash
npm run dev
```

The app should now be running on [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```text
src/
├── app/            # Next.js App Router (pages & layouts)
├── components/     # UI components (Shared and Feature-specific)
├── hooks/          # Custom React hooks
├── lib/            # External library configurations (e.g., Firebase)
├── seo/            # SEO metadata and configurations
├── types/          # TypeScript definitions
└── utils/          # Helper functions and constants
```

---

<div align="center">
  <p>by <a href="https://github.com/AMZNGM" target="_blank">NGM</a></p>
</div>
