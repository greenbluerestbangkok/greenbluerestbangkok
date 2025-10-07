'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data.product);
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });

      if (response.ok) {
        alert('บันทึกสำเร็จ!');
        router.push('/products');
      } else {
        alert('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="spinner"></div></div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบสินค้า</h1>
        <button onClick={() => router.push('/products')} className="btn-primary">กลับ</button>
      </div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={() => router.push('/products')} className="text-gray-600 hover:text-gray-900 mb-4">← กลับ</button>
        <h1 className="text-3xl font-bold text-gray-900">แก้ไขสินค้า: {product.name}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลสินค้า</h2>
          
          <div className="space-y-4">
            <ImageUploader
              currentImage={product.image || product.image_url}
              onImageUpload={async (file) => {
                console.log('Uploading image:', file.name);
                // TODO: Upload to Supabase Storage
                const fakeUrl = `/images/products/${file.name}`;
                setProduct({ ...product, image: fakeUrl, image_url: fakeUrl });
                return fakeUrl;
              }}
              onImageRemove={() => {
                setProduct({ ...product, image: null, image_url: null });
              }}
              label="รูปภาพสินค้า"
              aspectRatio="1:1"
            />

            <div>
              <label className="form-label">ชื่อสินค้า</label>
              <input type="text" value={product.name || ''} onChange={(e) => setProduct({ ...product, name: e.target.value })} className="form-input" required />
            </div>

            <div>
              <label className="form-label">คำอธิบาย</label>
              <textarea value={product.description || ''} onChange={(e) => setProduct({ ...product, description: e.target.value })} className="form-input min-h-[150px]" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">ราคา</label>
                <input type="text" value={product.price || ''} onChange={(e) => setProduct({ ...product, price: e.target.value })} className="form-input" required />
              </div>

              <div>
                <label className="form-label">ผู้ผลิต</label>
                <input type="text" value={product.producer || ''} onChange={(e) => setProduct({ ...product, producer: e.target.value })} className="form-input" required />
              </div>

              <div>
                <label className="form-label">จำนวนสต็อก</label>
                <input type="number" value={product.stock || 0} onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) || 0 })} className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">หมวดหมู่</label>
                <select value={product.category || 'food'} onChange={(e) => setProduct({ ...product, category: e.target.value })} className="form-input">
                  <option value="food">อาหาร</option>
                  <option value="beauty">ความงาม</option>
                  <option value="craft">งานฝีมือ</option>
                  <option value="home">ของใช้ในบ้าน</option>
                </select>
              </div>

              <div>
                <label className="form-label">สถานะ</label>
                <select value={product.status || 'available'} onChange={(e) => setProduct({ ...product, status: e.target.value })} className="form-input">
                  <option value="available">มีสินค้า</option>
                  <option value="out_of_stock">หมดสต็อก</option>
                  <option value="discontinued">เลิกผลิตแล้ว</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => router.push('/products')} className="btn-secondary">ยกเลิก</button>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            {saving ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
          </button>
        </div>
      </form>
    </div>
  );
}
