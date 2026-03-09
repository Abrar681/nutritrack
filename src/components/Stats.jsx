import { C } from "../constants";
import { Icons } from "./UI";

export default function Stats({ last7, goals, setModal, isMobile }) {
  const ad = last7.filter(d=>d.cal>0);
  const avg = ad.length>0 ? Math.round(ad.reduce((a,d)=>a+d.cal,0)/ad.length) : 0;
  const streak = (()=>{ let s=0; for(let i=6;i>=0;i--){ if(last7[i].cal>0)s++; else break; } return s; })();
  const maxC = Math.max(...last7.map(d=>d.cal), goals.calories, 1);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{fontSize:22,fontWeight:700,color:C.text}}>Weekly Statistics</div>

      {/* Bar Chart */}
      <div style={{background:C.card,borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(26,43,74,0.06)"}}>
        <div style={{fontWeight:700,fontSize:16,color:C.text,marginBottom:22}}>7-Day Calorie History</div>
        <div style={{display:"flex",alignItems:"flex-end",gap:isMobile?6:16,height:160}}>
          {last7.map((d,i)=>{
            const h = d.cal>0 ? Math.max((d.cal/maxC)*140,8) : 8;
            return (
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                {d.cal>0&&<div style={{fontSize:9,color:C.dim,fontWeight:600}}>{d.cal}</div>}
                <div style={{width:"100%",height:h,background:d.isToday?`linear-gradient(180deg,${C.accentL},${C.accent})`:(d.cal>goals.calories?`${C.red}88`:C.accentLL),borderRadius:"6px 6px 3px 3px",transition:"all 0.5s",border:d.isToday?`1.5px solid ${C.accent}`:`1px solid ${C.border}`}}/>
                <div style={{fontSize:10,color:d.isToday?C.accent:C.dim,fontWeight:d.isToday?700:500}}>{d.lbl}</div>
              </div>
            );
          })}
        </div>
        <div style={{display:"flex",gap:16,marginTop:14,justifyContent:"flex-end",flexWrap:"wrap"}}>
          {[{c:`linear-gradient(${C.accentL},${C.accent})`,l:"Today"},{c:C.accentLL,l:"Past days"},{c:`${C.red}88`,l:"Over goal"}].map(x=>(
            <div key={x.l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:C.muted}}>
              <div style={{width:10,height:10,borderRadius:3,background:x.c,border:`1px solid ${C.border}`}}/>{x.l}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {[
          {icon:Icons.activity,l:"Avg Calories",v:avg,u:"kcal/day",c:C.orange,bg:C.orangeL},
          {icon:Icons.diary,l:"Days Logged",v:ad.length,u:"/ 7 days",c:C.accent,bg:C.accentLL},
          {icon:Icons.zap,l:"Current Streak",v:streak,u:"days",c:C.purple,bg:C.purpleL}
        ].map(s=>(
          <div key={s.l} style={{background:C.card,borderRadius:14,padding:isMobile?16:22,textAlign:"center",border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(26,43,74,0.06)"}}>
            <div style={{width:48,height:48,borderRadius:13,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",color:s.c,margin:"0 auto 12px"}}>{s.icon}</div>
            <div style={{fontSize:isMobile?24:30,fontWeight:700,color:s.c}}>{s.v}</div>
            <div style={{fontSize:12,color:C.muted,marginTop:3,fontWeight:500}}>{s.u}</div>
            <div style={{fontSize:12,color:C.dim,marginTop:4}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Goals */}
      <div style={{background:C.card,borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(26,43,74,0.06)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontWeight:700,fontSize:16,color:C.text}}>Nutrition Goals</div>
          <button className="btn-ghost" onClick={()=>setModal("goals")}><span style={{display:"flex",alignItems:"center",gap:5}}>{Icons.edit} Edit</span></button>
        </div>
        {[{l:"Calories",v:goals.calories,u:"kcal",c:C.orange,bg:C.orangeL},{l:"Protein",v:goals.protein,u:"g",c:C.orange,bg:C.orangeL},{l:"Carbs",v:goals.carbs,u:"g",c:C.accent,bg:C.accentLL},{l:"Fat",v:goals.fat,u:"g",c:C.yellow,bg:C.yellowL},{l:"Fiber",v:goals.fiber,u:"g",c:C.green,bg:C.greenL}].map(g=>(
          <div key={g.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:`1px solid ${C.border}`}}>
            <span style={{color:C.muted,fontSize:14,fontWeight:500}}>{g.l}</span>
            <span style={{color:g.c,fontWeight:700,background:g.bg,padding:"3px 14px",borderRadius:99,fontSize:13}}>{g.v} {g.u}</span>
          </div>
        ))}
      </div>
    </div>
  );
}