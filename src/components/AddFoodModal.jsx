import { useState } from "react";
import { FOODS, MEALS, C } from "../constants";
import { Badge, Icons } from "./UI";

export default function AddFoodModal({ open, onClose, meal, setMeal, addFood, onCustom }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const cats = ["All","Indian","Protein","Grains","Fruit","Vegetable","Dairy","Nuts","Legumes","Fats"];
  const filtered = FOODS.filter(f=>(f.name.toLowerCase().includes(search.toLowerCase())||f.cat.toLowerCase().includes(search.toLowerCase()))&&(catFilter==="All"||f.cat===catFilter));

  const handleClose = () => { setSearch(""); setCatFilter("All"); onClose(); };

  if(!open) return null;
  return (
    <div onClick={handleClose} style={{position:"fixed",inset:0,background:"rgba(26,43,74,0.5)",backdropFilter:"blur(8px)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.card,borderRadius:20,width:"100%",maxWidth:520,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 24px 60px rgba(26,43,74,0.2)",border:`1px solid ${C.border}`}}>
        <div style={{padding:22}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontSize:20,fontWeight:700,color:C.text}}>Add Food</div>
            <button onClick={handleClose} style={{background:C.bg,border:`1px solid ${C.border}`,color:C.muted,width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>

          {/* Meal selector */}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:600}}>Add to Meal</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {MEALS.map(m=><button key={m} onClick={()=>setMeal(m)} style={{padding:"7px 14px",borderRadius:8,border:`1.5px solid ${meal===m?C.accent:C.border}`,background:meal===m?C.accentLL:"white",color:meal===m?C.accent:C.muted,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:meal===m?700:500,transition:"all 0.2s"}}>{m}</button>)}
            </div>
          </div>

          {/* Search */}
          <div style={{position:"relative",marginBottom:10}}>
            <div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:C.muted}}>{Icons.plus}</div>
            <input placeholder="Search foods (dosa, chicken, rice...)" value={search} onChange={e=>setSearch(e.target.value)}
              style={{background:"white",border:`1.5px solid ${C.border}`,borderRadius:10,color:C.text,padding:"10px 14px 10px 36px",fontSize:14,fontFamily:"'Inter',sans-serif",outline:"none",width:"100%",boxSizing:"border-box"}} autoFocus/>
          </div>

          {/* Category chips */}
          <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:8,marginBottom:6,scrollbarWidth:"none"}}>
            {cats.map(c=><button key={c} className={`cat-chip ${catFilter===c?"active":""}`} onClick={()=>setCatFilter(c)}>{c}</button>)}
          </div>
          <div style={{fontSize:11,color:C.dim,marginBottom:8,fontWeight:500}}>{filtered.length} items found</div>

          {/* Food List */}
          <div style={{maxHeight:290,overflowY:"auto",display:"flex",flexDirection:"column",gap:2}}>
            {filtered.map(food=>(
              <div key={food.id} className="food-row" onClick={()=>{ addFood(food); handleClose(); }}
                style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 10px",borderRadius:10,cursor:"pointer",transition:"all 0.15s"}}>
                <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <Badge cat={food.cat}>{food.cat}</Badge>
                    <span style={{fontWeight:600,fontSize:13,color:C.text}}>{food.name}</span>
                  </div>
                  <div style={{fontSize:11,color:C.muted}}>P:{food.pro}g · C:{food.carb}g · F:{food.fat}g · Fiber:{food.fib}g</div>
                </div>
                <div style={{textAlign:"right",marginLeft:14,flexShrink:0}}>
                  <div style={{color:C.accent,fontWeight:700,fontSize:17,background:C.accentLL,padding:"3px 10px",borderRadius:8}}>{food.cal}</div>
                  <div style={{fontSize:10,color:C.dim,marginTop:2}}>kcal</div>
                </div>
              </div>
            ))}
            {filtered.length===0&&(
              <div style={{textAlign:"center",padding:28,color:C.dim}}>
                <div style={{width:40,height:40,borderRadius:10,background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px",color:C.muted}}>{Icons.diary}</div>
                No foods found — try different search
              </div>
            )}
          </div>
          <div style={{borderTop:`1px solid ${C.border}`,marginTop:12,paddingTop:12}}>
            <button className="btn-ghost" style={{width:"100%"}} onClick={()=>{ handleClose(); onCustom(); }}>
              <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>{Icons.plus} Add Custom Food</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}