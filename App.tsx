import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBissCvRl2lJg-KSLXXGRRiXG3do3WQhdM",
  authDomain: "jabla-city.firebaseapp.com",
  projectId: "jabla-city",
  storageBucket: "jabla-city.firebasestorage.app",
  messagingSenderId: "1014231375142",
  appId: "1:1014231375142:web:d8fd3ef44b781350a1b5e7"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const REAL_PHOTOS = {
  mosque: "https://lh3.googleusercontent.com/place-photos/AL8-SNH5RPqKpJT7LsORftzOBRjxriqIdX-DIKbz77e6IuY6jdzk49RzcgL7TCd75BO9lLZw1Q7P66zBFA68ly5bH9hvj8jr0TRe76yQfkRtPQEXNRlloocu2796IIFg51TMtXC5lrcYb92YDt6G4iI=s800-w800-h600",
  mosque2: "https://lh3.googleusercontent.com/place-photos/AL8-SNFvLVTHF-8JJjFErkEjRI6cKEIv9axbYcy0XTPtTElhEDG7daKckN0UP6tcf4-SpFTAEp4_6Y3jM17eopt26nwJR5G69Vfvd5i0S0HZVe5z9Z_YDChbEVkA7ZAn97yfrRIDMcVRM-Y254sTp1Y=s800-w800-h600",
  palace: "https://lh3.googleusercontent.com/places/ANXAkqHME0bHnnxzf1C2MQXujNX27-hDYfNGQJz73IqYZltDVdBQwVWOCvD0uCkWht4hSrc-WE3K_sBYKUmkWZMPF4gKfWS6WlwO3QY=s800-w720-h540",
  palace2: "https://lh3.googleusercontent.com/places/ANXAkqGXyQ1CdoNVQ6Gyg4Bd0DsYLzVvnUeYtDybU4EZdUplBC6QjDUEgDGXs7UqRd7_SM9exiiBGXpcod82ep_QcQEm-KEbOBNoguA=s800-w720-h480",
  palace3: "https://lh3.googleusercontent.com/places/ANXAkqEM0QNrQQ_kX3W1tFJLXFcJDOQbfyuE3SZD7OWW6MpckWzsWKNKp-UXJ-xu5b18Lp1RVHJ7WhjV4OU075dKkJMt7NLpChKhgp0=s800-w800-h600",
  city: "https://lh3.googleusercontent.com/place-photos/AL8-SNG8yVk4T-L00ekScdPqgZJKjVB3-QdK4Dfuwh7hzl0Tqgo_b9KBXulg4arryOX25cd1UuMtFYxNJzDK8Ykl9dKyKSBLVJq6201QBTT9utSRpmyHsJjLBZhw40S9Ozs-2vLThNtaV7GcGIXLIg=s800-w800-h600",
  city2: "https://lh3.googleusercontent.com/place-photos/AL8-SNEy8jcOKUUIklHFKopRCBucTW7KUqVgOUz9-OG73lDwz_vgTHck7X2LlKI9M-tQ1CbhXBbjaUYYGYx-Aj2s7fVaDatl5B3SU7L-KdOmQzag8T31tn_dKIEw4Qqu-S-vta6p3QIjEQeItkCyvg=s800-w563-h563",
  fort: "https://lh3.googleusercontent.com/place-photos/AL8-SNE0JdXKy6Tn7b2wNe-add95zB-9-V7_jIW5_rbUMgDNJf8kuM85byY7803of038z3l16NBa8ErpqPi0W0cKE0ndVSTlRq2yYa5CX73qDmheTn_aatJZaw45bMaXcpMXN9_Ikczk8BE4ekh1M_g=s800-w720-h540",
  fort2: "https://lh3.googleusercontent.com/place-photos/AL8-SNEkgEfTzqXD2xlUMhdXWV1nomxatZq4Kx0ez6gNMDJp3iKhQOb6tcOzUtQ4SzlvaCCdnuXSUeRmM2gObmF3OcrxbinOJXAG3R9a1Sv2xBLtlyrhug99AymqsK2T3LTlLC8A1SrKy2bbeKNJo9k=s800-w720-h482",
  nature: "https://lh3.googleusercontent.com/place-photos/AL8-SNGxT-IEQL5n3QR0ljQzyZNvj0del1nx7gmc_xzopJPSsRTJUACwXt0Ob0_Eyh1eTFALNLORjLOx61ZQqQ0xeurZ6d4yP2mbUZFbxQK_A7-GFasjWLowjr_Ai3y72ThwtbpQxDKZn9qKEU3NfZo=s800-w720-h535",
};

const SLIDES = [
  { id: 1, badge: "عاصمة الدولة الصليحية", title: "مرحباً بك في جبلة", subtitle: "مدينة الملكة أروى بنت أحمد، جوهرة اليمن التاريخية في محافظة إب على ارتفاع ٢٢٠٠ متر", btn1: "استكشف المعالم", btn2: "تاريخ المدينة", bg1: "#042C53", bg2: "#185FA5", accent: "#378ADD" },
  { id: 2, badge: "تراث إسلامي خالد", title: "مسجد الملكة أروى", subtitle: "بُني في القرن ١١م ويضم قبر الملكة أروى — تقييم ٤.٧ ⭐ من الزوار على Google Maps", btn1: "تفاصيل المسجد", btn2: "الموقع", bg1: "#04342C", bg2: "#0F6E56", accent: "#1D9E75" },
  { id: 3, badge: "قصر تاريخي فريد", title: "قصر أروى الملكي", subtitle: "٣٦٥ غرفة تاريخية — تقييم ٤.٤ ⭐ — كان مقر حكم الملكة أروى بمنظر بانورامي خلاب", btn1: "جولة في القصر", btn2: "الصور", bg1: "#412402", bg2: "#854F0B", accent: "#EF9F27" },
];

const LANDMARKS_FULL = [
  { id: "mosque", name: "مسجد الملكة أروى", rating: 4.7, reviews: 61, era: "القرن ١١ الميلادي", category: "مسجد أثري", color: "#185FA5", bg: "#E6F1FB", img: REAL_PHOTOS.mosque, img2: REAL_PHOTOS.mosque2, desc: "يُعدّ مسجد الملكة أروى من أجمل وأهم المساجد الإسلامية في اليمن.", location: "جبلة، محافظة إب، اليمن", mapUrl: "https://maps.google.com/?cid=11215737704700475853" },
  { id: "palace", name: "قصر أروى الملكي", rating: 4.4, reviews: 304, era: "القرن ١١ الميلادي", category: "قصر تاريخي", color: "#0F6E56", bg: "#E1F5EE", img: REAL_PHOTOS.palace, img2: REAL_PHOTOS.palace2, desc: "قصر الملكة أروى بنت أحمد الصليحي التي حكمت في القرن الحادي عشر الميلادي.", location: "جبلة، محافظة إب، اليمن", mapUrl: "https://maps.google.com/?cid=15453322087045509972" },
  { id: "fort", name: "حصن التعكر", rating: 4.6, reviews: 79, era: "العصور الوسطى", category: "حصن أثري", color: "#854F0B", bg: "#FAEEDA", img: REAL_PHOTOS.fort, img2: REAL_PHOTOS.fort2, desc: "حصن تاريخي شامخ يقع في منطقة التعكر بمحافظة إب.", location: "منطقة التعكر، محافظة إب، اليمن", mapUrl: "https://maps.google.com/?cid=3032309188263302391" },
  { id: "city", name: "المدينة التاريخية", rating: null, reviews: null, era: "القرن ١١م — حتى اليوم", category: "مدينة تراثية", color: "#7F77DD", bg: "#EEEDFE", img: REAL_PHOTOS.city, img2: REAL_PHOTOS.city2, desc: "مدينة جبلة القديمة بأزقتها الحجرية الضيقة وبيوتها التقليدية.", location: "جبلة، محافظة إب، اليمن", mapUrl: "https://maps.google.com/?cid=5735414387043044634" },
];

const HISTORY_TIMELINE = [
  { year: "قبل الإسلام", title: "جبلة في عصور اليمن القديم", text: "كانت منطقة جبلة مأهولة بالسكان منذ عصور سحيقة لخصوبة أراضيها وموقعها الجبلي الحصين.", color: "#7F77DD" },
  { year: "١٠٤٧م", title: "تأسيس الدولة الصليحية", text: "أسّس علي بن محمد الصليحي الدولة الصليحية واختار جبلة عاصمةً لها.", color: "#185FA5" },
  { year: "١٠٦٧م", title: "عصر الملكة أروى الذهبي", text: "تولّت الملكة أروى بنت أحمد الصليحي مقاليد الحكم. حكمت أكثر من ٥٠ عاماً.", color: "#0F6E56" },
  { year: "٤٧٧-٥٣٢ هـ", title: "بناء مسجد الملكة أروى", text: "أمرت الملكة أروى ببناء المسجد الجامع في جبلة.", color: "#EF9F27" },
  { year: "١١٣٨م", title: "وفاة الملكة أروى", text: "انتقلت الملكة أروى إلى رحمة الله ودُفنت في المسجد الذي أقامته في جبلة.", color: "#E24B4A" },
  { year: "اليوم", title: "جبلة — إرث خالد", text: "تقف جبلة اليوم موقعاً تراثياً وسياحياً بارزاً.", color: "#1D9E75" },
];

const GALLERY_IMGS = [
  { src: REAL_PHOTOS.mosque, caption: "مسجد الملكة أروى — الواجهة الرئيسية" },
  { src: REAL_PHOTOS.mosque2, caption: "داخل مسجد الملكة أروى" },
  { src: REAL_PHOTOS.palace, caption: "قصر أروى الملكي" },
  { src: REAL_PHOTOS.palace2, caption: "أطلال القصر من الأعلى" },
  { src: REAL_PHOTOS.palace3, caption: "تفاصيل معمارية في القصر" },
  { src: REAL_PHOTOS.city, caption: "جبلة — المدينة التاريخية" },
  { src: REAL_PHOTOS.city2, caption: "منظر عام لجبلة" },
  { src: REAL_PHOTOS.fort, caption: "حصن التعكر الأثري" },
  { src: REAL_PHOTOS.fort2, caption: "حصن التعكر من زاوية أخرى" },
  { src: REAL_PHOTOS.nature, caption: "الطبيعة الجبلية المحيطة بجبلة" },
];

const NEWS = [
  { id: 1, cat: "تراث", catColor: "#185FA5", catBg: "#E6F1FB", date: "٧ أبريل ٢٠٢٥", title: "ترميم مسجد الملكة أروى الأثري يدخل مراحله الأخيرة", summary: "تواصل أعمال ترميم وصيانة مسجد الملكة أروى التاريخي في جبلة.", img: REAL_PHOTOS.mosque, accent: "#185FA5", time: "منذ يومين" },
  { id: 2, cat: "سياحة", catColor: "#0F6E56", catBg: "#E1F5EE", date: "٥ أبريل ٢٠٢٥", title: "ارتفاع ملحوظ في أعداد الزوار القادمين إلى جبلة", summary: "سجّلت مدينة جبلة ارتفاعاً في أعداد السياح والباحثين.", img: REAL_PHOTOS.city, accent: "#0F6E56", time: "منذ ٤ أيام" },
  { id: 3, cat: "تنمية", catColor: "#854F0B", catBg: "#FAEEDA", date: "٢ أبريل ٢٠٢٥", title: "مشروع تطوير أسواق جبلة التراثية", summary: "أعلن المجلس المحلي عن إطلاق مشروع تطوير الأسواق التراثية.", img: REAL_PHOTOS.palace, accent: "#854F0B", time: "منذ أسبوع" },
  { id: 4, cat: "ثقافة", catColor: "#7F77DD", catBg: "#EEEDFE", date: "٢٨ مارس ٢٠٢٥", title: "مهرجان جبلة الثقافي للتراث اليمني", summary: "تستعد مدينة جبلة لاستضافة مهرجانها الثقافي السنوي.", img: REAL_PHOTOS.fort, accent: "#7F77DD", time: "منذ أسبوعين" },
  { id: 5, cat: "بيئة", catColor: "#16A34A", catBg: "#EAF3DE", date: "٢٥ مارس ٢٠٢٥", title: "حملة تشجير في جبال محيط جبلة", summary: "أطلقت الجهات البيئية حملة تشجير شاملة.", img: REAL_PHOTOS.nature, accent: "#16A34A", time: "منذ أسبوعين" },
  { id: 6, cat: "تعليم", catColor: "#D97706", catBg: "#FEF3C7", date: "٢٠ مارس ٢٠٢٥", title: "مركز التعليم والتدريب المهني في جبلة", summary: "افتُتح مركز جديد للتعليم والتدريب المهني في جبلة.", img: REAL_PHOTOS.city2, accent: "#D97706", time: "منذ ٣ أسابيع" },
];

const STATS = [
  { icon: "👥", label: "عدد السكان", value: "٥٠,٠٠٠+", sub: "نسمة", color: "#378ADD" },
  { icon: "🏛️", label: "المعالم الأثرية", value: "١٥+", sub: "موقع", color: "#1D9E75" },
  { icon: "🕌", label: "المساجد التاريخية", value: "٨", sub: "مسجد", color: "#EF9F27" },
  { icon: "⛰️", label: "الارتفاع عن البحر", value: "٢٢٠٠", sub: "متر", color: "#7F77DD" },
  { icon: "📅", label: "عمر المدينة", value: "١٠٠٠+", sub: "سنة", color: "#D97706" },
  { icon: "🎓", label: "المدارس والمعاهد", value: "٢٤", sub: "مؤسسة", color: "#16A34A" },
  { icon: "🏥", label: "المرافق الصحية", value: "١٢", sub: "مرفق", color: "#E24B4A" },
  { icon: "🛒", label: "الأسواق التراثية", value: "٥", sub: "سوق", color: "#9333EA" },
];

const LM_MAP = [
  { id: "mosque", x: 48, y: 52, label: "مسجد الملكة أروى", color: "#185FA5", icon: "🕌", desc: "تقييم ٤.٧ ⭐" },
  { id: "palace", x: 38, y: 38, label: "قصر أروى", color: "#0F6E56", icon: "🏰", desc: "تقييم ٤.٤ ⭐" },
  { id: "market", x: 62, y: 58, label: "السوق القديم", color: "#854F0B", icon: "🏪", desc: "سوق تراثي" },
  { id: "walls", x: 60, y: 33, label: "أسوار المدينة", color: "#7F77DD", icon: "🏯", desc: "تحصينات أثرية" },
  { id: "springs", x: 74, y: 45, label: "عيون المياه", color: "#16A34A", icon: "⛲", desc: "ينابيع طبيعية" },
];

// ============ LOGIN PAGE ============
function LoginPage({ dark }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { setError("يرجى إدخال البريد وكلمة المرور"); return; }
    setLoading(true); setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError("بريد إلكتروني أو كلمة مرور غير صحيحة");
    }
    setLoading(false);
  };

  const card = dark ? "#1a1a2e" : "#fff";
  const txt = dark ? "#e8e8f0" : "#1a1a2e";
  const txt2 = dark ? "#9090b0" : "#6b7280";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const inputBg = dark ? "#252540" : "#f8f9fa";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#042C53,#185FA5)", display: "flex", alignItems: "center", justifyContent: "center", direction: "rtl" }}>
      <div style={{ background: card, borderRadius: 20, padding: 36, width: 360, maxWidth: "90vw", border: `1px solid ${border}`, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, justifyContent: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#185FA5,#378ADD)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏛️</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500, color: txt }}>جبلة — درة اليمن</div>
            <div style={{ fontSize: 11, color: txt2 }}>لوحة التحكم — دخول المدير</div>
          </div>
        </div>

        {error && <div style={{ background: "#FCEBEB", color: "#A32D2D", border: "1px solid #F7C1C1", borderRadius: 10, padding: "10px 14px", fontSize: 12, marginBottom: 16, textAlign: "center" }}>{error}</div>}

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: txt2, marginBottom: 6 }}>البريد الإلكتروني</div>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="admin@jabla-city.org"
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 13, border: `1px solid ${border}`, background: inputBg, color: txt, direction: "rtl", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: txt2, marginBottom: 6 }}>كلمة المرور</div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 13, border: `1px solid ${border}`, background: inputBg, color: txt, direction: "rtl", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
        </div>

        <button onClick={handleLogin} disabled={loading}
          style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", background: loading ? "#6b9ec9" : "linear-gradient(135deg,#185FA5,#378ADD)", color: "#fff", fontSize: 14, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
          {loading ? "جاري الدخول..." : "دخول"}
        </button>

        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: txt2 }}>
          🔒 هذه الصفحة للمدير فقط
        </div>
      </div>
    </div>
  );
}

// ============ DASHBOARD ============
function Dashboard({ dark, firebaseUser }) {
  const card = dark ? "#1a1a2e" : "#fff";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const txt = dark ? "#e8e8f0" : "#1a1a2e";
  const txt2 = dark ? "#9090b0" : "#6b7280";
  const bg2 = dark ? "#13132a" : "#f8f9fb";
  const inputBg = dark ? "#252540" : "#f4f5f7";

  const [dashTab, setDashTab] = useState("overview");
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [siteSettings, setSiteSettings] = useState({ name: "جبلة — درة اليمن", tagline: "بوابة المدينة الإخبارية", email: "info@jabla-city.org", phone: "+967-4-000-0000", https: true, logging: true, backup: true });

  const DASH_TABS = [["overview", "📊 نظرة عامة"], ["content", "📝 المحتوى"], ["settings", "⚙️ الإعدادات"], ["logs", "📋 السجلات"]];

  const OVERVIEW_CARDS = [
    { label: "إجمالي الزوار", value: "٣,١٠٠", sub: "+١٨٪ هذا الشهر", color: "#185FA5", bg: "#E6F1FB", icon: "👁️" },
    { label: "المقالات المنشورة", value: "٢٤", sub: "٦ هذا الشهر", color: "#0F6E56", bg: "#E1F5EE", icon: "📝" },
    { label: "المعالم السياحية", value: "١٥+", sub: "موقع أثري", color: "#854F0B", bg: "#FAEEDA", icon: "🏛️" },
    { label: "وقت التشغيل", value: "٩٩.٨٪", sub: "هذا الشهر", color: "#7F77DD", bg: "#EEEDFE", icon: "✅" },
  ];

  const actLog = [
    { time: "٠٩:١٢", action: "تسجيل دخول المدير", user: firebaseUser?.email, type: "success" },
    { time: "٠٩:١٨", action: "عرض لوحة التحكم", user: firebaseUser?.email, type: "info" },
    { time: "١٠:٠٥", action: "تعديل إعدادات الموقع", user: firebaseUser?.email, type: "warning" },
  ];

  const logTypeStyle = { info: { bg: "#E6F1FB", c: "#185FA5" }, success: { bg: "#E1F5EE", c: "#0F6E56" }, warning: { bg: "#FAEEDA", c: "#854F0B" }, danger: { bg: "#FCEBEB", c: "#A32D2D" } };

  return (
    <div style={{ padding: "14px", direction: "rtl" }}>
      <div style={{ background: "linear-gradient(135deg,#042C53,#185FA5)", borderRadius: 16, padding: "18px 20px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 11, color: "#9FE1CB", border: "1px solid rgba(29,158,117,0.4)", display: "inline-block", padding: "2px 12px", borderRadius: 99, marginBottom: 6, background: "rgba(29,158,117,0.15)" }}>لوحة التحكم</div>
          <div style={{ fontSize: 18, fontWeight: 500, color: "#E6F1FB" }}>مرحباً، {firebaseUser?.email} 👋</div>
          <div style={{ fontSize: 12, color: "#85B7EB", marginTop: 2 }}>إدارة بوابة جبلة — ٩ أبريل ٢٠٢٥</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#1D9E75" }}>آمن 🔒</div>
            <div style={{ fontSize: 10, color: "#85B7EB" }}>Firebase Auth</div>
          </div>
          <button onClick={() => signOut(auth)}
            style={{ background: "rgba(226,75,74,0.2)", border: "1px solid rgba(226,75,74,0.4)", borderRadius: 10, padding: "8px 16px", color: "#F09595", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            🚪 خروج
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap" }}>
        {DASH_TABS.map(([k, l]) => (
          <button key={k} onClick={() => setDashTab(k)}
            style={{ padding: "7px 14px", borderRadius: 9, border: `1px solid ${dashTab === k ? "#185FA5" : border}`, background: dashTab === k ? "#185FA5" : card, color: dashTab === k ? "#E6F1FB" : txt2, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            {l}
          </button>
        ))}
      </div>

      {dashTab === "overview" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 10, marginBottom: 14 }}>
            {OVERVIEW_CARDS.map((c, i) => (
              <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 500, color: c.color, marginBottom: 2 }}>{c.value}</div>
                <div style={{ fontSize: 12, color: txt, fontWeight: 500, marginBottom: 2 }}>{c.label}</div>
                <div style={{ fontSize: 11, color: txt2 }}>{c.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "16px" }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: txt, marginBottom: 12 }}>إجراءات سريعة</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[["عرض المحتوى", "#185FA5", () => setDashTab("content")], ["الإعدادات", "#0F6E56", () => setDashTab("settings")], ["السجلات", "#854F0B", () => setDashTab("logs")]].map(([l, c, fn]) => (
                <button key={l} onClick={fn} style={{ padding: "9px 18px", borderRadius: 9, border: "none", background: c, color: "#fff", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {dashTab === "content" && (
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: txt, marginBottom: 12 }}>المقالات المنشورة</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {NEWS.map(n => (
              <div key={n.id} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <img src={n.img} alt="" style={{ width: 56, height: 44, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: txt, marginBottom: 2 }}>{n.title}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ fontSize: 10, background: n.catBg, color: n.catColor, padding: "1px 8px", borderRadius: 99 }}>{n.cat}</span>
                    <span style={{ fontSize: 10, color: txt2 }}>{n.date}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  <button style={{ padding: "5px 10px", borderRadius: 7, border: `1px solid ${border}`, background: "transparent", color: txt2, fontSize: 11, cursor: "pointer" }}>تعديل</button>
                  <button style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid #F7C1C1", background: "transparent", color: "#A32D2D", fontSize: 11, cursor: "pointer" }}>حذف</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {dashTab === "settings" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "18px" }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: txt, marginBottom: 14 }}>🌐 معلومات الموقع</div>
            {[["name", "اسم الموقع"], ["tagline", "الشعار النصي"], ["email", "البريد الإلكتروني"], ["phone", "رقم الهاتف"]].map(([f, ph]) => (
              <div key={f} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: txt2, marginBottom: 4 }}>{ph}</div>
                <input value={siteSettings[f]} onChange={e => setSiteSettings({ ...siteSettings, [f]: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, fontSize: 12, border: `1px solid ${border}`, background: inputBg, color: txt, direction: "rtl", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
              </div>
            ))}
          </div>
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "18px" }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: txt, marginBottom: 14 }}>🔐 الأمان والنظام</div>
            {[["https", "تفعيل HTTPS"], ["logging", "تسجيل الأخطاء"], ["backup", "النسخ الاحتياطي"]].map(([k, label]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${border}` }}>
                <span style={{ fontSize: 12, color: txt }}>{label}</span>
                <div onClick={() => setSiteSettings(s => ({ ...s, [k]: !s[k] }))}
                  style={{ width: 38, height: 22, borderRadius: 11, background: siteSettings[k] ? "#185FA5" : "#d1d5db", cursor: "pointer", position: "relative", transition: "background .2s" }}>
                  <div style={{ position: "absolute", top: 3, left: siteSettings[k] ? 18 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            {settingsSaved && <div style={{ background: "#E1F5EE", color: "#085041", border: "1px solid #9FE1CB", borderRadius: 10, padding: "10px 16px", fontSize: 12, marginBottom: 10 }}>✅ تم حفظ الإعدادات</div>}
            <button onClick={() => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 3000); }}
              style={{ padding: "10px 28px", borderRadius: 10, border: "none", background: "#185FA5", color: "#E6F1FB", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>حفظ الإعدادات</button>
          </div>
        </div>
      )}

      {dashTab === "logs" && (
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: txt, marginBottom: 12 }}>📋 سجل النشاطات</div>
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 80px", gap: 8, padding: "9px 16px", background: bg2, borderBottom: `1px solid ${border}`, fontSize: 11, color: txt2, fontWeight: 500 }}>
              <span>الوقت</span><span>الإجراء</span><span>المستخدم</span><span>النوع</span>
            </div>
            {actLog.map((l, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 80px", gap: 8, padding: "11px 16px", borderBottom: i < actLog.length - 1 ? `1px solid ${border}` : "none", alignItems: "center", fontSize: 12 }}>
                <span style={{ color: txt2, fontFamily: "monospace" }}>{l.time}</span>
                <span style={{ color: txt }}>{l.action}</span>
                <span style={{ color: txt2 }}>{l.user}</span>
                <span style={{ fontSize: 10, background: logTypeStyle[l.type]?.bg, color: logTypeStyle[l.type]?.c, padding: "2px 8px", borderRadius: 99, display: "inline-block", textAlign: "center" }}>
                  {l.type === "info" ? "معلومة" : l.type === "success" ? "نجاح" : l.type === "warning" ? "تحذير" : "خطر"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ BANNER ============
function Banner({ slide }) {
  const stars = useRef(Array.from({ length: 28 }, () => ({ top: `${Math.random() * 75}%`, left: `${Math.random() * 100}%`, w: 1 + Math.random() * 2, dur: `${2 + Math.random() * 4}s`, del: `${Math.random() * 4}s` }))).current;
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: `linear-gradient(150deg,${slide.bg1},${slide.bg2})` }}>
      <style>{`@keyframes tw{0%{opacity:.08}100%{opacity:.9}}@keyframes mp{0%{transform:scale(1)}100%{transform:scale(1.1)}}@keyframes fb{0%{transform:translateX(0)}100%{transform:translateX(-28px)}}@keyframes ff{0%{transform:translateX(0)}100%{transform:translateX(20px)}}@keyframes fu{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}`}</style>
      {stars.map((s, i) => <div key={i} style={{ position: "absolute", top: s.top, left: s.left, width: s.w, height: s.w, borderRadius: "50%", background: "#fff", animation: `tw ${s.dur} ${s.del} ease-in-out infinite alternate` }} />)}
      <div style={{ position: "absolute", top: 26, left: 52, width: 54, height: 54, borderRadius: "50%", background: "#FAC775", animation: "mp 4s ease-in-out infinite alternate" }} />
      <svg style={{ position: "absolute", bottom: 0, width: "125%", left: "-12%", animation: "fb 20s ease-in-out infinite alternate" }} viewBox="0 0 900 200" preserveAspectRatio="none"><path d="M0,200 L0,130 Q50,90 100,110 Q150,130 220,70 Q290,10 370,80 Q450,140 530,60 Q610,-10 700,75 Q780,145 860,90 L900,80 L900,200Z" fill={`${slide.bg1}cc`} /></svg>
      <svg style={{ position: "absolute", bottom: 0, width: "115%", left: "-7%", animation: "ff 14s ease-in-out infinite alternate" }} viewBox="0 0 900 160" preserveAspectRatio="none"><path d="M0,160 L0,110 Q80,55 170,90 Q260,125 360,45 Q460,-20 570,65 Q670,140 760,80 Q820,40 900,70 L900,160Z" fill={`${slide.bg1}ee`} /></svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 10, padding: 20, direction: "rtl" }}>
        <div style={{ fontSize: 11, color: "#9FE1CB", border: `1px solid ${slide.accent}88`, padding: "4px 14px", borderRadius: 99, marginBottom: 14, background: `${slide.accent}22`, animation: "fu .7s ease both" }}>{slide.badge}</div>
        <h1 style={{ fontSize: 28, fontWeight: 500, color: "#E6F1FB", textAlign: "center", marginBottom: 10, lineHeight: 1.45, animation: "fu .7s .15s ease both" }}>{slide.title}</h1>
        <p style={{ fontSize: 13, color: "#85B7EB", textAlign: "center", marginBottom: 24, lineHeight: 1.9, maxWidth: 420, animation: "fu .7s .3s ease both" }}>{slide.subtitle}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <button style={{ background: slide.accent, color: "#fff", border: "none", padding: "10px 26px", borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>{slide.btn1}</button>
          <button style={{ background: "rgba(255,255,255,0.1)", color: "#E6F1FB", border: "1px solid rgba(255,255,255,0.25)", padding: "10px 26px", borderRadius: 9, fontSize: 13, cursor: "pointer" }}>{slide.btn2}</button>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [dark, setDark] = useState(false);
  const [cur, setCur] = useState(0);
  const [section, setSection] = useState("home");
  const [newsFilter, setNewsFilter] = useState("الكل");
  const [galleryIdx, setGalleryIdx] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const timer = useRef(null);

  const bg = dark ? "#0f0f1a" : "#f2f4f8";
  const card = dark ? "#1a1a2e" : "#fff";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const txt = dark ? "#e8e8f0" : "#1a1a2e";
  const txt2 = dark ? "#9090b0" : "#6b7280";

  useEffect(() => {
    if (window.location.pathname === "/dashboard") setSection("dashboard");
    const unsub = onAuthStateChanged(auth, u => { setFirebaseUser(u); setAuthLoading(false); });
    return unsub;
  }, []);

  useEffect(() => { timer.current = setInterval(() => setCur(c => (c + 1) % SLIDES.length), 4500); return () => clearInterval(timer.current); }, []);

  const CATS = ["الكل", ...[...new Set(NEWS.map(n => n.cat))]];
  const filteredNews = newsFilter === "الكل" ? NEWS : NEWS.filter(n => n.cat === newsFilter);
  const NAV = [["home", "الرئيسية"], ["landmarks", "المعالم"], ["history", "التاريخ"], ["gallery", "الصور"], ["map", "الخريطة"]];

  if (authLoading) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#042C53", color: "#85B7EB", fontSize: 14 }}>جاري التحميل...</div>;

  if (section === "dashboard") {
    if (!firebaseUser) return <LoginPage dark={dark} />;
    return <Dashboard dark={dark} firebaseUser={firebaseUser} />;
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", direction: "rtl", background: bg, minHeight: "100vh" }}>
      <style>{`.ncard:hover{transform:translateY(-3px)}.ncard{transition:all .2s}.lcard:hover{border-color:#378ADD!important;transform:translateY(-2px)}.lcard{transition:all .2s}`}</style>

      {/* NAV */}
      <div style={{ background: card, borderBottom: `1px solid ${border}`, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#185FA5,#378ADD)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏛️</div>
          <div><div style={{ fontSize: 14, fontWeight: 500, color: txt }}>جبلة — درة اليمن</div><div style={{ fontSize: 10, color: txt2 }}>بوابة المدينة الإخبارية</div></div>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {NAV.map(([k, l]) => (<button key={k} onClick={() => setSection(k)} style={{ padding: "6px 11px", borderRadius: 8, border: "none", background: section === k ? "#185FA5" : "transparent", color: section === k ? "#E6F1FB" : txt2, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{l}</button>))}
        </div>
        <button onClick={() => setDark(!dark)} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${border}`, background: "transparent", cursor: "pointer", fontSize: 14 }}>{dark ? "☀️" : "🌙"}</button>
      </div>

      {/* BANNER */}
      <div style={{ position: "relative", height: 370, margin: "14px 14px 0", borderRadius: 18, overflow: "hidden", boxShadow: "0 10px 44px rgba(0,0,0,0.2)" }}>
        <Banner slide={SLIDES[cur]} />
        {[{ d: "right", n: (cur - 1 + SLIDES.length) % SLIDES.length, ch: "‹" }, { d: "left", n: (cur + 1) % SLIDES.length, ch: "›" }].map(a => (
          <button key={a.d} onClick={() => { clearInterval(timer.current); setCur(a.n); }} style={{ position: "absolute", top: "50%", [a.d]: 12, transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>{a.ch}</button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 7, padding: "10px 0 2px" }}>
        {SLIDES.map((_, i) => <div key={i} onClick={() => { clearInterval(timer.current); setCur(i); }} style={{ height: 5, width: i === cur ? 24 : 5, borderRadius: 99, background: i === cur ? SLIDES[cur].accent : (dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"), cursor: "pointer", transition: "all .3s" }} />)}
      </div>

      {/* HOME */}
      {section === "home" && (
        <div style={{ padding: "10px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <div><div style={{ fontSize: 16, fontWeight: 500, color: txt }}>آخر الأخبار</div></div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {CATS.map(c => <button key={c} onClick={() => setNewsFilter(c)} style={{ padding: "5px 12px", borderRadius: 99, fontSize: 11, cursor: "pointer", fontFamily: "inherit", border: `1px solid ${newsFilter === c ? "#185FA5" : border}`, background: newsFilter === c ? "#185FA5" : "transparent", color: newsFilter === c ? "#E6F1FB" : txt2 }}>{c}</button>)}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
            {filteredNews.map(n => (
              <div key={n.id} className="ncard" style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, overflow: "hidden" }}>
                <img src={n.img} alt={n.title} style={{ width: "100%", height: 100, objectFit: "cover" }} />
                <div style={{ padding: "10px 12px 8px" }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 10, background: n.catBg, color: n.catColor, padding: "2px 8px", borderRadius: 99 }}>{n.cat}</span>
                    <span style={{ fontSize: 10, color: txt2 }}>{n.time}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: txt, marginBottom: 5, lineHeight: 1.5 }}>{n.title}</div>
                  <div style={{ fontSize: 11, color: txt2, lineHeight: 1.6 }}>{n.summary.substring(0, 90)}...</div>
                  <div style={{ marginTop: 8, fontSize: 11, color: n.accent, fontWeight: 500, cursor: "pointer" }}>اقرأ المزيد ←</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LANDMARKS */}
      {section === "landmarks" && (
        <div style={{ padding: "14px" }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: txt, marginBottom: 14 }}>المعالم السياحية والأثرية</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
            {LANDMARKS_FULL.map(lm => (
              <div key={lm.id} className="lcard" style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden" }}>
                <div style={{ position: "relative", height: 180 }}>
                  <img src={lm.img} alt={lm.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 50%)" }} />
                  <div style={{ position: "absolute", bottom: 10, right: 10, fontSize: 10, color: "#fff", background: lm.color, padding: "3px 10px", borderRadius: 99 }}>{lm.category}</div>
                  {lm.rating && <div style={{ position: "absolute", top: 10, left: 10, fontSize: 11, color: "#fff", background: "rgba(0,0,0,0.5)", padding: "3px 9px", borderRadius: 99 }}>⭐ {lm.rating}</div>}
                </div>
                <div style={{ padding: "14px" }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: txt, marginBottom: 6 }}>{lm.name}</div>
                  <div style={{ fontSize: 11, color: txt2, marginBottom: 8 }}>📍 {lm.location}</div>
                  <div style={{ fontSize: 12, color: txt2, lineHeight: 1.7, marginBottom: 12 }}>{lm.desc}</div>
                  <a href={lm.mapUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", background: lm.bg, color: lm.color, borderRadius: 8, fontSize: 12, fontWeight: 500, textDecoration: "none", padding: "8px 16px" }}>عرض على الخريطة ↗</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HISTORY */}
      {section === "history" && (
        <div style={{ padding: "14px" }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: txt, marginBottom: 18 }}>تاريخ جبلة عبر القرون</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {HISTORY_TIMELINE.map((h, i) => (
              <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 20, position: "relative" }}>
                {i < HISTORY_TIMELINE.length - 1 && <div style={{ position: "absolute", right: 5, top: 22, bottom: 0, width: 1, background: border }} />}
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: h.color, flexShrink: 0, marginTop: 5, position: "relative", zIndex: 1 }} />
                <div style={{ flex: 1, background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 14px" }}>
                  <div style={{ fontSize: 11, color: h.color, fontWeight: 500, marginBottom: 4 }}>{h.year}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: txt, marginBottom: 6 }}>{h.title}</div>
                  <div style={{ fontSize: 12, color: txt2, lineHeight: 1.7 }}>{h.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GALLERY */}
      {section === "gallery" && (
        <div style={{ padding: "14px" }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: txt, marginBottom: 14 }}>معرض الصور</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 10 }}>
            {GALLERY_IMGS.map((g, i) => (
              <div key={i} onClick={() => setGalleryIdx(i)} style={{ position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer" }}>
                <img src={g.src} alt={g.caption} style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 6, right: 6, left: 6, fontSize: 10, color: "#fff" }}>{g.caption}</div>
              </div>
            ))}
          </div>
          {galleryIdx !== null && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }} onClick={() => setGalleryIdx(null)}>
              <img src={GALLERY_IMGS[galleryIdx].src} alt="" style={{ maxWidth: "90%", maxHeight: "75vh", borderRadius: 12 }} onClick={e => e.stopPropagation()} />
              <div style={{ color: "#E6F1FB", fontSize: 13 }}>{GALLERY_IMGS[galleryIdx].caption}</div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={e => { e.stopPropagation(); setGalleryIdx((galleryIdx - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length); }} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 18 }}>‹</button>
                <span style={{ color: "rgba(255,255,255,0.5)", padding: "8px 10px" }}>{galleryIdx + 1}/{GALLERY_IMGS.length}</span>
                <button onClick={e => { e.stopPropagation(); setGalleryIdx((galleryIdx + 1) % GALLERY_IMGS.length); }} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 18 }}>›</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STATS */}
      <div style={{ margin: "18px 14px", borderRadius: 18, overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg,#042C53,#185FA5)", padding: "18px 20px 14px" }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#E6F1FB", marginBottom: 2 }}>جبلة بالأرقام</div>
        </div>
        <div style={{ background: dark ? "#13132a" : "#1e3a5f", padding: "14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: 9 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 500, color: s.color, marginBottom: 2 }}>{s.value}</div>
                <div style={{ fontSize: 9, color: "#6b9ec9", marginBottom: 4 }}>{s.sub}</div>
                <div style={{ fontSize: 10, color: "#85B7EB" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: dark ? "#1a1a2e" : "#1e3a5f", padding: "16px 20px", borderTop: `1px solid ${border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#185FA5,#378ADD)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏛️</div>
            <div><div style={{ fontSize: 13, fontWeight: 500, color: "#E6F1FB" }}>جبلة — درة اليمن</div><div style={{ fontSize: 10, color: "#6b9ec9" }}>jabla-city.org</div></div>
          </div>
          <div style={{ fontSize: 10, color: "#6b9ec9" }}>© ٢٠٢٥ بوابة جبلة — جميع الحقوق محفوظة</div>
        </div>
      </div>
    </div>
  );
}
