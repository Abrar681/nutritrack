import { C } from "../constants";
import { Icons } from "./UI";

export default function Profile({ prof, setProf, goals, setGoals, tdee, bmr, toast, isMobile }) {
  const inp = {background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:10,color:C.text,padding:"10px 14px",fontSize:14,fontFamily:"'Inter',sans-serif",outline:"none",width:"100%",boxSizing:"border-box",transition:"border 0.2s"};

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{fontSize:22,fontWeight:700,color:C.text}}>Profile & Settings</div>

      {/* Profile Header */}
      <div style={{background:`linear-gradient(135deg,${C.sidebar},#2B4B8C)`,borderRadius:16,padding:isMobile?"24px":"32px",textAlign:"center",boxShadow:"0 8px 24px rgba(26,43,74,0.2)"}}>
        <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,0.15)",border:"3px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 14px",color:"white",fontWeight:700}}>{prof.name[0]?.toUpperCase()||"U"}</div>
        <div style={{fontSize:22,fontWeight:700,color:"white"}}>{prof.name}</div>
        <div style={{color:"rgba(255,255,255,0.65)",fontSize:13,marginTop:5}}>{prof.gender==="male"?"♂":"♀"} · {prof.age} yrs · {prof.weight} kg · {prof.height} cm</div>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.12)",borderRadius:99,padding:"8px 20px",marginTop:14}}>
          <span style={{color:"white",fontWeight:700,fontSize:18}}>{tdee}</span>
          <span style={{color:"rgba(255,255,255,0.65)",fontSize:13}}>kcal/day TDEE</span>
        </div>
      </div>

      {/* Personal Info */}
      <div style={{background:C.card,borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(26,43,74,0.06)"}}>
        <div style={{fontWeight:700,fontSize:16,color:C.text,marginBottom:18}}>Personal Information</div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[{l:"Full Name",k:"name",t:"text"},{l:"Age (years)",k:"age",t:"number"},{l:"Weight (kg)",k:"weight",t:"number"},{l:"Height (cm)",k:"height",t:"number"}].map(f=>(
            <div key={f.k}>
              <label style={{display:"block",fontSize:11,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>{f.l}</label>
              <input type={f.t} value={prof[f.k]} onChange={e=>setProf(p=>({...p,[f.k]:f.t==="number"?+e.target.value:e.target.value}))} style={inp}/>
            </div>
          ))}
          <div>
            <label style={{display:"block",fontSize:11,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>Gender</label>
            <div style={{display:"flex",gap:10}}>
              {["male","female"].map(g=>(
                <button key={g} onClick={()=>setProf(p=>({...p,gender:g}))} style={{flex:1,padding:12,borderRadius:10,border:`1.5px solid ${prof.gender===g?C.accent:C.border}`,background:prof.gender===g?C.accentLL:"transparent",color:prof.gender===g?C.accent:C.muted,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontWeight:700,textTransform:"capitalize",transition:"all 0.2s"}}>{g}</button>
              ))}
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
        <button className="btn-primary" style={{width:"100%",marginTop:18}} onClick={()=>toast("Profile saved!")}>
          <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>{Icons.save} Save Profile</span>
        </button>
      </div>

      {/* Goals */}
      <div style={{background:C.card,borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(26,43,74,0.06)"}}>
        <div style={{fontWeight:700,fontSize:16,color:C.text,marginBottom:16}}>Daily Nutrition Goals</div>
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
}