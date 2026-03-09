import { C, MEALS } from "../constants";
import { Ring, BarRow, StatCard, Icons } from "./UI";

export default function Dashboard({ tot, goals, dl, mCal, date, today, prof, tdee, bmr, water, setWater, setModal, setTab, setMeal, isMobile }) {
  const rem = goals.calories - tot.calories;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      {/* Welcome Banner */}
      <div style={{background:`linear-gradient(135deg, ${C.sidebar}, #2B4B8C)`,borderRadius:18,padding:isMobile?"20px":"26px 32px",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,boxShadow:"0 8px 32px rgba(26,43,74,0.25)"}}>
        <div>
          <div style={{fontSize:isMobile?16:20,fontWeight:700,marginBottom:4}}>
            Good {new Date().getHours()<12?"Morning":"Afternoon"}, {prof.name}! 👋
          </div>
          <div style={{fontSize:13,opacity:0.75}}>{date===today?"Today's nutrition summary":"Viewing: "+date}</div>
        </div>
        <button className="btn-white" onClick={()=>setModal("add")}>
          <span style={{display:"flex",alignItems:"center",gap:6}}>{Icons.plus} Add Food</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{display:"grid",gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`,gap:14}}>
        <StatCard icon={Icons.activity} label="Consumed" val={Math.round(tot.calories)} unit="kcal today" color={C.orange} lightColor={C.orangeL}/>
        <StatCard icon={Icons.zap} label="Remaining" val={Math.max(0,Math.round(rem))} unit="kcal left" color={rem<0?C.red:C.accent} lightColor={rem<0?C.redL:C.accentLL}/>
        <StatCard icon={Icons.target} label="Daily Goal" val={goals.calories} unit="kcal target" color={C.accent} lightColor={C.accentLL}/>
        <StatCard icon={Icons.droplet} label="Hydration" val={water} unit="/ 8 glasses" color="#2196A6" lightColor="#E0F4F6"/>
      </div>

      {/* Calorie Ring + Macros */}
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1.5fr",gap:18}}>
        <div style={{background:C.card,borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(26,43,74,0.06)",display:"flex",flexDirection:"column",alignItems:"center",gap:18}}>
          <div style={{fontWeight:700,fontSize:16,color:C.text,alignSelf:"flex-start"}}>Calorie Progress</div>
          <Ring value={tot.calories} max={goals.calories} size={180} sw={16} color={tot.calories>goals.calories?C.red:C.accent} label="Calories" bgColor={C.accentLL}/>
          <div style={{display:"flex",gap:8,width:"100%"}}>
            {[{l:"Eaten",v:Math.round(tot.calories),c:C.orange},{l:"Left",v:Math.max(0,Math.round(rem)),c:C.accent},{l:"Goal",v:goals.calories,c:C.purple}].map(s=>(
              <div key={s.l} style={{flex:1,textAlign:"center",background:C.bg,borderRadius:10,padding:"10px 4px",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:15,fontWeight:700,color:s.c}}>{s.v}</div>
                <div style={{fontSize:10,color:C.muted,marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
          {rem<0&&<div style={{background:C.redL,border:`1px solid ${C.red}44`,borderRadius:10,padding:"9px 14px",fontSize:12,color:C.red,textAlign:"center",width:"100%",fontWeight:600}}>⚠️ Over goal by {Math.abs(Math.round(rem))} kcal</div>}
        </div>

        <div style={{background:C.card,borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(26,43,74,0.06)"}}>
          <div style={{fontWeight:700,fontSize:16,color:C.text,marginBottom:18}}>Macronutrients</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
            <Ring value={tot.protein} max={goals.protein} size={72} sw={6} color={C.orange} label="Protein" bgColor={C.orangeL}/>
            <Ring value={tot.carbs} max={goals.carbs} size={72} sw={6} color={C.accent} label="Carbs" bgColor={C.accentLL}/>
            <Ring value={tot.fat} max={goals.fat} size={72} sw={6} color={C.yellow} label="Fat" bgColor={C.yellowL}/>
            <Ring value={tot.fiber} max={goals.fiber} size={72} sw={6} color={C.green} label="Fiber" bgColor={C.greenL}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <BarRow label="Protein" value={tot.protein} max={goals.protein} color={C.orange} lightColor={C.orangeL}/>
            <BarRow label="Carbohydrates" value={tot.carbs} max={goals.carbs} color={C.accent} lightColor={C.accentLL}/>
            <BarRow label="Fat" value={tot.fat} max={goals.fat} color={C.yellow} lightColor={C.yellowL}/>
            <BarRow label="Fiber" value={tot.fiber} max={goals.fiber} color={C.green} lightColor={C.greenL}/>
          </div>
        </div>
      </div>

      {/* Meals */}
      <div style={{background:C.card,borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(26,43,74,0.06)"}}>
        <div style={{fontWeight:700,fontSize:16,color:C.text,marginBottom:16}}>Meal Breakdown</div>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`,gap:14}}>
          {MEALS.map((m,i)=>{
            const cal=mCal(m);
            const mIcons=[Icons.sunrise,Icons.sun,Icons.moon,Icons.apple];
            return (
              <div key={m} onClick={()=>{setTab("diary");setMeal(m);}}
                style={{background:C.bg,borderRadius:12,padding:16,cursor:"pointer",border:`1.5px solid ${C.border}`,transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.boxShadow=`0 4px 16px rgba(43,108,176,0.15)`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none";}}>
                <div style={{width:36,height:36,borderRadius:9,background:C.accentLL,display:"flex",alignItems:"center",justifyContent:"center",color:C.accent,marginBottom:10}}>{mIcons[i]}</div>
                <div style={{fontWeight:700,fontSize:14,color:C.text,marginBottom:4}}>{m}</div>
                <div style={{color:C.accent,fontWeight:700,fontSize:20}}>{cal}<span style={{fontSize:11,color:C.muted,fontWeight:400}}> kcal</span></div>
                <div style={{fontSize:11,color:C.dim,marginTop:3}}>{(dl[m]||[]).length} items</div>
                <div style={{height:3,borderRadius:99,background:C.border,marginTop:10}}>
                  <div style={{height:"100%",width:`${Math.min((cal/goals.calories)*100,100)}%`,background:C.accent,borderRadius:99}}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Water + TDEE */}
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:18}}>
        <div style={{background:C.card,borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(26,43,74,0.06)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontWeight:700,fontSize:16,color:C.text,display:"flex",alignItems:"center",gap:8}}><span style={{color:"#2196A6"}}>{Icons.droplet}</span> Water Intake</div>
            <div style={{color:"#2196A6",fontWeight:700}}>{water}<span style={{fontSize:12,color:C.muted,fontWeight:400}}>/8</span></div>
          </div>
          <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14,flexWrap:"wrap"}}>
            {Array.from({length:8},(_,i)=>(
              <div key={i} onClick={()=>setWater(p=>({...p,[date]:i<water?i:i+1}))}
                style={{width:38,height:50,borderRadius:9,background:i<water?`linear-gradient(180deg,#5DADE2,#2196A6)`:C.bg2,transition:"all 0.3s",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",border:`1.5px solid ${i<water?"#2196A6":C.border}`,boxShadow:i<water?"0 3px 10px rgba(33,150,166,0.3)":"none",fontSize:16,color:"white"}}>
                {i<water?"💧":""}
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setWater(p=>({...p,[date]:Math.max(0,water-1)}))} style={{flex:1,background:"#E0F4F6",border:"1.5px solid #2196A633",color:"#2196A6",padding:11,borderRadius:10,cursor:"pointer",fontSize:18,fontWeight:700,fontFamily:"'Inter',sans-serif",transition:"all 0.2s"}}>−</button>
            <button onClick={()=>setWater(p=>({...p,[date]:Math.min(8,water+1)}))} style={{flex:1,background:"#E0F4F6",border:"1.5px solid #2196A633",color:"#2196A6",padding:11,borderRadius:10,cursor:"pointer",fontSize:18,fontWeight:700,fontFamily:"'Inter',sans-serif",transition:"all 0.2s"}}>+</button>
          </div>
        </div>

        <div style={{background:`linear-gradient(135deg,${C.sidebar},#2B4B8C)`,borderRadius:16,padding:22,border:"none",boxShadow:"0 8px 24px rgba(26,43,74,0.2)",display:"flex",flexDirection:"column",justifyContent:"center",gap:10}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>Daily Energy (TDEE)</div>
          <div style={{fontSize:44,fontWeight:700,color:"white",lineHeight:1}}>{tdee}<span style={{fontSize:14,color:"rgba(255,255,255,0.6)",fontWeight:400}}> kcal</span></div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.75)"}}>Net: <span style={{color:tot.calories-tdee>0?"#FCA5A5":"#86EFAC",fontWeight:700}}>{tot.calories-tdee>0?"+":""}{tot.calories-tdee} kcal</span></div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>BMR: {Math.round(bmr)} · {prof.activity}</div>
          <div style={{height:4,borderRadius:99,background:"rgba(255,255,255,0.15)",marginTop:6}}>
            <div style={{height:"100%",width:`${Math.min((tot.calories/tdee)*100,100)}%`,background:"rgba(255,255,255,0.5)",borderRadius:99}}/>
          </div>
        </div>
      </div>
    </div>
  );
}