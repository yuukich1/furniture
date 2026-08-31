import CollectionGrid from "@/components/collectionGrid";
import ContactSection from "@/components/contactSection";
import Hero from "@/components/hero";
import MaterialsSection from "@/components/materialsSection";
import Header from "@/components/ui/header";


export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <CollectionGrid /> 
      <MaterialsSection />
      <ContactSection /> 
    </>
  );
}
