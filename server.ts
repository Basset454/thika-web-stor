import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production';

// Ensure data and uploads directories exist
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `furniture-${uniqueSuffix}${ext || '.jpg'}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('يُسمح برفع الصور فقط'));
    }
  },
});

// Seed data
interface ProductRecord {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  mainImage: string;
  price?: number | null;
  availability: 'متوفر' | 'غير متوفر';
  featured: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface DatabaseSchema {
  products: ProductRecord[];
  categories: CategoryRecord[];
  adminSessions: { token: string; email: string; createdAt: number }[];
  storeInfo: {
    name: string;
    tagline: string;
    address: string;
    city: string;
    primaryPhone: string;
    additionalPhones: string[];
    email: string;
    googleMapsUrl: string;
    facebookFollowers: string;
    showroomDetails: string;
  };
}

const DEFAULT_STORE_INFO = {
  name: 'أثاث الثقة جيجل 18',
  tagline: 'أثاث الثقة… اختيارٌ يليق بمن يرى الفخامة أسلوب حياة.',
  address: 'بورمل، جيجل، الجزائر',
  city: 'جيجل',
  primaryPhone: '0560 10 77 45',
  additionalPhones: ['0664 02 99 68', '0659 02 21 99'],
  email: 'meubleconfiancejijel18@gmail.com',
  googleMapsUrl: 'https://maps.app.goo.gl/XYLZfTao58Y5pydc6',
  facebookFollowers: '73,000+',
  showroomDetails: 'معرض داخلي فاخر ومجهز بالكامل، يمتد على عدة مستويات بما في ذلك طابق تحت الأرض لعرض أرقى التشكيلات.',
};

const DEFAULT_CATEGORIES: CategoryRecord[] = [
  {
    id: 'cat-salons',
    name: 'صالونات',
    slug: 'salons',
    description: 'تشكيلة صالونات فاخرة تجمع بين الراحة الاستثنائية والأناقة المعاصرة',
  },
  {
    id: 'cat-bedrooms',
    name: 'غرف نوم',
    slug: 'bedrooms',
    description: 'غرف نوم راقية بتصميم هادئ ومدروس تمنحكم أقصى درجات الراحة',
  },
];

const DEFAULT_PRODUCTS: ProductRecord[] = [
  {
    id: 'prod-livinda',
    name: 'Salon 6P Livinda',
    slug: 'salon-6p-livinda',
    category: 'صالونات',
    description: 'صالون فاخر مكون من 6 مقاعد بتصميم عصري وأنسجة راقية تمنح منزلك فخامة استثنائية وراحة متناهية. متوفر حصرياً لدى معرض أثاث الثقة جيجل 18.',
    images: [
      '/src/assets/images/salon_livinda_showcase_1791306326700.jpg',
      '/src/assets/images/showroom_gallery_jijel_1791306361669.jpg',
    ],
    mainImage: '/src/assets/images/salon_livinda_showcase_1791306326700.jpg',
    price: null,
    availability: 'متوفر',
    featured: true,
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-pilot-plus',
    name: 'Salon Pilot Plus',
    slug: 'salon-pilot-plus',
    category: 'صالونات',
    description: 'طقم صالون عصري ومتميز بتفاصيل متقونة وهيكل متين يجسد أرقى معايير الأناقة والراحة المعاصرة. تصميم فخم يضفي طابعاً ملكياً على غرفة الجلوس.',
    images: [
      '/src/assets/images/salon_pilot_plus_showcase_1791306337877.jpg',
      '/src/assets/images/showroom_gallery_jijel_1791306361669.jpg',
    ],
    mainImage: '/src/assets/images/salon_pilot_plus_showcase_1791306337877.jpg',
    price: null,
    availability: 'متوفر',
    featured: true,
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-master-bedroom',
    name: 'غرفة نوم ماستر فاخرة',
    slug: 'luxury-master-bedroom',
    category: 'غرف نوم',
    description: 'تشكيلة غرف نوم راقية بتصميم متناسق وخامات عالية الجودة تضفي سكينة وفخامة على مساحتكم الخاصة. تشمل سريراً مريحاً وخزانة ملابس وطاولات سرير متطابقة.',
    images: [
      '/src/assets/images/bedroom_luxury_suite_1791306350443.jpg',
      '/src/assets/images/showroom_gallery_jijel_1791306361669.jpg',
    ],
    mainImage: '/src/assets/images/bedroom_luxury_suite_1791306350443.jpg',
    price: null,
    availability: 'متوفر',
    featured: true,
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial: DatabaseSchema = {
        products: DEFAULT_PRODUCTS,
        categories: DEFAULT_CATEGORIES,
        adminSessions: [],
        storeInfo: DEFAULT_STORE_INFO,
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database:', err);
    return {
      products: DEFAULT_PRODUCTS,
      categories: DEFAULT_CATEGORIES,
      adminSessions: [],
      storeInfo: DEFAULT_STORE_INFO,
    };
  }
}

function writeDb(data: DatabaseSchema): void {
  try {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error writing database:', err);
  }
}

// Ensure initial database exists
readDb();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(UPLOADS_DIR));

// Admin authentication middleware
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@confiance18.dz';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'JijelConfiance18!';

function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'غير مصرح به. يرجى تسجيل الدخول' });
  }
  const token = authHeader.split(' ')[1];
  const db = readDb();
  const session = db.adminSessions.find((s) => s.token === token);

  // Check session validity (24 hours)
  const DAY_MS = 24 * 60 * 60 * 1000;
  if (!session || Date.now() - session.createdAt > DAY_MS) {
    return res.status(401).json({ error: 'انتهت صلاحية الجلسة. يرجى إعادة تسجيل الدخول' });
  }

  (req as any).admin = session;
  next();
}

// Helper to generate slug
function generateSlug(name: string): string {
  const base = name
    .trim()
    .toLowerCase()
    .replace(/[^\w\s\u0621-\u064A-]/g, '')
    .replace(/[\s_]+/g, '-');
  return `${base}-${Date.now().toString().slice(-4)}`;
}

// ----------------- Public API Endpoints -----------------

// Store Info
app.get('/api/store-info', (_req: Request, res: Response) => {
  const db = readDb();
  res.json(db.storeInfo || DEFAULT_STORE_INFO);
});

// Categories list with active product count
app.get('/api/categories', (_req: Request, res: Response) => {
  const db = readDb();
  const activeProducts = db.products.filter((p) => !p.archived);

  const categoriesWithCount = db.categories.map((c) => ({
    ...c,
    productCount: activeProducts.filter((p) => p.category === c.name).length,
  }));

  res.json(categoriesWithCount);
});

// Active Products list with filters
app.get('/api/products', (req: Request, res: Response) => {
  const db = readDb();
  const { category, featured } = req.query;

  let list = db.products.filter((p) => !p.archived);

  if (category && typeof category === 'string' && category !== 'الكل' && category !== 'جميع المنتجات') {
    list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (featured === 'true') {
    list = list.filter((p) => p.featured);
  }

  res.json(list);
});

// Single Product details by slug or id
app.get('/api/products/:identifier', (req: Request, res: Response) => {
  const db = readDb();
  const { identifier } = req.params;

  const product = db.products.find(
    (p) => (!p.archived && p.slug === identifier) || p.id === identifier
  );

  if (!product) {
    return res.status(404).json({ error: 'المنتج غير موجود' });
  }

  // Get related products in the same category
  const related = db.products
    .filter((p) => !p.archived && p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  res.json({ product, related });
});

// ----------------- Admin Auth Endpoints -----------------

app.post('/api/admin/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' });
  }

  const validEmail = ADMIN_EMAIL.toLowerCase();
  const validPassword = ADMIN_PASSWORD;

  if (email.trim().toLowerCase() !== validEmail || password !== validPassword) {
    return res.status(401).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const db = readDb();

  // Clean old sessions
  const DAY_MS = 24 * 60 * 60 * 1000;
  db.adminSessions = db.adminSessions.filter((s) => Date.now() - s.createdAt < DAY_MS);
  db.adminSessions.push({
    token,
    email: email.trim().toLowerCase(),
    createdAt: Date.now(),
  });
  writeDb(db);

  res.json({
    token,
    admin: {
      email: validEmail,
      name: 'مسؤول أثاث الثقة',
    },
  });
});

app.get('/api/admin/me', authenticateAdmin, (req: Request, res: Response) => {
  const adminSession = (req as any).admin;
  res.json({
    email: adminSession.email,
    name: 'مسؤول أثاث الثقة',
  });
});

// ----------------- Admin Protected Endpoints -----------------

// Stats
app.get('/api/admin/stats', authenticateAdmin, (_req: Request, res: Response) => {
  const db = readDb();
  const totalProducts = db.products.length;
  const activeProducts = db.products.filter((p) => !p.archived).length;
  const archivedProducts = db.products.filter((p) => p.archived).length;
  const featuredProducts = db.products.filter((p) => p.featured && !p.archived).length;
  const totalCategories = db.categories.length;

  res.json({
    totalProducts,
    activeProducts,
    archivedProducts,
    featuredProducts,
    totalCategories,
  });
});

// Get all products (including archived)
app.get('/api/admin/products', authenticateAdmin, (_req: Request, res: Response) => {
  const db = readDb();
  res.json(db.products);
});

// Create product
app.post('/api/admin/products', authenticateAdmin, (req: Request, res: Response) => {
  const { name, category, description, images, mainImage, price, availability, featured } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: 'اسم المنتج والفئة مطلوبان' });
  }

  const db = readDb();
  const id = `prod-${Date.now()}`;
  const slug = generateSlug(name);

  const productImages = Array.isArray(images) && images.length > 0 ? images : [mainImage || '/src/assets/images/hero_luxury_furniture_1791306311706.jpg'];
  const primaryImage = mainImage || productImages[0];

  const newProduct: ProductRecord = {
    id,
    name: name.trim(),
    slug,
    category: category.trim(),
    description: description ? description.trim() : '',
    images: productImages,
    mainImage: primaryImage,
    price: price ? Number(price) : null,
    availability: availability === 'غير متوفر' ? 'غير متوفر' : 'متوفر',
    featured: Boolean(featured),
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.products.unshift(newProduct);
  writeDb(db);

  res.status(201).json(newProduct);
});

// Update product
app.put('/api/admin/products/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, description, images, mainImage, price, availability, featured } = req.body;

  const db = readDb();
  const index = db.products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'المنتج غير موجود' });
  }

  const existing = db.products[index];
  const productImages = Array.isArray(images) && images.length > 0 ? images : existing.images;
  const primaryImage = mainImage || (productImages.length > 0 ? productImages[0] : existing.mainImage);

  const updated: ProductRecord = {
    ...existing,
    name: name !== undefined ? name.trim() : existing.name,
    category: category !== undefined ? category.trim() : existing.category,
    description: description !== undefined ? description.trim() : existing.description,
    images: productImages,
    mainImage: primaryImage,
    price: price !== undefined ? (price ? Number(price) : null) : existing.price,
    availability: availability !== undefined ? availability : existing.availability,
    featured: featured !== undefined ? Boolean(featured) : existing.featured,
    updatedAt: new Date().toISOString(),
  };

  db.products[index] = updated;
  writeDb(db);

  res.json(updated);
});

// Toggle Archive
app.patch('/api/admin/products/:id/toggle-archive', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const product = db.products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'المنتج غير موجود' });
  }

  product.archived = !product.archived;
  product.updatedAt = new Date().toISOString();
  writeDb(db);

  res.json(product);
});

// Toggle Featured
app.patch('/api/admin/products/:id/toggle-featured', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const product = db.products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'المنتج غير موجود' });
  }

  product.featured = !product.featured;
  product.updatedAt = new Date().toISOString();
  writeDb(db);

  res.json(product);
});

// Permanent Delete
app.delete('/api/admin/products/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const index = db.products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'المنتج غير موجود' });
  }

  const deleted = db.products.splice(index, 1)[0];
  writeDb(db);

  res.json({ message: 'تم حذف المنتج بنجاح', deletedId: id });
});

// Add Category
app.post('/api/admin/categories', authenticateAdmin, (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'اسم الفئة مطلوب' });
  }

  const db = readDb();
  const trimmed = name.trim();

  if (db.categories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
    return res.status(400).json({ error: 'هذه الفئة موجودة بالفعل' });
  }

  const newCategory: CategoryRecord = {
    id: `cat-${Date.now()}`,
    name: trimmed,
    slug: generateSlug(trimmed),
    description: description ? description.trim() : '',
  };

  db.categories.push(newCategory);
  writeDb(db);

  res.status(201).json(newCategory);
});

// Delete Category
app.delete('/api/admin/categories/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const index = db.categories.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'الفئة غير موجودة' });
  }

  const removed = db.categories.splice(index, 1)[0];
  writeDb(db);

  res.json({ message: 'تم حذف الفئة بنجاح', deletedId: id });
});

// Multi-image upload
app.post('/api/admin/upload', authenticateAdmin, upload.array('files', 10), (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'لم يتم استلام أي صورة' });
  }

  const urls = files.map((f) => `/uploads/${f.filename}`);
  res.json({ urls });
});

// Delete image from disk
app.delete('/api/admin/upload/:filename', authenticateAdmin, (req: Request, res: Response) => {
  const { filename } = req.params;
  // Security check to avoid path traversal
  const safeFilename = path.basename(filename);
  const filePath = path.join(UPLOADS_DIR, safeFilename);

  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      return res.json({ message: 'تم حذف الصورة من الخادم بنجاح' });
    } catch (e) {
      return res.status(500).json({ error: 'فشل حذف الصورة من الخادم' });
    }
  }

  res.json({ message: 'الصورة غير موجودة أو تم حذفها سابقاً' });
});

// ----------------- Vite Integration & Server Startup -----------------

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Fallback for HTML requests to guarantee SPA rendering and Vite scripts injection
    app.use('*', async (req: Request, res: Response, next: NextFunction) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
