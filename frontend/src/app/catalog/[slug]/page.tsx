import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { formatSlug } from "@/lib/utils";
import ProductDetailsView from "@/components/cat/detailView";
import HeaderCatalog from "@/components/cat/headerCat";



interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const product = PRODUCTS.find(
    (p) => formatSlug(p.name) === decodedSlug
  );

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-walnut">
      <HeaderCatalog
        activeCategoryId={product.categoryId}
        productName={product.name}
      />
      <ProductDetailsView product={product} />
    </div>
  );
}