import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import { C } from "../constants";
import { Icons } from "./UI";

export default function AdminPanel({ isMobile }) {
  const [stats, setStats] = useState({ totalVisits:0, todayVisits:0, totalUsers:0, activeToday:0 });
  const [recentVisits, setRecentVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const visitsRef = collection(db, "visits");
        const snap = await getDocs(visitsRef);
        const today = new Date().toISOString().split("T")[0];
        const visits = snap.docs.map(d=>d.data());
        const todayV = visits.filter(v=>v.date===today);
        const uniqueToday = [...new Set(todayV.map(v=>v.userId))];
        const uniqueTotal = [...new Set(visits.map(v=>v.userId))];
        setStats({
          totalVisits: visits.length,
          todayVisits: todayV.length,
          totalUsers: uniqueTotal.length,
          activeToday: uniqueToday.length,
        });
        setRecentVisits(visits.slice(-10).reverse());
      } catch(e) {
        console.log("Firebase error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const card = {background:C.card,borderRadius:14,padding:20,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(26,43,74,0.06)"};

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${C.sidebar},#2B4B8C)`,borderRadius:16,padding:"20px 24px",color:"white",display:"flex",alignItems:"center",gap:14,boxShadow:"0 8px 24px rgba(26,43,74,0.2)"}}>
        <div style={{width:48,height:48,borderRadius:13,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>{Icons.admin}</div>
        <div>
          <div style={{fontSize:20,fontWeight:700}}>Admin Dashboard</div>
          <div style={{fontSize:13,opacity:0.7}}>NutriTrack user analytics</div>
        </div>
      </div>

      {loading?(
        <div style={{...card,textAlign:"center",padding:48}}>
          <div style={{fontSize:32,marginBottom:12}}>⏳</div>
          <div style={{color:C.muted}}>Loading analytics...</div>
        </div>
      ):(
        <>
          {/* Stats Grid */}
          <div style={{display:"grid",gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`,gap:14}}>
            {[
              {icon:Icons.users,l:"Total Users",v:stats.totalUsers,u:"registered",c:C.accent,bg:C.accentLL},
              {icon:Icons.activity,l:"Active Today",v:stats.activeToday,u:"users",c:C.green,bg:C.greenL},
              {icon:Icons.target,l:"Total Visits",v:stats.totalVisits,u:"all time",c:C.orange,bg:C.orangeL},
              {icon:Icons.zap,l:"Today's Visits",v:stats.todayVisits,u:"sessions",c:C.purple,bg:C.purpleL},
            ].map(s=>(
              <div key={s.l} style={card}>
                <div style={{width:40,height:40,borderRadius:10,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",color:s.c,marginBottom:12}}>{s.icon}</div>
                <div style={{fontSize:28,fontWeight:700,color:s.c}}>{s.v}</div>
                <div style={{fontSize:11,color:C.muted,marginTop:2}}>{s.u}</div>
                <div style={{fontSize:12,color:C.dim,marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div style={card}>
            <div style={{fontWeight:700,fontSize:16,color:C.text,marginBottom:16}}>Recent Activity</div>
            {recentVisits.length===0?(
              <div style={{textAlign:"center",padding:"30px 20px",color:C.dim}}>
                <div style={{fontSize:28,marginBottom:8}}>📊</div>
                No visits recorded yet. Share your app to get users!
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:2}}>
                {recentVisits.map((v,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",borderRadius:9,background:i%2===0?C.bg:"transparent"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:32,height:32,borderRadius:8,background:C.accentLL,display:"flex",alignItems:"center",justifyContent:"center",color:C.accent,fontSize:13,fontWeight:700}}>{v.userId?.slice(0,2).toUpperCase()||"AN"}</div>
                      <div>
                        <div style={{fontSize:13,fontWeight:600,color:C.text}}>User {v.userId?.slice(0,8)||"Anonymous"}</div>
                        <div style={{fontSize:11,color:C.muted}}>{v.page||"Dashboard"}</div>
                      </div>
                    </div>
                    <div style={{fontSize:11,color:C.dim}}>{v.date||"Today"}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* App Info */}
          <div style={card}>
            <div style={{fontWeight:700,fontSize:16,color:C.text,marginBottom:16}}>App Information</div>
            {[
              {l:"App Name",v:"NutriTrack"},
              {l:"Live URL",v:"mydiet-track.netlify.app"},
              {l:"Database",v:"Firebase Firestore"},
              {l:"Location",v:"asia-south1 (Mumbai)"},
              {l:"Plan",v:"Spark (Free)"},
              {l:"Status",v:"🟢 Online"},
            ].map(r=>(
              <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:`1px solid ${C.border}`}}>
                <span style={{color:C.muted,fontSize:14}}>{r.l}</span>
                <span style={{color:C.text,fontWeight:600,fontSize:14}}>{r.v}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}