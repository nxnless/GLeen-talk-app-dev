# ระบุรูปภาพเริ่มต้นสำหรับการติดตั้งแพ็คเกจและสร้างรหัสของ React
FROM node:latest as build

# ตั้ง directory ทำงานใน container
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json ไปยัง directory ทำงาน
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดแอปพลิเคชันทั้งหมดไปยัง container
COPY . .

# ไม่ต้องรัน npm run build ใน Dockerfile เนื่องจาก Vite จะให้บริการแหล่งข้อมูลโดยตรงโดยไม่ต้องสร้างไดเรกทอรีบิลด์
RUN npm run build
# เลือก Nginx เพื่อใช้เป็นเซิร์ฟเวอร์สำหรับโปรเจกต์ React
FROM nginx:alpine

# คัดลอกไฟล์สำหรับการให้บริการจาก Vite ไปยัง Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# เปิดพอร์ต 80 เพื่อให้ Nginx ให้บริการ
EXPOSE 80

# เริ่มต้น Nginx เมื่อ container ทำงาน
CMD ["nginx", "-g", "daemon off;"]
