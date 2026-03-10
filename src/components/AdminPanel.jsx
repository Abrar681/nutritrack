import { useState, useEffect } from "react";
import { collection, onSnapshot, deleteDoc, doc, writeBatch, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { C } from "../constants";
import { Icons } from "./UI";

export default function AdminPanel({ isMobile }) {
  const [view, setView]             = useState("dashboard");
  const [stats, setStats]           = useState({totalUsers:0,activeToday:0,totalVisits:0,todayVisits:0});
  const [users, setUsers]           = useState([]);
  const [recentActive, setRecentActive] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [deleting, setDeleting]     = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);

  useEffect(()=>{
    const today = new Date().toISOString().split("T")[0];
    let usersData   = [];
    let visitsData  = [];
    let loadedCount = 0;

    const processData = () => {
      // Stats
      const todayVisits  = visitsData.filter(v=>v.date===today);
      const activeToday  = [...new Set(todayVisits.map(v=>v.userId))];
      const sorted       = [...visitsData].sort((a,b)=>(b.date||"").localeCompare(a.date||"")).slice(0,10);

      setStats({
        totalUsers:  usersData.length,
        activeToday: activeToday.length,
        totalVisits: visitsData.length,
        todayVisits: todayVisits.length,
      });
      setUsers([...usersData].sort((a,b)=>(b.joinDate||"").localeCompare(a.joinDate||"")));
      setRecentActive(sorted);
      if(loadedCount < 2) { loadedCount++; if(loadedCount===2) setLoading(false); }
    };

    // Real-time listener for users
    const unsubUsers = onSnapshot(collection(db,"users"), snap=>{
      usersData = snap.docs.map(d=>({id:d.id,...d.data()}));
      processData();
    }, e=>{ console.log("Users listener error:",e); setLoading(false); });

    // Real-time listener for visits
    const unsubVisits = onSnapshot(collection(db,"visits"), snap=>{
      visitsData = snap.docs.map(d=>({id:d.id,...d.data()}));
      processData();
    }, e=>{ console.log("Visits listener error:",e); setLoading(false); });

    // Cleanup listeners when admin panel unmounts
    return () => { unsubUsers(); unsubVisits(); };
  },[]);

  // Delete user + all their visits
  const deleteUser = async (user) => {
    setDeleting(user.uid);
    try {
      await deleteDoc(doc(db,"users", user.uid));
      const visitsSnap = await getDocs(collection(db,"visits"));
      const batch = writeBatch(db);
      visitsSnap.docs.forEach(d=>{ if(d.data().userId===user.uid) batch.delete(d.ref); });
      await batch.commit();
      setConfirmDel(null);
      // No need to update state manually — onSnapshot will auto-update! ✅
    } catch(e){ console.log("Delete error:",e); alert("Delete failed: "+e.message); }
    finally { setDeleting(null); }
  };

  const card = {background:C.card,borderRadius:14,padding:20,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(26,43,74,0.06)"};

  const Avatar = ({name,size=36}) => (
    <div style={{width:size,height:size,borderRadius:"50%",background:"linear-gradient(135deg,#3A7BD5,#2B6CB0)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:size*0.38,color:"white",flexShrink:0}}>
      {(name||"?")[0].toUpperCase()}
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>

      {/* Confirm Delete Modal */}
      {confirmDel&&(
        <div onClick={()=>setConfirmDel(null)} style={{position:"fixed",inset:0,background:"rgba(26,43,74,0.6)",backdropFilter:"blur(8px)",zIndex:5000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.card,borderRadius:20,width:"100%",maxWidth:380,padding:28,boxShadow:"0 24px 60px rgba(26,43,74,0.25)",border:`1px solid ${C.border}`,textAlign:"center"}}>
            <div style={{width:56,height:56,borderRadius:16,background:C.redL,display:"flex",alignItems:"center",justifyContent:"center",color:C.red,margin:"0 auto 16px",fontSize:24}}>🗑️</div>
            <div style={{fontSize:18,fontWeight:700,color:C.text,marginBottom:8}}>Delete User?</div>
            <div style={{background:C.bg,borderRadius:12,padding:"12px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
              <Avatar name={confirmDel.name} size={40}/>
              <div style={{textAlign:"left"}}>
                <div style={{fontWeight:700,fontSize:15,color:C.text}}>{confirmDel.name}</div>
                <div style={{fontSize:12,color:C.muted}}>Joined: {confirmDel.joinDate||"—"}</div>
              </div>
            </div>
            <div style={{background:C.redL,border:`1px solid ${C.red}44`,borderRadius:10,padding:"10px 14px",fontSize:12,color:C.red,marginBottom:20,fontWeight:600}}>
              ⚠️ This will permanently delete the user and all their visit history!
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setConfirmDel(null)} style={{flex:1,background:"transparent",border:`1.5px solid ${C.border}`,color:C.muted,padding:11,borderRadius:10,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:14}}>Cancel</button>
              <button onClick={()=>deleteUser(confirmDel)} disabled={deleting===confirmDel.uid}
                style={{flex:2,background:"linear-gradient(135deg,#C53030,#E53E3E)",border:"none",color:"white",padding:11,borderRadius:10,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:14,opacity:deleting===confirmDel.uid?0.6:1}}>
                {deleting===confirmDel.uid?"Deleting...":"🗑️ Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${C.sidebar},#2B4B8C)`,borderRadius:16,padding:"20px 24px",color:"white",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,boxShadow:"0 8px 24px rgba(26,43,74,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:48,height:48,borderRadius:13,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>{Icons.admin}</div>
          <div>
            <div style={{fontSize:20,fontWeight:700}}>Admin Dashboard</div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:"#68D391"}}/>
              <span style={{fontSize:12,opacity:0.8}}>Live • Updates automatically</span>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          {[{id:"dashboard",label:"📊 Dashboard"},{id:"users",label:"👥 Users"}].map(t=>(
            <button key={t.id} onClick={()=>setView(t.id)} style={{padding:"8px 18px",borderRadius:10,border:"none",background:view===t.id?"white":"rgba(255,255,255,0.15)",color:view===t.id?C.sidebar:"white",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer",transition:"all 0.2s"}}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {loading?(
        <div style={{...card,textAlign:"center",padding:56}}>
          <div style={{fontSize:36,marginBottom:12}}>⏳</div>
          <div style={{color:C.muted,fontWeight:600}}>Loading live data...</div>
        </div>
      ) : view==="dashboard" ? (
        <>
          {/* Stat Cards */}
          <div style={{display:"grid",gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`,gap:14}}>
            {[
              {icon:Icons.users,   l:"Total Users",    v:stats.totalUsers,  u:"registered",   c:C.accent, bg:C.accentLL, onClick:()=>setView("users")},
              {icon:Icons.activity,l:"Active Today",   v:stats.activeToday, u:"users online",  c:C.green,  bg:C.greenL},
              {icon:Icons.target,  l:"Total Visits",   v:stats.totalVisits, u:"all time",      c:C.orange, bg:C.orangeL},
              {icon:Icons.zap,     l:"Today's Visits", v:stats.todayVisits, u:"sessions",      c:C.purple, bg:C.purpleL},
            ].map(s=>(
              <div key={s.l} onClick={s.onClick}
                style={{...card,cursor:s.onClick?"pointer":"default",transition:"all 0.2s"}}
                onMouseEnter={e=>{if(s.onClick){e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.transform="translateY(-2px)";}}}
                onMouseLeave={e=>{if(s.onClick){e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="none";}}}>
                <div style={{width:40,height:40,borderRadius:10,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",color:s.c,marginBottom:12}}>{s.icon}</div>
                <div style={{fontSize:28,fontWeight:700,color:s.c}}>{s.v}</div>
                <div style={{fontSize:11,color:C.muted,marginTop:2}}>{s.u}</div>
                <div style={{fontSize:12,color:C.dim,marginTop:2,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  {s.l}{s.onClick&&<span style={{color:C.accent,fontSize:10,fontWeight:700}}>View →</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Active */}
          <div style={card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontWeight:700,fontSize:16,color:C.text}}>Recent Active Users</div>
              <button onClick={()=>setView("users")} style={{background:C.accentLL,border:"none",color:C.accent,padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>View All →</button>
            </div>
            {recentActive.length===0?(
              <div style={{textAlign:"center",padding:"30px 20px",color:C.dim}}>
                <div style={{fontSize:28,marginBottom:8}}>📊</div>No activity yet — share your app!
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:2}}>
                {recentActive.map((v,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 12px",borderRadius:10,background:i%2===0?C.bg:"transparent"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <Avatar name={v.userName||"A"} size={36}/>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:C.text}}>{v.userName||"Anonymous"}</div>
                        <div style={{fontSize:11,color:C.muted}}>ID: {v.userId?.slice(0,10)||"—"}</div>
                      </div>
                    </div>
                    <div style={{fontSize:12,color:C.accent,fontWeight:600,background:C.accentLL,padding:"3px 10px",borderRadius:99}}>{v.date||"Today"}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* App Info */}
          <div style={card}>
            <div style={{fontWeight:700,fontSize:16,color:C.text,marginBottom:16}}>App Information</div>
            {[
              {l:"App Name",   v:"NutriTrack"},
              {l:"Live URL",   v:"mydiet-track.netlify.app"},
              {l:"Database",   v:"Firebase Firestore"},
              {l:"Location",   v:"asia-south1 (Mumbai)"},
              {l:"Plan",       v:"Spark (Free)"},
              {l:"Food Items", v:"150+ Indian & Global"},
              {l:"Status",     v:"🟢 Online"},
            ].map(r=>(
              <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:`1px solid ${C.border}`}}>
                <span style={{color:C.muted,fontSize:14}}>{r.l}</span>
                <span style={{color:C.text,fontWeight:600,fontSize:14}}>{r.v}</span>
              </div>
            ))}
          </div>
        </>
      ):(
        // ── USERS VIEW ──
        <div style={card}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
            <div>
              <div style={{fontWeight:700,fontSize:18,color:C.text}}>Registered Users</div>
              <div style={{fontSize:13,color:C.muted,marginTop:3}}>{users.length} total users · live</div>
            </div>
            <button onClick={()=>setView("dashboard")} style={{background:C.bg,border:`1.5px solid ${C.border}`,color:C.muted,padding:"8px 16px",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>← Back</button>
          </div>

          {users.length===0?(
            <div style={{textAlign:"center",padding:"40px 20px"}}>
              <div style={{fontSize:36,marginBottom:12}}>👥</div>
              <div style={{color:C.muted,fontWeight:600,fontSize:15}}>No users yet</div>
              <div style={{color:C.dim,fontSize:13,marginTop:6}}>Share your app to get users!</div>
            </div>
          ):(
            <>
              {!isMobile&&(
                <div style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1.5fr 1fr 80px",gap:12,padding:"10px 14px",background:C.bg,borderRadius:10,marginBottom:6}}>
                  {["User Name","User ID","Joined Date","Last Active","Action"].map(h=>(
                    <span key={h} style={{fontSize:11,color:C.dim,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"}}>{h}</span>
                  ))}
                </div>
              )}
              {users.map((u,i)=>(
                <div key={u.id} style={{display:"grid",gridTemplateColumns:isMobile?"1fr auto":"2fr 1.5fr 1.5fr 1fr 80px",gap:12,padding:"13px 14px",borderRadius:10,alignItems:"center",background:i%2===0?C.bg:"transparent",marginBottom:2}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <Avatar name={u.name||"?"} size={38}/>
                    <div>
                      <div style={{fontSize:14,fontWeight:700,color:C.text}}>{u.name||"Unknown"}</div>
                      {isMobile&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>Joined: {u.joinDate||"—"} · Last: {u.lastActive||"—"}</div>}
                    </div>
                  </div>
                  {!isMobile&&<>
                    <span style={{fontSize:12,color:C.muted,fontFamily:"monospace"}}>{u.uid?.slice(0,12)||"—"}...</span>
                    <span style={{fontSize:13,color:C.green,fontWeight:600,background:C.greenL,padding:"4px 12px",borderRadius:99,textAlign:"center"}}>{u.joinDate||"—"}</span>
                    <span style={{fontSize:12,color:u.lastActive===new Date().toISOString().split("T")[0]?C.accent:C.dim,fontWeight:600}}>{u.lastActive||"—"}</span>
                  </>}
                  <button onClick={()=>setConfirmDel(u)} disabled={deleting===u.uid}
                    style={{background:C.redL,border:`1.5px solid ${C.red}44`,color:C.red,padding:"7px 12px",borderRadius:9,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",gap:5,transition:"all 0.2s",opacity:deleting===u.uid?0.5:1}}
                    onMouseEnter={e=>{e.currentTarget.style.background=C.red;e.currentTarget.style.color="white";}}
                    onMouseLeave={e=>{e.currentTarget.style.background=C.redL;e.currentTarget.style.color=C.red;}}>
                    {deleting===u.uid?"...":Icons.trash}{!isMobile&&" Delete"}
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}