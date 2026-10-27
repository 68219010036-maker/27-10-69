// เรียก API ด่้วย axios + เก็บข้อมูลผู้ใช้ที่ Login 
import axios from 'axios';
import { reactive } from 'vue';

function loadUser() {
    try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return null;
        if (storedUser === 'undefined') {
            localStorage.removeItem('user');
            return null;
        }
        return JSON.parse(storedUser);
    } catch {
        localStorage.removeItem('user');
        return null;
    }
}

// ข้อมูลที่ทุกหน้าใช้ร่วมกัน 
export const state = reactive({
    user: loadUser(),
    message: '', // ข้อความแจ้งเตือนมุมจอ
});

export const api = axios.create ({ baseURL: '/api' }); 

// แนบ token ไปกับทุกคำขอ 
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = 'Bearer ' + token;
    return config;
});

// สำเร็จ: คืนเฉพาะ body / ผิดพลาด: แสดงข้อความจาก API 
api.interceptors.response.use(
    (res) => res,
    (err) => {
        state.message = err.response?.data.message || 'เชื่อมต่อ API ไม่ได้';
        return Promise.reject(err);
    },
);

export function saveLogin(token,user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    state.user = user;
}

export function logout() {
    localStorage.clear();
    state.user = null;
}

// ลิงค์ดาวน์โหลดไฟล์ (แนบ token ใน URL) 
 export function fileUrl(name) {
    return '/api/files/' + name + '?token=' + localStorage.getItem('token'); 
 }

 // กกฏตรวจข้อมูลในฟอร์ม (Data Validation) 
 export const rules = {
    required: (v) => (v !== null && v !== undefined && v !== '') || 'ห้ามว่าง',
    email: (v) => !v || /^\S+@\S+$/.test(v) || 'รูปแบบอีเมลไม่ถูกต้อง',
    min8: (v) => (v && v.length >=8) || 'อย่างน้อย 8 ตัวอักษร',
 };

 // ชื่อที่แสดงบนหน้าจอ 
 export const roleName = { admin: 'ฝ่ายบุคลากร', evaluatee: 'ผู้รับการประเมิน', evaluatee: 'กรรมการ' };
 export const committeeName = { chair: 'ประธาน', member: 'กรรมการร่วม' };
 export const statusNames = { panding: 'ยังไม่ได้ประเมิน', draft: 'บันทึกร่าง', confirmed: 'ยืนยันผลแล้ว' };
 export const statusColors = { panding: 'grey', draft: 'orange', confirmed: 'green' };
