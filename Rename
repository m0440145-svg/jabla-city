import React, { useState, useEffect, useRef } from "react";

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
  { id: "mosque", name: "مسجد الملكة أروى", rating: 4.7, reviews: 61, era: "القرن ١١ الميلادي", category: "مسجد أثري", color: "#185FA5", bg: "#E6F1FB", img: REAL_PHOTOS.mosque, img2: REAL_PHOTOS.mosque2, desc: "يُعدّ مسجد الملكة أروى من أجمل وأهم المساجد الإسلامية في اليمن. بُني بين عامَي ٤٧٧ و٥٣٢ هجرية بأمر من الملكة أروى بنت أحمد الصليحي. يتميز بمعماره الإسلامي الرائع المتأثر بالطراز الفاطمي، ويضم في ركنه الشمالي الغربي ضريح الملكة أروى.", location: "جبلة، محافظة إب، اليمن", mapUrl: "https://maps.google.com/?cid=11215737704700475853" },
  { id: "palace", name: "قصر أروى الملكي", rating: 4.4, reviews: 304, era: "القرن ١١ الميلادي", category: "قصر تاريخي", color: "#0F6E56", bg: "#E1F5EE", img: REAL_PHOTOS.palace, img2: REAL_PHOTOS.palace2, desc: "قصر الملكة أروى بنت أحمد الصليحي التي حكمت في القرن الحادي عشر الميلادي. يقع في منطقة جبلة ويتكون من أطلال واسعة تضم ٣٦٥ غرفة — غرفة لكل يوم من أيام السنة وفق الروايات المحلية.", location: "جبلة، محافظة إب، اليمن", mapUrl: "https://maps.google.com/?cid=15453322087045509972" },
  { id: "fort", name: "حصن التعكر", rating: 4.6, reviews: 79, era: "العصور الوسطى", category: "حصن أثري", color: "#854F0B", bg: "#FAEEDA", img: REAL_PHOTOS.fort, img2: REAL_PHOTOS.fort2, desc: "حصن التعكر حصن تاريخي شامخ يقع في منطقة التعكر بمحافظة إب، يُعدّ من أبرز المواقع الأثرية في المنطقة ويعود إلى العصور الوسطى.", location: "منطقة التعكر، محافظة إب، اليمن", mapUrl: "https://maps.google.com/?cid=3032309188263302391" },
  { id: "city", name: "المدينة التاريخية", rating: null, reviews: null, era: "القرن ١١م — حتى اليوم", category: "مدينة تراثية", color: "#7F77DD", bg: "#EEEDFE", img: REAL_PHOTOS.city, img2: REAL_PHOTOS.city2, desc: "مدينة جبلة القديمة بأزقتها الحجرية الضيقة وبيوتها التقليدية ذات الطراز اليمني الأصيل. تُشكّل المدينة متحفاً حياً مفتوحاً يعكس الحضارة اليمنية العريقة.", location: "جبلة، محافظة إب، اليمن", mapUrl: "https://maps.google.com/?cid=5735414387043044634" },
];

const HISTORY_TIMELINE = [
  { year: "قبل الإسلام", title: "جبلة في عصور اليمن القديم", text: "كانت منطقة جبلة مأهولة بالسكان منذ عصور سحيقة لخصوبة أراضيها وموقعها الجبلي الحصين على ارتفاع ٢٢٠٠ متر فوق سطح البحر.", color: "#7F77DD" },
  { year: "١٠٤٧م", title: "تأسيس الدولة الصليحية", text: "أسّس علي بن محمد الصليحي الدولة الصليحية واختار جبلة عاصمةً لها، فتحولت إلى مركز السلطة السياسية والحضارية في اليمن.", color: "#185FA5" },
  { year: "١٠٦٧م", title: "عصر الملكة أروى الذهبي", text: "تولّت الملكة أروى بنت أحمد الصليحي مقاليد الحكم. حكمت أكثر من ٥٠ عاماً بحكمة نادرة وعدل واسع، وحوّلت جبلة إلى مركز إشعاع حضاري وعلمي.", color: "#0F6E56" },
  { year: "٤٧٧-٥٣٢ هـ", title: "بناء مسجد الملكة أروى", text: "أمرت الملكة أروى ببناء المسجد الجامع في جبلة الذي يُعدّ تحفة معمارية إسلامية فريدة متأثرة بالطراز الفاطمي مع لمسات يمنية خالصة.", color: "#EF9F27" },
  { year: "١١٣٨م", title: "وفاة الملكة أروى", text: "انتقلت الملكة أروى إلى رحمة الله بعد مسيرة حكم استثنائية تجاوزت نصف قرن، ودُفنت في المسجد الذي أقامته في جبلة.", color: "#E24B4A" },
  { year: "اليوم", title: "جبلة — إرث خالد", text: "تقف جبلة اليوم موقعاً تراثياً وسياحياً بارزاً تستقطب الباحثين والسياح من شتى أنحاء العالم.", color: "#1D9E75" },
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
  { id: 1, cat: "تراث", catColor: "#185FA5", catBg: "#E6F1FB", date: "٧ أبريل ٢٠٢٥", title: "ترميم مسجد الملكة أروى الأثري يدخل مراحله الأخيرة", summary: "تواصل أعمال ترميم وصيانة مسجد الملكة أروى التاريخي في جبلة بدعم من منظمات التراث الدولية.", img: REAL_PHOTOS.mosque, accent: "#185FA5", time: "منذ يومين" },
  { id: 2, cat: "سياحة", catColor: "#0F6E56", catBg: "#E1F5EE", date: "٥ أبريل ٢٠٢٥", title: "ارتفاع ملحوظ في أعداد الزوار القادمين إلى جبلة", summary: "سجّلت مدينة جبلة ارتفاعاً في أعداد السياح والباحثين الراغبين في التعرف على تاريخها العريق.", img: REAL_PHOTOS.city, accent: "#0F6E56", time: "منذ ٤ أيام" },
  { id: 3, cat: "تنمية", catColor: "#854F0B", catBg: "#FAEEDA", date: "٢ أبريل ٢٠٢٥", title: "مشروع تطوير أسواق جبلة التراثية", summary: "أعلن المجلس المحلي عن إطلاق مشروع تطوير الأسواق التراثية القديمة في جبلة.", img: REAL_PHOTOS.palace, accent: "#854F0B", time: "منذ أسبوع" },
  { id: 4, cat: "ثقافة", catColor: "#7F77DD", catBg: "#EEEDFE", date: "٢٨ مارس ٢٠٢٥", title: "مهرجان جبلة الثقافي للتراث اليمني", summary: "تستعد مدينة جبلة لاستضافة مهرجانها الثقافي السنوي الذي يجمع الحرفيين والفنانين.", img: REAL_PHOTOS.fort, accent: "#7F77DD", time: "منذ أسبوعين" },
  { id: 5, cat: "بيئة", catColor: "#16A34A", catBg: "#EAF3DE", date: "٢٥ مارس ٢٠٢٥", title: "حملة تشجير في جبال محيط جبلة", summary: "أطلقت الجهات البيئية حملة تشجير شاملة في الجبال المحيطة بمدينة جبلة.", img: REAL_PHOTOS.nature, accent: "#16A34A", time: "منذ أسبوعين" },
  { id: 6, cat: "تعليم", catColor: "#D97706", catBg: "#FEF3C7", date: "٢٠ مارس ٢٠٢٥", title: "مركز التعليم والتدريب المهني في جبلة", summary: "افتُتح مركز جديد للتعليم والتدريب المهني في جبلة لتأهيل الشباب.", img: REAL_PHOTOS.city2, accent: "#D97706", time: "منذ ٣ أسابيع" },
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

// ============ DASHBOARD DATA ============
const INIT_USERS = [
  { id: 1, name: "أحمد محمد", email: "ahmed@jabla.com", role: "admin", status: "active", joined: "٢٠٢٤/١/١٠" },
  { id: 2, name: "فاطمة علي", email: "fatima@jabla.com", role: "editor", status: "active", joined: "٢٠٢٤/٣/٢٢" },
  { id: 3, name: "محمد سالم", email: "msalem@jabla.com", role: "user", status: "active", joined: "٢٠٢٤/٦/٥" },
  { id: 4, name: "نور الهدى", email: "nour@jabla.com", role: "editor", status: "inactive", joined: "٢٠٢٣/١١/١٨" },
  { id: 5, name: "خالد حسن", email: "khaled@jabla.com", role: "user", status: "active", joined: "٢٠٢٥/١/٢" },
];

const VISITOR_DATA = [
  { month: "أكتوبر", v: 1200 }, { month: "نوفمبر", v: 1850 }, { month: "ديسمبر", v: 2100 },
  { month: "يناير", v: 1700 }, { month: "فبراير", v: 2400 }, { month: "مارس", v: 3100 },
  { month: "أبريل", v: 2800 },
];

const ROLE_COLORS = { admin: { bg: "#FCEBEB", c: "#A32D2D", label: "مدير" }, editor: { bg: "#FAEEDA", c: "#854F0B", label: "محرر" }, user: { bg: "#E6F1FB", c: "#185FA5", label: "مستخدم" } };
const STATUS_COLORS = { active: { bg: "#E1F5EE", c: "#0F6E56", label: "نشط" }, inactive: { bg: "#F1EFE8", c: "#5F5E5A", label: "غير نشط" } };

// Mini Bar Chart
function MiniChart({ data, color, dark }) {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 80, direction: "ltr" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: "100%", background: i === data.length - 1 ? color : (dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"), borderRadius: "4px 4px 0 0", height: `${(d.v / max) * 72}px`, transition: "height .4s", position: "relative" }}>
            {i === data.length - 1 && <div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", fontSize: 9, color, fontWeight: 500, whiteSpace: "nowrap" }}>{d.v.toLocaleString()}</div>}
          </div>
          <div style={{ fontSize: 8, color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)", writingMode: "vertical-rl", transform: "rotate(180deg)", height: 30 }}>{d.month}</div>
        </div>
      ))}
    </div>
  );
}

// Dashboard Section
function Dashboard({ dark, currentUser }) {
  const card = dark ? "#1a1a2e" : "#fff";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const txt = dark ? "#e8e8f0" : "#1a1a2e";
  const txt2 = dark ? "#9090b0" : "#6b7280";
  const bg2 = dark ? "#13132a" : "#f8f9fb";
  const inputBg = dark ? "#252540" : "#f4f5f7";

  const [dashTab, setDashTab] = useState("overview");
  const [users, setUsers] = useState(INIT_USERS);
  const [userModal, setUserModal] = useState(null); // null | "add" | {user}
  const [userForm, setUserForm] = useState({});
  const [delConfirm, setDelConfirm] = useState(null);
  const [contentTab, setContentTab] = useState("articles");
  const [siteSettings, setSiteSettings] = useState({ name: "جبلة — درة اليمن", tagline: "بوابة المدينة الإخبارية", email: "info@jabla-city.org", phone: "+967-4-000-0000", https: true, logging: true, backup: true });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [actLog] = useState([
    { time: "٠٩:١٢", action: "تسجيل دخول", user: "أحمد محمد", type: "info" },
    { time: "٠٩:١٨", action: "إضافة مقال جديد", user: "فاطمة علي", type: "success" },
    { time: "١٠:٠٥", action: "تعديل إعدادات الموقع", user: "أحمد محمد", type: "warning" },
    { time: "١٠:٣٣", action: "حذف تعليق مسيء", user: "فاطمة علي", type: "danger" },
    { time: "١١:٠٠", action: "تسجيل مستخدم جديد", user: "النظام", type: "info" },
    { time: "١١:٤٥", action: "تنزيل نسخة احتياطية", user: "أحمد محمد", type: "success" },
  ]);

  const isAdmin = currentUser && (currentUser.email === "ahmed@jabla.com" || currentUser.role === "admin");

  const inp = (f, ph, type = "text") => (
    <input key={f} type={type} placeholder={ph} value={userForm[f] || ""} onChange={e => setUserForm({ ...userForm, [f]: e.target.value })}
      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, fontSize: 12, border: `1px solid ${border}`, background: inputBg, color: txt, direction: "rtl", marginBottom: 10, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
  );

  const saveUser = () => {
    if (!userForm.name || !userForm.email) return;
    if (userModal === "add") {
      setUsers(u => [...u, { id: Date.now(), name: userForm.name, email: userForm.email, role: userForm.role || "user", status: "active", joined: "٢٠٢٥/٤/٩" }]);
    } else {
      setUsers(u => u.map(x => x.id === userModal.id ? { ...x, ...userForm } : x));
    }
    setUserModal(null); setUserForm({});
  };

  const DASH_TABS = [["overview", "📊 نظرة عامة"], ["users", "👥 المستخدمون"], ["content", "📝 المحتوى"], ["settings", "⚙️ الإعدادات"], ["logs", "📋 السجلات"]];

  const OVERVIEW_CARDS = [
    { label: "إجمالي الزوار", value: "٣,١٠٠", sub: "+١٨٪ هذا الشهر", color: "#185FA5", bg: "#E6F1FB", icon: "👁️" },
    { label: "إجمالي المستخدمين", value: users.length.toString(), sub: `${users.filter(u => u.status === "active").length} نشط`, color: "#0F6E56", bg: "#E1F5EE", icon: "👥" },
    { label: "المقالات المنشورة", value: "٢٤", sub: "٦ هذا الشهر", color: "#854F0B", bg: "#FAEEDA", icon: "📝" },
    { label: "الطلبات المعلقة", value: "٧", sub: "تحتاج مراجعة", color: "#A32D2D", bg: "#FCEBEB", icon: "⏳" },
  ];

  const logTypeStyle = { info: { bg: "#E6F1FB", c: "#185FA5" }, success: { bg: "#E1F5EE", c: "#0F6E56" }, warning: { bg: "#FAEEDA", c: "#854F0B" }, danger: { bg: "#FCEBEB", c: "#A32D2D" } };

  return (
    <div style={{ padding: "14px", direction: "rtl" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#042C53,#185FA5)", borderRadius: 16, padding: "18px 20px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 11, color: "#9FE1CB", border: "1px solid rgba(29,158,117,0.4)", display: "inline-block", padding: "2px 12px", borderRadius: 99, marginBottom: 6, background: "rgba(29,158,117,0.15)" }}>لوحة التحكم</div>
          <div style={{ fontSize: 18, fontWeight: 500, color: "#E6F1FB" }}>مرحباً، {currentUser ? currentUser.name : "الزائر"} 👋</div>
          <div style={{ fontSize: 12, color: "#85B7EB", marginTop: 2 }}>إدارة بوابة جبلة — آخر تحديث: ٩ أبريل ٢٠٢٥</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#EF9F27" }}>٩٩.٨٪</div>
            <div style={{ fontSize: 10, color: "#85B7EB" }}>وقت التشغيل</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#1D9E75" }}>آمن 🔒</div>
            <div style={{ fontSize: 10, color: "#85B7EB" }}>حالة الأمان</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap" }}>
        {DASH_TABS.map(([k, l]) => (
          <button key={k} onClick={() => setDashTab(k)}
            style={{ padding: "7px 14px", borderRadius: 9, border: `1px solid ${dashTab === k ? "#185FA5" : border}`, background: dashTab === k ? "#185FA5" : card, color: dashTab === k ? "#E6F1FB" : txt2, fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: dashTab === k ? 500 : 400 }}>
            {l}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {dashTab === "overview" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 10, marginBottom: 14 }}>
            {OVERVIEW_CARDS.map((c, i) => (
              <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ fontSize: 20 }}>{c.icon}</div>
                  <div style={{ fontSize: 10, background: c.bg, color: c.color, padding: "2px 8px", borderRadius: 99 }}>مباشر</div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 500, color: c.color, marginBottom: 2 }}>{c.value}</div>
                <div style={{ fontSize: 12, color: txt, fontWeight: 500, marginBottom: 2 }}>{c.label}</div>
                <div style={{ fontSize: 11, color: txt2 }}>{c.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "16px" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: txt, marginBottom: 4 }}>الزوار — آخر ٧ أشهر</div>
              <div style={{ fontSize: 11, color: txt2, marginBottom: 14 }}>إجمالي ١٥,١٥٠ زيارة</div>
              <MiniChart data={VISITOR_DATA} color="#185FA5" dark={dark} />
            </div>
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "16px" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: txt, marginBottom: 12 }}>توزيع المستخدمين</div>
              {Object.entries(ROLE_COLORS).map(([role, rc]) => {
                const count = users.filter(u => u.role === role).length;
                const pct = Math.round((count / users.length) * 100);
                return (
                  <div key={role} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: txt2 }}>{rc.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 500, color: rc.c }}>{count} ({pct}٪)</span>
                    </div>
                    <div style={{ background: dark ? "rgba(255,255,255,0.08)" : "#f0f0f0", borderRadius: 99, height: 6, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: rc.c, borderRadius: 99, transition: "width .5s" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "16px" }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: txt, marginBottom: 12 }}>إجراءات سريعة</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[["إضافة مستخدم", "#185FA5", () => { setDashTab("users"); setUserModal("add"); setUserForm({}); }], ["نشر مقال", "#0F6E56", () => setDashTab("content")], ["نسخ احتياطي", "#854F0B", () => alert("✅ تم بدء النسخ الاحتياطي")], ["إعدادات الموقع", "#7F77DD", () => setDashTab("settings")]].map(([l, c, fn]) => (
                <button key={l} onClick={fn} style={{ padding: "9px 18px", borderRadius: 9, border: "none", background: c, color: "#fff", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── USERS ── */}
      {dashTab === "users" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: txt }}>إدارة المستخدمين ({users.length})</div>
            <button onClick={() => { setUserModal("add"); setUserForm({ role: "user" }); }}
              style={{ padding: "7px 16px", borderRadius: 9, border: "none", background: "#185FA5", color: "#E6F1FB", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>+ إضافة مستخدم</button>
          </div>
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, overflow: "hidden" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 2.5fr 1fr 1fr 1.5fr 1fr", gap: 8, padding: "10px 16px", background: bg2, borderBottom: `1px solid ${border}`, fontSize: 11, color: txt2, fontWeight: 500 }}>
              <span>الاسم</span><span>البريد</span><span>الدور</span><span>الحالة</span><span>تاريخ الانضمام</span><span>إجراءات</span>
            </div>
            {users.map((u, i) => (
              <div key={u.id} style={{ display: "grid", gridTemplateColumns: "2fr 2.5fr 1fr 1fr 1.5fr 1fr", gap: 8, padding: "11px 16px", borderBottom: i < users.length - 1 ? `1px solid ${border}` : "none", alignItems: "center", fontSize: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#185FA5,#1D9E75)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", flexShrink: 0 }}>{u.name[0]}</div>
                  <span style={{ color: txt, fontWeight: 500 }}>{u.name}</span>
                </div>
                <span style={{ color: txt2 }}>{u.email}</span>
                <span style={{ background: ROLE_COLORS[u.role]?.bg, color: ROLE_COLORS[u.role]?.c, padding: "2px 8px", borderRadius: 99, fontSize: 10, display: "inline-block" }}>{ROLE_COLORS[u.role]?.label}</span>
                <span style={{ background: STATUS_COLORS[u.status]?.bg, color: STATUS_COLORS[u.status]?.c, padding: "2px 8px", borderRadius: 99, fontSize: 10, display: "inline-block" }}>{STATUS_COLORS[u.status]?.label}</span>
                <span style={{ color: txt2 }}>{u.joined}</span>
                <div style={{ display: "flex", gap: 5 }}>
                  <button onClick={() => { setUserModal(u); setUserForm({ name: u.name, email: u.email, role: u.role, status: u.status }); }}
                    style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${border}`, background: "transparent", color: txt2, fontSize: 11, cursor: "pointer" }}>تعديل</button>
                  <button onClick={() => setDelConfirm(u.id)}
                    style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #F7C1C1", background: "transparent", color: "#A32D2D", fontSize: 11, cursor: "pointer" }}>حذف</button>
                </div>
              </div>
            ))}
          </div>

          {/* User Modal */}
          {userModal && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setUserModal(null)}>
              <div style={{ background: card, borderRadius: 16, padding: 24, width: 320, maxWidth: "90vw", border: `1px solid ${border}` }} onClick={e => e.stopPropagation()}>
                <div style={{ fontSize: 15, fontWeight: 500, color: txt, marginBottom: 16 }}>{userModal === "add" ? "إضافة مستخدم جديد" : `تعديل: ${userModal.name}`}</div>
                {inp("name", "الاسم الكريم")}
                {inp("email", "البريد الإلكتروني", "email")}
                {userModal === "add" && inp("password", "كلمة المرور", "password")}
                <select value={userForm.role || "user"} onChange={e => setUserForm({ ...userForm, role: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, fontSize: 12, border: `1px solid ${border}`, background: inputBg, color: txt, direction: "rtl", marginBottom: 10, outline: "none", fontFamily: "inherit" }}>
                  <option value="admin">مدير</option>
                  <option value="editor">محرر</option>
                  <option value="user">مستخدم</option>
                </select>
                {userModal !== "add" && (
                  <select value={userForm.status || "active"} onChange={e => setUserForm({ ...userForm, status: e.target.value })}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, fontSize: 12, border: `1px solid ${border}`, background: inputBg, color: txt, direction: "rtl", marginBottom: 10, outline: "none", fontFamily: "inherit" }}>
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                  </select>
                )}
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button onClick={saveUser} style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: "none", background: "#185FA5", color: "#fff", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>حفظ</button>
                  <button onClick={() => setUserModal(null)} style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: `1px solid ${border}`, background: "transparent", color: txt2, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>إلغاء</button>
                </div>
              </div>
            </div>
          )}

          {/* Delete confirm */}
          {delConfirm && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: card, borderRadius: 16, padding: 24, width: 280, border: `1px solid ${border}`, textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>🗑️</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: txt, marginBottom: 8 }}>تأكيد الحذف</div>
                <div style={{ fontSize: 12, color: txt2, marginBottom: 18 }}>هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع.</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { setUsers(u => u.filter(x => x.id !== delConfirm)); setDelConfirm(null); }}
                    style={{ flex: 1, padding: "9px 0", borderRadius: 9, border: "none", background: "#A32D2D", color: "#fff", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>حذف</button>
                  <button onClick={() => setDelConfirm(null)}
                    style={{ flex: 1, padding: "9px 0", borderRadius: 9, border: `1px solid ${border}`, background: "transparent", color: txt2, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>إلغاء</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── CONTENT ── */}
      {dashTab === "content" && (
        <div>
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {[["articles", "مقالات"], ["images", "الصور"], ["pages", "الصفحات"]].map(([k, l]) => (
              <button key={k} onClick={() => setContentTab(k)}
                style={{ padding: "7px 16px", borderRadius: 9, border: `1px solid ${contentTab === k ? "#0F6E56" : border}`, background: contentTab === k ? "#0F6E56" : card, color: contentTab === k ? "#E1F5EE" : txt2, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{l}</button>
            ))}
          </div>

          {contentTab === "articles" && (
            <div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                <button style={{ padding: "7px 16px", borderRadius: 9, border: "none", background: "#0F6E56", color: "#E1F5EE", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>+ مقال جديد</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {NEWS.map(n => (
                  <div key={n.id} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={n.img} alt="" style={{ width: 56, height: 44, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: txt, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.title}</div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <span style={{ fontSize: 10, background: n.catBg, color: n.catColor, padding: "1px 8px", borderRadius: 99 }}>{n.cat}</span>
                        <span style={{ fontSize: 10, color: txt2 }}>{n.date}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                      <button style={{ padding: "5px 10px", borderRadius: 7, border: `1px solid ${border}`, background: "transparent", color: txt2, fontSize: 11, cursor: "pointer" }}>تعديل</button>
                      <button style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid #F7C1C1", background: "transparent", color: "#A32D2D", fontSize: 11, cursor: "pointer" }}>حذف</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {contentTab === "images" && (
            <div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                <button style={{ padding: "7px 16px", borderRadius: 9, border: "none", background: "#854F0B", color: "#FAEEDA", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>⬆ رفع صور</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: 8 }}>
                {GALLERY_IMGS.map((g, i) => (
                  <div key={i} style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: `1px solid ${border}` }}>
                    <img src={g.src} alt="" style={{ width: "100%", height: 80, objectFit: "cover", display: "block" }} />
                    <div style={{ padding: "6px 8px", background: card }}>
                      <div style={{ fontSize: 10, color: txt2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.caption}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {contentTab === "pages" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[["الرئيسية", "منشورة", "#0F6E56", "#E1F5EE"], ["المعالم السياحية", "منشورة", "#0F6E56", "#E1F5EE"], ["تاريخ المدينة", "منشورة", "#0F6E56", "#E1F5EE"], ["اتصل بنا", "مسودة", "#854F0B", "#FAEEDA"]].map(([name, status, c, bg]) => (
                <div key={name} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16 }}>📄</span>
                    <span style={{ fontSize: 13, color: txt, fontWeight: 500 }}>{name}</span>
                    <span style={{ fontSize: 10, background: bg, color: c, padding: "2px 8px", borderRadius: 99 }}>{status}</span>
                  </div>
                  <button style={{ padding: "5px 12px", borderRadius: 7, border: `1px solid ${border}`, background: "transparent", color: txt2, fontSize: 11, cursor: "pointer" }}>تعديل</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── SETTINGS ── */}
      {dashTab === "settings" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {/* Site info */}
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

          {/* Security & System */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "18px" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: txt, marginBottom: 14 }}>🔐 الأمان والنظام</div>
              {[["https", "تفعيل HTTPS", "#0F6E56"], ["logging", "تسجيل الأخطاء (Logging)", "#185FA5"], ["backup", "النسخ الاحتياطي التلقائي", "#854F0B"]].map(([k, label, c]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${border}` }}>
                  <span style={{ fontSize: 12, color: txt }}>{label}</span>
                  <div onClick={() => setSiteSettings(s => ({ ...s, [k]: !s[k] }))}
                    style={{ width: 38, height: 22, borderRadius: 11, background: siteSettings[k] ? c : (dark ? "rgba(255,255,255,0.15)" : "#d1d5db"), cursor: "pointer", position: "relative", transition: "background .2s" }}>
                    <div style={{ position: "absolute", top: 3, left: siteSettings[k] ? 18 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "18px" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: txt, marginBottom: 12 }}>🔑 صلاحيات الأدوار</div>
              {Object.entries(ROLE_COLORS).map(([role, rc]) => (
                <div key={role} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 10, background: rc.bg, color: rc.c, padding: "3px 10px", borderRadius: 99 }}>{rc.label}</span>
                  <span style={{ fontSize: 11, color: txt2 }}>{role === "admin" ? "وصول كامل" : role === "editor" ? "تعديل المحتوى" : "قراءة فقط"}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ gridColumn: "1/-1" }}>
            {settingsSaved && <div style={{ background: "#E1F5EE", color: "#085041", border: "1px solid #9FE1CB", borderRadius: 10, padding: "10px 16px", fontSize: 12, marginBottom: 10 }}>✅ تم حفظ الإعدادات بنجاح</div>}
            <button onClick={() => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 3000); }}
              style={{ padding: "10px 28px", borderRadius: 10, border: "none", background: "#185FA5", color: "#E6F1FB", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>حفظ الإعدادات</button>
          </div>
        </div>
      )}

      {/* ── LOGS ── */}
      {dashTab === "logs" && (
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: txt, marginBottom: 12 }}>📋 سجل النشاطات — اليوم</div>
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
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button style={{ padding: "8px 18px", borderRadius: 9, border: `1px solid ${border}`, background: "transparent", color: txt2, fontSize: 12, cursor: "pointer" }}>تصدير السجل ↓</button>
            <button style={{ padding: "8px 18px", borderRadius: 9, border: "1px solid #F7C1C1", background: "transparent", color: "#A32D2D", fontSize: 12, cursor: "pointer" }}>مسح السجل</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ========== ORIGINAL COMPONENTS ==========
function Banner({ slide }) {
  const stars = useRef(Array.from({ length: 28 }, () => ({ top: `${Math.random() * 75}%`, left: `${Math.random() * 100}%`, w: 1 + Math.random() * 2, dur: `${2 + Math.random() * 4}s`, del: `${Math.random() * 4}s` }))).current;
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: `linear-gradient(150deg,${slide.bg1},${slide.bg2})` }}>
      <style>{`@keyframes tw{0%{opacity:.08}100%{opacity:.9}}@keyframes mp{0%{transform:scale(1)}100%{transform:scale(1.1)}}@keyframes fb{0%{transform:translateX(0)}100%{transform:translateX(-28px)}}@keyframes ff{0%{transform:translateX(0)}100%{transform:translateX(20px)}}@keyframes cp{0%{opacity:.3}100%{opacity:.85}}@keyframes fu{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}@keyframes rpl{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.12);opacity:1}}`}</style>
      {stars.map((s, i) => <div key={i} style={{ position: "absolute", top: s.top, left: s.left, width: s.w, height: s.w, borderRadius: "50%", background: "#fff", animation: `tw ${s.dur} ${s.del} ease-in-out infinite alternate` }} />)}
      <div style={{ position: "absolute", top: 26, left: 52, width: 54, height: 54, borderRadius: "50%", background: "#FAC775", animation: "mp 4s ease-in-out infinite alternate", boxShadow: "0 0 0 10px rgba(250,199,117,0.1)" }} />
      <div style={{ position: "absolute", top: 36, left: 90, width: 17, height: 17, borderRadius: "50%", background: slide.bg1, opacity: .95 }} />
      {[0, 1].map(i => <div key={i} style={{ position: "absolute", top: "8%", right: 30 + i * 55, width: 110 + i * 75, height: 110 + i * 75, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", animation: `rpl ${20 + i * 10}s ease-in-out infinite` }} />)}
      <svg style={{ position: "absolute", bottom: 0, width: "125%", left: "-12%", animation: "fb 20s ease-in-out infinite alternate" }} viewBox="0 0 900 200" preserveAspectRatio="none"><path d="M0,200 L0,130 Q50,90 100,110 Q150,130 220,70 Q290,10 370,80 Q450,140 530,60 Q610,-10 700,75 Q780,145 860,90 L900,80 L900,200Z" fill={`${slide.bg1}cc`} /></svg>
      <svg style={{ position: "absolute", bottom: 0, width: "115%", left: "-7%", animation: "ff 14s ease-in-out infinite alternate" }} viewBox="0 0 900 160" preserveAspectRatio="none"><path d="M0,160 L0,110 Q80,55 170,90 Q260,125 360,45 Q460,-20 570,65 Q670,140 760,80 Q820,40 900,70 L900,160Z" fill={`${slide.bg1}ee`} /></svg>
      <svg style={{ position: "absolute", bottom: 0, width: "100%", animation: "cp 3s ease-in-out infinite alternate" }} viewBox="0 0 800 55" preserveAspectRatio="none">{[20, 65, 115, 175, 240, 300, 370, 440, 510, 575, 640, 700, 755].map((x, i) => <rect key={i} x={x} y={8 + (i % 3) * 7} width={5 + (i % 4) * 3} height={38 - (i % 3) * 7} fill={`${slide.accent}${['88', 'aa', '66'][i % 3]}`} rx="1.5" />)}</svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 10, padding: 20, direction: "rtl" }}>
        <div key={slide.id + "b"} style={{ fontSize: 11, color: "#9FE1CB", border: `1px solid ${slide.accent}88`, padding: "4px 14px", borderRadius: 99, marginBottom: 14, background: `${slide.accent}22`, animation: "fu .7s ease both" }}>{slide.badge}</div>
        <h1 key={slide.id + "t"} style={{ fontSize: 28, fontWeight: 500, color: "#E6F1FB", textAlign: "center", marginBottom: 10, lineHeight: 1.45, animation: "fu .7s .15s ease both" }}>{slide.title}</h1>
        <p key={slide.id + "s"} style={{ fontSize: 13, color: "#85B7EB", textAlign: "center", marginBottom: 24, lineHeight: 1.9, maxWidth: 420, animation: "fu .7s .3s ease both" }}>{slide.subtitle}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", animation: "fu .7s .45s ease both" }}>
          <button style={{ background: slide.accent, color: "#fff", border: "none", padding: "10px 26px", borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>{slide.btn1}</button>
          <button style={{ background: "rgba(255,255,255,0.1)", color: "#E6F1FB", border: "1px solid rgba(255,255,255,0.25)", padding: "10px 26px", borderRadius: 9, fontSize: 13, cursor: "pointer" }}>{slide.btn2}</button>
        </div>
      </div>
    </div>
  );
}

function Map3D({ dark }) {
  const canvasRef = useRef(null);
  const S = useRef({ rot: 0, tilt: 0.55, zoom: 1, dragging: false, lastX: 0, lastY: 0, autoRot: true, hoveredPin: null, animFrame: null });
  const [tooltip, setTooltip] = useState(null);
  const [selected, setSelected] = useState(null);
  const GRID = 60;
  const terrain = (x, y) => { const nx = x / GRID, ny = y / GRID; return Math.sin(nx * 3.2) * 18 + Math.cos(ny * 2.8) * 14 + Math.sin((nx + ny) * 4.1) * 10 + Math.cos(nx * 7) * 5 + Math.sin(ny * 6) * 4 + (Math.abs(nx - 0.5) < 0.15 && Math.abs(ny - 0.5) < 0.15 ? 22 : 0) + Math.sin(nx * 12) * 2 + Math.cos(ny * 10) * 2; };
  const project = (wx, wy, wz, rot, tilt, zoom, W, H) => { const cx = wx - GRID / 2, cy = wy - GRID / 2; const rx = cx * Math.cos(rot) - cy * Math.sin(rot); const ry = cx * Math.sin(rot) + cy * Math.cos(rot); const py = ry * Math.cos(tilt) - wz * Math.sin(tilt); return { x: W / 2 + rx * zoom * 3.8, y: H / 2 + py * zoom * 3.8 }; };
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const draw = () => {
      const W = canvas.width, H = canvas.height, { rot, tilt, zoom } = S.current;
      ctx.clearRect(0, 0, W, H);
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      if (dark) { sky.addColorStop(0, "#0a0a1a"); sky.addColorStop(1, "#1a2040"); } else { sky.addColorStop(0, "#c8dff5"); sky.addColorStop(1, "#e8f4fd"); }
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
      for (let y = 0; y < GRID; y += 2) {
        for (let x = 0; x < GRID; x += 2) {
          const h00 = terrain(x, y), h10 = terrain(x + 2, y), h01 = terrain(x, y + 2), h11 = terrain(x + 2, y + 2);
          const p00 = project(x, y, h00, rot, tilt, zoom, W, H), p10 = project(x + 2, y, h10, rot, tilt, zoom, W, H);
          const p11 = project(x + 2, y + 2, h11, rot, tilt, zoom, W, H), p01 = project(x, y + 2, h01, rot, tilt, zoom, W, H);
          const avgH = (h00 + h10 + h01 + h11) / 4, nx = (x + 1) / GRID, ny = (y + 1) / GRID;
          const iCC = Math.abs(nx - 0.5) < 0.18 && Math.abs(ny - 0.5) < 0.18;
          const isR = Math.abs(nx - 0.5) < 0.03 || Math.abs(ny - 0.5) < 0.03;
          let fc = isR ? (dark ? "#4a4a6a" : "#d4c9b0") : iCC && avgH > 15 ? (dark ? "#2a3a5a" : "#c8b896") : avgH > 30 ? (dark ? "#2d4a2d" : "#5a7a4a") : avgH > 15 ? (dark ? "#3a5a3a" : "#6a9a5a") : avgH > 5 ? (dark ? "#3a6a3a" : "#7ab06a") : (dark ? "#1a3a1a" : "#5a8a4a");
          ctx.beginPath(); ctx.moveTo(p00.x, p00.y); ctx.lineTo(p10.x, p10.y); ctx.lineTo(p11.x, p11.y); ctx.lineTo(p01.x, p01.y); ctx.closePath();
          ctx.fillStyle = fc; ctx.fill(); ctx.strokeStyle = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"; ctx.lineWidth = 0.3; ctx.stroke();
        }
      }
      LM_MAP.forEach(lm => {
        const gx = lm.x * GRID / 100, gy = lm.y * GRID / 100, gh = terrain(gx, gy) + 2;
        const base = project(gx, gy, gh, rot, tilt, zoom, W, H), top = project(gx, gy, gh + 12, rot, tilt, zoom, W, H);
        const isHov = S.current.hoveredPin === lm.id;
        ctx.beginPath(); ctx.moveTo(base.x, base.y); ctx.lineTo(top.x, top.y); ctx.strokeStyle = lm.color; ctx.lineWidth = isHov ? 2.5 : 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(top.x, top.y - 1, isHov ? 10 : 7, 0, Math.PI * 2); ctx.fillStyle = lm.color; ctx.fill(); ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.font = `${isHov ? 12 : 9}px sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(lm.icon, top.x, top.y - 1);
        lm._sx = top.x; lm._sy = top.y - 1;
      });
      S.current.animFrame = requestAnimationFrame(() => { if (S.current.autoRot) S.current.rot += 0.004; draw(); });
    };
    draw();
    return () => { if (S.current.animFrame) cancelAnimationFrame(S.current.animFrame); };
  }, [dark]);
  const onMM = (e) => {
    const r = canvasRef.current.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
    if (S.current.dragging) { S.current.rot += (mx - S.current.lastX) * 0.008; S.current.tilt = Math.max(0.2, Math.min(1.2, S.current.tilt - (my - S.current.lastY) * 0.006)); S.current.autoRot = false; S.current.lastX = mx; S.current.lastY = my; return; }
    let hov = null; LM_MAP.forEach(lm => { if (lm._sx && Math.hypot(mx - lm._sx, my - lm._sy) < 14) hov = lm.id; });
    if (hov !== S.current.hoveredPin) { S.current.hoveredPin = hov; canvasRef.current.style.cursor = hov ? "pointer" : "grab"; }
    setTooltip(hov ? LM_MAP.find(l => l.id === hov) : null);
  };
  const selLM = selected ? LANDMARKS_FULL.find(l => l.id === selected) : null;
  return (
    <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", boxShadow: "0 12px 48px rgba(0,0,0,0.3)" }}>
      <canvas ref={canvasRef} width={700} height={400} style={{ width: "100%", height: 400, display: "block", cursor: "grab" }}
        onMouseDown={e => { const r = canvasRef.current.getBoundingClientRect(); S.current.dragging = true; S.current.lastX = e.clientX - r.left; S.current.lastY = e.clientY - r.top; }}
        onMouseMove={onMM} onMouseUp={() => S.current.dragging = false} onMouseLeave={() => { S.current.dragging = false; setTooltip(null); }}
        onClick={e => { const r = canvasRef.current.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top; LM_MAP.forEach(lm => { if (lm._sx && Math.hypot(mx - lm._sx, my - lm._sy) < 14) setSelected(lm.id); }); }}
        onWheel={e => S.current.zoom = Math.max(0.5, Math.min(2.5, S.current.zoom - (e.deltaY > 0 ? 0.1 : -0.1)))} />
      <div style={{ position: "absolute", bottom: 14, left: 14, display: "flex", flexDirection: "column", gap: 6 }}>
        {[["＋", () => S.current.zoom = Math.min(2.5, S.current.zoom + 0.2)], ["－", () => S.current.zoom = Math.max(0.5, S.current.zoom - 0.2)], ["↺", () => S.current.autoRot = !S.current.autoRot]].map(([l, fn]) => (
          <button key={l} onClick={fn} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{l}</button>
        ))}
      </div>
      {tooltip && <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.75)", color: "#fff", padding: "6px 14px", borderRadius: 99, fontSize: 12, pointerEvents: "none", whiteSpace: "nowrap", border: `1px solid ${tooltip.color}44` }}>{tooltip.icon} {tooltip.label} — {tooltip.desc}</div>}
      <div style={{ position: "absolute", bottom: 14, right: 14, fontSize: 11, color: "rgba(255,255,255,0.5)", background: "rgba(0,0,0,0.4)", padding: "4px 10px", borderRadius: 99 }}>اسحب للتدوير · عجلة للتكبير</div>
      {selLM && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setSelected(null)}>
          <div style={{ background: "#1a1a2e", borderRadius: 18, padding: 0, maxWidth: 340, width: "90%", border: `1px solid ${selLM.color}44`, overflow: "hidden", direction: "rtl" }} onClick={e => e.stopPropagation()}>
            <img src={selLM.img} alt={selLM.name} style={{ width: "100%", height: 160, objectFit: "cover" }} />
            <div style={{ padding: "16px 18px" }}>
              <div style={{ fontSize: 11, color: selLM.color, background: `${selLM.color}22`, display: "inline-block", padding: "2px 10px", borderRadius: 99, marginBottom: 8 }}>{selLM.category}</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#E6F1FB", marginBottom: 4 }}>{selLM.name}</div>
              {selLM.rating && <div style={{ fontSize: 12, color: "#EF9F27", marginBottom: 8 }}>⭐ {selLM.rating} ({selLM.reviews} تقييم)</div>}
              <div style={{ fontSize: 12, color: "#85B7EB", lineHeight: 1.7, marginBottom: 12 }}>{selLM.desc.substring(0, 180)}...</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setSelected(null)} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", background: selLM.color, color: "#fff", fontSize: 12, cursor: "pointer" }}>إغلاق</button>
                <a href={selLM.mapUrl} target="_blank" rel="noreferrer" style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: `1px solid ${selLM.color}44`, color: selLM.color, fontSize: 12, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>خريطة Google ↗</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ========== MAIN APP ==========
export default function App() {
  const [dark, setDark] = useState(false);
  const [cur, setCur] = useState(0);
  const [section, setSection] = useState("home");
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(null);
  const [authTab, setAuthTab] = useState("login");
  const [authForm, setAuthForm] = useState({});
  const [newsFilter, setNewsFilter] = useState("الكل");
  const [galleryIdx, setGalleryIdx] = useState(null);
  const [userOpen, setUserOpen] = useState(false);
  const timer = useRef(null);

  const bg = dark ? "#0f0f1a" : "#f2f4f8";
  const card = dark ? "#1a1a2e" : "#fff";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const txt = dark ? "#e8e8f0" : "#1a1a2e";
  const txt2 = dark ? "#9090b0" : "#6b7280";
  const inputBg = dark ? "#252540" : "#f8f9fa";

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      setSection("dashboard");
    }
  }, []);

  useEffect(() => { timer.current = setInterval(() => setCur(c => (c + 1) % SLIDES.length), 4500); return () => clearInterval(timer.current); }, []);

  const CATS = ["الكل", ...[...new Set(NEWS.map(n => n.cat))]];
  const filteredNews = newsFilter === "الكل" ? NEWS : NEWS.filter(n => n.cat === newsFilter);
  const doLogin = () => { if (authForm.email && authForm.password) { setUser({ name: authForm.name || authForm.email.split("@")[0], email: authForm.email }); setModal(null); setAuthForm({}); } };
  const doReg = () => { if (authForm.email && authForm.password && authForm.name) { setUser({ name: authForm.name, email: authForm.email }); setModal(null); setAuthForm({}); } };
  const inp = (f, ph, type = "text") => (<input key={f} type={type} placeholder={ph} value={authForm[f] || ""} onChange={e => setAuthForm({ ...authForm, [f]: e.target.value })} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 13, border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`, background: inputBg, color: txt, direction: "rtl", marginBottom: 12, outline: "none", fontFamily: "inherit" }} />);

  const NAV = [["home", "الرئيسية"], ["landmarks", "المعالم"], ["history", "التاريخ"], ["gallery", "الصور"], ["map", "الخريطة"]];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", direction: "rtl", background: bg, minHeight: "100vh", transition: "background .3s" }}>
      <style>{`.ncard:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,.12)!important}.ncard{transition:all .2s}.lcard:hover{border-color:#378ADD!important;transform:translateY(-2px)}.lcard{transition:all .2s}`}</style>

      {/* NAV */}
      <div style={{ background: card, borderBottom: `1px solid ${border}`, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#185FA5,#378ADD)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏛️</div>
          <div><div style={{ fontSize: 14, fontWeight: 500, color: txt }}>جبلة — درة اليمن</div><div style={{ fontSize: 10, color: txt2 }}>بوابة المدينة الإخبارية</div></div>
        </div>
        <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {NAV.map(([k, l]) => (<button key={k} onClick={() => setSection(k)} style={{ padding: "6px 10px", borderRadius: 8, border: "none", background: section === k ? (k === "dashboard" ? "#534AB7" : "#185FA5") : "transparent", color: section === k ? "#E6F1FB" : (k === "dashboard" ? "#7F77DD" : txt2), fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: k === "dashboard" ? 500 : 400 }}>{l}</button>))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button onClick={() => setDark(!dark)} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${border}`, background: "transparent", cursor: "pointer", fontSize: 14 }}>{dark ? "☀️" : "🌙"}</button>
          {user ? (
            <div style={{ position: "relative" }}>
              <div onClick={() => setUserOpen(!userOpen)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px 4px 4px", borderRadius: 8, border: `1px solid ${border}`, cursor: "pointer" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#185FA5,#1D9E75)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 500 }}>{user.name[0].toUpperCase()}</div>
                <span style={{ fontSize: 12, color: txt }}>{user.name}</span>
              </div>
              {userOpen && <div style={{ position: "absolute", right: 0, top: 40, background: card, border: `1px solid ${border}`, borderRadius: 10, zIndex: 200, boxShadow: "0 8px 24px rgba(0,0,0,.18)", minWidth: 160 }}>
                <div style={{ padding: "10px 14px", borderBottom: `1px solid ${border}` }}><div style={{ fontSize: 13, fontWeight: 500, color: txt }}>{user.name}</div><div style={{ fontSize: 11, color: txt2 }}>{user.email}</div></div>
                <div onClick={() => { setSection("dashboard"); setUserOpen(false); }} style={{ padding: "9px 14px", cursor: "pointer", fontSize: 12, color: "#7F77DD" }}>⚙️ لوحة التحكم</div>
                <div onClick={() => { setUser(null); setUserOpen(false); }} style={{ padding: "9px 14px", cursor: "pointer", fontSize: 12, color: "#E24B4A" }}>🚪 تسجيل الخروج</div>
              </div>}
            </div>
          ) : (
            <div style={{ display: "flex", gap: 5 }}>
              <button onClick={() => { setAuthTab("login"); setModal("auth"); }} style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${border}`, background: "transparent", color: txt, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>دخول</button>
              <button onClick={() => { setAuthTab("register"); setModal("auth"); }} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#185FA5", color: "#E6F1FB", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>تسجيل</button>
            </div>
          )}
        </div>
      </div>
      {userOpen && <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setUserOpen(false)} />}

      {/* DASHBOARD — full page, no banner */}
      {section === "dashboard" && <Dashboard dark={dark} currentUser={user} />}

      {/* BANNER — only on non-dashboard pages */}
      {section !== "dashboard" && (
        <>
          <div style={{ position: "relative", height: 370, margin: "14px 14px 0", borderRadius: 18, overflow: "hidden", boxShadow: "0 10px 44px rgba(0,0,0,0.2)" }}>
            <Banner slide={SLIDES[cur]} />
            {[{ d: "right", n: (cur - 1 + SLIDES.length) % SLIDES.length, ch: "‹" }, { d: "left", n: (cur + 1) % SLIDES.length, ch: "›" }].map(a => (
              <button key={a.d} onClick={() => { clearInterval(timer.current); setCur(a.n); }} style={{ position: "absolute", top: "50%", [a.d]: 12, transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>{a.ch}</button>
            ))}
            <div style={{ position: "absolute", top: 12, right: 12, fontSize: 10, color: "rgba(255,255,255,0.7)", background: "rgba(0,0,0,0.3)", padding: "2px 9px", borderRadius: 99 }}>{cur + 1}/{SLIDES.length}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 7, padding: "10px 0 2px" }}>
            {SLIDES.map((_, i) => <div key={i} onClick={() => { clearInterval(timer.current); setCur(i); }} style={{ height: 5, width: i === cur ? 24 : 5, borderRadius: 99, background: i === cur ? SLIDES[cur].accent : (dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"), cursor: "pointer", transition: "all .3s" }} />)}
          </div>
        </>
      )}

      {/* HOME */}
      {section === "home" && (
        <div style={{ padding: "10px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <div><div style={{ fontSize: 16, fontWeight: 500, color: txt }}>آخر الأخبار</div><div style={{ fontSize: 11, color: txt2, marginTop: 1 }}>تابع أحدث أخبار جبلة</div></div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {CATS.map(c => <button key={c} onClick={() => setNewsFilter(c)} style={{ padding: "5px 12px", borderRadius: 99, fontSize: 11, cursor: "pointer", fontFamily: "inherit", border: `1px solid ${newsFilter === c ? "#185FA5" : border}`, background: newsFilter === c ? "#185FA5" : "transparent", color: newsFilter === c ? "#E6F1FB" : txt2, transition: "all .2s" }}>{c}</button>)}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
            {filteredNews.map(n => (
              <div key={n.id} className="ncard" style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, overflow: "hidden" }}>
                <img src={n.img} alt={n.title} style={{ width: "100%", height: 100, objectFit: "cover" }} />
                <div style={{ padding: "10px 12px 8px", direction: "rtl" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
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
          <div style={{ fontSize: 16, fontWeight: 500, color: txt, marginBottom: 4 }}>المعالم السياحية والأثرية</div>
          <div style={{ fontSize: 12, color: txt2, marginBottom: 14 }}>صور حقيقية من Google Maps مع تفاصيل كل موقع</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
            {LANDMARKS_FULL.map(lm => (
              <div key={lm.id} className="lcard" style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden" }}>
                <div style={{ position: "relative", height: 180 }}>
                  <img src={lm.img} alt={lm.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 50%)" }} />
                  <div style={{ position: "absolute", bottom: 10, right: 10, fontSize: 10, color: "#fff", background: lm.color, padding: "3px 10px", borderRadius: 99 }}>{lm.category}</div>
                  {lm.rating && <div style={{ position: "absolute", top: 10, left: 10, fontSize: 11, color: "#fff", background: "rgba(0,0,0,0.5)", padding: "3px 9px", borderRadius: 99 }}>⭐ {lm.rating} ({lm.reviews})</div>}
                </div>
                <div style={{ padding: "14px", direction: "rtl" }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: txt, marginBottom: 6 }}>{lm.name}</div>
                  <div style={{ fontSize: 11, color: txt2, marginBottom: 8 }}>📍 {lm.location} • 🗓️ {lm.era}</div>
                  <div style={{ fontSize: 12, color: txt2, lineHeight: 1.7, marginBottom: 12 }}>{lm.desc.substring(0, 160)}...</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <img src={lm.img2} alt="" style={{ width: "100%", height: 70, objectFit: "cover", borderRadius: 8 }} />
                    <a href={lm.mapUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: lm.bg, color: lm.color, borderRadius: 8, fontSize: 12, fontWeight: 500, textDecoration: "none" }}>عرض على الخريطة ↗</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HISTORY */}
      {section === "history" && (
        <div style={{ padding: "14px" }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: txt, marginBottom: 4 }}>تاريخ جبلة عبر القرون</div>
          <div style={{ fontSize: 12, color: txt2, marginBottom: 18 }}>رحلة زمنية في عاصمة الدولة الصليحية</div>
          <div style={{ background: dark ? "#1a1a2e" : "#E6F1FB", borderRadius: 16, padding: "18px", marginBottom: 18, border: `1px solid ${dark ? "rgba(55,138,221,0.2)" : "#B5D4F4"}`, direction: "rtl" }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: dark ? "#85B7EB" : "#0C447C", marginBottom: 8 }}>👑 الملكة أروى بنت أحمد الصليحي</div>
            <div style={{ fontSize: 12, color: dark ? "#6b9ec9" : "#185FA5", lineHeight: 1.8 }}>تُعدّ من أعظم الحاكمات في التاريخ الإسلامي. حكمت اليمن أكثر من ٥٠ عاماً بعد وفاة زوجها، وأقامت علاقات دبلوماسية مع الدولة الفاطمية. اشتُهرت بعدلها وحرصها على الرعية وبناء المدارس والمساجد. تُلقَّب بـ"حُرّة الملكة" وهي مدفونة في مسجدها بجبلة.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, direction: "rtl" }}>
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
          <div style={{ fontSize: 16, fontWeight: 500, color: txt, marginBottom: 4 }}>معرض الصور الحقيقية</div>
          <div style={{ fontSize: 12, color: txt2, marginBottom: 14 }}>صور من Google Maps لمعالم جبلة الأثرية والتاريخية</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 10 }}>
            {GALLERY_IMGS.map((g, i) => (
              <div key={i} onClick={() => setGalleryIdx(i)} style={{ position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "transform .2s" }}
                onMouseOver={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
                <img src={g.src} alt={g.caption} style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 6, right: 6, left: 6, fontSize: 10, color: "#fff", lineHeight: 1.4 }}>{g.caption}</div>
              </div>
            ))}
          </div>
          {galleryIdx !== null && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }} onClick={() => setGalleryIdx(null)}>
              <img src={GALLERY_IMGS[galleryIdx].src} alt="" style={{ maxWidth: "90%", maxHeight: "75vh", borderRadius: 12, objectFit: "contain" }} onClick={e => e.stopPropagation()} />
              <div style={{ color: "#E6F1FB", fontSize: 13 }}>{GALLERY_IMGS[galleryIdx].caption}</div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={e => { e.stopPropagation(); setGalleryIdx((galleryIdx - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length); }} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 18 }}>‹</button>
                <span style={{ color: "rgba(255,255,255,0.5)", padding: "8px 10px", fontSize: 12 }}>{galleryIdx + 1}/{GALLERY_IMGS.length}</span>
                <button onClick={e => { e.stopPropagation(); setGalleryIdx((galleryIdx + 1) % GALLERY_IMGS.length); }} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 18 }}>›</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MAP */}
      {section === "map" && (
        <div style={{ padding: "14px" }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: txt, marginBottom: 4 }}>خريطة جبلة التفاعلية ثلاثية الأبعاد</div>
          <div style={{ fontSize: 12, color: txt2, marginBottom: 14 }}>اسحب للتدوير — عجلة الفأرة للتكبير — انقر على الدبابيس لتفاصيل المعالم</div>
          <Map3D dark={dark} />
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 7, direction: "rtl" }}>
            {LM_MAP.map(lm => <div key={lm.id} style={{ display: "flex", alignItems: "center", gap: 5, background: card, border: `1px solid ${border}`, borderRadius: 99, padding: "4px 10px", fontSize: 11, color: txt2 }}><span>{lm.icon}</span>{lm.label}<span style={{ width: 7, height: 7, borderRadius: "50%", background: lm.color, display: "inline-block" }} /></div>)}
          </div>
        </div>
      )}

      {/* STATS */}
      {(section === "home" || section === "map") && (
        <div style={{ margin: "18px 14px", borderRadius: 18, overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(135deg,#042C53,#185FA5)", padding: "18px 20px 14px", direction: "rtl" }}>
            <div style={{ fontSize: 10, color: "#9FE1CB", border: "1px solid rgba(29,158,117,0.4)", display: "inline-block", padding: "2px 12px", borderRadius: 99, marginBottom: 6, background: "rgba(29,158,117,0.15)" }}>إحصائيات رسمية ٢٠٢٥</div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#E6F1FB", marginBottom: 2 }}>جبلة بالأرقام</div>
            <div style={{ fontSize: 11, color: "#85B7EB" }}>أبرز المؤشرات الخاصة بمدينة جبلة التاريخية</div>
          </div>
          <div style={{ background: dark ? "#13132a" : "#1e3a5f", padding: "14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: 9 }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.07)", transition: "all .2s", cursor: "default" }}
                  onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.11)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 17, fontWeight: 500, color: s.color, marginBottom: 2 }}>{s.value}</div>
                  <div style={{ fontSize: 9, color: "#6b9ec9", marginBottom: 4 }}>{s.sub}</div>
                  <div style={{ fontSize: 10, color: "#85B7EB", lineHeight: 1.5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#042C53", padding: "10px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 10, color: "#6b9ec9" }}>آخر تحديث: أبريل ٢٠٢٥</div>
            <button style={{ fontSize: 10, color: "#378ADD", background: "transparent", border: "1px solid rgba(55,138,221,0.3)", padding: "4px 12px", borderRadius: 99, cursor: "pointer" }}>تنزيل التقرير ↓</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{ background: dark ? "#1a1a2e" : "#1e3a5f", padding: "16px 20px", direction: "rtl", borderTop: `1px solid ${border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#185FA5,#378ADD)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏛️</div>
            <div><div style={{ fontSize: 13, fontWeight: 500, color: "#E6F1FB" }}>جبلة — درة اليمن</div><div style={{ fontSize: 10, color: "#6b9ec9" }}>jabla-city.org</div></div>
          </div>
          <div style={{ fontSize: 10, color: "#6b9ec9" }}>© ٢٠٢٥ بوابة جبلة — جميع الحقوق محفوظة</div>
        </div>
      </div>

      {/* AUTH MODAL */}
      {modal === "auth" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setModal(null)}>
          <div style={{ background: card, borderRadius: 18, padding: 26, width: 330, maxWidth: "90vw", border: `1px solid ${border}` }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#185FA5,#378ADD)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏛️</div>
              <div><div style={{ fontSize: 14, fontWeight: 500, color: txt }}>{authTab === "login" ? "تسجيل الدخول" : "إنشاء حساب"}</div><div style={{ fontSize: 10, color: txt2 }}>جبلة — درة اليمن</div></div>
            </div>
            <div style={{ display: "flex", background: dark ? "#252540" : "#f0f2f5", borderRadius: 9, padding: 3, marginBottom: 16 }}>
              {[["login", "دخول"], ["register", "حساب جديد"]].map(([k, l]) => (
                <button key={k} onClick={() => setAuthTab(k)} style={{ flex: 1, padding: "7px 0", borderRadius: 7, border: "none", fontSize: 12, cursor: "pointer", fontFamily: "inherit", background: authTab === k ? card : "transparent", color: authTab === k ? txt : txt2, fontWeight: authTab === k ? 500 : 400 }}>{l}</button>
              ))}
            </div>
            {authTab === "register" && inp("name", "الاسم الكريم")}
            {inp("email", "البريد الإلكتروني", "email")}
            {inp("password", "كلمة المرور", "password")}
            {authTab === "register" && inp("confirmPass", "تأكيد كلمة المرور", "password")}
            <button onClick={authTab === "login" ? doLogin : doReg} style={{ width: "100%", padding: "11px 0", borderRadius: 9, border: "none", background: "linear-gradient(135deg,#185FA5,#378ADD)", color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
              {authTab === "login" ? "دخول" : "تسجيل"}
            </button>
            <div style={{ textAlign: "center", marginTop: 12, fontSize: 11, color: txt2 }}>
              {authTab === "login" ? "ليس لديك حساب؟ " : "لديك حساب؟ "}
              <span onClick={() => setAuthTab(authTab === "login" ? "register" : "login")} style={{ color: "#378ADD", cursor: "pointer", fontWeight: 500 }}>{authTab === "login" ? "إنشاء حساب" : "تسجيل الدخول"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
