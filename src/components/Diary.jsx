import { C, MEALS } from "../constants";
import { Badge, Icons } from "./UI";

export default function Diary({ tot, dl, mCal, meal, setMeal, setModal, delFood, isMobile }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:22,fontWeight:700,color:C.text}}>Food Diary</div>
        <button className="btn-primary" onClick={()=>setModal("add")}>
          <span style={{display:"flex",alignItems:"center",gap:6}}>{Icons.plus} Add Food</span>
        </button>
      </div>

      {/* Meal Tabs */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {MEALS.map(m=>(
          <button key={m} onClick={()=>setMeal(m)} style={{flex:isMobile?"1 0 40%":"none",padding:"9px 20px",borderRadius:10,border:`1.5px solid ${meal===m?C.accent:C.border}`,background:meal===m?C.accentLL:"transparent",color:meal===m?C.accent:C.muted,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:meal===m?700:500,transition:"all 0.2s"}}>{m}</button>
        ))}
      </div>

      {/* Food Table */}
      <div style={{background:C.card,borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(26,43,74,0.06)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{fontWeight:700,fontSize:17,color:C.text}}>{meal}</div>
          <div style={{color:C.accent,fontWeight:700,background:C.accentLL,padding:"5px 14px",borderRadius:99,fontSize:14}}>{mCal(meal)} kcal</div>
        </div>

        {(dl[meal]||[]).length===0?(
          <div style={{textAlign:"center",padding:"50px 20px"}}>
            <div style={{width:60,height:60,borderRadius:16,background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",color:C.dim}}>{Icons.diary}</div>
            <div style={{fontSize:15,color:C.muted,fontWeight:600,marginBottom:6}}>No food logged for {meal}</div>
            <div style={{fontSize:13,color:C.dim,marginBottom:20}}>Start tracking your nutrition!</div>
            <button className="btn-primary" onClick={()=>setModal("add")}>
              <span style={{display:"flex",alignItems:"center",gap:6}}>{Icons.plus} Add Food</span>
            </button>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:2}}>
            {!isMobile&&(
              <div style={{display:"grid",gridTemplateColumns:"1fr 70px 62px 62px 62px 40px",gap:8,padding:"8px 12px",color:C.dim,fontSize:11,textTransform:"uppercase",letterSpacing:"0.06em",borderBottom:`1.5px solid ${C.border}`,marginBottom:4}}>
                <span>Food Item</span>
                <span style={{textAlign:"center"}}>Cal</span>
                <span style={{textAlign:"center"}}>Pro</span>
                <span style={{textAlign:"center"}}>Carb</span>
                <span style={{textAlign:"center"}}>Fat</span>
                <span/>
              </div>
            )}
            {(dl[meal]||[]).map(food=>(
              <div key={food.uid} className="food-row" style={{display:"grid",gridTemplateColumns:isMobile?"1fr auto":"1fr 70px 62px 62px 62px 40px",gap:8,padding:"12px",borderRadius:10,alignItems:"center",transition:"all 0.2s"}}>
                <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <Badge cat={food.cat}>{food.cat}</Badge>
                    <span style={{fontSize:13,fontWeight:600,color:C.text}}>{food.name}</span>
                  </div>
                  {isMobile&&<div style={{fontSize:11,color:C.muted}}>P:{food.pro}g · C:{food.carb}g · F:{food.fat}g</div>}
                </div>
                {isMobile?(
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{color:C.accent,fontWeight:700,background:C.accentLL,padding:"3px 10px",borderRadius:8}}>{food.cal}</span>
                    <button className="delete-btn" onClick={()=>delFood(meal,food.uid)}>{Icons.trash}</button>
                  </div>
                ):(
                  <>
                    <span style={{textAlign:"center",fontSize:13,fontWeight:700,color:C.accent,background:C.accentLL,borderRadius:8,padding:"3px 0"}}>{food.cal}</span>
                    <span style={{textAlign:"center",fontSize:13,color:C.orange,fontWeight:600}}>{food.pro}g</span>
                    <span style={{textAlign:"center",fontSize:13,color:C.accent,fontWeight:600}}>{food.carb}g</span>
                    <span style={{textAlign:"center",fontSize:13,color:C.yellow,fontWeight:600}}>{food.fat}g</span>
                    <button className="delete-btn" onClick={()=>delFood(meal,food.uid)}>{Icons.trash}</button>
                  </>
                )}
              </div>
            ))}
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr auto":"1fr 70px 62px 62px 62px 40px",gap:8,padding:"12px",borderTop:`1.5px solid ${C.border}`,marginTop:8,background:C.bg,borderRadius:"0 0 10px 10px"}}>
              <span style={{fontWeight:700,fontSize:13,color:C.text}}>Meal Total</span>
              <span style={{textAlign:"center",fontSize:14,fontWeight:700,color:C.accent}}>{mCal(meal)}</span>
              {!isMobile&&<>
                <span style={{textAlign:"center",fontSize:13,fontWeight:700,color:C.orange}}>{Math.round((dl[meal]||[]).reduce((a,f)=>a+f.pro,0))}g</span>
                <span style={{textAlign:"center",fontSize:13,fontWeight:700,color:C.accent}}>{Math.round((dl[meal]||[]).reduce((a,f)=>a+f.carb,0))}g</span>
                <span style={{textAlign:"center",fontSize:13,fontWeight:700,color:C.yellow}}>{Math.round((dl[meal]||[]).reduce((a,f)=>a+f.fat,0))}g</span>
                <span/>
              </>}
            </div>
          </div>
        )}
      </div>

      {/* Day Total */}
      <div style={{background:C.card,borderRadius:16,padding:20,border:`1px solid ${C.border}`,display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,textAlign:"center",boxShadow:"0 2px 8px rgba(26,43,74,0.06)"}}>
        {[{l:"Calories",v:Math.round(tot.calories),u:"kcal",c:C.orange,bg:C.orangeL},{l:"Protein",v:Math.round(tot.protein),u:"g",c:C.orange,bg:C.orangeL},{l:"Carbs",v:Math.round(tot.carbs),u:"g",c:C.accent,bg:C.accentLL},{l:"Fat",v:Math.round(tot.fat),u:"g",c:C.yellow,bg:C.yellowL},{l:"Fiber",v:Math.round(tot.fiber),u:"g",c:C.green,bg:C.greenL}].map(s=>(
          <div key={s.l} style={{background:s.bg,borderRadius:10,padding:"12px 6px"}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:4,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em"}}>{s.l}</div>
            <div style={{fontSize:isMobile?14:18,fontWeight:700,color:s.c}}>{s.v}<span style={{fontSize:10,color:C.muted,fontWeight:400}}>{s.u}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}