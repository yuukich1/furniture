export interface Category {
  id: number;
  name: string;
  slug?: string;
}

export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  isMain: boolean;
}


export interface ProductDetails {
  width?: string;
  height?: string;
  depth?: string;
  material?: string;
  weight?: string;
  [key: string]: unknown; 
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  price?: number;
  description?: string;
  detail?: ProductDetails;
  images?: ProductImage[];
  imageUrl?: string;
}

export const CATEGORIES: Category[] = [
  { id: 1, slug: "sofas", name: "Диваны" },
  { id: 2, slug: "armchairs", name: "Кресла" },
  { id: 3, slug: "beds", name: "Кровати" },
  { id: 4, slug: "tables", name: "Столы" },
  { id: 5, slug: "hallway", name: "Прихожая" },
  { id: 6, slug: "bathroom", name: "Ванная" },
  { id: 7, slug: "outdoor", name: "Уличная" },
  { id: 8, slug: "other", name: "Прочее" },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    categoryId: 1,
    name: "Томи",
    price: 373968,
    description: "Модульный диван с глубокой посадкой и адаптивными спинками. Легко меняет конфигурацию под геометрию помещения.",
    detail: {
      width: "240 см",
      height: "85 см",
      depth: "105 см",
      material: "Текстиль, массив сосны, ППУ",
      weight: "75 кг",
    },
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2400&auto=format&fit=crop&q=80",
    images: [
      {
        id: 101,
        productId: 1,
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2400&auto=format&fit=crop&q=80",
        isMain: true,
      },
      {
        id: 101_2,
        productId: 1,
        imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=2400&auto=format&fit=crop&q=80",
        isMain: false,
      },
    ],
  },
  {
    id: 2,
    categoryId: 1,
    name: "Ломи",
    price: 320500,
    description: "Минималистичный диван с фактурной обивкой букле и наполнителем с эффектом памяти для максимального комфорта.",
    detail: {
      width: "210 см",
      height: "80 см",
      depth: "95 см",
      material: "Букле, березовая фанера",
      weight: "62 кг",
    },
    imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=2400&auto=format&fit=crop&q=80",
    images: [
      {
        id: 102,
        productId: 2,
        imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=2400&auto=format&fit=crop&q=80",
        isMain: true,
      },
      {
        id: 102_2,
        productId: 2,
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2400&auto=format&fit=crop&q=80",
        isMain: false,
      },
    ],
  },
  {
    id: 3,
    categoryId: 1,
    name: "Бали",
    price: 415000,
    description: "Низкая островная модель с широкими подлокотниками и натуральным каркасом из массива ясеня.",
    detail: {
      width: "260 см",
      height: "75 см",
      depth: "110 см",
      material: "Массив ясеня, шенилл",
      weight: "90 кг",
    },
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2400&auto=format&fit=crop&q=80",
    images: [
      {
        id: 103,
        productId: 3,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2400&auto=format&fit=crop&q=80",
        isMain: true,
      },
      {
        id: 103_2,
        productId: 3,
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2400&auto=format&fit=crop&q=80",
        isMain: false,
      },
    ],
  },
  {
    id: 4,
    categoryId: 2,
    name: "Соло",
    price: 142800,
    description: "Акцентное поворотное кресло с эргономичной поддержкой спины и обивкой из износостойкого велюра.",
    detail: {
      width: "85 см",
      height: "82 см",
      depth: "85 см",
      material: "Велюр, стальной каркас",
      weight: "22 кг",
    },
    imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=2400&auto=format&fit=crop&q=80",
    images: [
      {
        id: 104,
        productId: 4,
        imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=2400&auto=format&fit=crop&q=80",
        isMain: true,
      },
      {
        id: 104_2,
        productId: 4,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2400&auto=format&fit=crop&q=80",
        isMain: false,
      },
    ],
  },
  {
    id: 5,
    categoryId: 3,
    name: "Никс",
    price: 268000,
    description: "Кровать с парящим эффектом, мягким изголовьем и встроенным ортопедическим основанием.",
    detail: {
      width: "160 см",
      height: "110 см",
      depth: "210 см",
      material: "МДФ, экокожа, металл",
      weight: "65 кг",
    },
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=2400&auto=format&fit=crop&q=80",
    images: [
      {
        id: 105,
        productId: 5,
        imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=2400&auto=format&fit=crop&q=80",
        isMain: true,
      },
      {
        id: 105_2,
        productId: 5,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2400&auto=format&fit=crop&q=80",
        isMain: false,
      },
    ],
  },
  {
    id: 6,
    categoryId: 4,
    name: "Рига",
    price: 189400,
    description: "Обеденный стол со столешницей из матового керамогранита и скульптурным металлическим подстольем.",
    detail: {
      width: "180 см",
      height: "76 см",
      depth: "90 см",
      material: "Керамогранит, сталь",
      weight: "54 кг",
    },
    imageUrl: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=2400&auto=format&fit=crop&q=80",
    images: [
      {
        id: 106,
        productId: 6,
        imageUrl: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=2400&auto=format&fit=crop&q=80",
        isMain: true,
      },
      {
        id: 106_2,
        productId: 6,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2400&auto=format&fit=crop&q=80",
        isMain: false,
      },
    ],
  },
  {
    id: 7,
    categoryId: 5,
    name: "Вега",
    price: 95000,
    description: "Компактная консоль с открытыми полками и скрытой секцией для хранения аксессуаров.",
    detail: {
      width: "120 см",
      height: "85 см",
      depth: "40 см",
      material: "Шпон дуба, массив",
      weight: "25 кг",
    },
    imageUrl: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=2400&auto=format&fit=crop&q=80",
    images: [
      {
        id: 107,
        productId: 7,
        imageUrl: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=2400&auto=format&fit=crop&q=80",
        isMain: true,
      },
      {
        id: 107_2,
        productId: 7,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2400&auto=format&fit=crop&q=80",
        isMain: false,
      },
    ],
  },
  {
    id: 8,
    categoryId: 6,
    name: "Аура",
    price: 156300,
    description: "Влагостойкая подвесная тумба из термированного ясеня со встроенным керамическим умывальником.",
    detail: {
      width: "100 см",
      height: "50 см",
      depth: "48 см",
      material: "Термоясень, керамика",
      weight: "32 кг",
    },
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=2400&auto=format&fit=crop&q=80",
    images: [
      {
        id: 108,
        productId: 8,
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=2400&auto=format&fit=crop&q=80",
        isMain: true,
      },
      {
        id: 108_2,
        productId: 8,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2400&auto=format&fit=crop&q=80",
        isMain: false,
      },
    ],
  },
  {
    id: 9,
    categoryId: 7,
    name: "Терра",
    price: 210000,
    description: "Лаунж-сет из атмосферостойкого алюминия и подушек с водоотталкивающей пропиткой для террас.",
    detail: {
      width: "200 см",
      height: "70 см",
      depth: "90 см",
      material: "Алюминий, акриловая ткань",
      weight: "45 кг",
    },
    imageUrl: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=2400&auto=format&fit=crop&q=80",
    images: [
      {
        id: 109,
        productId: 9,
        imageUrl: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=2400&auto=format&fit=crop&q=80",
        isMain: true,
      },
      {
        id: 109_2,
        productId: 9,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2400&auto=format&fit=crop&q=80",
        isMain: false,
      },
    ],
  },
  {
    id: 10,
    categoryId: 8,
    name: "Куб",
    price: 48500,
    description: "Многофункциональный приставной пуф-столик из монолитного архитектурного бетона.",
    detail: {
      width: "40 см",
      height: "45 см",
      depth: "40 см",
      material: "Архитектурный бетон",
      weight: "28 кг",
    },
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=2400&auto=format&fit=crop&q=80",
    images: [
      {
        id: 110,
        productId: 10,
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=2400&auto=format&fit=crop&q=80",
        isMain: true,
      },
      {
        id: 110_2,
        productId: 10,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2400&auto=format&fit=crop&q=80",
        isMain: false,
      },
    ],
  },
];

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export async function getProductsByCategoryId(categoryId: number | string): Promise<Product[]> {
  const numericId = Number(categoryId);
  return PRODUCTS.filter((product) => product.categoryId === numericId);
}

export async function getProductById(id: number | string): Promise<Product | null> {
  const numericId = Number(id);
  return PRODUCTS.find((product) => product.id === numericId) || null;
}