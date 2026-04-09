import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";

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
const db = getFirestore(firebaseApp);

const REAL_PHOTOS = {
  mosque: "https://lh3.googleusercontent.com/place-photos/AL8-SNH5RPqKpJT7LsORftzOBRjxriqIdX-DIKbz77e6IuY6jdzk49RzcgL7TCd75BO9lLZw1Q7P66zBFA68ly5bH9hvj8jr0TRe76yQfkRtPQEXNRlloocu2796IIFg51TMtXC5lrcYb92YDt6G4iI=s800-w800-h600",
  city: "https://lh3.googleusercontent.com/place-photos/AL8-SNG8yVk4T-L00ekScdPqgZJKjVB3-QdK4Dfuwh7hzl0Tqgo_b9KBXulg4arryOX25cd1UuMtFYxNJzDK8Ykl9dKyKSBLVJq6201QBTT9utSRpmyHsJjLBZhw40S9Ozs-2vLThNtaV7GcGIXLIg=s800-w800-h600",
  palace: "https://lh3.googleusercontent.com/places/ANXAkqHME0bHnnxzf1C2MQXujNX27-hDYfNGQJz73IqYZltDVdBQwVWOCvD0uCkWht4hSrc-WE3K_sBYKUmkWZMPF4gKfWS6WlwO3QY=s800-w720-h540",
  palace2: "https://lh3.googleusercontent.com/places/ANXAkqGXyQ1CdoNVQ6Gyg4Bd0DsYLzVvnUeYtDybU4EZdUplBC6QjDUEgDGXs7UqRd7_SM9exiiBGXpcod82ep_QcQEm-KEbOBNoguA=s800-w720-h480",
  palace3: "https://lh3.googleusercontent.com/places/ANXAkqEM0QNrQQ_kX3W1tFJLXFcJDOQbfyuE3SZD7OWW6MpckWzsWKNKp-UXJ-xu5b18Lp1RVHJ7WhjV4OU075dKkJMt7NLpChKhgp0=s800-w800-h600",
  mosque2: "https://lh3.googleusercontent.com/place-photos/AL8-SNFvLVTHF-8JJjFErkEjRI6cKEIv9axbYcy0XTPtTElhEDG7daKckN0UP6tcf4-SpFTAEp4_6Y3jM17eopt26nwJR5G69Vfvd5i0S0HZVe5z9Z_YDChbEVkA7ZAn97yfrRIDMcVRM-Y254sTp1Y=s800-w800-h600",
  city2: "https://lh3.googleusercontent.com/place-photos/AL8-SNEy8jcOKUUIklHFKopRCBucTW7KUqVgOUz9-OG73lDwz_vgTHck7X2LlKI9M-tQ1CbhXBbjaUYYGYx-Aj2s7fVaDatl5B3SU7L-KdOmQzag8T31tn_dKIEw4Qqu-S-vta6p3QIjEQeItkCyvg=s800-w563-h563",
  fort: "https://lh3.googleusercontent.com/place-photos/AL8-SNE0JdXKy6Tn7b2wNe-add95zB-9-V7_jIW5_rbUMgDNJf8kuM85byY7803of038z3l16NBa8ErpqPi0W0cKE0ndVSTlRq2yYa5CX73qDmheTn_aatJZaw45bMaXcpMXN9_Ikczk8BE4ekh1M_g=s800-w720-h540",
  fort2: "https://lh3.googleusercontent.com/place-photos/AL8-SNEkgEfTzqXD2xlUMhdXWV1nomxatZq4Kx0ez6gNMDJp3iKhQOb6tcOzUtQ4SzlvaCCdnuXSUeRmM2gObmF3OcrxbinOJXAG3R9a1Sv2xBLtlyrhug99AymqsK2T3LTlLC8A1SrKy2bbeKNJo9k=s800-w720-h482",
  nature: "https://lh3.googleusercontent.com/place-photos/AL8-SNGxT-IEQL5n3QR0ljQzyZNvj0del1nx7gmc_xzopJPSsRTJUACwXt0Ob0_Eyh1eTFALNLORjLOx61ZQqQ0xeurZ6d4yP2mbUZFbxQK_A7-GFasjWLowjr_Ai3y72ThwtbpQxDKZn9qKEU3NfZo=s800-w720-h535",
};

const DEFAULT_NEWS = [
  { cat: "تراث", catColor: "#185FA5", catBg: "#E6F1FB", date: "٧ أبريل ٢٠٢٥", title: "ترميم مسجد الملكة أروى الأثري يدخل مراحله الأخيرة", summary: "تواصل أعمال ترميم وصيانة مسجد الملكة أروى التاريخي في جبلة بدعم من منظمات التراث الدولية.", img: REAL_PHOTOS.mosque, accent: "#185FA5", time: "منذ يومين" },
  { cat: "سياحة", catColor: "#0F6E56", catBg: "#E1F5EE", date: "٥ أبريل ٢٠٢٥", title: "ارتفاع ملحوظ في أعداد الزوار القادمين إلى جبلة", summary: "سجّلت مدينة جبلة ارتفاعاً في أعداد السياح والباحثين.", img: REAL_PHOTOS.city, accent: "#0F6E56", time: "منذ ٤ أيام" },
  { cat: "تنمية", catColor: "#854F0B", catBg: "#FAEEDA", date: "٢ أبريل ٢٠٢٥", title: "مشروع تطوير أسواق جبلة التراثية", summary: "أعلن المجلس المحلي عن إطلاق مشروع تطوير الأسواق التراثية القديمة في جبلة.", img: REAL_PHOTOS.palace, accent: "#854F0B", time: "منذ أسبوع" },
  { cat: "ثقافة", catColor: "#7F77DD", catBg: "#EEEDFE", date: "٢٨ مارس ٢٠٢٥", title: "مهرجان جبلة الثقافي للتراث اليمني", summary: "تستعد مدينة جبلة لاستضافة مهرجانها الثقافي السنوي.", img: REAL_PHOTOS.fort, accent: "#7F77DD", time: "منذ أسبوعين" },
  { cat: "بيئة", catColor: "#16A34A", catBg: "#EAF3DE", date: "٢٥ مارس ٢٠٢٥", title: "حملة تشجير في جبال محيط جبلة", summary: "أطلقت الجهات البيئية حملة تشجير شاملة في الجبال المحيطة بمدينة جبلة.", img: REAL_PHOTOS.nature, accent: "#16A34A", time: "منذ أسبوعين" },
  { cat: "تعليم", catColor: "#D97706", catBg: "#FEF3C7", date: "٢٠ مارس ٢٠٢٥", title: "مركز التعليم والتدريب المهني في جبلة", summary: "افتُتح مركز جديد للتعليم والتدريب المهني في جبلة لتأهيل الشباب.", img: REAL_PHOTOS.city2, accent: "#D97706", time: "منذ ٣ أسابيع" },
];

const LANDMARKS_INIT = [
  { name: "مسجد الملكة أروى", era: "القرن ١١م", category: "مسجد أثري", img: REAL_PHOTOS.mosque, desc: "يُعدّ مسجد الملكة أروى من أجمل وأهم المساجد الإسلامية في اليمن.", rating: 4.7 },
  { name: "قصر أروى الملكي", era: "القرن ١١م", category: "قصر تاريخي", img: REAL_PHOTOS.palace, desc: "قصر الملكة أروى بنت أحمد الصليحي التي حكمت في القرن الحادي عشر الميلادي.", rating: 4.4 },
  { name: "حصن التعكر", era: "العصور الوسطى", category: "حصن أثري", img: REAL_PHOTOS.fort, desc: "حصن تاريخي شامخ يقع في منطقة التعكر بمحافظة إب.", rating: 4.6 },
];

const TIMELINE_INIT = [
  { year: "١٠٤٧م", title: "تأسيس الدولة الصليحية", text: "أسّس علي بن محمد الصليحي الدولة الصليحية واختار جبلة عاصمةً لها." },
  { year: "١٠٦٧م", title: "عصر الملكة أروى الذهبي", text: "تولّت الملكة أروى بنت أحمد الصليحي مقاليد الحكم وحكمت أكثر من ٥٠ عاماً." },
];

const CAT_OPTIONS = [
  { label: "تراث", color: "#185FA5", bg: "#E6F1FB", accent: "#185FA5" },
  { label: "سياحة", color: "#0F6E56", bg: "#E1F5EE", accent: "#0F6E56" },
  { label: "تنمية", color: "#854F0B", bg: "#FAEEDA", accent: "#854F0B" },
  { label: "ثقافة", color: "#7F77DD", bg: "#EEEDFE", accent: "#7F77DD" },
  { label: "بيئة", color: "#16A34A", bg: "#EAF3DE", accent: "#16A34A" },
  { label: "تعليم", color: "#D97706", bg: "#FEF3C7", accent: "#D97706" },
];

// ============ LOGIN ============
function LoginPage({ dark }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const card = dark ? "#1a1a2e" : "#fff";
  const txt = dark ? "#e8e8f0" : "#1a1a2e";
  const txt2 = dark ? "#9090b0" : "#6b7280";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const inputBg = dark ? "#252540" : "#f8f9fa";

  const handleLogin = async () => {
    if (!email || !password) { setError("يرجى إدخال البريد وكلمة المرور"); return; }
    setLoading(true); setError("");
    try { await signInWithEmailAndPassword(auth, email, password); }
    catch { setError("بريد إلكتروني أو كلمة مرور غير صحيحة"); }
    setLoading(false);
  };

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
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@jabla-city.org"
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 13, border: `1px solid ${border}`, background: inputBg, color: txt, direction: "rtl", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: txt2, marginBottom: 6 }}>كلمة المرور</div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, fontSize: 13, border: `1px solid ${border}`, background: inputBg, color: txt, direction: "rtl", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
        </div>
        <button onClick={handleLogin} disabled={loading}
          style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", background: loading ? "#6b9ec9" : "linear-gradient(135deg,#185FA5,#378ADD)", color: "#fff", fontSize: 14, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: txt2 }}>🔒 هذه الصفحة للمدير فقط</div>
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
  const inputBg = dark ? "#252540" : "#f4f5f7";

  const [dashTab, setDashTab] = useState("news");
  const [news, setNews] = useState([]);
  const [landmarks, setLandmarks] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | {type: "news"|"landmark"|"timeline", action: "add"|"edit", data: {}}
  const [form, setForm] = useState({});
  const [delConfirm, setDelConfirm] = useState(null); // null | {id, type}
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      // News
      const newsSnap = await getDocs(collection(db, "news"));
      if (newsSnap.empty) {
        for (const n of DEFAULT_NEWS) await addDoc(collection(db, "news"), n);
        const newsSnap2 = await getDocs(collection(db, "news"));
        setNews(newsSnap2.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        setNews(newsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      }

      // Landmarks
      const landmarksSnap = await getDocs(collection(db, "landmarks"));
      if (landmarksSnap.empty) {
        for (const l of LANDMARKS_INIT) await addDoc(collection(db, "landmarks"), l);
        const landmarksSnap2 = await getDocs(collection(db, "landmarks"));
        setLandmarks(landmarksSnap2.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        setLandmarks(landmarksSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      }

      // Timeline
      const timelineSnap = await getDocs(collection(db, "timeline"));
      if (timelineSnap.empty) {
        for (const t of TIMELINE_INIT) await addDoc(collection(db, "timeline"), t);
        const timelineSnap2 = await getDocs(collection(db, "timeline"));
        setTimeline(timelineSnap2.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        setTimeline(timelineSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      }

    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const showMsg = (m) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const type = modal.type;
      const action = modal.action;
      let data = { ...form };

      if (type === "news") {
        const catObj = CAT_OPTIONS.find(c => c.label === form.cat) || CAT_OPTIONS[0];
        data = { ...data, catColor: catObj.color, catBg: catObj.bg, accent: catObj.accent, date: new Date().toLocaleDateString("ar-SA"), time: "الآن" };
      }

      if (action === "add") {
        await addDoc(collection(db, type), data);
        showMsg("✅ تم الإضافة بنجاح");
      } else {
        await updateDoc(doc(db, type, modal.data.id), data);
        showMsg("✅ تم التعديل بنجاح");
      }
      await fetchData();
      setModal(null); setForm({});
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, delConfirm.type, delConfirm.id));
      showMsg("🗑️ تم الحذف بنجاح");
      await fetchData();
    } catch (e) { console.error(e); }
    setDelConfirm(null);
  };

  const DASH_TABS = [
    { id: "news", label: "📝 الأخبار", color: "#185FA5" },
    { id: "landmarks", label: "🏛️ المعالم", color: "#0F6E56" },
    { id: "timeline", label: "⏳ التاريخ", color: "#854F0B" },
    { id: "settings", label: "⚙️ الإعدادات", color: "#7F77DD" }
  ];

  const inpStyle = { width: "100%", padding: "10px 12px", borderRadius: 8, fontSize: 13, border: `1px solid ${border}`, background: inputBg, color: txt, direction: "rtl", outline: "none", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 10 };

  return (
    <div style={{ minHeight: "100vh", background: dark ? "#0a0a16" : "#f0f2f5", direction: "rtl", fontFamily: "sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#042C53,#185FA5)", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <div>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>لوحة تحكم مدينة جبلة</div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{firebaseUser?.email} — مدير النظام</div>
        </div>
        <button onClick={() => signOut(auth)} style={{ background: "#e24b4a", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: "bold" }}>تسجيل الخروج</button>
      </div>

      <div style={{ maxWidth: 1100, margin: "20px auto", padding: "0 20px" }}>
        {msg && <div style={{ background: "#d1fae5", color: "#065f46", padding: "12px 20px", borderRadius: 10, marginBottom: 20, border: "1px solid #10b981", animation: "fadeIn 0.3s" }}>{msg}</div>}

        {/* Tab Bar */}
        <div style={{ display: "flex", gap: 10, marginBottom: 25, flexWrap: "wrap" }}>
          {DASH_TABS.map(tab => (
            <button key={tab.id} onClick={() => setDashTab(tab.id)} 
              style={{ flex: 1, minWidth: 120, padding: "12px 20px", borderRadius: 12, border: "none", background: dashTab === tab.id ? tab.color : card, color: dashTab === tab.id ? "#fff" : txt, cursor: "pointer", transition: "all 0.2s", boxShadow: dashTab === tab.id ? `0 4px 12px ${tab.color}44` : "none", fontWeight: dashTab === tab.id ? "bold" : "normal" }}>
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: txt2 }}>جاري تحميل البيانات من Firebase...</div>
        ) : (
          <div style={{ background: card, borderRadius: 20, padding: 25, border: `1px solid ${border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            {/* NEWS TAB */}
            {dashTab === "news" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ margin: 0, color: txt }}>إدارة المقالات الإخبارية</h3>
                  <button onClick={() => { setModal({type: "news", action: "add"}); setForm({ cat: "تراث" }); }} style={{ background: "#185FA5", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontWeight: "bold" }}>+ إضافة مقال</button>
                </div>
                <div style={{ display: "grid", gap: 12 }}>
                  {news.map(n => (
                    <div key={n.id} style={{ border: `1px solid ${border}`, padding: 15, borderRadius: 15, display: "flex", alignItems: "center", gap: 15, background: dark ? "rgba(255,255,255,0.02)" : "#fafafa" }}>
                      <img src={n.img} alt="" style={{ width: 90, height: 70, objectFit: "cover", borderRadius: 10 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "bold", color: txt, marginBottom: 5 }}>{n.title}</div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 20, background: n.catBg, color: n.catColor }}>{n.cat}</span>
                          <span style={{ fontSize: 11, color: txt2 }}>{n.date}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => { setModal({type: "news", action: "edit", data: n}); setForm(n); }} style={{ padding: "8px 15px", borderRadius: 8, border: `1px solid ${border}`, background: card, color: txt, cursor: "pointer" }}>تعديل</button>
                        <button onClick={() => setDelConfirm({id: n.id, type: "news"})} style={{ padding: "8px 15px", borderRadius: 8, border: "1px solid #ff4d4d", color: "#ff4d4d", background: "none", cursor: "pointer" }}>حذف</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LANDMARKS TAB */}
            {dashTab === "landmarks" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ margin: 0, color: txt }}>إدارة المعالم الأثرية</h3>
                  <button onClick={() => { setModal({type: "landmarks", action: "add"}); setForm({}); }} style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontWeight: "bold" }}>+ إضافة معلم</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 15 }}>
                  {landmarks.map(l => (
                    <div key={l.id} style={{ border: `1px solid ${border}`, padding: 15, borderRadius: 15, background: dark ? "rgba(255,255,255,0.02)" : "#fafafa" }}>
                      <img src={l.img} alt="" style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 12, marginBottom: 12 }} />
                      <div style={{ fontWeight: "bold", color: txt, fontSize: 16, marginBottom: 5 }}>{l.name}</div>
                      <div style={{ fontSize: 12, color: txt2, marginBottom: 10 }}>{l.category} — {l.era}</div>
                      <div style={{ display: "flex", gap: 8, marginTop: 15 }}>
                        <button onClick={() => { setModal({type: "landmarks", action: "edit", data: l}); setForm(l); }} style={{ flex: 1, padding: "8px", borderRadius: 8, border: `1px solid ${border}`, background: card, color: txt, cursor: "pointer" }}>تعديل</button>
                        <button onClick={() => setDelConfirm({id: l.id, type: "landmarks"})} style={{ padding: "8px 15px", borderRadius: 8, border: "1px solid #ff4d4d", color: "#ff4d4d", background: "none", cursor: "pointer" }}>حذف</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TIMELINE TAB */}
            {dashTab === "timeline" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ margin: 0, color: txt }}>إدارة الجدول الزمني</h3>
                  <button onClick={() => { setModal({type: "timeline", action: "add"}); setForm({}); }} style={{ background: "#854F0B", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontWeight: "bold" }}>+ إضافة حدث</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {timeline.map(t => (
                    <div key={t.id} style={{ border: `1px solid ${border}`, padding: 15, borderRadius: 15, display: "flex", alignItems: "center", gap: 20, background: dark ? "rgba(255,255,255,0.02)" : "#fafafa" }}>
                      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#854F0B22", color: "#854F0B", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: 14, flexShrink: 0 }}>{t.year}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "bold", color: txt, marginBottom: 5 }}>{t.title}</div>
                        <div style={{ fontSize: 13, color: txt2, lineHeight: 1.5 }}>{t.text}</div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => { setModal({type: "timeline", action: "edit", data: t}); setForm(t); }} style={{ padding: "8px 15px", borderRadius: 8, border: `1px solid ${border}`, background: card, color: txt, cursor: "pointer" }}>تعديل</button>
                        <button onClick={() => setDelConfirm({id: t.id, type: "timeline"})} style={{ padding: "8px 15px", borderRadius: 8, border: "1px solid #ff4d4d", color: "#ff4d4d", background: "none", cursor: "pointer" }}>حذف</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {dashTab === "settings" && (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 50, marginBottom: 20 }}>⚙️</div>
                <h3 style={{ color: txt }}>إعدادات لوحة التحكم</h3>
                <p style={{ color: txt2, maxWidth: 500, margin: "0 auto 30px" }}>هنا يمكنك ضبط إعدادات النظام، تغيير كلمة المرور، أو تفعيل الوضع الليلي بشكل دائم.</p>
                <button onClick={() => setDark(!dark)} style={{ padding: "12px 30px", borderRadius: 12, border: "none", background: "#185FA5", color: "#fff", cursor: "pointer", fontWeight: "bold" }}>
                  {dark ? "تفعيل الوضع النهاري ☀️" : "تفعيل الوضع الليلي 🌙"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* GLOBAL MODAL */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }} onClick={() => setModal(null)}>
          <div style={{ background: card, padding: 30, borderRadius: 25, width: "100%", maxWidth: 550, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: txt, marginBottom: 25, fontSize: 20 }}>
              {modal.action === "add" ? "إضافة " : "تعديل "}
              {modal.type === "news" ? "مقال إخباري" : modal.type === "landmarks" ? "معلم أثري" : "حدث تاريخي"}
            </h3>
            
            <div style={{ display: "grid", gap: 5 }}>
              {modal.type === "news" && (
                <>
                  <label style={{ fontSize: 12, color: txt2, marginRight: 5 }}>عنوان المقال</label>
                  <input placeholder="مثلاً: ترميم مسجد الملكة أروى..." value={form.title || ""} onChange={e => setForm({...form, title: e.target.value})} style={inpStyle} />
                  
                  <label style={{ fontSize: 12, color: txt2, marginRight: 5 }}>ملخص المقال</label>
                  <textarea placeholder="وصف قصير للمحتوى..." value={form.summary || ""} onChange={e => setForm({...form, summary: e.target.value})} style={{...inpStyle, height: 100}} />
                  
                  <label style={{ fontSize: 12, color: txt2, marginRight: 5 }}>التصنيف</label>
                  <select value={form.cat || "تراث"} onChange={e => setForm({...form, cat: e.target.value})} style={inpStyle}>
                    {CAT_OPTIONS.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
                  </select>
                </>
              )}

              {modal.type === "landmarks" && (
                <>
                  <label style={{ fontSize: 12, color: txt2, marginRight: 5 }}>اسم المعلم</label>
                  <input placeholder="مثلاً: قصر أروى..." value={form.name || ""} onChange={e => setForm({...form, name: e.target.value})} style={inpStyle} />
                  
                  <label style={{ fontSize: 12, color: txt2, marginRight: 5 }}>العصر التاريخي</label>
                  <input placeholder="مثلاً: القرن ١١م" value={form.era || ""} onChange={e => setForm({...form, era: e.target.value})} style={inpStyle} />
                  
                  <label style={{ fontSize: 12, color: txt2, marginRight: 5 }}>نوع المعلم</label>
                  <input placeholder="مثلاً: قصر، مسجد، حصن..." value={form.category || ""} onChange={e => setForm({...form, category: e.target.value})} style={inpStyle} />
                  
                  <label style={{ fontSize: 12, color: txt2, marginRight: 5 }}>وصف المعلم</label>
                  <textarea placeholder="وصف تاريخي مفصل..." value={form.desc || ""} onChange={e => setForm({...form, desc: e.target.value})} style={{...inpStyle, height: 100}} />
                </>
              )}

              {modal.type === "timeline" && (
                <>
                  <label style={{ fontSize: 12, color: txt2, marginRight: 5 }}>السنة</label>
                  <input placeholder="مثلاً: ١٠٤٧م" value={form.year || ""} onChange={e => setForm({...form, year: e.target.value})} style={inpStyle} />
                  
                  <label style={{ fontSize: 12, color: txt2, marginRight: 5 }}>عنوان الحدث</label>
                  <input placeholder="مثلاً: وفاة الملكة أروى..." value={form.title || ""} onChange={e => setForm({...form, title: e.target.value})} style={inpStyle} />
                  
                  <label style={{ fontSize: 12, color: txt2, marginRight: 5 }}>تفاصيل الحدث</label>
                  <textarea placeholder="شرح موجز لما حدث..." value={form.text || ""} onChange={e => setForm({...form, text: e.target.value})} style={{...inpStyle, height: 100}} />
                </>
              )}

              <label style={{ fontSize: 12, color: txt2, marginRight: 5 }}>رابط الصورة</label>
              <input placeholder="https://..." value={form.img || ""} onChange={e => setForm({...form, img: e.target.value})} style={inpStyle} />
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: "14px", borderRadius: 12, border: "none", background: "#185FA5", color: "#fff", cursor: "pointer", fontWeight: "bold", fontSize: 15 }}>
                {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
              </button>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: "14px", borderRadius: 12, border: `1px solid ${border}`, background: "none", color: txt, cursor: "pointer" }}>إلغاء</button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {delConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100 }}>
          <div style={{ background: card, padding: 30, borderRadius: 25, width: 350, textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
            <div style={{ fontSize: 50, marginBottom: 15 }}>⚠️</div>
            <h3 style={{ color: txt, marginBottom: 10 }}>هل أنت متأكد من الحذف؟</h3>
            <p style={{ color: txt2, fontSize: 14, lineHeight: 1.5, marginBottom: 25 }}>لا يمكن التراجع عن هذه العملية، سيتم حذف البيانات نهائياً من قاعدة بيانات Firebase.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleDelete} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "none", background: "#e24b4a", color: "#fff", cursor: "pointer", fontWeight: "bold" }}>تأكيد الحذف</button>
              <button onClick={() => setDelConfirm(null)} style={{ flex: 1, padding: "12px", borderRadius: 10, border: `1px solid ${border}`, background: "none", color: txt, cursor: "pointer" }}>تراجع</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#042C53", color: "#fff", direction: "rtl", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 20, animation: "pulse 2s infinite" }}>🏛️</div>
        <div style={{ fontSize: 18 }}>جاري تحميل لوحة التحكم...</div>
      </div>
    </div>
  );

  return (
    <div>
      {user ? (
        <Dashboard dark={dark} firebaseUser={user} />
      ) : (
        <LoginPage dark={dark} />
      )}
      {/* Floating Dark Mode Toggle */}
      <button onClick={() => setDark(!dark)} 
        style={{ position: "fixed", bottom: 25, left: 25, width: 50, height: 50, borderRadius: "50%", border: "none", background: dark ? "#fff" : "#1a1a2e", color: dark ? "#1a1a2e" : "#fff", cursor: "pointer", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(0,0,0,0.3)", zIndex: 2000, transition: "transform 0.2s" }}
        onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
        {dark ? "☀️" : "🌙"}
      </button>
    </div>
  );
}
