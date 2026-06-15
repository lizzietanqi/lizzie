import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import InvolvementSection from "@/components/InvolvementSection";
import WritingSection from "@/components/WritingSection";
import InterestsSection from "@/components/InterestsSection";
import ResourcesSection from "@/components/ResourcesSection";
import ContactSection from "@/components/ContactSection";
import Seo from "@/components/Seo";
import { pageShellClassName } from "@/lib/layout";

const Index = () => {
  return (
    <>
      <Seo
        title="Ashvin Praveen — Co-founder & CEO of Cleve.ai"
        description="Ashvin Praveen builds AI tools for writing, thinking, and communities in Malaysia. Co-founder & CEO of Cleve.ai."
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ashvin Praveen",
            url: "https://ashvinpraveen.com/",
            image: "https://ashvinpraveen.com/ashvin-profile.png",
            jobTitle: "Co-founder & CEO",
            worksFor: {
              "@type": "Organization",
              name: "Cleve.ai",
              url: "https://cleve.ai",
            },
            sameAs: [
              "https://linkedin.com/in/ashvinpraveen",
              "https://instagram.com/ashvinpraveen",
              "https://tiktok.com/@ashvinpraveen",
              "https://x.com/ashvinpk",
              "https://youtube.com/@ashvinpraveen",
              "https://threads.net/@ashvinpraveen",
              "https://github.com/ashvinpraveen",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Ashvin Praveen",
            url: "https://ashvinpraveen.com/",
            description:
              "Ashvin Praveen builds AI tools for writing, thinking, and communities in Malaysia.",
            publisher: {
              "@type": "Person",
              name: "Ashvin Praveen",
            },
          },
        ]}
      />
      <SiteNav />
      <main className={`${pageShellClassName} pb-20 pt-12`}>
        <HeroSection />
        <WorkSection />
        <InvolvementSection />
        <AboutSection />
        <WritingSection />
        <InterestsSection />
        <ResourcesSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
