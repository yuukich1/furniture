import Hero from "./components/hero";
import CollectionGrid from "./components/collectionGrid";
import MaterialsSection from "./components/materialsSection";
import ContactSection from "./components/contactSection";
import Header from "./components/ui/header";

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
