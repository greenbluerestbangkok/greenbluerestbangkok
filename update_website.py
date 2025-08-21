#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🌐 Website Update Tool - GreenBlueRest Bangkok
🐍 Python Script สำหรับการอัปเดตเว็บไซต์
📅 สร้างเมื่อ: มกราคม 2025
"""

import os
import shutil
import json
import re
from datetime import datetime
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import webbrowser

class WebsiteUpdater:
    def __init__(self):
        self.website_path = os.getcwd()
        self.backup_path = os.path.join(self.website_path, "backup")
        self.timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # สร้างโฟลเดอร์ backup ถ้ายังไม่มี
        if not os.path.exists(self.backup_path):
            os.makedirs(self.backup_path)
    
    def create_backup(self):
        """สร้างไฟล์สำรอง"""
        try:
            backup_folder = os.path.join(self.backup_path, f"backup_{self.timestamp}")
            shutil.copytree(self.website_path, backup_folder, 
                           ignore=shutil.ignore_patterns('backup', '__pycache__', '*.pyc'))
            return backup_folder
        except Exception as e:
            print(f"❌ เกิดข้อผิดพลาดในการสร้างไฟล์สำรอง: {e}")
            return None
    
    def update_trip_info(self, trip_id, new_name, new_price, new_description):
        """อัปเดตข้อมูลทริป"""
        try:
            # อัปเดต JavaScript
            js_file = os.path.join(self.website_path, "js", "trip-details.js")
            if os.path.exists(js_file):
                with open(js_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # แทนที่ข้อมูลทริป
                pattern = rf'id:\s*{trip_id},[^}}]+}}'
                new_trip_data = f"""    {{
        id: {trip_id},
        name: "{new_name}",
        shortDescription: "{new_description}",
        fullDescription: "{new_description}",
        price: "{new_price}",
        duration: "3-4 ชั่วโมง",
        capacity: "2-8 คน",
        schedule: "ทุกวัน 8:00-17:00",
        mainImage: "../images/trip{trip_id}/small/trip{trip_id}-1.jpg",
        gallery: [
            "../images/trip{trip_id}/large/trip{trip_id}-1.jpg",
            "../images/trip{trip_id}/large/trip{trip_id}-2.jpg",
            "../images/trip{trip_id}/large/trip{trip_id}-3.jpg"
        ],
        highlights: [
            "กิจกรรมใหม่ที่น่าสนใจ",
            "ประสบการณ์พิเศษ",
            "การเรียนรู้ใหม่",
            "ความสนุกสนาน",
            "ความปลอดภัย"
        ],
        includes: [
            "อุปกรณ์ที่จำเป็น",
            "ไกด์ท้องถิ่น",
            "อาหารและเครื่องดื่ม",
            "ประกันอุบัติเหตุ",
            "ของที่ระลึก"
        ]
    }}"""
                
                # ค้นหาและแทนที่ข้อมูลทริป
                if re.search(pattern, content):
                    content = re.sub(pattern, new_trip_data, content)
                    
                    # บันทึกไฟล์
                    with open(js_file, 'w', encoding='utf-8') as f:
                        f.write(content)
                    
                    print(f"✅ อัปเดตข้อมูลทริปที่ {trip_id} สำเร็จ")
                    return True
                else:
                    print(f"❌ ไม่พบข้อมูลทริปที่ {trip_id}")
                    return False
            else:
                print("❌ ไม่พบไฟล์ trip-details.js")
                return False
                
        except Exception as e:
            print(f"❌ เกิดข้อผิดพลาดในการอัปเดตข้อมูลทริป: {e}")
            return False
    
    def update_product_info(self, product_id, new_name, new_price, new_description):
        """อัปเดตข้อมูลสินค้า"""
        try:
            # อัปเดต JavaScript
            js_file = os.path.join(self.website_path, "js", "products.js")
            if os.path.exists(js_file):
                with open(js_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # แทนที่ข้อมูลสินค้า
                pattern = rf'id:\s*{product_id},[^}}]+}}'
                new_product_data = f"""    {{
        id: {product_id},
        name: "{new_name}",
        description: "{new_description}",
        price: "{new_price}",
        category: "สินค้าชุมชน",
        image: "images/products/product{product_id}.jpg"
    }}"""
                
                # ค้นหาและแทนที่ข้อมูลสินค้า
                if re.search(pattern, content):
                    content = re.sub(pattern, new_product_data, content)
                    
                    # บันทึกไฟล์
                    with open(js_file, 'w', encoding='utf-8') as f:
                        f.write(content)
                    
                    print(f"✅ อัปเดตข้อมูลสินค้าที่ {product_id} สำเร็จ")
                    return True
                else:
                    print(f"❌ ไม่พบข้อมูลสินค้าที่ {product_id}")
                    return False
            else:
                print("❌ ไม่พบไฟล์ products.js")
                return False
                
        except Exception as e:
            print(f"❌ เกิดข้อผิดพลาดในการอัปเดตข้อมูลสินค้า: {e}")
            return False
    
    def update_website_name(self, new_name):
        """อัปเดตชื่อเว็บไซต์"""
        try:
            files_to_update = [
                "index.html",
                "pages/trips.html",
                "pages/products.html",
                "pages/contact.html",
                "pages/low-carbon.html",
                "pages/activities.html"
            ]
            
            for file_path in files_to_update:
                full_path = os.path.join(self.website_path, file_path)
                if os.path.exists(full_path):
                    with open(full_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # แทนที่ชื่อเว็บไซต์
                    content = content.replace("GreenBlueRest Bangkok", new_name)
                    content = content.replace("Green Blue Rest Bangkok", new_name)
                    
                    # บันทึกไฟล์
                    with open(full_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    
                    print(f"✅ อัปเดตชื่อเว็บไซต์ใน {file_path} สำเร็จ")
            
            return True
            
        except Exception as e:
            print(f"❌ เกิดข้อผิดพลาดในการอัปเดตชื่อเว็บไซต์: {e}")
            return False
    
    def update_contact_info(self, new_email, new_phone, new_line):
        """อัปเดตข้อมูลติดต่อ"""
        try:
            files_to_update = [
                "index.html",
                "pages/trips.html",
                "pages/products.html",
                "pages/contact.html",
                "pages/low-carbon.html",
                "pages/activities.html"
            ]
            
            for file_path in files_to_update:
                full_path = os.path.join(self.website_path, file_path)
                if os.path.exists(full_path):
                    with open(full_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # แทนที่ข้อมูลติดต่อ
                    if new_email:
                        content = re.sub(r'contact@[^\s<>"]+', new_email, content)
                    if new_phone:
                        content = re.sub(r'08x-xxx-xxxx', new_phone, content)
                    if new_line:
                        content = re.sub(r'@[^\s<>"]+', f"@{new_line}", content)
                    
                    # บันทึกไฟล์
                    with open(full_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    
                    print(f"✅ อัปเดตข้อมูลติดต่อใน {file_path} สำเร็จ")
            
            return True
            
        except Exception as e:
            print(f"❌ เกิดข้อผิดพลาดในการอัปเดตข้อมูลติดต่อ: {e}")
            return False
    
    def preview_changes(self, file_path):
        """ดูตัวอย่างการเปลี่ยนแปลง"""
        try:
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # แสดงตัวอย่างเนื้อหา
                lines = content.split('\n')
                preview_lines = lines[:20]  # แสดง 20 บรรทัดแรก
                
                print(f"\n📄 ตัวอย่างเนื้อหาใน {file_path}:")
                print("=" * 50)
                for i, line in enumerate(preview_lines, 1):
                    print(f"{i:2d}: {line}")
                print("=" * 50)
                
                return True
            else:
                print(f"❌ ไม่พบไฟล์ {file_path}")
                return False
                
        except Exception as e:
            print(f"❌ เกิดข้อผิดพลาดในการดูตัวอย่าง: {e}")
            return False

class WebsiteUpdaterGUI:
    def __init__(self):
        self.updater = WebsiteUpdater()
        self.setup_gui()
    
    def setup_gui(self):
        """สร้าง GUI"""
        self.root = tk.Tk()
        self.root.title("🌐 Website Update Tool - GreenBlueRest Bangkok")
        self.root.geometry("800x600")
        self.root.configure(bg='#f0f0f0')
        
        # สร้าง Notebook สำหรับแท็บต่างๆ
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill='both', expand=True, padx=10, pady=10)
        
        # แท็บข้อมูลทริป
        self.create_trip_tab()
        
        # แท็บข้อมูลสินค้า
        self.create_product_tab()
        
        # แท็บข้อมูลเว็บไซต์
        self.create_website_tab()
        
        # แท็บข้อมูลติดต่อ
        self.create_contact_tab()
        
        # แท็บเครื่องมือ
        self.create_tools_tab()
    
    def create_trip_tab(self):
        """สร้างแท็บข้อมูลทริป"""
        trip_frame = ttk.Frame(self.notebook)
        self.notebook.add(trip_frame, text="🎒 ข้อมูลทริป")
        
        # หัวข้อ
        ttk.Label(trip_frame, text="อัปเดตข้อมูลทริป", font=('Arial', 16, 'bold')).pack(pady=10)
        
        # ฟอร์มข้อมูลทริป
        form_frame = ttk.Frame(trip_frame)
        form_frame.pack(pady=20, padx=20, fill='x')
        
        ttk.Label(form_frame, text="ID ทริป:").grid(row=0, column=0, sticky='w', pady=5)
        self.trip_id_var = tk.StringVar(value="1")
        ttk.Entry(form_frame, textvariable=self.trip_id_var, width=10).grid(row=0, column=1, padx=5, pady=5)
        
        ttk.Label(form_frame, text="ชื่อทริป:").grid(row=1, column=0, sticky='w', pady=5)
        self.trip_name_var = tk.StringVar(value="ทริปใหม่")
        ttk.Entry(form_frame, textvariable=self.trip_name_var, width=40).grid(row=1, column=1, padx=5, pady=5)
        
        ttk.Label(form_frame, text="ราคา:").grid(row=2, column=0, sticky='w', pady=5)
        self.trip_price_var = tk.StringVar(value="500 บาท/คน")
        ttk.Entry(form_frame, textvariable=self.trip_price_var, width=20).grid(row=2, column=1, padx=5, pady=5)
        
        ttk.Label(form_frame, text="คำอธิบาย:").grid(row=3, column=0, sticky='w', pady=5)
        self.trip_desc_var = tk.StringVar(value="คำอธิบายทริปใหม่")
        ttk.Entry(form_frame, textvariable=self.trip_desc_var, width=40).grid(row=3, column=1, padx=5, pady=5)
        
        # ปุ่มอัปเดต
        ttk.Button(form_frame, text="อัปเดตข้อมูลทริป", 
                  command=self.update_trip).grid(row=4, column=0, columnspan=2, pady=20)
    
    def create_product_tab(self):
        """สร้างแท็บข้อมูลสินค้า"""
        product_frame = ttk.Frame(self.notebook)
        self.notebook.add(product_frame, text="🛍️ ข้อมูลสินค้า")
        
        # หัวข้อ
        ttk.Label(product_frame, text="อัปเดตข้อมูลสินค้า", font=('Arial', 16, 'bold')).pack(pady=10)
        
        # ฟอร์มข้อมูลสินค้า
        form_frame = ttk.Frame(product_frame)
        form_frame.pack(pady=20, padx=20, fill='x')
        
        ttk.Label(form_frame, text="ID สินค้า:").grid(row=0, column=0, sticky='w', pady=5)
        self.product_id_var = tk.StringVar(value="1")
        ttk.Entry(form_frame, textvariable=self.product_id_var, width=10).grid(row=0, column=1, padx=5, pady=5)
        
        ttk.Label(form_frame, text="ชื่อสินค้า:").grid(row=1, column=0, sticky='w', pady=5)
        self.product_name_var = tk.StringVar(value="สินค้าใหม่")
        ttk.Entry(form_frame, textvariable=self.product_name_var, width=40).grid(row=1, column=1, padx=5, pady=5)
        
        ttk.Label(form_frame, text="ราคา:").grid(row=2, column=0, sticky='w', pady=5)
        self.product_price_var = tk.StringVar(value="150 บาท")
        ttk.Entry(form_frame, textvariable=self.product_price_var, width=20).grid(row=2, column=1, padx=5, pady=5)
        
        ttk.Label(form_frame, text="คำอธิบาย:").grid(row=3, column=0, sticky='w', pady=5)
        self.product_desc_var = tk.StringVar(value="คำอธิบายสินค้าใหม่")
        ttk.Entry(form_frame, textvariable=self.product_desc_var, width=40).grid(row=3, column=1, padx=5, pady=5)
        
        # ปุ่มอัปเดต
        ttk.Button(form_frame, text="อัปเดตข้อมูลสินค้า", 
                  command=self.update_product).grid(row=4, column=0, columnspan=2, pady=20)
    
    def create_website_tab(self):
        """สร้างแท็บข้อมูลเว็บไซต์"""
        website_frame = ttk.Frame(self.notebook)
        self.notebook.add(website_frame, text="🌐 ข้อมูลเว็บไซต์")
        
        # หัวข้อ
        ttk.Label(website_frame, text="อัปเดตข้อมูลเว็บไซต์", font=('Arial', 16, 'bold')).pack(pady=10)
        
        # ฟอร์มข้อมูลเว็บไซต์
        form_frame = ttk.Frame(website_frame)
        form_frame.pack(pady=20, padx=20, fill='x')
        
        ttk.Label(form_frame, text="ชื่อเว็บไซต์:").grid(row=0, column=0, sticky='w', pady=5)
        self.website_name_var = tk.StringVar(value="GreenBlueRest Bangkok")
        ttk.Entry(form_frame, textvariable=self.website_name_var, width=40).grid(row=0, column=1, padx=5, pady=5)
        
        # ปุ่มอัปเดต
        ttk.Button(form_frame, text="อัปเดตชื่อเว็บไซต์", 
                  command=self.update_website).grid(row=1, column=0, columnspan=2, pady=20)
    
    def create_contact_tab(self):
        """สร้างแท็บข้อมูลติดต่อ"""
        contact_frame = ttk.Frame(self.notebook)
        self.notebook.add(contact_frame, text="📞 ข้อมูลติดต่อ")
        
        # หัวข้อ
        ttk.Label(contact_frame, text="อัปเดตข้อมูลติดต่อ", font=('Arial', 16, 'bold')).pack(pady=10)
        
        # ฟอร์มข้อมูลติดต่อ
        form_frame = ttk.Frame(contact_frame)
        form_frame.pack(pady=20, padx=20, fill='x')
        
        ttk.Label(form_frame, text="Email:").grid(row=0, column=0, sticky='w', pady=5)
        self.contact_email_var = tk.StringVar(value="contact@greenbluerestbangkok.com")
        ttk.Entry(form_frame, textvariable=self.contact_email_var, width=40).grid(row=0, column=1, padx=5, pady=5)
        
        ttk.Label(form_frame, text="โทรศัพท์:").grid(row=1, column=0, sticky='w', pady=5)
        self.contact_phone_var = tk.StringVar(value="08x-xxx-xxxx")
        ttk.Entry(form_frame, textvariable=self.contact_phone_var, width=20).grid(row=1, column=1, padx=5, pady=5)
        
        ttk.Label(form_frame, text="Line OA:").grid(row=2, column=0, sticky='w', pady=5)
        self.contact_line_var = tk.StringVar(value="greenbluerestbangkok")
        ttk.Entry(form_frame, textvariable=self.contact_line_var, width=30).grid(row=2, column=1, padx=5, pady=5)
        
        # ปุ่มอัปเดต
        ttk.Button(form_frame, text="อัปเดตข้อมูลติดต่อ", 
                  command=self.update_contact).grid(row=3, column=0, columnspan=2, pady=20)
    
    def create_tools_tab(self):
        """สร้างแท็บเครื่องมือ"""
        tools_frame = ttk.Frame(self.notebook)
        self.notebook.add(tools_frame, text="🛠️ เครื่องมือ")
        
        # หัวข้อ
        ttk.Label(tools_frame, text="เครื่องมือช่วยเหลือ", font=('Arial', 16, 'bold')).pack(pady=10)
        
        # ปุ่มต่างๆ
        button_frame = ttk.Frame(tools_frame)
        button_frame.pack(pady=20, padx=20, fill='x')
        
        ttk.Button(button_frame, text="📁 สร้างไฟล์สำรอง", 
                  command=self.create_backup).pack(pady=10, fill='x')
        
        ttk.Button(button_frame, text="📄 ดูตัวอย่างไฟล์", 
                  command=self.preview_file).pack(pady=10, fill='x')
        
        ttk.Button(button_frame, text="🌐 เปิดเว็บไซต์", 
                  command=self.open_website).pack(pady=10, fill='x')
        
        ttk.Button(button_frame, text="📖 เปิดคู่มือ", 
                  command=self.open_manual).pack(pady=10, fill='x')
    
    def update_trip(self):
        """อัปเดตข้อมูลทริป"""
        try:
            trip_id = int(self.trip_id_var.get())
            trip_name = self.trip_name_var.get()
            trip_price = self.trip_price_var.get()
            trip_desc = self.trip_desc_var.get()
            
            if self.updater.update_trip_info(trip_id, trip_name, trip_price, trip_desc):
                messagebox.showinfo("สำเร็จ", f"อัปเดตข้อมูลทริปที่ {trip_id} สำเร็จ!")
            else:
                messagebox.showerror("ผิดพลาด", "ไม่สามารถอัปเดตข้อมูลทริปได้")
                
        except ValueError:
            messagebox.showerror("ผิดพลาด", "กรุณาใส่ ID ทริปเป็นตัวเลข")
        except Exception as e:
            messagebox.showerror("ผิดพลาด", f"เกิดข้อผิดพลาด: {e}")
    
    def update_product(self):
        """อัปเดตข้อมูลสินค้า"""
        try:
            product_id = int(self.product_id_var.get())
            product_name = self.product_name_var.get()
            product_price = self.product_price_var.get()
            product_desc = self.product_desc_var.get()
            
            if self.updater.update_product_info(product_id, product_name, product_price, product_desc):
                messagebox.showinfo("สำเร็จ", f"อัปเดตข้อมูลสินค้าที่ {product_id} สำเร็จ!")
            else:
                messagebox.showerror("ผิดพลาด", "ไม่สามารถอัปเดตข้อมูลสินค้าได้")
                
        except ValueError:
            messagebox.showerror("ผิดพลาด", "กรุณาใส่ ID สินค้าเป็นตัวเลข")
        except Exception as e:
            messagebox.showerror("ผิดพลาด", f"เกิดข้อผิดพลาด: {e}")
    
    def update_website(self):
        """อัปเดตชื่อเว็บไซต์"""
        try:
            website_name = self.website_name_var.get()
            
            if self.updater.update_website_name(website_name):
                messagebox.showinfo("สำเร็จ", "อัปเดตชื่อเว็บไซต์สำเร็จ!")
            else:
                messagebox.showerror("ผิดพลาด", "ไม่สามารถอัปเดตชื่อเว็บไซต์ได้")
                
        except Exception as e:
            messagebox.showerror("ผิดพลาด", f"เกิดข้อผิดพลาด: {e}")
    
    def update_contact(self):
        """อัปเดตข้อมูลติดต่อ"""
        try:
            email = self.contact_email_var.get()
            phone = self.contact_phone_var.get()
            line = self.contact_line_var.get()
            
            if self.updater.update_contact_info(email, phone, line):
                messagebox.showinfo("สำเร็จ", "อัปเดตข้อมูลติดต่อสำเร็จ!")
            else:
                messagebox.showerror("ผิดพลาด", "ไม่สามารถอัปเดตข้อมูลติดต่อได้")
                
        except Exception as e:
            messagebox.showerror("ผิดพลาด", f"เกิดข้อผิดพลาด: {e}")
    
    def create_backup(self):
        """สร้างไฟล์สำรอง"""
        try:
            backup_path = self.updater.create_backup()
            if backup_path:
                messagebox.showinfo("สำเร็จ", f"สร้างไฟล์สำรองสำเร็จ!\nตำแหน่ง: {backup_path}")
            else:
                messagebox.showerror("ผิดพลาด", "ไม่สามารถสร้างไฟล์สำรองได้")
        except Exception as e:
            messagebox.showerror("ผิดพลาด", f"เกิดข้อผิดพลาด: {e}")
    
    def preview_file(self):
        """ดูตัวอย่างไฟล์"""
        try:
            file_path = filedialog.askopenfilename(
                title="เลือกไฟล์ที่ต้องการดู",
                filetypes=[("HTML files", "*.html"), ("JavaScript files", "*.js"), ("CSS files", "*.css"), ("All files", "*.*")]
            )
            
            if file_path:
                self.updater.preview_changes(file_path)
                
        except Exception as e:
            messagebox.showerror("ผิดพลาด", f"เกิดข้อผิดพลาด: {e}")
    
    def open_website(self):
        """เปิดเว็บไซต์"""
        try:
            index_path = os.path.join(self.updater.website_path, "index.html")
            if os.path.exists(index_path):
                webbrowser.open(f"file://{os.path.abspath(index_path)}")
            else:
                messagebox.showerror("ผิดพลาด", "ไม่พบไฟล์ index.html")
        except Exception as e:
            messagebox.showerror("ผิดพลาด", f"เกิดข้อผิดพลาด: {e}")
    
    def open_manual(self):
        """เปิดคู่มือ"""
        try:
            manual_path = os.path.join(self.updater.website_path, "คู่มือการแก้ไขเว็บไซต์.md")
            if os.path.exists(manual_path):
                webbrowser.open(f"file://{os.path.abspath(manual_path)}")
            else:
                messagebox.showerror("ผิดพลาด", "ไม่พบไฟล์คู่มือ")
        except Exception as e:
            messagebox.showerror("ผิดพลาด", f"เกิดข้อผิดพลาด: {e}")
    
    def run(self):
        """เริ่มต้น GUI"""
        self.root.mainloop()

def main():
    """ฟังก์ชันหลัก"""
    print("🌐 Website Update Tool - GreenBlueRest Bangkok")
    print("=" * 50)
    
    # ตรวจสอบว่าอยู่ในโฟลเดอร์เว็บไซต์หรือไม่
    if not os.path.exists("index.html"):
        print("❌ กรุณาเรียกใช้ script นี้ในโฟลเดอร์เว็บไซต์")
        print("   (โฟลเดอร์ที่มีไฟล์ index.html)")
        return
    
    print("✅ พบไฟล์เว็บไซต์แล้ว")
    print("🚀 เริ่มต้น GUI...")
    
    # เริ่มต้น GUI
    app = WebsiteUpdaterGUI()
    app.run()

if __name__ == "__main__":
    main()
