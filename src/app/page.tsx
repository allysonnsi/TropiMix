import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import CategoriesSection from "@/components/Home/CategoriesSection";
import AboutSection from "@/components/Home/AboutSection";
import HoursLocationSection from "@/components/Home/HoursLocationSection";
import InstagramSection from "@/components/Home/InstagramSection";
import CtaSection from "@/components/Home/CtaSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <CategoriesSection />
        <AboutSection />
        <HoursLocationSection />
        <InstagramSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
