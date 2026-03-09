import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { C, MEALS, GOALS_DEFAULT } from "./constants";
import { Icons, Modal } from "./components/UI";
import Dashboard from "./components/Dashboard";
import Diary from "./components/Diary";
import Stats from "./components/Stats";
import Profile from "./components/Profile";
import AdminPanel from "./components/AdminPanel";
import AddFoodModal from "./components/AddFoodModal";

// ── SECRET ADMIN PASSWORD (only you know this!) ──
const ADMIN_PASSWORD = "nutritrack@admin2026";

function useWidth() {
  const [w,setW]=useState(window.innerWidth);
  useEffect(()=>{ const h=()=>setW(window.innerWidth); window.addEventListener("resize",h); return()=>window.removeEventListener("resize",h); },[]);
  return w;
}

function getUserId() {
  let id = localStorage.getItem("nt_uid");
  if(!id){ id="u_"+Math.random().toString(36).slice(2,10); localStorage.setItem("nt_uid",id); }
  return id;
}

// ── Admin Login Modal ──
function AdminLoginModal({ open, onClose, onSuccess }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const tryLogin = () => {
    if(pass === ADMIN_PASSWORD) { onSuccess(); setPass(""); setError(false); onClose(); }
    else { setError(true); setTimeout(()=>setError(false),2000); }
  };

  if(!open) return null;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(26,43,74,0.6)",backdropFilter:"blur(8px)",zIndex:5000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.card,borderRadius:20,width:"100%",maxWidth:380,padding:28,boxShadow:"0 24px 60px rgba(26,43,74,0.25)",border:`1px solid ${C.border}`}}>
        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{width:56,height:56,borderRadius:16,background:C.accentLL,display:"flex",alignItems:"center",justifyContent:"center",color:C.accent,margin:"0 auto 14px"}}>{Icons.admin}</div>
          <div style={{fontSize:20,fontWeight:700,color:C.text}}>Admin Access</div>
          <div style={{fontSize:13,color:C.muted,marginTop:4}}>Enter your admin password</div>
        </div>
        <input
          type="password"
          placeholder="Enter admin password..."
          value={pass}
          onChange={e=>{setPass(e.target.value);setError(false);}}
          onKeyDown={e=>e.key==="Enter"&&tryLogin()}
          autoFocus
          style={{background:C.bg,border:`1.5px solid ${error?"#C53030":C.border}`,borderRadius:10,color:C.text,padding:"12px 14px",fontSize:14,fontFamily:"'Inter',sans-serif",outline:"none",width:"100%",boxSizing:"border-box",marginBottom:8,transition:"border 0.2s"}}
        />
        {error&&<div style={{color:"#C53030",fontSize:12,marginBottom:10,fontWeight:600}}>❌ Wrong password! Try again.</div>}
        <div style={{display:"flex",gap:10,marginTop:12}}>
          <button onClick={onClose} style={{flex:1,background:"transparent",border:`1.5px solid ${C.border}`,color:C.muted,padding:11,borderRadius:10,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:14}}>Cancel</button>
          <button onClick={tryLogin} style={{flex:2,background:`linear-gradient(135deg,#1A2B4A,#2B6CB0)`,border:"none",color:"white",padding:11,borderRadius:10,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:14,boxShadow:"0 4px 14px rgba(26,43,74,0.25)"}}>
            🔐 Unlock Admin
          </button>
        </div>
        <div style={{textAlign:"center",marginTop:14,fontSize:11,color:C.dim}}>Only authorized users can access admin panel</div>
      </div>
    </div>
  );
}

export default function App() {
  const width = useWidth();
  const isMobile = width < 768;
  const sidebarW = width < 1100 ? 210 : 250;

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate]     = useState(today);
  const [logs, setLogs]     = useState(()=>{ try{return JSON.parse(localStorage.getItem("nt_logs")||"{}")}catch{return{}} });
  const [goals, setGoals]   = useState(()=>{ try{return JSON.parse(localStorage.getItem("nt_goals")||JSON.stringify(GOALS_DEFAULT))}catch{return GOALS_DEFAULT} });
  const [prof, setProf]     = useState(()=>{ try{return JSON.parse(localStorage.getItem("nt_prof")||JSON.stringify({name:"User",weight:70,height:170,age:25,gender:"male",activity:"moderate"}))}catch{return{name:"User",weight:70,height:170,age:25,gender:"male",activity:"moderate"}} });
  const [water, setWater]   = useState(()=>{ try{return JSON.parse(localStorage.getItem("nt_water")||"{}")}catch{return{}} });
  const [tab, setTab]       = useState("dashboard");
  const [modal, setModal]   = useState(null);
  const [meal, setMeal]     = useState("Breakfast");
  const [cf, setCf]         = useState({name:"",cal:"",pro:"",carb:"",fat:"",fib:""});
  const [notif, setNotif]   = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  useEffect(()=>{ localStorage.setItem("nt_logs",JSON.stringify(logs)) },[logs]);
  useEffect(()=>{ localStorage.setItem("nt_goals",JSON.stringify(goals)) },[goals]);
  useEffect(()=>{ localStorage.setItem("nt_prof",JSON.stringify(prof)) },[prof]);
  useEffect(()=>{ localStorage.setItem("nt_water",JSON.stringify(water)) },[water]);

  // Track visit in Firebase
  useEffect(()=>{
    const trackVisit = async () => {
      try {
        await addDoc(collection(db,"visits"),{
          userId: getUserId(), date: today, page:"app", timestamp: serverTimestamp(),
        });
      } catch(e){ console.log("Tracking:",e); }
    };
    trackVisit();
  },[]);

  // Secret: click logo 5 times to open admin login
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if(newCount >= 5){ setShowAdminLogin(true); setLogoClickCount(0); }
    setTimeout(()=>setLogoClickCount(0), 3000);
  };

  const toast=(msg,type="ok")=>{ setNotif({msg,type}); setTimeout(()=>setNotif(null),2500); };
  const dl = logs[date]||{Breakfast:[],Lunch:[],Dinner:[],Snacks:[]};
  const dw = water[date]||0;
  const allF = Object.values(dl).flat();
  const tot = allF.reduce((a,f)=>({calories:a.calories+f.cal,protein:a.protein+f.pro,carbs:a.carbs+f.carb,fat:a.fat+f.fat,fiber:a.fiber+f.fib}),{calories:0,protein:0,carbs:0,fat:0,fiber:0});
  const mCal = m=>(dl[m]||[]).reduce((a,f)=>a+f.cal,0);
  const addFood = food=>{ setLogs(p=>({...p,[date]:{...dl,[meal]:[...(dl[meal]||[]),{...food,uid:Date.now()}]}})); toast(`Added to ${meal}!`); };
  const delFood = (m,uid)=>{ setLogs(p=>({...p,[date]:{...dl,[m]:dl[m].filter(f=>f.uid!==uid)}})); toast("Entry removed","err"); };
  const addCustom = ()=>{
    if(!cf.name||!cf.cal) return;
    addFood({id:Date.now(),name:cf.name,cal:+cf.cal,pro:+cf.pro||0,carb:+cf.carb||0,fat:+cf.fat||0,fib:+cf.fib||0,cat:"Custom"});
    setCf({name:"",cal:"",pro:"",carb:"",fat:"",fib:""}); setModal(null);
  };
  const bmr = prof.gender==="male"?10*prof.weight+6.25*prof.height-5*prof.age+5:10*prof.weight+6.25*prof.height-5*prof.age-161;
  const tdee = Math.round(bmr*({sedentary:1.2,light:1.375,moderate:1.55,active:1.725,veryActive:1.9}[prof.activity]||1.55));
  const last7 = Array.from({length:7},(_,i)=>{ const d=new Date(); d.setDate(d.getDate()-(6-i)); const k=d.toISOString().split("T")[0]; return{lbl:d.toLocaleDateString("en",{weekday:"short"}),cal:Object.values(logs[k]||{}).flat().reduce((a,f)=>a+f.cal,0),isToday:i===6}; });

  // Nav items — Admin only shows if isAdmin is true!
  const navItems = [
    {id:"dashboard", icon:Icons.dashboard, label:"Dashboard"},
    {id:"diary",     icon:Icons.diary,     label:"Diary"},
    {id:"stats",     icon:Icons.stats,     label:"Statistics"},
    {id:"profile",   icon:Icons.profile,   label:"Profile"},
    ...(isAdmin ? [{id:"admin", icon:Icons.admin, label:"Admin 🔐"}] : []),
  ];

  const inp = {background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:10,color:C.text,padding:"10px 14px",fontSize:14,fontFamily:"'Inter',sans-serif",outline:"none",width:"100%",boxSizing:"border-box"};

  const page = () => {
    const props = {isMobile,tot,goals,dl,mCal,date,today,prof,setProf,tdee,bmr,water:dw,setWater,setModal,setTab,setMeal,meal,setGoals,last7,delFood,toast};
    if(tab==="dashboard") return <Dashboard {...props}/>;
    if(tab==="diary")     return <Diary {...props}/>;
    if(tab==="stats")     return <Stats {...props}/>;
    if(tab==="profile")   return <Profile {...props}/>;
    if(tab==="admin"&&isAdmin) return <AdminPanel isMobile={isMobile}/>;
    return <Dashboard {...props}/>;
  };

  // ── Logo component (clickable 5x to unlock admin) ──
  const LogoIcon = () => (
    <div onClick={handleLogoClick} style={{width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,#3A7BD5,#2B6CB0)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",flexShrink:0,boxShadow:"0 4px 14px rgba(0,0,0,0.3)",cursor:"pointer",userSelect:"none"}}>
      {Icons.leaf}
    </div>
  );

  return (
    <div style={{width:"100vw",minHeight:"100vh",background:C.bg,fontFamily:"'Inter',sans-serif",color:C.text,overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        html,body,#root{margin:0;padding:0;width:100%;box-sizing:border-box;}
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#EEF4FB;} ::-webkit-scrollbar-thumb{background:#B8CCE0;border-radius:4px;}
        input::placeholder{color:#9BB0C4;}
        input:focus,select:focus{border-color:#2B6CB0!important;box-shadow:0 0 0 3px rgba(43,108,176,0.12)!important;}
        .food-row:hover{background:#EEF4FB!important;}
        .btn-primary{background:linear-gradient(135deg,#1A2B4A,#2B6CB0);border:none;color:#fff;padding:11px 22px;border-radius:11px;font-family:'Inter',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 14px rgba(26,43,74,0.25);}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(26,43,74,0.35);}
        .btn-primary:disabled{opacity:0.45;cursor:not-allowed;transform:none;box-shadow:none;}
        .btn-white{background:white;border:none;color:#1A2B4A;padding:10px 20px;border-radius:10px;font-family:'Inter',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 8px rgba(0,0,0,0.15);}
        .btn-white:hover{transform:translateY(-1px);box-shadow:0 4px 14px rgba(0,0,0,0.2);}
        .btn-ghost{background:transparent;border:1.5px solid #D5E3F0;color:#6B8299;padding:9px 18px;border-radius:10px;font-family:'Inter',sans-serif;font-size:13px;cursor:pointer;transition:all 0.2s;font-weight:600;}
        .btn-ghost:hover{border-color:#2B6CB0;color:#2B6CB0;background:#EBF4FF;}
        .delete-btn{background:transparent;border:none;cursor:pointer;color:#9BB0C4;padding:6px 8px;border-radius:7px;display:flex;align-items:center;transition:all 0.2s;}
        .delete-btn:hover{color:#C53030;background:#FEE8E8;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .page-anim{animation:fadeUp 0.3s ease both;}
        @keyframes slideIn{from{opacity:0;transform:translateX(80px);}to{opacity:1;transform:translateX(0);}}
        .notif-anim{animation:slideIn 0.3s ease both;}
        .cat-chip{padding:6px 14px;border-radius:99px;border:1.5px solid #D5E3F0;background:white;color:#6B8299;cursor:pointer;font-family:'Inter',sans-serif;font-size:12px;font-weight:600;white-space:nowrap;transition:all 0.2s;}
        .cat-chip.active{background:#EBF4FF;border-color:#2B6CB0;color:#1A2B4A;}
        .cat-chip:hover{border-color:#2B6CB0;color:#2B6CB0;}
      `}</style>

      {/* Toast */}
      {notif&&(
        <div className="notif-anim" style={{position:"fixed",top:20,right:20,zIndex:9999,background:notif.type==="err"?C.redL:C.accentLL,border:`1.5px solid ${notif.type==="err"?C.red:C.accent}`,borderRadius:12,padding:"12px 20px",color:notif.type==="err"?C.red:C.accent,fontWeight:700,fontSize:14,boxShadow:"0 8px 24px rgba(26,43,74,0.15)",maxWidth:300}}>
          {notif.type==="err"?"🗑️ ":"✅ "}{notif.msg}
        </div>
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        open={showAdminLogin}
        onClose={()=>setShowAdminLogin(false)}
        onSuccess={()=>{ setIsAdmin(true); setTab("admin"); toast("🔐 Admin access granted!"); }}
      />

      {/* Admin logout button — only visible when admin */}
      {isAdmin&&(
        <button onClick={()=>{setIsAdmin(false);setTab("dashboard");toast("Logged out of admin","err");}}
          style={{position:"fixed",bottom:isMobile?80:20,right:16,zIndex:1000,background:"#C53030",border:"none",color:"white",padding:"8px 16px",borderRadius:99,fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 14px rgba(197,48,48,0.3)",fontFamily:"'Inter',sans-serif"}}>
          🔐 Exit Admin
        </button>
      )}

      {/* DESKTOP */}
      {!isMobile&&(
        <div style={{display:"flex",width:"100%",minHeight:"100vh"}}>
          <aside style={{width:sidebarW,minHeight:"100vh",background:C.sidebar,display:"flex",flexDirection:"column",position:"fixed",left:0,top:0,bottom:0,zIndex:200,flexShrink:0}}>
            {/* Logo — click 5x to unlock admin */}
            <div style={{padding:"24px 18px 20px",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <LogoIcon/>
                <div>
                  <div style={{fontWeight:700,fontSize:17,color:"white"}}>NutriTrack</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.45)"}}>Fuel your goals</div>
                </div>
              </div>
            </div>
            {/* Date */}
            <div style={{padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>Date</div>
              <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:9,color:"white",padding:"8px 10px",fontSize:12,fontFamily:"'Inter',sans-serif",outline:"none",width:"100%",boxSizing:"border-box",colorScheme:"dark"}}/>
            </div>
            {/* Nav */}
            <nav style={{padding:"12px 10px",flex:1}}>
              {navItems.map(n=>(
                <button key={n.id} onClick={()=>setTab(n.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"11px 12px",borderRadius:11,border:"none",background:tab===n.id?"rgba(255,255,255,0.12)":"transparent",color:tab===n.id?"white":"rgba(255,255,255,0.45)",cursor:"pointer",fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:tab===n.id?700:400,marginBottom:3,transition:"all 0.2s",textAlign:"left"}}>
                  {n.icon}{n.label}
                  {tab===n.id&&<div style={{marginLeft:"auto",width:4,height:18,borderRadius:99,background:"#3A7BD5",flexShrink:0}}/>}
                </button>
              ))}
            </nav>
            {/* User */}
            <div style={{padding:"14px 16px",borderTop:"1px solid rgba(255,255,255,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#3A7BD5,#2B6CB0)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:16,color:"white",flexShrink:0}}>{prof.name[0]?.toUpperCase()}</div>
                <div style={{overflow:"hidden"}}>
                  <div style={{fontSize:13,fontWeight:600,color:"white",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{prof.name}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.45)"}}>{tdee} kcal/day</div>
                </div>
              </div>
            </div>
          </aside>
          <main style={{marginLeft:sidebarW,flex:1,minHeight:"100vh",width:`calc(100vw - ${sidebarW}px)`}}>
            <div style={{padding:"28px 32px 48px",maxWidth:1400,margin:"0 auto"}}>
              <div className="page-anim" key={tab}>{page()}</div>
            </div>
          </main>
        </div>
      )}

      {/* MOBILE */}
      {isMobile&&(
        <>
          <header style={{background:C.sidebar,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200,width:"100%",boxShadow:"0 2px 12px rgba(26,43,74,0.2)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div onClick={handleLogoClick} style={{width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#3A7BD5,#2B6CB0)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",cursor:"pointer",userSelect:"none"}}>{Icons.leaf}</div>
              <span style={{fontWeight:700,fontSize:16,color:"white"}}>NutriTrack</span>
            </div>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,color:"white",padding:"6px 10px",fontSize:12,fontFamily:"'Inter',sans-serif",outline:"none",colorScheme:"dark"}}/>
          </header>
          <div style={{padding:"16px 14px 88px",width:"100%"}}>
            <div className="page-anim" key={tab}>{page()}</div>
          </div>
          <nav style={{position:"fixed",bottom:0,left:0,right:0,width:"100%",background:C.sidebar,display:"flex",zIndex:200,boxShadow:"0 -4px 20px rgba(26,43,74,0.2)"}}>
            {navItems.map(n=>(
              <button key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"10px 0 12px",border:"none",background:"transparent",color:tab===n.id?"#3A7BD5":"rgba(255,255,255,0.35)",cursor:"pointer",fontFamily:"'Inter',sans-serif",fontSize:9,fontWeight:tab===n.id?700:400,transition:"all 0.2s"}}>
                {n.icon}{n.label}
              </button>
            ))}
          </nav>
        </>
      )}

      {/* ADD FOOD MODAL */}
      <AddFoodModal open={modal==="add"} onClose={()=>setModal(null)} meal={meal} setMeal={setMeal} addFood={addFood} onCustom={()=>setModal("custom")}/>

      {/* CUSTOM FOOD MODAL */}
      <Modal open={modal==="custom"} onClose={()=>setModal(null)}>
        <div style={{padding:22}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
            <div style={{fontSize:20,fontWeight:700,color:C.text}}>Custom Food</div>
            <button onClick={()=>setModal(null)} style={{background:C.bg,border:`1px solid ${C.border}`,color:C.muted,width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[{l:"Food Name *",k:"name",t:"text",p:"e.g. Homemade Idli"},{l:"Calories *",k:"cal",t:"number",p:"0"},{l:"Protein (g)",k:"pro",t:"number",p:"0"},{l:"Carbs (g)",k:"carb",t:"number",p:"0"},{l:"Fat (g)",k:"fat",t:"number",p:"0"},{l:"Fiber (g)",k:"fib",t:"number",p:"0"}].map(f=>(
              <div key={f.k}>
                <label style={{display:"block",fontSize:11,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>{f.l}</label>
                <input type={f.t} placeholder={f.p} value={cf[f.k]} onChange={e=>setCf(p=>({...p,[f.k]:e.target.value}))} style={{background:"white",border:`1.5px solid ${C.border}`,borderRadius:10,color:C.text,padding:"10px 14px",fontSize:14,fontFamily:"'Inter',sans-serif",outline:"none",width:"100%",boxSizing:"border-box"}}/>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10,marginTop:18}}>
            <button className="btn-ghost" onClick={()=>setModal("add")} style={{flex:1}}>← Back</button>
            <button className="btn-primary" onClick={addCustom} style={{flex:2}} disabled={!cf.name||!cf.cal}>Add Food</button>
          </div>
        </div>
      </Modal>

      {/* GOALS MODAL */}
      <Modal open={modal==="goals"} onClose={()=>setModal(null)}>
        <div style={{padding:22}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
            <div style={{fontSize:20,fontWeight:700,color:C.text}}>Edit Goals</div>
            <button onClick={()=>setModal(null)} style={{background:C.bg,border:`1px solid ${C.border}`,color:C.muted,width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>
          {[{l:"Daily Calories (kcal)",k:"calories"},{l:"Protein (g)",k:"protein"},{l:"Carbohydrates (g)",k:"carbs"},{l:"Fat (g)",k:"fat"},{l:"Fiber (g)",k:"fiber"}].map(g=>(
            <div key={g.k} style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:11,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>{g.l}</label>
              <input type="number" value={goals[g.k]} onChange={e=>setGoals(p=>({...p,[g.k]:+e.target.value}))} style={{background:"white",border:`1.5px solid ${C.border}`,borderRadius:10,color:C.text,padding:"10px 14px",fontSize:14,fontFamily:"'Inter',sans-serif",outline:"none",width:"100%",boxSizing:"border-box"}}/>
            </div>
          ))}
          <button className="btn-primary" style={{width:"100%",marginTop:10}} onClick={()=>{setModal(null);toast("Goals updated!");}}>Save Goals</button>
        </div>
      </Modal>
    </div>
  );
}


{/* PASSWORD: nutritrack@admin2026 */}