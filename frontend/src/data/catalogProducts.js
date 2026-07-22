import catalogData from './ebaraCatalog.json';

const PLACEHOLDER_IMAGE = '/images/pumps/placeholder.svg';

export function toStoreProduct(product) {
  if (!product) return null;

  const specs = {
    ...(product.power_kw > 0 && { power: `${product.power_kw} kW` }),
    series: product.series,
  };

  return {
    ...product,
    slug: product.id,
    category_slug: product.category,
    short_description: product.description,
    images: [`/images/pumps/${product.image}`],
    image: `/images/pumps/${product.image}`,
    in_stock: true,
    specs,
    tags: [product.series, product.category].filter(Boolean),
  };
}

export const catalogProducts = catalogData.map(toStoreProduct);

export function findCatalogProduct(identifier) {
  return catalogProducts.find(
    (product) => product.id === identifier || product.slug === identifier
  ) || null;
}

export function getRelatedCatalogProducts(product, limit = 4) {
  if (!product) return [];

  return catalogProducts
    .filter((candidate) =>
      candidate.id !== product.id && candidate.category === product.category
    )
    .slice(0, limit);
}

export { PLACEHOLDER_IMAGE };
