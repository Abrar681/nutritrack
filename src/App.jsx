import { useState, useEffect } from "react";

const C = {
  bg:        "#F5F2EC",   // warm cream background
  bg2:       "#EDE9E0",   // slightly darker cream for contrast
  card:      "#FFFFFF",   // pure white cards
  border:    "#DDD8CE",   // soft cream border
  sidebar:   "#1B3A2D",   // deep rich green sidebar
  sidebarL:  "#224834",   // slightly lighter sidebar hover
  accent:    "#2D6A4F",   // rich forest green
  accentL:   "#40916C",   // medium green
  accentLL:  "#52B788",   // light green
  accentBtn: "#1B4332",   // dark green button
  green:     "#40916C",
  greenL:    "#D8F3DC",   // pale green bg
  red:       "#E63946",
  redL:      "#FFE5E7",
  blue:      "#2196A6",
  blueL:     "#E0F4F6",
  orange:    "#E07A1F",
  orangeL:   "#FEF0E0",
  yellow:    "#D4A017",
  yellowL:   "#FDF6E0",
  purple:    "#6B4FA0",
  purpleL:   "#F0EBF8",
  text:      "#1A1A2E",   // deep dark text
  textMed:   "#3D4A3E",   // medium text
  muted:     "#6B7B6C",   // muted green-grey
  dim:       "#9EAD9F",   // dim text
};

const FOODS = [
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
  Protein: {bg:"#FDE8E0",text:"#C1440E"},
  Grains:  {bg:"#FDF3DC",text:"#9A6B00"},
  Fruit:   {bg:"#E6F4EA",text:"#2D6A4F"},
  Vegetable:{bg:"#E8F5E9",text:"#2E7D32"},
  Dairy:   {bg:"#EDE7F6",text:"#5E35B1"},
  Nuts:    {bg:"#FFF3E0",text:"#E65100"},
  Legumes: {bg:"#E8F5E9",text:"#1B5E20"},
  Fats:    {bg:"#FFFDE7",text:"#F57F17"},
  Indian:  {bg:"#FCE4EC",text:"#AD1457"},
  Custom:  {bg:"#F3E5F5",text:"#6A1B9A"},
};

function useWidth() {
  const [w,setW]=useState(window.innerWidth);
  useEffect(()=>{ const h=()=>setW(window.innerWidth); window.addEventListener("resize",h); return()=>window.removeEventListener("resize",h); },[]);
  return w;
}

function Ring({value,max,size=120,sw=10,color,label,bgColor="#DDD8CE"}) {
  const r=(size-sw)/2, circ=2*Math.PI*r;
  const off=circ-Math.min(value/max,1)*circ;
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
      <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={bgColor} strokeWidth={sw}/>
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
      <span style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>{label}</span>
    </div>
  );
}

function BarRow({label,value,max,color,lightColor}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <span style={{color:C.muted,fontSize:13,fontWeight:500}}>{label}</span>
        <span style={{color:C.text,fontSize:13,fontWeight:700}}>{Math.round(value)}g <span style={{color:C.dim,fontWeight:400}}>/ {max}g</span></span>
      </div>
      <div style={{height:7,borderRadius:99,background:lightColor||"#E8EDE8"}}>
        <div style={{height:"100%",width:`${Math.min((value/max)*100,100)}%`,background:color,borderRadius:99,transition:"width 0.6s ease"}}/>
      </div>
    </div>
  );
}

function Badge({children,cat}) {
  const style = CAT_COLORS[cat]||{bg:"#F0F0F0",text:"#666"};
  return <span style={{padding:"3px 10px",borderRadius:99,background:style.bg,color:style.text,fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{children}</span>;
}

function Modal({open,onClose,children}) {
  if(!open) return null;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(27,58,45,0.5)",backdropFilter:"blur(8px)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.card,borderRadius:24,width:"100%",maxWidth:540,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 32px 80px rgba(27,58,45,0.25)",border:`1px solid ${C.border}`}}>
        {children}
      </div>
    </div>
  );
}

function StatCard({icon,label,val,unit,color,lightColor}) {
  return (
    <div style={{background:C.card,borderRadius:16,padding:20,border:`1px solid ${C.border}`,boxShadow:"0 2px 12px rgba(27,58,45,0.06)"}}>
      <div style={{width:42,height:42,borderRadius:12,background:lightColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:12}}>{icon}</div>
      <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:26,fontWeight:700,color}}>{val}</div>
      <div style={{fontSize:11,color:C.muted,marginTop:2}}>{unit}</div>
      <div style={{fontSize:12,color:C.dim,marginTop:2,fontWeight:500}}>{label}</div>
    </div>
  );
}

export default function App() {
  const width=useWidth();
  const isMobile=width<768;
  const sidebarW=width<1100?210:250;

  const today=new Date().toISOString().split("T")[0];
  const [date,setDate]=useState(today);
  const [logs,setLogs]=useState(()=>{try{return JSON.parse(localStorage.getItem("nt_logs")||"{}")}catch{return{}}});
  const [goals,setGoals]=useState(()=>{try{return JSON.parse(localStorage.getItem("nt_goals")||JSON.stringify(G0))}catch{return G0}});
  const [prof,setProf]=useState(()=>{try{return JSON.parse(localStorage.getItem("nt_prof")||JSON.stringify({name:"User",weight:70,height:170,age:25,gender:"male",activity:"moderate"}))}catch{return{name:"User",weight:70,height:170,age:25,gender:"male",activity:"moderate"}}});
  const [water,setWater]=useState(()=>{try{return JSON.parse(localStorage.getItem("nt_water")||"{}")}catch{return{}}});
  const [tab,setTab]=useState("dashboard");
  const [modal,setModal]=useState(null);
  const [meal,setMeal]=useState("Breakfast");
  const [search,setSearch]=useState("");
  const [cf,setCf]=useState({name:"",cal:"",pro:"",carb:"",fat:"",fib:""});
  const [notif,setNotif]=useState(null);
  const [catFilter,setCatFilter]=useState("All");

  useEffect(()=>{localStorage.setItem("nt_logs",JSON.stringify(logs))},[logs]);
  useEffect(()=>{localStorage.setItem("nt_goals",JSON.stringify(goals))},[goals]);
  useEffect(()=>{localStorage.setItem("nt_prof",JSON.stringify(prof))},[prof]);
  useEffect(()=>{localStorage.setItem("nt_water",JSON.stringify(water))},[water]);

  const toast=(msg,type="ok")=>{setNotif({msg,type});setTimeout(()=>setNotif(null),2500)};
  const dl=logs[date]||{Breakfast:[],Lunch:[],Dinner:[],Snacks:[]};
  const dw=water[date]||0;
  const allF=Object.values(dl).flat();
  const tot=allF.reduce((a,f)=>({calories:a.calories+f.cal,protein:a.protein+f.pro,carbs:a.carbs+f.carb,fat:a.fat+f.fat,fiber:a.fiber+f.fib}),{calories:0,protein:0,carbs:0,fat:0,fiber:0});
  const rem=goals.calories-tot.calories;
  const mCal=m=>(dl[m]||[]).reduce((a,f)=>a+f.cal,0);

  const addFood=food=>{
    setLogs(p=>({...p,[date]:{...dl,[meal]:[...(dl[meal]||[]),{...food,uid:Date.now()}]}}));
    toast(`Added to ${meal}!`);
    setModal(null);setSearch("");setCatFilter("All");
  };
  const delFood=(m,uid)=>{setLogs(p=>({...p,[date]:{...dl,[m]:dl[m].filter(f=>f.uid!==uid)}}));toast("Entry removed","err")};
  const addCustom=()=>{
    if(!cf.name||!cf.cal) return;
    addFood({id:Date.now(),name:cf.name,cal:+cf.cal,pro:+cf.pro||0,carb:+cf.carb||0,fat:+cf.fat||0,fib:+cf.fib||0,cat:"Custom"});
    setCf({name:"",cal:"",pro:"",carb:"",fat:"",fib:""});
  };

  const bmr=prof.gender==="male"?10*prof.weight+6.25*prof.height-5*prof.age+5:10*prof.weight+6.25*prof.height-5*prof.age-161;
  const tdee=Math.round(bmr*({sedentary:1.2,light:1.375,moderate:1.55,active:1.725,veryActive:1.9}[prof.activity]||1.55));
  const last7=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));const k=d.toISOString().split("T")[0];return{lbl:d.toLocaleDateString("en",{weekday:"short"}),cal:Object.values(logs[k]||{}).flat().reduce((a,f)=>a+f.cal,0),isToday:i===6}});
  const cats=["All","Indian","Protein","Grains","Fruit","Vegetable","Dairy","Nuts","Legumes","Fats"];
  const filtered=FOODS.filter(f=>(f.name.toLowerCase().includes(search.toLowerCase())||f.cat.toLowerCase().includes(search.toLowerCase()))&&(catFilter==="All"||f.cat===catFilter));

  const inp={background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:10,color:C.text,padding:"10px 14px",fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",width:"100%",boxSizing:"border-box",transition:"border 0.2s"};
  const card=(extra={})=>({background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:isMobile?16:22,boxShadow:"0 2px 12px rgba(27,58,45,0.06)",...extra});

  const navItems=[{id:"dashboard",icon:"📊",label:"Dashboard"},{id:"diary",icon:"📋",label:"Diary"},{id:"stats",icon:"📈",label:"Stats"},{id:"profile",icon:"👤",label:"Profile"}];

  // ─────────────────────────────────────────
  // DASHBOARD
  // ─────────────────────────────────────────
  const Dashboard=()=>(
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      {/* Welcome bar */}
      <div style={{background:`linear-gradient(135deg, ${C.accent}, ${C.accentL})`,borderRadius:20,padding:isMobile?"20px 20px":"24px 32px",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:isMobile?18:22,fontWeight:700}}>Good {new Date().getHours()<12?"Morning":"Afternoon"}, {prof.name}! 👋</div>
          <div style={{fontSize:13,opacity:0.85,marginTop:4}}>{date===today?"Here's your nutrition summary for today":"Viewing data for "+date}</div>
        </div>
        <button onClick={()=>setModal("add")} style={{background:"white",color:C.accent,border:"none",borderRadius:12,padding:"11px 22px",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",boxShadow:"0 4px 16px rgba(0,0,0,0.15)",transition:"all 0.2s"}}>+ Add Food</button>
      </div>

      {/* Stat Cards */}
      <div style={{display:"grid",gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`,gap:14}}>
        <StatCard icon="🔥" label="Consumed" val={Math.round(tot.calories)} unit="kcal" color={C.orange} lightColor={C.orangeL}/>
        <StatCard icon="⚡" label="Remaining" val={Math.max(0,Math.round(rem))} unit="kcal" color={rem<0?C.red:C.accent} lightColor={rem<0?C.redL:C.greenL}/>
        <StatCard icon="🎯" label="Daily Goal" val={goals.calories} unit="kcal" color={C.blue} lightColor={C.blueL}/>
        <StatCard icon="💧" label="Water" val={dw} unit="/ 8 glasses" color={C.blue} lightColor={C.blueL}/>
      </div>

      {/* Calorie Ring + Macros */}
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1.4fr",gap:18}}>
        <div style={card({display:"flex",flexDirection:"column",alignItems:"center",gap:18})}>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,color:C.text,alignSelf:"flex-start"}}>Calorie Goal</div>
          <Ring value={tot.calories} max={goals.calories} size={180} sw={16} color={tot.calories>goals.calories?C.red:C.accent} label="Calories" bgColor={C.greenL}/>
          <div style={{display:"flex",gap:10,width:"100%"}}>
            {[{l:"Consumed",v:Math.round(tot.calories),c:C.orange},{l:"Remaining",v:Math.max(0,Math.round(rem)),c:C.accent},{l:"Goal",v:goals.calories,c:C.blue}].map(s=>(
              <div key={s.l} style={{flex:1,textAlign:"center",background:C.bg,borderRadius:12,padding:"10px 6px"}}>
                <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:16,fontWeight:700,color:s.c}}>{s.v}</div>
                <div style={{fontSize:10,color:C.muted,marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
          {rem<0&&<div style={{background:C.redL,border:`1px solid ${C.red}44`,borderRadius:10,padding:"9px 14px",fontSize:12,color:C.red,textAlign:"center",width:"100%",fontWeight:600}}>⚠️ Over goal by {Math.abs(Math.round(rem))} kcal</div>}
        </div>

        <div style={card()}>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,color:C.text,marginBottom:18}}>Macronutrients</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:22}}>
            <Ring value={tot.protein} max={goals.protein} size={72} sw={6} color={C.orange} label="Protein" bgColor={C.orangeL}/>
            <Ring value={tot.carbs} max={goals.carbs} size={72} sw={6} color={C.blue} label="Carbs" bgColor={C.blueL}/>
            <Ring value={tot.fat} max={goals.fat} size={72} sw={6} color={C.yellow} label="Fat" bgColor={C.yellowL}/>
            <Ring value={tot.fiber} max={goals.fiber} size={72} sw={6} color={C.accent} label="Fiber" bgColor={C.greenL}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <BarRow label="Protein" value={tot.protein} max={goals.protein} color={C.orange} lightColor={C.orangeL}/>
            <BarRow label="Carbohydrates" value={tot.carbs} max={goals.carbs} color={C.blue} lightColor={C.blueL}/>
            <BarRow label="Fat" value={tot.fat} max={goals.fat} color={C.yellow} lightColor={C.yellowL}/>
            <BarRow label="Fiber" value={tot.fiber} max={goals.fiber} color={C.accent} lightColor={C.greenL}/>
          </div>
        </div>
      </div>

      {/* Meals */}
      <div style={card()}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,color:C.text,marginBottom:16}}>Meal Breakdown</div>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`,gap:14}}>
          {MEALS.map((m,i)=>{
            const cal=mCal(m),icons=["☀️","🌤️","🌙","🍎"];
            const pct=Math.min((cal/goals.calories)*100,100);
            return (
              <div key={m} onClick={()=>{setTab("diary");setMeal(m);}} style={{background:C.bg,borderRadius:14,padding:18,cursor:"pointer",border:`1.5px solid ${C.border}`,transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.boxShadow=`0 4px 20px rgba(45,106,79,0.15)`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none";}}>
                <div style={{fontSize:28,marginBottom:10}}>{icons[i]}</div>
                <div style={{fontWeight:700,fontSize:14,color:C.text,marginBottom:4}}>{m}</div>
                <div style={{color:C.accent,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif",fontSize:22}}>{cal}<span style={{fontSize:11,color:C.muted,fontWeight:400}}> kcal</span></div>
                <div style={{fontSize:11,color:C.dim,marginTop:4}}>{(dl[m]||[]).length} items</div>
                <div style={{height:4,borderRadius:99,background:C.greenL,marginTop:10}}>
                  <div style={{height:"100%",width:`${pct}%`,background:C.accent,borderRadius:99}}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Water + TDEE */}
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:18}}>
        <div style={card()}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:16,color:C.text}}>💧 Water Tracker</div>
            <div style={{color:C.blue,fontWeight:700,fontSize:15}}>{dw}<span style={{fontSize:12,color:C.muted,fontWeight:400}}>/8</span></div>
          </div>
          <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14,flexWrap:"wrap"}}>
            {Array.from({length:8},(_,i)=>(
              <div key={i} onClick={()=>setWater(p=>({...p,[date]:i<dw?i:i+1}))} style={{width:40,height:52,borderRadius:10,background:i<dw?`linear-gradient(180deg,${C.blue},#1565C0)`:C.bg2,transition:"all 0.3s",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,border:`1.5px solid ${i<dw?C.blue:C.border}`,boxShadow:i<dw?"0 3px 10px rgba(33,150,166,0.25)":"none"}}>
                {i<dw?"💧":""}
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setWater(p=>({...p,[date]:Math.max(0,dw-1)}))} style={{flex:1,background:C.blueL,border:`1.5px solid ${C.blue}33`,color:C.blue,padding:11,borderRadius:10,cursor:"pointer",fontSize:20,fontFamily:"'DM Sans',sans-serif",fontWeight:700,transition:"all 0.2s"}}>−</button>
            <button onClick={()=>setWater(p=>({...p,[date]:Math.min(8,dw+1)}))} style={{flex:1,background:C.blueL,border:`1.5px solid ${C.blue}33`,color:C.blue,padding:11,borderRadius:10,cursor:"pointer",fontSize:20,fontFamily:"'DM Sans',sans-serif",fontWeight:700,transition:"all 0.2s"}}>+</button>
          </div>
        </div>
        <div style={card({background:`linear-gradient(135deg, ${C.accentBtn}, ${C.accent})`,border:"none"})}>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>Daily Energy Burn</div>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:44,fontWeight:700,color:"white",lineHeight:1}}>{tdee}<span style={{fontSize:14,color:"rgba(255,255,255,0.7)",fontWeight:400}}> kcal</span></div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.8)",marginTop:10}}>Net balance: <span style={{color:tot.calories-tdee>0?"#FFB3B3":"#B3FFD1",fontWeight:700}}>{tot.calories-tdee>0?"+":""}{tot.calories-tdee} kcal</span></div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginTop:6}}>BMR: {Math.round(bmr)} kcal · {prof.activity} lifestyle</div>
          <div style={{marginTop:16,height:4,borderRadius:99,background:"rgba(255,255,255,0.2)"}}>
            <div style={{height:"100%",width:`${Math.min((tot.calories/tdee)*100,100)}%`,background:"rgba(255,255,255,0.6)",borderRadius:99}}/>
          </div>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────
  // DIARY
  // ─────────────────────────────────────────
  const Diary=()=>(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700,color:C.text}}>Food Diary</div>
        <button className="btn-primary" onClick={()=>setModal("add")}>+ Add Food</button>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {MEALS.map(m=>(
          <button key={m} onClick={()=>setMeal(m)} style={{flex:isMobile?"1 0 40%":"none",padding:"9px 20px",borderRadius:10,border:`1.5px solid ${meal===m?C.accent:C.border}`,background:meal===m?C.greenL:"transparent",color:meal===m?C.accent:C.muted,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:meal===m?700:500,transition:"all 0.2s"}}>{m}</button>
        ))}
      </div>
      <div style={card()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{fontWeight:700,fontSize:17,color:C.text}}>{meal}</div>
          <div style={{color:C.accent,fontWeight:700,fontSize:16,background:C.greenL,padding:"5px 14px",borderRadius:99}}>{mCal(meal)} kcal</div>
        </div>
        {(dl[meal]||[]).length===0?(
          <div style={{textAlign:"center",padding:"50px 20px",color:C.dim}}>
            <div style={{fontSize:52,marginBottom:12}}>🍽️</div>
            <div style={{fontSize:15,marginBottom:6,color:C.muted,fontWeight:600}}>Nothing logged for {meal} yet</div>
            <div style={{fontSize:13,color:C.dim,marginBottom:20}}>Start tracking your nutrition!</div>
            <button className="btn-primary" onClick={()=>setModal("add")}>Add Food</button>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:2}}>
            {!isMobile&&<div style={{display:"grid",gridTemplateColumns:"1fr 70px 62px 62px 62px 40px",gap:8,padding:"8px 12px",color:C.dim,fontSize:11,textTransform:"uppercase",letterSpacing:"0.06em",borderBottom:`1.5px solid ${C.border}`,marginBottom:4}}>
              <span>Food</span><span style={{textAlign:"center"}}>Cal</span><span style={{textAlign:"center"}}>Pro</span><span style={{textAlign:"center"}}>Carb</span><span style={{textAlign:"center"}}>Fat</span><span/>
            </div>}
            {(dl[meal]||[]).map(food=>(
              <div key={food.uid} className="food-row" style={{display:"grid",gridTemplateColumns:isMobile?"1fr auto":"1fr 70px 62px 62px 62px 40px",gap:8,padding:"12px 12px",borderRadius:12,alignItems:"center",transition:"all 0.2s"}}>
                <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <Badge cat={food.cat}>{food.cat}</Badge>
                    <span style={{fontSize:13,fontWeight:600,color:C.text}}>{food.name}</span>
                  </div>
                  {isMobile&&<div style={{fontSize:11,color:C.muted}}>P:{food.pro}g · C:{food.carb}g · F:{food.fat}g</div>}
                </div>
                {isMobile?(
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{color:C.accent,fontWeight:700,fontSize:16,background:C.greenL,padding:"3px 10px",borderRadius:8}}>{food.cal}</span>
                    <button className="delete-btn" onClick={()=>delFood(meal,food.uid)}>✕</button>
                  </div>
                ):(
                  <>
                    <span style={{textAlign:"center",fontSize:13,fontWeight:700,color:C.accent,background:C.greenL,borderRadius:8,padding:"3px 0"}}>{food.cal}</span>
                    <span style={{textAlign:"center",fontSize:13,color:C.orange,fontWeight:600}}>{food.pro}g</span>
                    <span style={{textAlign:"center",fontSize:13,color:C.blue,fontWeight:600}}>{food.carb}g</span>
                    <span style={{textAlign:"center",fontSize:13,color:C.yellow,fontWeight:600}}>{food.fat}g</span>
                    <button className="delete-btn" onClick={()=>delFood(meal,food.uid)}>✕</button>
                  </>
                )}
              </div>
            ))}
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr auto":"1fr 70px 62px 62px 62px 40px",gap:8,padding:"12px 12px",borderTop:`1.5px solid ${C.border}`,marginTop:8,background:C.bg,borderRadius:"0 0 12px 12px"}}>
              <span style={{fontWeight:700,fontSize:13,color:C.text}}>Total</span>
              <span style={{textAlign:"center",fontSize:14,fontWeight:700,color:C.accent}}>{mCal(meal)}</span>
              {!isMobile&&<>
                <span style={{textAlign:"center",fontSize:13,fontWeight:700,color:C.orange}}>{Math.round((dl[meal]||[]).reduce((a,f)=>a+f.pro,0))}g</span>
                <span style={{textAlign:"center",fontSize:13,fontWeight:700,color:C.blue}}>{Math.round((dl[meal]||[]).reduce((a,f)=>a+f.carb,0))}g</span>
                <span style={{textAlign:"center",fontSize:13,fontWeight:700,color:C.yellow}}>{Math.round((dl[meal]||[]).reduce((a,f)=>a+f.fat,0))}g</span>
                <span/>
              </>}
            </div>
          </div>
        )}
      </div>
      <div style={card({display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,textAlign:"center"})}>
        {[{l:"Calories",v:Math.round(tot.calories),u:"kcal",c:C.orange,bg:C.orangeL},{l:"Protein",v:Math.round(tot.protein),u:"g",c:C.orange,bg:C.orangeL},{l:"Carbs",v:Math.round(tot.carbs),u:"g",c:C.blue,bg:C.blueL},{l:"Fat",v:Math.round(tot.fat),u:"g",c:C.yellow,bg:C.yellowL},{l:"Fiber",v:Math.round(tot.fiber),u:"g",c:C.accent,bg:C.greenL}].map(s=>(
          <div key={s.l} style={{background:s.bg,borderRadius:12,padding:"12px 8px"}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:5,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em"}}>{s.l}</div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:isMobile?14:20,fontWeight:700,color:s.c}}>{s.v}<span style={{fontSize:10,color:C.muted,fontWeight:400}}>{s.u}</span></div>
          </div>
        ))}
      </div>
    </div>
  );

  // ─────────────────────────────────────────
  // STATS
  // ─────────────────────────────────────────
  const Stats=()=>{
    const ad=last7.filter(d=>d.cal>0);
    const avg=ad.length>0?Math.round(ad.reduce((a,d)=>a+d.cal,0)/ad.length):0;
    const streak=(()=>{let s=0;for(let i=6;i>=0;i--){if(last7[i].cal>0)s++;else break;}return s;})();
    const maxC=Math.max(...last7.map(d=>d.cal),goals.calories,1);
    return (
      <div style={{display:"flex",flexDirection:"column",gap:18}}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700,color:C.text}}>Weekly Statistics</div>
        <div style={card()}>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,color:C.text,marginBottom:22}}>7-Day Calorie History</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:isMobile?6:16,height:160}}>
            {last7.map((d,i)=>{
              const h=d.cal>0?Math.max((d.cal/maxC)*140,8):8;
              return (
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                  {d.cal>0&&<div style={{fontSize:9,color:C.dim,fontWeight:600}}>{d.cal}</div>}
                  <div style={{width:"100%",height:h,background:d.isToday?`linear-gradient(180deg,${C.accentL},${C.accent})`:(d.cal>goals.calories?`${C.red}88`:C.greenL),borderRadius:"8px 8px 3px 3px",transition:"all 0.5s",border:d.isToday?`1.5px solid ${C.accent}`:`1px solid ${C.border}`}}/>
                  <div style={{fontSize:10,color:d.isToday?C.accent:C.dim,fontWeight:d.isToday?700:500}}>{d.lbl}</div>
                </div>
              );
            })}
          </div>
          <div style={{display:"flex",gap:16,marginTop:14,justifyContent:"flex-end",flexWrap:"wrap"}}>
            {[{c:`linear-gradient(${C.accentL},${C.accent})`,l:"Today"},{c:C.greenL,l:"Past days"},{c:`${C.red}88`,l:"Over goal"}].map(x=>(
              <div key={x.l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:C.muted}}>
                <div style={{width:10,height:10,borderRadius:3,background:x.c,border:`1px solid ${C.border}`}}/>{x.l}
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {[{icon:"🔥",l:"Avg Calories",v:avg,u:"kcal",c:C.orange,bg:C.orangeL},{icon:"📅",l:"Days Logged",v:ad.length,u:"/ 7 days",c:C.accent,bg:C.greenL},{icon:"⚡",l:"Streak",v:streak,u:"days",c:C.purple,bg:C.purpleL}].map(s=>(
            <div key={s.l} style={card({textAlign:"center",padding:isMobile?16:24})}>
              <div style={{width:52,height:52,borderRadius:16,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 12px"}}>{s.icon}</div>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:isMobile?24:32,fontWeight:700,color:s.c}}>{s.v}</div>
              <div style={{fontSize:12,color:C.muted,marginTop:3,fontWeight:500}}>{s.u}</div>
              <div style={{fontSize:12,color:C.dim,marginTop:4}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={card()}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,color:C.text}}>Nutrition Goals</div>
            <button className="btn-ghost" onClick={()=>setModal("goals")}>Edit Goals</button>
          </div>
          {[{l:"Calories",v:goals.calories,u:"kcal",c:C.orange,bg:C.orangeL},{l:"Protein",v:goals.protein,u:"g",c:C.orange,bg:C.orangeL},{l:"Carbs",v:goals.carbs,u:"g",c:C.blue,bg:C.blueL},{l:"Fat",v:goals.fat,u:"g",c:C.yellow,bg:C.yellowL},{l:"Fiber",v:goals.fiber,u:"g",c:C.accent,bg:C.greenL}].map(g=>(
            <div key={g.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 0",borderBottom:`1px solid ${C.border}`}}>
              <span style={{color:C.muted,fontSize:14,fontWeight:500}}>{g.l}</span>
              <span style={{color:g.c,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif",background:g.bg,padding:"3px 14px",borderRadius:99}}>{g.v} {g.u}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────
  // PROFILE
  // ─────────────────────────────────────────
  const Profile=()=>(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700,color:C.text}}>Profile & Settings</div>
      <div style={card({textAlign:"center",paddingTop:36,paddingBottom:36,background:`linear-gradient(135deg,${C.accentBtn},${C.accent})`})}>
        <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"3px solid rgba(255,255,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 14px",color:"white"}}>{prof.name[0]?.toUpperCase()||"U"}</div>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700,color:"white"}}>{prof.name}</div>
        <div style={{color:"rgba(255,255,255,0.75)",fontSize:13,marginTop:5}}>{prof.gender==="male"?"♂":"♀"} · {prof.age} yrs · {prof.weight} kg · {prof.height} cm</div>
        <div style={{color:"white",fontWeight:700,marginTop:10,fontSize:18,background:"rgba(255,255,255,0.15)",display:"inline-block",padding:"6px 20px",borderRadius:99,marginTop:12}}>TDEE: {tdee} kcal/day</div>
      </div>
      <div style={card()}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,color:C.text,marginBottom:18}}>Personal Info</div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[{l:"Name",k:"name",t:"text"},{l:"Age",k:"age",t:"number"},{l:"Weight (kg)",k:"weight",t:"number"},{l:"Height (cm)",k:"height",t:"number"}].map(f=>(
            <div key={f.k}>
              <label style={{display:"block",fontSize:11,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>{f.l}</label>
              <input type={f.t} value={prof[f.k]} onChange={e=>setProf(p=>({...p,[f.k]:f.t==="number"?+e.target.value:e.target.value}))} style={inp}/>
            </div>
          ))}
          <div>
            <label style={{display:"block",fontSize:11,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>Gender</label>
            <div style={{display:"flex",gap:10}}>
              {["male","female"].map(g=><button key={g} onClick={()=>setProf(p=>({...p,gender:g}))} style={{flex:1,padding:12,borderRadius:10,border:`1.5px solid ${prof.gender===g?C.accent:C.border}`,background:prof.gender===g?C.greenL:"transparent",color:prof.gender===g?C.accent:C.muted,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:700,textTransform:"capitalize",transition:"all 0.2s"}}>{g}</button>)}
            </div>
          </div>
          <div>
            <label style={{display:"block",fontSize:11,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>Activity Level</label>
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
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,color:C.text,marginBottom:16}}>Daily Nutrition Goals</div>
        {[{l:"Calories (kcal)",k:"calories"},{l:"Protein (g)",k:"protein"},{l:"Carbs (g)",k:"carbs"},{l:"Fat (g)",k:"fat"},{l:"Fiber (g)",k:"fiber"}].map(g=>(
          <div key={g.k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,marginBottom:14}}>
            <label style={{fontSize:14,color:C.muted,minWidth:140,fontWeight:500}}>{g.l}</label>
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

  const page=()=>{if(tab==="dashboard")return<Dashboard/>;if(tab==="diary")return<Diary/>;if(tab==="stats")return<Stats/>;return<Profile/>};

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div style={{width:"100vw",minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:C.text,overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');
        html,body,#root{margin:0;padding:0;width:100%;box-sizing:border-box;}
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#EDE9E0;} ::-webkit-scrollbar-thumb{background:#A8C5B0;border-radius:4px;}
        input::placeholder{color:#9EAD9F;}
        input:focus,select:focus{border-color:#2D6A4F!important;box-shadow:0 0 0 3px rgba(45,106,79,0.12)!important;}
        .food-row:hover{background:#F0F5F1!important;}
        .btn-primary{background:linear-gradient(135deg,#1B4332,#2D6A4F);border:none;color:#fff;padding:12px 24px;border-radius:12px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 14px rgba(27,67,50,0.25);}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(27,67,50,0.35);}
        .btn-primary:disabled{opacity:0.45;cursor:not-allowed;transform:none;box-shadow:none;}
        .btn-ghost{background:transparent;border:1.5px solid #DDD8CE;color:#6B7B6C;padding:9px 18px;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;transition:all 0.2s;font-weight:600;}
        .btn-ghost:hover{border-color:#2D6A4F;color:#2D6A4F;background:#F0F5F1;}
        .delete-btn{background:transparent;border:none;cursor:pointer;color:#9EAD9F;padding:5px 9px;border-radius:7px;font-size:15px;transition:all 0.2s;}
        .delete-btn:hover{color:#E63946;background:#FFE5E7;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .page-anim{animation:fadeUp 0.3s ease both;}
        @keyframes slideIn{from{opacity:0;transform:translateX(80px);}to{opacity:1;transform:translateX(0);}}
        .notif-anim{animation:slideIn 0.3s ease both;}
        .cat-chip{padding:6px 14px;border-radius:99px;border:1.5px solid #DDD8CE;background:white;color:#6B7B6C;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;white-space:nowrap;transition:all 0.2s;}
        .cat-chip.active{background:#D8F3DC;border-color:#2D6A4F;color:#1B4332;}
        .cat-chip:hover{border-color:#2D6A4F;color:#2D6A4F;}
      `}</style>

      {/* Toast */}
      {notif&&(
        <div className="notif-anim" style={{position:"fixed",top:20,right:20,zIndex:9999,background:notif.type==="err"?C.redL:C.greenL,border:`1.5px solid ${notif.type==="err"?C.red:C.accent}`,borderRadius:14,padding:"13px 22px",color:notif.type==="err"?C.red:C.accent,fontWeight:700,fontSize:14,boxShadow:"0 8px 24px rgba(27,58,45,0.15)",maxWidth:320}}>
          {notif.type==="err"?"🗑️ ":"✅ "}{notif.msg}
        </div>
      )}

      {/* ── DESKTOP ── */}
      {!isMobile&&(
        <div style={{display:"flex",width:"100%",minHeight:"100vh"}}>
          <aside style={{width:sidebarW,minHeight:"100vh",background:C.sidebar,display:"flex",flexDirection:"column",position:"fixed",left:0,top:0,bottom:0,zIndex:200,flexShrink:0}}>
            {/* Logo */}
            <div style={{padding:"28px 20px 22px",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:44,height:44,borderRadius:13,background:"linear-gradient(135deg,#52B788,#2D6A4F)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,boxShadow:"0 4px 14px rgba(0,0,0,0.3)"}}>🌿</div>
                <div>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,color:"white"}}>NutriTrack</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>Fuel your goals</div>
                </div>
              </div>
            </div>
            {/* Date */}
            <div style={{padding:"14px 18px",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginBottom:7,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>Date</div>
              <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,color:"white",padding:"8px 10px",fontSize:12,fontFamily:"'DM Sans',sans-serif",outline:"none",width:"100%",boxSizing:"border-box",colorScheme:"dark"}}/>
            </div>
            {/* Nav */}
            <nav style={{padding:"14px 10px",flex:1}}>
              {navItems.map(n=>(
                <button key={n.id} onClick={()=>setTab(n.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:12,border:"none",background:tab===n.id?"rgba(255,255,255,0.12)":"transparent",color:tab===n.id?"white":"rgba(255,255,255,0.5)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:tab===n.id?700:400,marginBottom:4,transition:"all 0.2s",textAlign:"left"}}>
                  <span style={{fontSize:18}}>{n.icon}</span>{n.label}
                  {tab===n.id&&<div style={{marginLeft:"auto",width:4,height:20,borderRadius:99,background:"#52B788",flexShrink:0}}/>}
                </button>
              ))}
            </nav>
            {/* Profile */}
            <div style={{padding:"14px 18px",borderTop:"1px solid rgba(255,255,255,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:38,height:38,borderRadius:"50%",background:"linear-gradient(135deg,#52B788,#40916C)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:17,color:"white",flexShrink:0}}>{prof.name[0]?.toUpperCase()}</div>
                <div style={{overflow:"hidden"}}>
                  <div style={{fontSize:13,fontWeight:600,color:"white",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{prof.name}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>{tdee} kcal/day</div>
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

      {/* ── MOBILE ── */}
      {isMobile&&(
        <>
          <header style={{background:C.sidebar,padding:"13px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200,width:"100%",boxShadow:"0 2px 12px rgba(27,58,45,0.2)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#52B788,#2D6A4F)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🌿</div>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:16,color:"white"}}>NutriTrack</span>
            </div>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,color:"white",padding:"6px 10px",fontSize:12,fontFamily:"'DM Sans',sans-serif",outline:"none",colorScheme:"dark"}}/>
          </header>
          <div style={{padding:"16px 14px 88px",width:"100%"}}>
            <div className="page-anim" key={tab}>{page()}</div>
          </div>
          <nav style={{position:"fixed",bottom:0,left:0,right:0,width:"100%",background:C.sidebar,display:"flex",zIndex:200,boxShadow:"0 -4px 20px rgba(27,58,45,0.2)"}}>
            {navItems.map(n=>(
              <button key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"10px 0 13px",border:"none",background:"transparent",color:tab===n.id?"#52B788":"rgba(255,255,255,0.4)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:tab===n.id?700:400,transition:"all 0.2s"}}>
                <span style={{fontSize:20}}>{n.icon}</span>{n.label}
              </button>
            ))}
          </nav>
        </>
      )}

      {/* ADD FOOD MODAL */}
      <Modal open={modal==="add"} onClose={()=>{setModal(null);setSearch("");setCatFilter("All");}}>
        <div style={{padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:700,color:C.text}}>Add Food</div>
            <button onClick={()=>{setModal(null);setSearch("");setCatFilter("All");}} style={{background:C.bg,border:`1px solid ${C.border}`,color:C.muted,width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>Add to Meal</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {MEALS.map(m=><button key={m} onClick={()=>setMeal(m)} style={{padding:"7px 14px",borderRadius:8,border:`1.5px solid ${meal===m?C.accent:C.border}`,background:meal===m?C.greenL:"white",color:meal===m?C.accent:C.muted,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:meal===m?700:500,transition:"all 0.2s"}}>{m}</button>)}
            </div>
          </div>
          <input placeholder="🔍  Search foods (dosa, chicken, rice...)" value={search} onChange={e=>setSearch(e.target.value)} style={{background:"white",border:`1.5px solid ${C.border}`,borderRadius:10,color:C.text,padding:"10px 14px",fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",width:"100%",boxSizing:"border-box",marginBottom:10}} autoFocus/>
          <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:8,marginBottom:6,scrollbarWidth:"none"}}>
            {["All","Indian","Protein","Grains","Fruit","Vegetable","Dairy","Nuts","Legumes","Fats"].map(c=><button key={c} className={`cat-chip ${catFilter===c?"active":""}`} onClick={()=>setCatFilter(c)}>{c}</button>)}
          </div>
          <div style={{fontSize:11,color:C.dim,marginBottom:8,fontWeight:500}}>{filtered.length} item{filtered.length!==1?"s":""} found</div>
          <div style={{maxHeight:300,overflowY:"auto",display:"flex",flexDirection:"column",gap:2}}>
            {filtered.map(food=>(
              <div key={food.id} className="food-row" onClick={()=>addFood(food)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 10px",borderRadius:11,cursor:"pointer",transition:"all 0.15s",border:`1px solid transparent`}}>
                <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <Badge cat={food.cat}>{food.cat}</Badge>
                    <span style={{fontWeight:600,fontSize:14,color:C.text}}>{food.name}</span>
                  </div>
                  <div style={{fontSize:12,color:C.muted}}>P:{food.pro}g · C:{food.carb}g · F:{food.fat}g · Fiber:{food.fib}g</div>
                </div>
                <div style={{textAlign:"right",marginLeft:14,flexShrink:0}}>
                  <div style={{color:C.accent,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif",fontSize:18,background:C.greenL,padding:"4px 12px",borderRadius:8}}>{food.cal}</div>
                  <div style={{fontSize:10,color:C.dim,marginTop:2}}>kcal</div>
                </div>
              </div>
            ))}
            {filtered.length===0&&<div style={{textAlign:"center",padding:28,color:C.dim}}>
              <div style={{fontSize:32,marginBottom:8}}>🔍</div>
              No foods found — try different search or add custom
            </div>}
          </div>
          <div style={{borderTop:`1px solid ${C.border}`,marginTop:12,paddingTop:12}}>
            <button className="btn-ghost" style={{width:"100%"}} onClick={()=>setModal("custom")}>+ Add Custom Food</button>
          </div>
        </div>
      </Modal>

      {/* CUSTOM FOOD MODAL */}
      <Modal open={modal==="custom"} onClose={()=>setModal(null)}>
        <div style={{padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:700,color:C.text}}>Custom Food</div>
            <button onClick={()=>setModal(null)} style={{background:C.bg,border:`1px solid ${C.border}`,color:C.muted,width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[{l:"Food Name *",k:"name",t:"text",p:"e.g. Homemade Idli"},{l:"Calories *",k:"cal",t:"number",p:"0"},{l:"Protein (g)",k:"pro",t:"number",p:"0"},{l:"Carbs (g)",k:"carb",t:"number",p:"0"},{l:"Fat (g)",k:"fat",t:"number",p:"0"},{l:"Fiber (g)",k:"fib",t:"number",p:"0"}].map(f=>(
              <div key={f.k}>
                <label style={{display:"block",fontSize:11,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>{f.l}</label>
                <input type={f.t} placeholder={f.p} value={cf[f.k]} onChange={e=>setCf(p=>({...p,[f.k]:e.target.value}))} style={{background:"white",border:`1.5px solid ${C.border}`,borderRadius:10,color:C.text,padding:"10px 14px",fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",width:"100%",boxSizing:"border-box"}}/>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10,marginTop:20}}>
            <button className="btn-ghost" onClick={()=>setModal("add")} style={{flex:1}}>← Back</button>
            <button className="btn-primary" onClick={addCustom} style={{flex:2}} disabled={!cf.name||!cf.cal}>Add Food</button>
          </div>
        </div>
      </Modal>

      {/* GOALS MODAL */}
      <Modal open={modal==="goals"} onClose={()=>setModal(null)}>
        <div style={{padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:700,color:C.text}}>Edit Goals</div>
            <button onClick={()=>setModal(null)} style={{background:C.bg,border:`1px solid ${C.border}`,color:C.muted,width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>
          {[{l:"Daily Calories (kcal)",k:"calories"},{l:"Protein (g)",k:"protein"},{l:"Carbohydrates (g)",k:"carbs"},{l:"Fat (g)",k:"fat"},{l:"Fiber (g)",k:"fiber"}].map(g=>(
            <div key={g.k} style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:11,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>{g.l}</label>
              <input type="number" value={goals[g.k]} onChange={e=>setGoals(p=>({...p,[g.k]:+e.target.value}))} style={{background:"white",border:`1.5px solid ${C.border}`,borderRadius:10,color:C.text,padding:"10px 14px",fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",width:"100%",boxSizing:"border-box"}}/>
            </div>
          ))}
          <button className="btn-primary" style={{width:"100%",marginTop:10}} onClick={()=>{setModal(null);toast("Goals updated!");}}>Save Goals</button>
        </div>
      </Modal>
    </div>
  );
}