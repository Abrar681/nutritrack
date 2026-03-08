import { useState, useEffect } from "react";

const C = {
  bg:"#0A0A0F", card:"#13131A", border:"#1E1E2E",
  accent:"#FF6B35", accentL:"#FF8C5A", green:"#2ECC71",
  blue:"#3498DB", purple:"#9B59B6", yellow:"#F1C40F",
  text:"#F0F0F5", muted:"#8888AA", dim:"#555570",
  sidebar:"#0D0D14",
};

const FOODS = [
  // ── Global ──
  {id:1,  name:"Chicken Breast (100g)",    cal:165, pro:31,  carb:0,    fat:3.6,  fib:0,    cat:"Protein"},
  {id:2,  name:"Brown Rice (100g cooked)", cal:112, pro:2.6, carb:23.5, fat:0.9,  fib:1.8,  cat:"Grains"},
  {id:3,  name:"Whole Egg",               cal:78,  pro:6,   carb:0.6,  fat:5.3,  fib:0,    cat:"Protein"},
  {id:4,  name:"Banana (medium)",         cal:105, pro:1.3, carb:27,   fat:0.4,  fib:3.1,  cat:"Fruit"},
  {id:5,  name:"Almonds (28g)",           cal:164, pro:6,   carb:6,    fat:14,   fib:3.5,  cat:"Nuts"},
  {id:6,  name:"Greek Yogurt (170g)",     cal:100, pro:17,  carb:6,    fat:0.7,  fib:0,    cat:"Dairy"},
  {id:7,  name:"Oats (100g dry)",         cal:389, pro:17,  carb:66,   fat:7,    fib:10.6, cat:"Grains"},
  {id:8,  name:"Salmon (100g)",           cal:208, pro:20,  carb:0,    fat:13,   fib:0,    cat:"Protein"},
  {id:9,  name:"Avocado (half)",          cal:120, pro:1.5, carb:6.4,  fat:11,   fib:5,    cat:"Fruit"},
  {id:10, name:"Sweet Potato (medium)",   cal:103, pro:2.3, carb:24,   fat:0.1,  fib:3.8,  cat:"Vegetable"},
  {id:11, name:"Broccoli (100g)",         cal:34,  pro:2.8, carb:7,    fat:0.4,  fib:2.6,  cat:"Vegetable"},
  {id:12, name:"Milk Whole (240ml)",      cal:149, pro:8,   carb:12,   fat:8,    fib:0,    cat:"Dairy"},
  {id:13, name:"White Bread (slice)",     cal:79,  pro:2.7, carb:15,   fat:1,    fib:0.6,  cat:"Grains"},
  {id:14, name:"Apple (medium)",          cal:95,  pro:0.5, carb:25,   fat:0.3,  fib:4.4,  cat:"Fruit"},
  {id:15, name:"Peanut Butter (2 tbsp)",  cal:188, pro:8,   carb:6,    fat:16,   fib:1.9,  cat:"Nuts"},
  {id:16, name:"Tuna Can (140g)",         cal:179, pro:39,  carb:0,    fat:1,    fib:0,    cat:"Protein"},
  {id:17, name:"Orange (medium)",         cal:62,  pro:1.2, carb:15,   fat:0.2,  fib:3.1,  cat:"Fruit"},
  {id:18, name:"Cottage Cheese (100g)",   cal:98,  pro:11,  carb:3.4,  fat:4.3,  fib:0,    cat:"Dairy"},
  {id:19, name:"Lentils / Dal (100g)",    cal:116, pro:9,   carb:20,   fat:0.4,  fib:7.9,  cat:"Legumes"},
  {id:20, name:"Olive Oil (1 tbsp)",      cal:119, pro:0,   carb:0,    fat:13.5, fib:0,    cat:"Fats"},
  // ── Indian Foods ──
  {id:21, name:"Dosa (1 plain)",          cal:133, pro:3,   carb:25,   fat:3,    fib:1,    cat:"Indian"},
  {id:22, name:"Idli (1 piece)",          cal:39,  pro:2,   carb:8,    fat:0.2,  fib:0.5,  cat:"Indian"},
  {id:23, name:"Sambar (100ml)",          cal:50,  pro:2.5, carb:8,    fat:1,    fib:2,    cat:"Indian"},
  {id:24, name:"Chapati / Roti (1)",      cal:104, pro:3.1, carb:18,   fat:2.5,  fib:1.9,  cat:"Indian"},
  {id:25, name:"Paratha (1 plain)",       cal:200, pro:4,   carb:28,   fat:8,    fib:2,    cat:"Indian"},
  {id:26, name:"Aloo Sabzi (100g)",       cal:110, pro:2,   carb:18,   fat:3.5,  fib:2,    cat:"Indian"},
  {id:27, name:"Dal Tadka (100g)",        cal:120, pro:6,   carb:16,   fat:3.5,  fib:4,    cat:"Indian"},
  {id:28, name:"Paneer (100g)",           cal:265, pro:18,  carb:3.4,  fat:20,   fib:0,    cat:"Indian"},
  {id:29, name:"Palak Paneer (100g)",     cal:150, pro:8,   carb:6,    fat:11,   fib:2,    cat:"Indian"},
  {id:30, name:"Biryani Chicken (200g)",  cal:290, pro:18,  carb:32,   fat:9,    fib:1.5,  cat:"Indian"},
  {id:31, name:"Masala Dosa (1)",         cal:230, pro:5,   carb:40,   fat:6,    fib:2,    cat:"Indian"},
  {id:32, name:"Upma (100g)",             cal:130, pro:3,   carb:22,   fat:4,    fib:2,    cat:"Indian"},
  {id:33, name:"Poha (100g)",             cal:180, pro:3,   carb:36,   fat:3,    fib:2,    cat:"Indian"},
  {id:34, name:"Rajma (100g cooked)",     cal:127, pro:8.7, carb:22,   fat:0.5,  fib:6.4,  cat:"Indian"},
  {id:35, name:"Curd / Dahi (100g)",      cal:61,  pro:3.5, carb:4.7,  fat:3.3,  fib:0,    cat:"Indian"},
  {id:36, name:"Vada (1 piece)",          cal:97,  pro:2.5, carb:10,   fat:5.5,  fib:1,    cat:"Indian"},
  {id:37, name:"Rava Idli (1)",           cal:65,  pro:2,   carb:11,   fat:1.5,  fib:0.5,  cat:"Indian"},
  {id:38, name:"Butter Naan (1)",         cal:300, pro:9,   carb:54,   fat:5,    fib:2,    cat:"Indian"},
  {id:39, name:"Mango Lassi (250ml)",     cal:180, pro:4,   carb:35,   fat:2,    fib:0.5,  cat:"Indian"},
  {id:40, name:"Chana Masala (100g)",     cal:160, pro:8,   carb:22,   fat:4.5,  fib:6,    cat:"Indian"},
  {id:41, name:"Uttapam (1 plain)",       cal:170, pro:5,   carb:28,   fat:4,    fib:2,    cat:"Indian"},
  {id:42, name:"Dhokla (2 pieces)",       cal:150, pro:5,   carb:26,   fat:3,    fib:1.5,  cat:"Indian"},
  {id:43, name:"Khichdi (100g)",          cal:124, pro:4.5, carb:22,   fat:2,    fib:2.5,  cat:"Indian"},
  {id:44, name:"Aloo Paratha (1)",        cal:280, pro:5,   carb:40,   fat:10,   fib:3,    cat:"Indian"},
  {id:45, name:"Rasam (100ml)",           cal:25,  pro:1,   carb:4,    fat:0.5,  fib:1,    cat:"Indian"},
];

const MEALS = ["Breakfast","Lunch","Dinner","Snacks"];
const G0 = {calories:2000,protein:150,carbs:250,fat:65,fiber:30};
const CAT_COLORS = {
  Protein:"#FF6B35", Grains:"#3498DB", Fruit:"#2ECC71", Vegetable:"#27AE60",
  Dairy:"#9B59B6", Nuts:"#F1C40F", Legumes:"#E67E22", Fats:"#F39C12",
  Indian:"#E74C3C", Custom:"#8888AA",
};

function useWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function Ring({ value, max, size=120, sw=10, color, label }) {
  const r=(size-sw)/2, circ=2*Math.PI*r;
  const off = circ - Math.min(value/max,1)*circ;
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
      <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={sw}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
          style={{transition:"stroke-dashoffset 0.7s ease"}}/>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
          style={{transform:"rotate(90deg)",transformOrigin:"50% 50%",fill:C.text,fontSize:size*0.17,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>
          {Math.round(value)}
        </text>
        <text x="50%" y="66%" textAnchor="middle" dominantBaseline="middle"
          style={{transform:"rotate(90deg)",transformOrigin:"50% 50%",fill:C.muted,fontSize:size*0.1,fontFamily:"'DM Sans',sans-serif"}}>
          /{max}
        </text>
      </svg>
      <span style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</span>
    </div>
  );
}

function BarRow({ label, value, max, color }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:5}}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <span style={{color:C.muted,fontSize:13}}>{label}</span>
        <span style={{color:C.text,fontSize:13,fontWeight:600}}>{Math.round(value)}g <span style={{color:C.dim}}>/ {max}g</span></span>
      </div>
      <div style={{height:6,borderRadius:99,background:C.border}}>
        <div style={{height:"100%",width:`${Math.min((value/max)*100,100)}%`,background:color,borderRadius:99,transition:"width 0.6s ease"}}/>
      </div>
    </div>
  );
}

function Badge({ children, color }) {
  return <span style={{padding:"2px 8px",borderRadius:99,background:color+"25",color,fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>{children}</span>;
}

function Modal({ open, onClose, children }) {
  if(!open) return null;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",backdropFilter:"blur(8px)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:22,width:"100%",maxWidth:540,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 40px 100px rgba(0,0,0,0.8)"}}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const width = useWidth();
  const isMobile = width < 768;
  const sidebarW = width < 1100 ? 200 : 240;

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate]     = useState(today);
  const [logs, setLogs]     = useState(()=>{ try{return JSON.parse(localStorage.getItem("nt_logs")||"{}")}catch{return{}} });
  const [goals, setGoals]   = useState(()=>{ try{return JSON.parse(localStorage.getItem("nt_goals")||JSON.stringify(G0))}catch{return G0} });
  const [prof, setProf]     = useState(()=>{ try{return JSON.parse(localStorage.getItem("nt_prof")||JSON.stringify({name:"User",weight:70,height:170,age:25,gender:"male",activity:"moderate"}))}catch{return{name:"User",weight:70,height:170,age:25,gender:"male",activity:"moderate"}} });
  const [water, setWater]   = useState(()=>{ try{return JSON.parse(localStorage.getItem("nt_water")||"{}")}catch{return{}} });
  const [tab, setTab]       = useState("dashboard");
  const [modal, setModal]   = useState(null);
  const [meal, setMeal]     = useState("Breakfast");
  const [search, setSearch] = useState("");
  const [cf, setCf]         = useState({name:"",cal:"",pro:"",carb:"",fat:"",fib:""});
  const [notif, setNotif]   = useState(null);
  const [catFilter, setCatFilter] = useState("All");

  useEffect(()=>{ localStorage.setItem("nt_logs",JSON.stringify(logs)) },[logs]);
  useEffect(()=>{ localStorage.setItem("nt_goals",JSON.stringify(goals)) },[goals]);
  useEffect(()=>{ localStorage.setItem("nt_prof",JSON.stringify(prof)) },[prof]);
  useEffect(()=>{ localStorage.setItem("nt_water",JSON.stringify(water)) },[water]);

  const toast = (msg,type="ok") => { setNotif({msg,type}); setTimeout(()=>setNotif(null),2500); };

  const dl = logs[date]||{Breakfast:[],Lunch:[],Dinner:[],Snacks:[]};
  const dw = water[date]||0;
  const allF = Object.values(dl).flat();
  const tot = allF.reduce((a,f)=>({calories:a.calories+f.cal,protein:a.protein+f.pro,carbs:a.carbs+f.carb,fat:a.fat+f.fat,fiber:a.fiber+f.fib}),{calories:0,protein:0,carbs:0,fat:0,fiber:0});
  const rem = goals.calories - tot.calories;
  const mCal = m=>(dl[m]||[]).reduce((a,f)=>a+f.cal,0);

  const addFood = food => {
    const item = {...food, uid:Date.now()};
    setLogs(p=>({...p,[date]:{...dl,[meal]:[...(dl[meal]||[]),item]}}));
    toast(`✅ ${food.name} → ${meal}`);
    setModal(null); setSearch(""); setCatFilter("All");
  };
  const delFood = (m,uid) => { setLogs(p=>({...p,[date]:{...dl,[m]:dl[m].filter(f=>f.uid!==uid)}})); toast("Removed","err"); };
  const addCustom = () => {
    if(!cf.name||!cf.cal) return;
    addFood({id:Date.now(),name:cf.name,cal:+cf.cal,pro:+cf.pro||0,carb:+cf.carb||0,fat:+cf.fat||0,fib:+cf.fib||0,cat:"Custom"});
    setCf({name:"",cal:"",pro:"",carb:"",fat:"",fib:""});
  };

  const bmr = prof.gender==="male" ? 10*prof.weight+6.25*prof.height-5*prof.age+5 : 10*prof.weight+6.25*prof.height-5*prof.age-161;
  const tdee = Math.round(bmr*({sedentary:1.2,light:1.375,moderate:1.55,active:1.725,veryActive:1.9}[prof.activity]||1.55));

  const last7 = Array.from({length:7},(_,i)=>{ const d=new Date(); d.setDate(d.getDate()-(6-i)); const k=d.toISOString().split("T")[0]; return {lbl:d.toLocaleDateString("en",{weekday:"short"}),cal:Object.values(logs[k]||{}).flat().reduce((a,f)=>a+f.cal,0),isToday:i===6}; });

  const cats = ["All","Indian","Protein","Grains","Fruit","Vegetable","Dairy","Nuts","Legumes","Fats"];
  const filtered = FOODS.filter(f=>{
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.cat.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter==="All" || f.cat===catFilter;
    return matchSearch && matchCat;
  });

  // ── STYLES ──
  const inp = {background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,color:C.text,padding:"10px 14px",fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",width:"100%",boxSizing:"border-box"};
  const card = (extra={}) => ({background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:isMobile?16:22,...extra});

  // ── NAV ──
  const navItems = [{id:"dashboard",icon:"📊",label:"Dashboard"},{id:"diary",icon:"📋",label:"Diary"},{id:"stats",icon:"📈",label:"Stats"},{id:"profile",icon:"👤",label:"Profile"}];

  // ════════════════════════════════
  // PAGES
  // ════════════════════════════════
  const Dashboard = () => (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      {/* Stat Row */}
      <div style={{display:"grid",gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`,gap:14}}>
        {[
          {icon:"🔥",label:"Consumed",val:Math.round(tot.calories),unit:"kcal",color:C.accent},
          {icon:"⚡",label:"Remaining",val:Math.max(0,Math.round(rem)),unit:"kcal",color:rem<0?"#e74c3c":C.green},
          {icon:"🎯",label:"Goal",val:goals.calories,unit:"kcal",color:C.blue},
          {icon:"💧",label:"Water",val:dw,unit:"/ 8 glasses",color:C.blue},
        ].map(s=>(
          <div key={s.label} style={card({padding:isMobile?14:20})}>
            <div style={{fontSize:24,marginBottom:8}}>{s.icon}</div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:isMobile?20:26,fontWeight:700,color:s.color}}>{s.val}</div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>{s.unit}</div>
            <div style={{fontSize:11,color:C.dim,marginTop:1}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Calorie Ring + Macros */}
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1.4fr",gap:16}}>
        <div style={card({display:"flex",flexDirection:"column",alignItems:"center",gap:16})}>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,alignSelf:"flex-start"}}>Calorie Goal</div>
          <Ring value={tot.calories} max={goals.calories} size={180} sw={16} color={tot.calories>goals.calories?"#e74c3c":C.accent} label="Calories"/>
          {rem<0&&<div style={{background:"rgba(231,76,60,0.1)",border:"1px solid #e74c3c55",borderRadius:10,padding:"8px 14px",fontSize:12,color:"#e74c3c",textAlign:"center",width:"100%"}}>⚠️ Over goal by {Math.abs(Math.round(rem))} kcal</div>}
          <button className="btn-primary" onClick={()=>setModal("add")} style={{width:"100%",fontSize:15,padding:"13px"}}>+ Add Food</button>
        </div>
        <div style={card()}>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,marginBottom:18}}>Macronutrients</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:22}}>
            <Ring value={tot.protein} max={goals.protein} size={72} sw={6} color="#FF6B35" label="Protein"/>
            <Ring value={tot.carbs} max={goals.carbs} size={72} sw={6} color={C.blue} label="Carbs"/>
            <Ring value={tot.fat} max={goals.fat} size={72} sw={6} color={C.yellow} label="Fat"/>
            <Ring value={tot.fiber} max={goals.fiber} size={72} sw={6} color={C.green} label="Fiber"/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <BarRow label="Protein" value={tot.protein} max={goals.protein} color="#FF6B35"/>
            <BarRow label="Carbohydrates" value={tot.carbs} max={goals.carbs} color={C.blue}/>
            <BarRow label="Fat" value={tot.fat} max={goals.fat} color={C.yellow}/>
            <BarRow label="Fiber" value={tot.fiber} max={goals.fiber} color={C.green}/>
          </div>
        </div>
      </div>

      {/* Meals */}
      <div style={card()}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,marginBottom:16}}>Meal Breakdown</div>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`,gap:14}}>
          {MEALS.map((m,i)=>{
            const cal=mCal(m),icons=["☀️","🌤️","🌙","🍎"];
            return (
              <div key={m} onClick={()=>{setTab("diary");setMeal(m);}} style={{background:C.bg,borderRadius:14,padding:16,cursor:"pointer",border:`1px solid ${C.border}`,transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.background="#13131A";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.bg;}}>
                <div style={{fontSize:26,marginBottom:10}}>{icons[i]}</div>
                <div style={{fontWeight:600,fontSize:14,marginBottom:4}}>{m}</div>
                <div style={{color:C.accent,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif",fontSize:20}}>{cal}<span style={{fontSize:11,color:C.muted,fontWeight:400}}> kcal</span></div>
                <div style={{fontSize:11,color:C.dim,marginTop:4}}>{(dl[m]||[]).length} items</div>
                <div style={{height:3,borderRadius:99,background:C.border,marginTop:10}}>
                  <div style={{height:"100%",width:`${Math.min((cal/goals.calories)*100,100)}%`,background:C.accent,borderRadius:99}}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Water + TDEE */}
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:16}}>
        <div style={card()}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:16}}>💧 Water Tracker</div>
            <div style={{color:C.blue,fontWeight:700,fontSize:16}}>{dw}<span style={{fontSize:12,color:C.muted,fontWeight:400}}>/8 glasses</span></div>
          </div>
          <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14,flexWrap:"wrap"}}>
            {Array.from({length:8},(_,i)=>(
              <div key={i} onClick={()=>setWater(p=>({...p,[date]:i<dw?i:i+1}))} style={{width:40,height:54,borderRadius:10,background:i<dw?"linear-gradient(180deg,#5DADE2,#2980B9)":C.border,transition:"all 0.3s",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:i<dw?"0 4px 12px rgba(41,128,185,0.3)":"none"}}>
                {i<dw?"💧":""}
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setWater(p=>({...p,[date]:Math.max(0,dw-1)}))} style={{flex:1,background:"rgba(52,152,219,0.12)",border:"1px solid rgba(52,152,219,0.3)",color:C.blue,padding:11,borderRadius:10,cursor:"pointer",fontSize:20,fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}}>−</button>
            <button onClick={()=>setWater(p=>({...p,[date]:Math.min(8,dw+1)}))} style={{flex:1,background:"rgba(52,152,219,0.12)",border:"1px solid rgba(52,152,219,0.3)",color:C.blue,padding:11,borderRadius:10,cursor:"pointer",fontSize:20,fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}}>+</button>
          </div>
        </div>
        <div style={card({background:"linear-gradient(135deg,#1A1025,#0D1020)",display:"flex",flexDirection:"column",justifyContent:"center",gap:10})}>
          <div style={{fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em"}}>Daily Burn (TDEE)</div>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:42,fontWeight:700,color:C.purple,lineHeight:1}}>{tdee}<span style={{fontSize:14,color:C.muted,fontWeight:400}}> kcal</span></div>
          <div style={{fontSize:13,color:C.muted}}>Net: <span style={{color:tot.calories-tdee>0?"#e74c3c":C.green,fontWeight:600}}>{tot.calories-tdee>0?"+":""}{tot.calories-tdee} kcal</span></div>
          <div style={{fontSize:12,color:C.dim}}>BMR: {Math.round(bmr)} kcal · {prof.activity} lifestyle</div>
        </div>
      </div>
    </div>
  );

  const Diary = () => (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700}}>Food Diary</div>
        <button className="btn-primary" onClick={()=>setModal("add")}>+ Add Food</button>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {MEALS.map(m=>(
          <button key={m} onClick={()=>setMeal(m)} style={{flex:isMobile?"1 0 40%":"none",padding:"9px 20px",borderRadius:10,border:`1px solid ${meal===m?C.accent:C.border}`,background:meal===m?"rgba(255,107,53,0.1)":"transparent",color:meal===m?C.accent:C.muted,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:meal===m?700:400,transition:"all 0.2s"}}>{m}</button>
        ))}
      </div>
      <div style={card()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{fontWeight:700,fontSize:17}}>{meal}</div>
          <div style={{color:C.accent,fontWeight:700,fontSize:16}}>{mCal(meal)} kcal</div>
        </div>
        {(dl[meal]||[]).length===0 ? (
          <div style={{textAlign:"center",padding:"50px 20px",color:C.dim}}>
            <div style={{fontSize:48,marginBottom:12}}>🍽️</div>
            <div style={{fontSize:15,marginBottom:16}}>Nothing logged for {meal} yet</div>
            <button className="btn-primary" onClick={()=>setModal("add")}>Add Food</button>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:2}}>
            {!isMobile&&<div style={{display:"grid",gridTemplateColumns:"1fr 70px 62px 62px 62px 40px",gap:8,padding:"6px 10px",color:C.dim,fontSize:11,textTransform:"uppercase",letterSpacing:"0.05em",borderBottom:`1px solid ${C.border}`,marginBottom:4}}>
              <span>Food</span><span style={{textAlign:"center"}}>Cal</span><span style={{textAlign:"center"}}>Pro</span><span style={{textAlign:"center"}}>Carb</span><span style={{textAlign:"center"}}>Fat</span><span/>
            </div>}
            {(dl[meal]||[]).map(food=>(
              <div key={food.uid} className="food-row" style={{display:"grid",gridTemplateColumns:isMobile?"1fr auto":"1fr 70px 62px 62px 62px 40px",gap:8,padding:"12px 10px",borderRadius:12,alignItems:"center",transition:"all 0.2s"}}>
                <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <Badge color={CAT_COLORS[food.cat]||C.muted}>{food.cat}</Badge>
                    <span style={{fontSize:13,fontWeight:500}}>{food.name}</span>
                  </div>
                  {isMobile&&<div style={{fontSize:11,color:C.muted}}>P:{food.pro}g · C:{food.carb}g · F:{food.fat}g</div>}
                </div>
                {isMobile?(
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{color:C.accent,fontWeight:700,fontSize:16}}>{food.cal}</span>
                    <button className="delete-btn" onClick={()=>delFood(meal,food.uid)}>✕</button>
                  </div>
                ):(
                  <>
                    <span style={{textAlign:"center",fontSize:13,fontWeight:600,color:C.accent}}>{food.cal}</span>
                    <span style={{textAlign:"center",fontSize:13,color:"#FF6B35"}}>{food.pro}g</span>
                    <span style={{textAlign:"center",fontSize:13,color:C.blue}}>{food.carb}g</span>
                    <span style={{textAlign:"center",fontSize:13,color:C.yellow}}>{food.fat}g</span>
                    <button className="delete-btn" onClick={()=>delFood(meal,food.uid)}>✕</button>
                  </>
                )}
              </div>
            ))}
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr auto":"1fr 70px 62px 62px 62px 40px",gap:8,padding:"12px 10px",borderTop:`1px solid ${C.border}`,marginTop:8}}>
              <span style={{fontWeight:700,fontSize:13}}>Total</span>
              <span style={{textAlign:"center",fontSize:14,fontWeight:700,color:C.accent}}>{mCal(meal)}</span>
              {!isMobile&&<>
                <span style={{textAlign:"center",fontSize:13,fontWeight:700,color:"#FF6B35"}}>{Math.round((dl[meal]||[]).reduce((a,f)=>a+f.pro,0))}g</span>
                <span style={{textAlign:"center",fontSize:13,fontWeight:700,color:C.blue}}>{Math.round((dl[meal]||[]).reduce((a,f)=>a+f.carb,0))}g</span>
                <span style={{textAlign:"center",fontSize:13,fontWeight:700,color:C.yellow}}>{Math.round((dl[meal]||[]).reduce((a,f)=>a+f.fat,0))}g</span>
                <span/>
              </>}
            </div>
          </div>
        )}
      </div>
      {/* Day total bar */}
      <div style={card({display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,textAlign:"center"})}>
        {[{l:"Calories",v:Math.round(tot.calories),u:"kcal",c:C.accent},{l:"Protein",v:Math.round(tot.protein),u:"g",c:"#FF6B35"},{l:"Carbs",v:Math.round(tot.carbs),u:"g",c:C.blue},{l:"Fat",v:Math.round(tot.fat),u:"g",c:C.yellow},{l:"Fiber",v:Math.round(tot.fiber),u:"g",c:C.green}].map(s=>(
          <div key={s.l}>
            <div style={{fontSize:10,color:C.muted,marginBottom:4}}>{s.l}</div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:isMobile?14:18,fontWeight:700,color:s.c}}>{s.v}<span style={{fontSize:9,color:C.muted,fontWeight:400}}>{s.u}</span></div>
          </div>
        ))}
      </div>
    </div>
  );

  const Stats = () => {
    const ad=last7.filter(d=>d.cal>0);
    const avg=ad.length>0?Math.round(ad.reduce((a,d)=>a+d.cal,0)/ad.length):0;
    const streak=(()=>{let s=0;for(let i=6;i>=0;i--){if(last7[i].cal>0)s++;else break;}return s;})();
    const maxC=Math.max(...last7.map(d=>d.cal),goals.calories,1);
    return (
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700}}>Weekly Statistics</div>
        <div style={card()}>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,marginBottom:22}}>7-Day Calorie History</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:isMobile?6:16,height:160}}>
            {last7.map((d,i)=>{
              const h=d.cal>0?Math.max((d.cal/maxC)*140,8):8;
              return (
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                  {d.cal>0&&<div style={{fontSize:9,color:C.dim}}>{d.cal}</div>}
                  <div style={{width:"100%",height:h,background:d.isToday?"linear-gradient(180deg,#FF8C5A,#FF6B35)":(d.cal>goals.calories?"rgba(231,76,60,0.6)":"rgba(52,152,219,0.35)"),borderRadius:"7px 7px 3px 3px",transition:"all 0.5s",border:d.isToday?`1px solid ${C.accent}`:"none"}}/>
                  <div style={{fontSize:10,color:d.isToday?C.accent:C.dim,fontWeight:d.isToday?700:400}}>{d.lbl}</div>
                </div>
              );
            })}
          </div>
          <div style={{display:"flex",gap:16,marginTop:14,justifyContent:"flex-end",flexWrap:"wrap"}}>
            {[{c:"linear-gradient(#FF8C5A,#FF6B35)",l:"Today"},{c:"rgba(52,152,219,0.35)",l:"Past"},{c:"rgba(231,76,60,0.6)",l:"Over goal"}].map(x=>(
              <div key={x.l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:C.muted}}>
                <div style={{width:10,height:10,borderRadius:2,background:x.c}}/>{x.l}
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {[{icon:"🔥",l:"Avg Calories",v:avg,u:"kcal",c:C.accent},{icon:"📅",l:"Days Logged",v:ad.length,u:"/ 7 days",c:C.green},{icon:"⚡",l:"Streak",v:streak,u:"days",c:C.purple}].map(s=>(
            <div key={s.l} style={card({textAlign:"center",padding:isMobile?14:22})}>
              <div style={{fontSize:28,marginBottom:10}}>{s.icon}</div>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:isMobile?22:30,fontWeight:700,color:s.c}}>{s.v}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:3}}>{s.u}</div>
              <div style={{fontSize:11,color:C.dim,marginTop:4}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={card()}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17}}>Nutrition Goals</div>
            <button className="btn-ghost" onClick={()=>setModal("goals")}>Edit Goals</button>
          </div>
          {[{l:"Calories",v:goals.calories,u:"kcal",c:C.accent},{l:"Protein",v:goals.protein,u:"g",c:"#FF6B35"},{l:"Carbs",v:goals.carbs,u:"g",c:C.blue},{l:"Fat",v:goals.fat,u:"g",c:C.yellow},{l:"Fiber",v:goals.fiber,u:"g",c:C.green}].map(g=>(
            <div key={g.l} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${C.border}`}}>
              <span style={{color:C.muted,fontSize:14}}>{g.l}</span>
              <span style={{color:g.c,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif"}}>{g.v} {g.u}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Profile = () => (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700}}>Profile & Settings</div>
      <div style={card({textAlign:"center",paddingTop:36,paddingBottom:36})}>
        <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,#FF6B35,#9B59B6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 14px"}}>{prof.name[0]?.toUpperCase()||"U"}</div>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700}}>{prof.name}</div>
        <div style={{color:C.muted,fontSize:13,marginTop:5}}>{prof.gender==="male"?"♂":"♀"} · {prof.age} yrs · {prof.weight} kg · {prof.height} cm</div>
        <div style={{color:C.purple,fontWeight:700,marginTop:10,fontSize:18}}>TDEE: {tdee} kcal/day</div>
        <div style={{color:C.dim,fontSize:12,marginTop:4}}>BMR: {Math.round(bmr)} kcal</div>
      </div>
      <div style={card()}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,marginBottom:18}}>Personal Info</div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[{l:"Name",k:"name",t:"text"},{l:"Age",k:"age",t:"number"},{l:"Weight (kg)",k:"weight",t:"number"},{l:"Height (cm)",k:"height",t:"number"}].map(f=>(
            <div key={f.k}>
              <label style={{display:"block",fontSize:11,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.06em"}}>{f.l}</label>
              <input type={f.t} value={prof[f.k]} onChange={e=>setProf(p=>({...p,[f.k]:f.t==="number"?+e.target.value:e.target.value}))} style={inp}/>
            </div>
          ))}
          <div>
            <label style={{display:"block",fontSize:11,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>Gender</label>
            <div style={{display:"flex",gap:10}}>
              {["male","female"].map(g=><button key={g} onClick={()=>setProf(p=>({...p,gender:g}))} style={{flex:1,padding:12,borderRadius:10,border:`1px solid ${prof.gender===g?C.accent:C.border}`,background:prof.gender===g?"rgba(255,107,53,0.1)":"transparent",color:prof.gender===g?C.accent:C.muted,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,textTransform:"capitalize",transition:"all 0.2s"}}>{g}</button>)}
            </div>
          </div>
          <div>
            <label style={{display:"block",fontSize:11,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>Activity Level</label>
            <select value={prof.activity} onChange={e=>setProf(p=>({...p,activity:e.target.value}))} style={{...inp,cursor:"pointer"}}>
              <option value="sedentary">Sedentary (no exercise)</option>
              <option value="light">Lightly Active (1–3x/week)</option>
              <option value="moderate">Moderately Active (3–5x/week)</option>
              <option value="active">Very Active (6–7x/week)</option>
              <option value="veryActive">Extra Active (athlete)</option>
            </select>
          </div>
        </div>
        <button className="btn-primary" style={{width:"100%",marginTop:18}} onClick={()=>toast("Profile saved!")}>Save Profile</button>
      </div>
      <div style={card()}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,marginBottom:16}}>Daily Nutrition Goals</div>
        {[{l:"Calories (kcal)",k:"calories"},{l:"Protein (g)",k:"protein"},{l:"Carbs (g)",k:"carbs"},{l:"Fat (g)",k:"fat"},{l:"Fiber (g)",k:"fiber"}].map(g=>(
          <div key={g.k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,marginBottom:14}}>
            <label style={{fontSize:14,color:C.muted,minWidth:140}}>{g.l}</label>
            <input type="number" value={goals[g.k]} onChange={e=>setGoals(p=>({...p,[g.k]:+e.target.value}))} style={{...inp,width:110,textAlign:"center"}}/>
          </div>
        ))}
        <div style={{display:"flex",gap:10,marginTop:8}}>
          <button className="btn-primary" style={{flex:1}} onClick={()=>toast("Goals saved!")}>Save Goals</button>
          <button className="btn-ghost" onClick={()=>{setGoals({calories:tdee,protein:Math.round(prof.weight*1.6),carbs:Math.round((tdee*0.45)/4),fat:Math.round((tdee*0.3)/9),fiber:30});toast("Goals auto-calculated!");}}>Auto-Calc</button>
        </div>
      </div>
    </div>
  );

  const page = () => { if(tab==="dashboard") return <Dashboard/>; if(tab==="diary") return <Diary/>; if(tab==="stats") return <Stats/>; return <Profile/>; };

  // ════════════════════════════════
  // RENDER
  // ════════════════════════════════
  return (
    <div style={{width:"100vw",minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:C.text,overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');
        html,body,#root{margin:0;padding:0;width:100%;height:100%;box-sizing:border-box;}
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#252535;border-radius:4px;}
        input::placeholder{color:#555570;} input:focus,select:focus{border-color:#FF6B35!important;box-shadow:0 0 0 3px rgba(255,107,53,0.12)!important;}
        .food-row:hover{background:rgba(255,107,53,0.06)!important;}
        .btn-primary{background:linear-gradient(135deg,#FF6B35,#FF8C5A);border:none;color:#fff;padding:12px 24px;border-radius:12px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all 0.2s;}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(255,107,53,0.4);}
        .btn-primary:disabled{opacity:0.45;cursor:not-allowed;transform:none;box-shadow:none;}
        .btn-ghost{background:transparent;border:1px solid #1E1E2E;color:#8888AA;padding:9px 18px;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;transition:all 0.2s;}
        .btn-ghost:hover{border-color:#FF6B35;color:#FF6B35;}
        .delete-btn{background:transparent;border:none;cursor:pointer;color:#555570;padding:5px 9px;border-radius:7px;font-size:16px;transition:all 0.2s;}
        .delete-btn:hover{color:#e74c3c;background:rgba(231,76,60,0.12);}
        .nav-btn-desktop{width:100%;display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;margin-bottom:4px;transition:all 0.2s;text-align:left;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        .page-anim{animation:fadeUp 0.3s ease both;}
        @keyframes slideIn{from{opacity:0;transform:translateX(80px);}to{opacity:1;transform:translateX(0);}}
        .notif-anim{animation:slideIn 0.3s ease both;}
        .cat-chip{padding:6px 14px;border-radius:99px;border:1px solid #1E1E2E;background:transparent;color:#8888AA;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;white-space:nowrap;transition:all 0.2s;}
        .cat-chip.active{background:rgba(255,107,53,0.15);border-color:#FF6B35;color:#FF6B35;font-weight:700;}
        .cat-chip:hover{border-color:#FF6B35;color:#FF6B35;}
      `}</style>

      {/* Toast */}
      {notif&&(
        <div className="notif-anim" style={{position:"fixed",top:20,right:20,zIndex:9999,background:notif.type==="err"?"rgba(231,76,60,0.15)":"rgba(46,204,113,0.15)",border:`1px solid ${notif.type==="err"?"#e74c3c":"#2ECC71"}`,borderRadius:14,padding:"13px 22px",color:notif.type==="err"?"#e74c3c":"#2ECC71",fontWeight:600,fontSize:14,backdropFilter:"blur(12px)",maxWidth:320}}>
          {notif.msg}
        </div>
      )}

      {/* ── DESKTOP ── */}
      {!isMobile&&(
        <div style={{display:"flex",width:"100%",minHeight:"100vh"}}>
          {/* Sidebar */}
          <aside style={{width:sidebarW,minHeight:"100vh",background:C.sidebar,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",position:"fixed",left:0,top:0,bottom:0,zIndex:200,flexShrink:0}}>
            <div style={{padding:"24px 18px 20px",borderBottom:`1px solid ${C.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,#FF6B35,#FF8C5A)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🔥</div>
                <div>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17}}>NutriTrack</div>
                  <div style={{fontSize:10,color:C.muted}}>Fuel your goals</div>
                </div>
              </div>
            </div>
            <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:7,textTransform:"uppercase",letterSpacing:"0.06em"}}>Date</div>
              <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{...inp,padding:"8px 10px",fontSize:12}}/>
            </div>
            <nav style={{padding:"14px 10px",flex:1,overflowY:"auto"}}>
              {navItems.map(n=>(
                <button key={n.id} className="nav-btn-desktop" onClick={()=>setTab(n.id)}
                  style={{background:tab===n.id?"rgba(255,107,53,0.13)":"transparent",color:tab===n.id?C.accent:C.muted,fontWeight:tab===n.id?700:400}}>
                  <span style={{fontSize:19}}>{n.icon}</span>{n.label}
                  {tab===n.id&&<div style={{marginLeft:"auto",width:4,height:20,borderRadius:99,background:C.accent,flexShrink:0}}/>}
                </button>
              ))}
            </nav>
            <div style={{padding:"14px 18px",borderTop:`1px solid ${C.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:38,height:38,borderRadius:"50%",background:"linear-gradient(135deg,#FF6B35,#9B59B6)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:17,flexShrink:0}}>{prof.name[0]?.toUpperCase()}</div>
                <div style={{overflow:"hidden"}}>
                  <div style={{fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{prof.name}</div>
                  <div style={{fontSize:11,color:C.muted}}>{tdee} kcal/day</div>
                </div>
              </div>
            </div>
          </aside>
          {/* Main content — fills ALL remaining space */}
          <main style={{marginLeft:sidebarW,flex:1,minHeight:"100vh",width:`calc(100vw - ${sidebarW}px)`}}>
            <div style={{padding:"28px 32px 48px",maxWidth:1400,margin:"0 auto"}}>
              <div className="page-anim" key={tab}>{page()}</div>
            </div>
          </main>
        </div>
      )}

      {/* ── MOBILE ── */}
      {isMobile&&(
        <>
          <header style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"13px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200,width:"100%"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#FF6B35,#FF8C5A)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🔥</div>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:16}}>NutriTrack</span>
            </div>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{...inp,width:"auto",padding:"6px 10px",fontSize:12}}/>
          </header>
          <div style={{padding:"14px 14px 86px",width:"100%"}}>
            <div className="page-anim" key={tab}>{page()}</div>
          </div>
          <nav style={{position:"fixed",bottom:0,left:0,right:0,width:"100%",background:C.card,borderTop:`1px solid ${C.border}`,display:"flex",zIndex:200}}>
            {navItems.map(n=>(
              <button key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"10px 0 13px",border:"none",background:"transparent",color:tab===n.id?C.accent:C.dim,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:tab===n.id?700:400,transition:"all 0.2s"}}>
                <span style={{fontSize:21}}>{n.icon}</span>{n.label}
              </button>
            ))}
          </nav>
        </>
      )}

      {/* ── ADD FOOD MODAL ── */}
      <Modal open={modal==="add"} onClose={()=>{setModal(null);setSearch("");setCatFilter("All");}}>
        <div style={{padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:700}}>Add Food</div>
            <button onClick={()=>{setModal(null);setSearch("");setCatFilter("All");}} style={{background:"transparent",border:"none",color:C.muted,fontSize:24,cursor:"pointer",lineHeight:1}}>✕</button>
          </div>
          {/* Meal selector */}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>Add to</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {MEALS.map(m=><button key={m} onClick={()=>setMeal(m)} style={{padding:"7px 14px",borderRadius:8,border:`1px solid ${meal===m?C.accent:C.border}`,background:meal===m?"rgba(255,107,53,0.1)":"transparent",color:meal===m?C.accent:C.muted,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:meal===m?700:400,transition:"all 0.2s"}}>{m}</button>)}
            </div>
          </div>
          {/* Search */}
          <input placeholder="🔍  Search foods (e.g. dosa, chicken...)" value={search} onChange={e=>setSearch(e.target.value)} style={{...inp,marginBottom:10}} autoFocus/>
          {/* Category chips */}
          <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:8,marginBottom:6,scrollbarWidth:"none"}}>
            {cats.map(c=><button key={c} className={`cat-chip ${catFilter===c?"active":""}`} onClick={()=>setCatFilter(c)}>{c}</button>)}
          </div>
          {/* Count */}
          <div style={{fontSize:11,color:C.dim,marginBottom:8}}>{filtered.length} item{filtered.length!==1?"s":""} found</div>
          {/* Food list */}
          <div style={{maxHeight:310,overflowY:"auto",display:"flex",flexDirection:"column",gap:2}}>
            {filtered.map(food=>(
              <div key={food.id} className="food-row" onClick={()=>addFood(food)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 10px",borderRadius:11,cursor:"pointer",transition:"all 0.15s"}}>
                <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <Badge color={CAT_COLORS[food.cat]||C.muted}>{food.cat}</Badge>
                    <span style={{fontWeight:500,fontSize:14}}>{food.name}</span>
                  </div>
                  <div style={{fontSize:12,color:C.muted}}>P:{food.pro}g · C:{food.carb}g · F:{food.fat}g · Fiber:{food.fib}g</div>
                </div>
                <div style={{textAlign:"right",marginLeft:14,flexShrink:0}}>
                  <div style={{color:C.accent,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif",fontSize:18}}>{food.cal}</div>
                  <div style={{fontSize:10,color:C.dim}}>kcal</div>
                </div>
              </div>
            ))}
            {filtered.length===0&&<div style={{textAlign:"center",padding:28,color:C.dim}}>
              <div style={{fontSize:32,marginBottom:8}}>🔍</div>
              No foods found — try a different search or add custom
            </div>}
          </div>
          <div style={{borderTop:`1px solid ${C.border}`,marginTop:12,paddingTop:12}}>
            <button className="btn-ghost" style={{width:"100%"}} onClick={()=>setModal("custom")}>+ Add Custom Food</button>
          </div>
        </div>
      </Modal>

      {/* ── CUSTOM FOOD MODAL ── */}
      <Modal open={modal==="custom"} onClose={()=>setModal(null)}>
        <div style={{padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:700}}>Custom Food</div>
            <button onClick={()=>setModal(null)} style={{background:"transparent",border:"none",color:C.muted,fontSize:24,cursor:"pointer",lineHeight:1}}>✕</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[{l:"Food Name *",k:"name",t:"text",p:"e.g. Homemade Idli"},{l:"Calories *",k:"cal",t:"number",p:"0"},{l:"Protein (g)",k:"pro",t:"number",p:"0"},{l:"Carbs (g)",k:"carb",t:"number",p:"0"},{l:"Fat (g)",k:"fat",t:"number",p:"0"},{l:"Fiber (g)",k:"fib",t:"number",p:"0"}].map(f=>(
              <div key={f.k}>
                <label style={{display:"block",fontSize:11,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.06em"}}>{f.l}</label>
                <input type={f.t} placeholder={f.p} value={cf[f.k]} onChange={e=>setCf(p=>({...p,[f.k]:e.target.value}))} style={inp}/>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10,marginTop:20}}>
            <button className="btn-ghost" onClick={()=>setModal("add")} style={{flex:1}}>← Back</button>
            <button className="btn-primary" onClick={addCustom} style={{flex:2}} disabled={!cf.name||!cf.cal}>Add Food</button>
          </div>
        </div>
      </Modal>

      {/* ── GOALS MODAL ── */}
      <Modal open={modal==="goals"} onClose={()=>setModal(null)}>
        <div style={{padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:700}}>Edit Goals</div>
            <button onClick={()=>setModal(null)} style={{background:"transparent",border:"none",color:C.muted,fontSize:24,cursor:"pointer",lineHeight:1}}>✕</button>
          </div>
          {[{l:"Daily Calories (kcal)",k:"calories"},{l:"Protein (g)",k:"protein"},{l:"Carbohydrates (g)",k:"carbs"},{l:"Fat (g)",k:"fat"},{l:"Fiber (g)",k:"fiber"}].map(g=>(
            <div key={g.k} style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:11,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.06em"}}>{g.l}</label>
              <input type="number" value={goals[g.k]} onChange={e=>setGoals(p=>({...p,[g.k]:+e.target.value}))} style={inp}/>
            </div>
          ))}
          <button className="btn-primary" style={{width:"100%",marginTop:10}} onClick={()=>{setModal(null);toast("Goals updated!");}}>Save Goals</button>
        </div>
      </Modal>
    </div>
  );
}