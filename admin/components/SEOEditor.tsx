'use client';

import { useState } from 'react';

interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  slug?: string;
}

interface SEOEditorProps {
  data: SEOData;
  onChange: (data: SEOData) => void;
  baseTitle?: string;
}

export default function SEOEditor({ data, onChange, baseTitle = '' }: SEOEditorProps) {
  const [keywords, setKeywords] = useState(data.metaKeywords?.join(', ') || '');

  const handleChange = (field: keyof SEOData, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleKeywordsChange = (value: string) => {
    setKeywords(value);
    const keywordArray = value.split(',').map(k => k.trim()).filter(k => k.length > 0);
    onChange({
      ...data,
      metaKeywords: keywordArray
    });
  };

  const generateSlug = (text: string) => {
    const slug = text
      .toLowerCase()
      .replace(/[^\u0E00-\u0E7Fa-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    handleChange('slug', slug);
  };

  const titleLength = (data.metaTitle || baseTitle).length;
  const descLength = (data.metaDescription || '').length;
  
  const titleStatus = titleLength < 50 ? 'text-yellow-600' : titleLength > 60 ? 'text-red-600' : 'text-green-600';
  const descStatus = descLength < 120 ? 'text-yellow-600' : descLength > 160 ? 'text-red-600' : 'text-green-600';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          SEO & Metadata
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          ปรับแต่งข้อมูลสำหรับการค้นหาและโซเชียลมีเดีย
        </p>
      </div>

      {/* URL Slug */}
      <div>
        <label className="form-label flex items-center justify-between">
          <span>URL Slug</span>
          <button
            type="button"
            onClick={() => generateSlug(baseTitle)}
            className="text-xs text-indigo-600 hover:text-indigo-800"
          >
            สร้างอัตโนมัติ
          </button>
        </label>
        <input
          type="text"
          value={data.slug || ''}
          onChange={(e) => handleChange('slug', e.target.value)}
          placeholder="url-friendly-slug"
          className="form-input font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          URL จะเป็น: /trips/{data.slug || 'your-trip-slug'}
        </p>
      </div>

      {/* Meta Title */}
      <div>
        <label className="form-label flex items-center justify-between">
          <span>Meta Title</span>
          <span className={`text-xs ${titleStatus}`}>
            {titleLength} ตัวอักษร {titleLength >= 50 && titleLength <= 60 ? '✓' : '⚠️'}
          </span>
        </label>
        <input
          type="text"
          value={data.metaTitle || ''}
          onChange={(e) => handleChange('metaTitle', e.target.value)}
          placeholder={baseTitle || 'เที่ยวชุมชนคลองบางมด - Green Blue Rest Bangkok'}
          className="form-input"
          maxLength={70}
        />
        <p className="text-xs text-gray-500 mt-1">
          แนะนำ 50-60 ตัวอักษร สำหรับผลลัพธ์การค้นหา
        </p>
      </div>

      {/* Meta Description */}
      <div>
        <label className="form-label flex items-center justify-between">
          <span>Meta Description</span>
          <span className={`text-xs ${descStatus}`}>
            {descLength} ตัวอักษร {descLength >= 120 && descLength <= 160 ? '✓' : '⚠️'}
          </span>
        </label>
        <textarea
          value={data.metaDescription || ''}
          onChange={(e) => handleChange('metaDescription', e.target.value)}
          placeholder="คำอธิบายสั้นๆ เกี่ยวกับทริปนี้ที่จะแสดงในผลลัพธ์การค้นหา"
          className="form-input min-h-[100px]"
          maxLength={170}
        />
        <p className="text-xs text-gray-500 mt-1">
          แนะนำ 120-160 ตัวอักษร สำหรับ Google Search Results
        </p>
      </div>

      {/* Keywords */}
      <div>
        <label className="form-label">Keywords</label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => handleKeywordsChange(e.target.value)}
          placeholder="ท่องเที่ยว, คลองบางมด, low carbon, กรุงเทพ"
          className="form-input"
        />
        <p className="text-xs text-gray-500 mt-1">
          แยกคำด้วยเครื่องหมายจุลภาค (,)
        </p>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Open Graph (Facebook, Twitter)
        </h4>
        
        {/* OG Title */}
        <div className="mb-4">
          <label className="form-label">OG Title</label>
          <input
            type="text"
            value={data.ogTitle || ''}
            onChange={(e) => handleChange('ogTitle', e.target.value)}
            placeholder={data.metaTitle || baseTitle || 'เที่ยวชุมชนคลองบางมด'}
            className="form-input"
          />
          <p className="text-xs text-gray-500 mt-1">
            ถ้าไม่ใส่จะใช้ Meta Title
          </p>
        </div>

        {/* OG Description */}
        <div className="mb-4">
          <label className="form-label">OG Description</label>
          <textarea
            value={data.ogDescription || ''}
            onChange={(e) => handleChange('ogDescription', e.target.value)}
            placeholder={data.metaDescription || 'คำอธิบายสำหรับโซเชียลมีเดีย'}
            className="form-input min-h-[80px]"
          />
          <p className="text-xs text-gray-500 mt-1">
            ถ้าไม่ใส่จะใช้ Meta Description
          </p>
        </div>

        {/* OG Image */}
        <div>
          <label className="form-label">OG Image URL</label>
          <input
            type="text"
            value={data.ogImage || ''}
            onChange={(e) => handleChange('ogImage', e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="form-input"
          />
          <p className="text-xs text-gray-500 mt-1">
            แนะนำขนาด 1200x630 pixels สำหรับ Facebook และ Twitter
          </p>
        </div>
      </div>

      {/* Preview */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          🔍 ตัวอย่างผลลัพธ์การค้นหา (Google)
        </h4>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-blue-600 hover:underline cursor-pointer">
            {data.metaTitle || baseTitle || 'ชื่อหน้าเว็บของคุณ'}
          </div>
          <div className="text-xs text-green-700 mt-1">
            https://greenbluerestbangkok.com/trips/{data.slug || 'slug'}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {data.metaDescription || 'คำอธิบายจะแสดงที่นี่...'}
          </div>
        </div>
      </div>
    </div>
  );
}

