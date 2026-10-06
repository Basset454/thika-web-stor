import { Product, Category, StoreInfo, DashboardStats, AdminUser } from '../types';

const TOKEN_KEY = 'confiance_admin_token';

export const getStoredToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setStoredToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeStoredToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

const getAuthHeaders = (): HeadersInit => {
  const token = getStoredToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Store info
  getStoreInfo: async (): Promise<StoreInfo> => {
    const res = await fetch('/api/store-info');
    if (!res.ok) throw new Error('فشل تحميل معلومات المتجر');
    return res.json();
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    const res = await fetch('/api/categories');
    if (!res.ok) throw new Error('فشل تحميل الفئات');
    return res.json();
  },

  // Products
  getProducts: async (params?: { category?: string; featured?: boolean }): Promise<Product[]> => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.featured) searchParams.append('featured', 'true');

    const res = await fetch(`/api/products?${searchParams.toString()}`);
    if (!res.ok) throw new Error('فشل تحميل المنتجات');
    return res.json();
  },

  getProduct: async (identifier: string): Promise<{ product: Product; related: Product[] }> => {
    const res = await fetch(`/api/products/${encodeURIComponent(identifier)}`);
    if (!res.ok) throw new Error('المنتج غير موجود أو حدث خطأ أثناء التحميل');
    return res.json();
  },

  // Admin Auth
  adminLogin: async (credentials: { email: string; password: string }): Promise<AdminUser> => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'فشل تسجيل الدخول. تحقق من البيانات المدخلة');
    }

    const data = await res.json();
    setStoredToken(data.token);
    return {
      id: 'admin',
      email: data.admin.email,
      name: data.admin.name,
      token: data.token,
    };
  },

  checkAdminAuth: async (): Promise<{ email: string; name: string }> => {
    const res = await fetch('/api/admin/me', {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('غير مسجل الدخول');
    return res.json();
  },

  // Admin Stats
  getAdminStats: async (): Promise<DashboardStats> => {
    const res = await fetch('/api/admin/stats', {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('فشل تحميل إحصائيات لوحة التحكم');
    return res.json();
  },

  // Admin Products
  getAdminProducts: async (): Promise<Product[]> => {
    const res = await fetch('/api/admin/products', {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('فشل تحميل المنتجات للوحة التحكم');
    return res.json();
  },

  createProduct: async (productData: Partial<Product>): Promise<Product> => {
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'فشل إنشاء المنتج');
    }
    return res.json();
  },

  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'فشل تحديث المنتج');
    }
    return res.json();
  },

  toggleArchiveProduct: async (id: string): Promise<Product> => {
    const res = await fetch(`/api/admin/products/${id}/toggle-archive`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('فشل تغيير حالة الأرشفة');
    return res.json();
  },

  toggleFeaturedProduct: async (id: string): Promise<Product> => {
    const res = await fetch(`/api/admin/products/${id}/toggle-featured`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('فشل تغيير تمييز المنتج');
    return res.json();
  },

  deleteProduct: async (id: string): Promise<{ deletedId: string }> => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('فشل حذف المنتج');
    return res.json();
  },

  // Admin Categories
  createCategory: async (categoryData: { name: string; description?: string }): Promise<Category> => {
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(categoryData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'فشل إنشاء الفئة');
    }
    return res.json();
  },

  deleteCategory: async (id: string): Promise<{ deletedId: string }> => {
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('فشل حذف الفئة');
    return res.json();
  },

  // Admin Image Upload
  uploadImages: async (files: FileList | File[]): Promise<string[]> => {
    const formData = new FormData();
    const token = getStoredToken();

    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'فشل رفع الصور');
    }

    const data = await res.json();
    return data.urls;
  },

  deleteImageFile: async (urlOrFilename: string): Promise<void> => {
    const filename = urlOrFilename.split('/').pop();
    if (!filename) return;

    await fetch(`/api/admin/upload/${encodeURIComponent(filename)}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },
};
