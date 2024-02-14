# เลือก Base Image
FROM python:3.9-slim

# สร้างโฟลเดอร์ที่จะใช้เก็บโปรเจคของเรา
WORKDIR /app

# คัดลอกไฟล์ requirements.txt เข้ามาใน Docker Image
COPY requirements.txt .

# ติดตั้ง dependencies จาก requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# ติดตั้ง ODBC driver โดยใช้ apt install
RUN apt-get update && \
    apt-get install -y apt-transport-https && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y msodbcsql17

# คัดลอกทั้งหมดไฟล์ในโฟลเดอร์ปัจจุบันเข้าไปใน Docker Image
COPY . .

# บอก Docker เราจะเปิดพอร์ต 5000 ใน Container
EXPOSE 5000

# รันแอพพลิเคชัน Flask เมื่อ Container เริ่มทำงาน
CMD ["python", "server.py"]
