'use client';

import { useState, useEffect } from 'react';
import { WebsiteSettings } from '@/lib/schema';

export default function SettingsPage() {
  const [settings, setSettings] = useState<WebsiteSettings>({
    id: 'website',
    siteName: '',
    siteDescription: '',
    siteKeywords: '',
    contactEmail: '',
    contactPhone: '',
    contactAddress: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      line: '',
      youtube: ''
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      ogImage: ''
    },
    analytics: {
      googleAnalytics: '',
      facebookPixel: ''
    },
    theme: {
      primaryColor: '#059669',
      secondaryColor: '#0891b2',
      accentColor: '#7c3aed'
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/admin/api/settings');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch settings');
      }

      setSettings(data.settings);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (parent === 'socialMedia') {
          newSettings.socialMedia = { ...newSettings.socialMedia, [child as any]: value };
        } else if (parent === 'seo') {
          newSettings.seo = { ...newSettings.seo, [child as any]: value };
        } else if (parent === 'analytics') {
          newSettings.analytics = { ...newSettings.analytics, [child as any]: value };
        } else if (parent === 'theme') {
          newSettings.theme = { ...newSettings.theme, [child as any]: value };
        }
      } else {
        (newSettings as any)[field] = value;
      }
      
      return newSettings;
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch('/admin/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update settings');
      }

      setSuccess('บันทึกการตั้งค่าสำเร็จ');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">การตั้งค่าเว็บไซต์</h1>
            <p className="text-gray-600">จัดการการตั้งค่า SEO, ข้อมูลติดต่อ และการวิเคราะห์</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="alert alert-error mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success mb-6">
            {success}
          </div>
        )}

        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">ข้อมูลพื้นฐาน</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="form-label">ชื่อเว็บไซต์</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="md:col-span-2">
                <label className="form-label">คำอธิบายเว็บไซต์</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  className="form-input"
                  rows={3}
                />
              </div>

              <div className="md:col-span-2">
                <label className="form-label">Keywords</label>
                <input
                  type="text"
                  value={settings.siteKeywords}
                  onChange={(e) => handleInputChange('siteKeywords', e.target.value)}
                  placeholder="คั่นด้วยเครื่องหมายจุลภาค"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">ข้อมูลติดต่อ</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">อีเมล</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="md:col-span-2">
                <label className="form-label">ที่อยู่</label>
                <textarea
                  value={settings.contactAddress}
                  onChange={(e) => handleInputChange('contactAddress', e.target.value)}
                  className="form-input"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Media</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Facebook</label>
                <input
                  type="url"
                  value={settings.socialMedia.facebook}
                  onChange={(e) => handleInputChange('socialMedia.facebook', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Instagram</label>
                <input
                  type="url"
                  value={settings.socialMedia.instagram}
                  onChange={(e) => handleInputChange('socialMedia.instagram', e.target.value)}
                  placeholder="https://instagram.com/yourpage"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">LINE</label>
                <input
                  type="text"
                  value={settings.socialMedia.line}
                  onChange={(e) => handleInputChange('socialMedia.line', e.target.value)}
                  placeholder="@yourlineid หรือ URL"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">YouTube</label>
                <input
                  type="url"
                  value={settings.socialMedia.youtube}
                  onChange={(e) => handleInputChange('socialMedia.youtube', e.target.value)}
                  placeholder="https://youtube.com/channel/yourchannel"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">การตั้งค่า SEO</h2>
            
            <div className="space-y-6">
              <div>
                <label className="form-label">Meta Title</label>
                <input
                  type="text"
                  value={settings.seo.metaTitle}
                  onChange={(e) => handleInputChange('seo.metaTitle', e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Meta Description</label>
                <textarea
                  value={settings.seo.metaDescription}
                  onChange={(e) => handleInputChange('seo.metaDescription', e.target.value)}
                  className="form-input"
                  rows={3}
                />
              </div>

              <div>
                <label className="form-label">Meta Keywords</label>
                <input
                  type="text"
                  value={settings.seo.metaKeywords}
                  onChange={(e) => handleInputChange('seo.metaKeywords', e.target.value)}
                  placeholder="คั่นด้วยเครื่องหมายจุลภาค"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Open Graph Image URL</label>
                <input
                  type="url"
                  value={settings.seo.ogImage}
                  onChange={(e) => handleInputChange('seo.ogImage', e.target.value)}
                  placeholder="https://example.com/og-image.jpg"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">การวิเคราะห์</h2>
            
            <div className="space-y-6">
              <div>
                <label className="form-label">Google Analytics ID</label>
                <input
                  type="text"
                  value={settings.analytics.googleAnalytics}
                  onChange={(e) => handleInputChange('analytics.googleAnalytics', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Facebook Pixel ID</label>
                <input
                  type="text"
                  value={settings.analytics.facebookPixel}
                  onChange={(e) => handleInputChange('analytics.facebookPixel', e.target.value)}
                  placeholder="123456789012345"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Theme Colors */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">สีธีม</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="form-label">สีหลัก</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.theme.primaryColor}
                    onChange={(e) => handleInputChange('theme.primaryColor', e.target.value)}
                    className="w-12 h-10 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={settings.theme.primaryColor}
                    onChange={(e) => handleInputChange('theme.primaryColor', e.target.value)}
                    className="form-input flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">สีรอง</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.theme.secondaryColor}
                    onChange={(e) => handleInputChange('theme.secondaryColor', e.target.value)}
                    className="w-12 h-10 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={settings.theme.secondaryColor}
                    onChange={(e) => handleInputChange('theme.secondaryColor', e.target.value)}
                    className="form-input flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">สีเน้น</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.theme.accentColor}
                    onChange={(e) => handleInputChange('theme.accentColor', e.target.value)}
                    className="w-12 h-10 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={settings.theme.accentColor}
                    onChange={(e) => handleInputChange('theme.accentColor', e.target.value)}
                    className="form-input flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
