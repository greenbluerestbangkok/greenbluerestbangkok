import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateWebsiteSettingsSchema } from '@/lib/schema';
import { getFile, putFile } from '@/lib/github';

const SETTINGS_FILE_PATH = '/data/settings/website.json';

// GET /api/settings - Get website settings
export async function GET(request: NextRequest) {
  try {
    const result = await getFile(SETTINGS_FILE_PATH).catch(() => null);

    if (!result) {
      // Return default settings if file doesn't exist
      const defaultSettings = {
        id: 'website',
        siteName: 'GreenBlueRest Bangkok',
        siteDescription: 'โครงการท่องเที่ยวชุมชนย่านคลองบางมดอย่างยั่งยืน',
        siteKeywords: 'ท่องเที่ยวชุมชน, คลองบางมด, Low Carbon Tourism',
        contactEmail: 'info@greenbluerestbangkok.com',
        contactPhone: '081-234-5678',
        contactAddress: 'ชุมชนคลองบางมด กรุงเทพฯ',
        socialMedia: {
          facebook: '',
          instagram: '',
          line: '',
          youtube: ''
        },
        seo: {
          metaTitle: 'เที่ยวชุมชนวิถีคลองบางมด - GreenBlueRest Bangkok',
          metaDescription: 'ค้นพบประสบการณ์ใหม่ในกรุงเทพฯ ที่คุณไม่เคยเห็น พร้อมทริปท่องเที่ยวชุมชนที่หลากหลายครบทั้ง 11 ทริป',
          metaKeywords: 'ท่องเที่ยวชุมชน, คลองบางมด, กรุงเทพฯ, Low Carbon Tourism',
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
        },
        updatedAt: new Date().toISOString()
      };

      return NextResponse.json({
        success: true,
        settings: defaultSettings
      });
    }

    const content = JSON.parse(Buffer.from(result.content, 'base64').toString('utf-8'));
    
    return NextResponse.json({
      success: true,
      settings: {
        ...content,
        sha: result.sha
      }
    });

  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/settings - Update website settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updateData = updateWebsiteSettingsSchema.parse(body);

    // Get existing settings
    const existingResult = await getFile(SETTINGS_FILE_PATH).catch(() => null);
    let existingSettings = {};

    if (existingResult) {
      existingSettings = JSON.parse(Buffer.from(existingResult.content, 'base64').toString('utf-8'));
    }

    // Update settings
    const updatedSettings = {
      ...existingSettings,
      ...updateData,
      id: 'website',
      updatedAt: new Date().toISOString()
    };

    // Save to GitHub
    const settingsContent = JSON.stringify(updatedSettings, null, 2);
    const base64Content = Buffer.from(settingsContent, 'utf-8').toString('base64');

    const result = await putFile(
      SETTINGS_FILE_PATH,
      base64Content,
      `chore(admin): update website settings`,
      existingResult?.sha
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to update settings' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      settings: updatedSettings,
      commit: result
    });

  } catch (error) {
    console.error('Error updating settings:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid settings data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
