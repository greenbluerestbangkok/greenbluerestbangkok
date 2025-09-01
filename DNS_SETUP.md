# DNS Setup Guide for GitHub Pages

## DNS Records ที่ต้องตั้งค่า

### สำหรับโดเมนหลัก (greenbluerestbangkok.com):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| CNAME | www | greenbluerestbangkok.github.io | 3600 |

### สำหรับโดเมน www (www.greenbluerestbangkok.com):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | greenbluerestbangkok.github.io | 3600 |

## ขั้นตอนการตั้งค่า:

1. เข้าสู่ DNS provider ของคุณ (เช่น Cloudflare, GoDaddy, Namecheap)
2. ไปที่ DNS Management
3. เพิ่ม records ตามตารางข้างต้น
4. รอ 24-48 ชั่วโมงให้ DNS propagate

## ตรวจสอบการตั้งค่า:

```bash
# ตรวจสอบ A records
dig greenbluerestbangkok.com A

# ตรวจสอบ CNAME records
dig www.greenbluerestbangkok.com CNAME

# ตรวจสอบ GitHub Pages
curl -I https://greenbluerestbangkok.github.io
```

## หมายเหตุ:
- GitHub Pages จะใช้ IP addresses ของ GitHub
- CNAME record จะ redirect www ไปยัง GitHub Pages
- อาจใช้เวลา 24-48 ชั่วโมงในการ propagate
