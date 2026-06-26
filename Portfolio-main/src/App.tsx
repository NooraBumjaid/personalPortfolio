import { Navigate, Route, Routes } from "@/lib/router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { BackToTop } from "@/components/ui/BackToTop";
import { HomePage } from "@/src/pages/HomePage";
import { ProjectsPage } from "@/src/pages/ProjectsPage";
import { ProjectDetailPage } from "@/src/pages/ProjectDetailPage";
import { CertificationsPage } from "@/src/pages/CertificationsPage";
import { ActivitiesPage } from "@/src/pages/ActivitiesPage";
import { ResumePage } from "@/src/pages/ResumePage";
import { ProjectVideosPage } from "@/src/pages/ProjectVideosPage";
import { ProjectSlidesPage } from "@/src/pages/ProjectSlidesPage";
import { ProjectPosterPage } from "@/src/pages/ProjectPosterPage";
import { ProjectPrototypePage } from "@/src/pages/ProjectPrototypePage";
import { ProjectReportsPage } from "@/src/pages/ProjectReportsPage";
import { ProjectDocumentPage } from "@/src/pages/ProjectDocumentPage";
import { NotFoundPage } from "@/src/pages/NotFoundPage";

export function App() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/projects/:slug/videos" element={<ProjectVideosPage />} />
          <Route path="/projects/:slug/slides" element={<ProjectSlidesPage />} />
          <Route path="/projects/:slug/poster" element={<ProjectPosterPage />} />
          <Route path="/projects/:slug/prototype" element={<ProjectPrototypePage />} />
          <Route path="/projects/:slug/reports" element={<ProjectReportsPage />} />
          <Route path="/projects/:slug/document/:docSlug" element={<ProjectDocumentPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
