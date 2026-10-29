(function(){
'use strict';
var $=function(id){return document.getElementById(id)};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var b64=function(s){var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u};
var fails=0;
async function decrypt(pw){
  var r=await fetch('data.enc.json',{cache:'no-store',credentials:'omit'}); if(!r.ok) throw new Error('nf');
  var p=await r.json();
  if(p.kdf!=='PBKDF2-SHA256'||p.alg!=='AES-256-GCM'||!(p.iter>=600000)) throw new Error('fmt');
  var enc=new TextEncoder();
  var base=await crypto.subtle.importKey('raw',enc.encode(pw),'PBKDF2',false,['deriveKey']);
  var key=await crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt:b64(p.salt),iterations:p.iter},base,{name:'AES-GCM',length:256},false,['decrypt']);
  var pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:b64(p.iv),additionalData:enc.encode(p.aad),tagLength:128},key,b64(p.ct));
  return JSON.parse(new TextDecoder().decode(pt));
}
$('f').addEventListener('submit',async function(ev){
  ev.preventDefault(); var pw=$('pw').value; if(!pw) return;
  var btn=$('go'); btn.disabled=true; btn.textContent='正在解锁…'; $('err').classList.add('hidden');
  try{ if(!window.crypto||!crypto.subtle) throw new Error('nocrypto');
    var d=await decrypt(pw); $('pw').value=''; pw=null; render(d);
  }catch(e){ fails++; $('pw').value='';
    var m=e&&e.message==='nocrypto'?'当前浏览器不支持安全解密，请换最新版浏览器。':'密码不正确。';
    $('err').textContent=m; $('err').classList.remove('hidden');
    var wait=Math.min(30,fails>2?(fails-2)*5:0);
    if(wait){btn.textContent='请稍候 '+wait+' 秒';await new Promise(function(r){setTimeout(r,wait*1000)})}
  }finally{btn.disabled=false;btn.textContent='进入后台'}
});
function daysTo(s){ if(!s||!/^\d{4}-\d{2}-\d{2}/.test(s)) return null;
  var hk=new Date(Date.now()+8*36e5); var t0=Date.UTC(hk.getUTCFullYear(),hk.getUTCMonth(),hk.getUTCDate());
  var p=s.slice(0,10).split('-'); return Math.round((Date.UTC(+p[0],+p[1]-1,+p[2])-t0)/864e5); }
function dl(s){var n=daysTo(s); if(n===null) return '—'; var c=n<0?'over':(n<=30?'hot':(n<=90?'warm':'ok'));
  return '<span class="d d-'+c+'">'+(n>0?'还有 '+n+' 天':(n===0?'今天':'已过 '+(-n)+' 天'))+'</span>';}
var pct=function(v){return (v===''||v==null)?'—':Math.round(Number(v)*100)+'%'};
var chips=function(o){var k=Object.keys(o||{}); return k.length?k.map(function(x){return '<span class="chip">'+esc(x)+' '+esc(o[x])+'</span>'}).join(''):'—'};
var money=function(n){return Number(n||0).toLocaleString('en-US',{maximumFractionDigits:2})};
var pending=function(t){return '<div class="pending">'+esc(t)+'</div>'};
function tbl(head,rows,cls){return '<div class="tw"><table class="'+(cls||'')+'"><thead><tr>'+head.map(function(h){return '<th>'+esc(h)+'</th>'}).join('')+'</tr></thead><tbody>'+
  rows.map(function(r){return '<tr>'+r.map(function(c,i){return '<td data-l="'+esc(head[i])+'">'+c+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>'}
function render(d){
  var h='<nav class="tabs"><a href="#s1">客户与续签</a><a href="#s2">lead 与小组</a><a href="#s3">数字员工</a><a href="#s4">中介对账</a></nav>';
  h+='<p class="meta">数据快照：'+esc(d['生成时间'])+'（新加坡/香港时间 UTC+8）· 只读快照，不会改动任何数据</p>';
  // ① 客户
  var cs=d['客户']||[];
  h+='<section class="card" id="s1"><h2>① 客户与续签倒计时 <small>续签 Base T1–T6 · '+cs.length+' 位</small></h2>';
  h+=tbl(['客户代号','姓名','身份 / 档位','阶段','逗留期限','续签窗口开日','最迟递交参考日','个人资料','公司资料','完整度（个人/公司）','看板'],
    cs.map(function(c){return [esc(c['客户代号'])+(c['测试']?' <span class="chip t">测试</span>':''),esc(c['姓名']||'—'),esc(c['身份类型'])+' / '+esc(c['服务档位']),esc(c['项目阶段']),
      esc(c['逗留期限'])+'<br>'+dl(c['逗留期限']),esc(c['续签窗口开日'])+'<br>'+dl(c['续签窗口开日']),esc(c['最迟递交参考日'])+'<br>'+dl(c['最迟递交参考日']),
      chips(c['个人资料']),chips(c['公司资料']),pct(c['个人完整度'])+' / '+pct(c['公司完整度']),esc(c['看板链接状态']||'—')]}),'wide');
  var cd=(d['倒计时']||[]).filter(function(x){var n=daysTo(x['锚点日期']);return n!==null&&n>=-7}).slice(0,12);
  h+='<h3>近期节点（未完成提醒，前 12 条）</h3>'+(cd.length?tbl(['日期','剩余','客户','锚点','节点','提醒对象','状态'],cd.map(function(x){return [esc(x['锚点日期']),dl(x['锚点日期']),esc(x['客户代号']),esc(x['锚点类型']),esc(x['节点']),esc(x['提醒对象']),esc(x['提醒状态'])]})):pending('暂无未完成节点'));
  h+='</section>';
  // ② lead 与小组
  h+='<section class="card" id="s2"><h2>② lead 与小组 <small>运营后台 Base</small></h2>';
  function block(o,cols){ if(!o||!o['表']) return pending('待建库'); var out='';
    Object.keys(o['表']).forEach(function(n){var rs=o['表'][n]; out+='<h3>'+esc(n)+' <small>'+rs.length+' 行'+(rs.some(function(r){return r['测试数据']==='是'})?' · 含测试行':'')+'</small></h3>';
      out+=rs.length?tbl(cols,rs.map(function(r){return cols.map(function(k){return esc(r[k]||'—')})})):pending('暂无数据');});
    return out;}
  h+=block(d['lead'],['lead 编号','来源渠道','客户线','所属小组','跟进人','状态','首次登记时间','24h 首联超时','7 天未跟进建议收回','测试数据']);
  h+=block(d['小组'],['小组编号','人类员工代号','数字员工代号','客户线','员工状态','在跟 lead 数','负载上限','闸门状态-PDPO','闸门状态-律师','闸门状态-邮箱','测试数据']);
  h+='</section>';
  // ③ 数字员工
  var st=d['数字员工']||{};
  h+='<section class="card" id="s3"><h2>③ 数字员工 <small>'+esc(st['更新']||'')+' · 人工维护</small></h2><div class="staff">'+
    (st['岗位']||[]).map(function(x){return '<div class="sc"><div class="sh"><b>'+esc(x['岗位'])+'</b><span class="chip s">'+esc(x['状态'])+'</span></div><p class="muted">'+esc(x['职责'])+'</p><p>'+esc(x['说明'])+'</p></div>'}).join('')+
    '</div><p class="muted small">'+esc(st['说明']||'')+'</p></section>';
  // ④ 对账
  var r=d['对账'];
  h+='<section class="card" id="s4"><h2>④ 中介对账汇总 <small>'+(r?esc(r['台账'])+' · 快照 '+esc(r['快照时间']):'')+'</small></h2>';
  if(!r) h+=pending('待接：对账台账未接通');
  else{ var ag=r['按中介']||{};
    h+='<p class="muted">共 '+r['总行数']+' 行（其中取消 '+r['取消行']+' 行，不计入）；币种 '+esc((r['币种']||[]).join('、'))+'。净额 = 应收 − 应付。</p>';
    h+=tbl(['中介编号','笔数','应付给中介','应收自中介','轧差净额','未结应付','未结应收','待确认'],Object.keys(ag).map(function(k){var a=ag[k];
      return [esc(k)+(a['测试行']===a['笔数']?' <span class="chip t">全部为测试行</span>':''),a['笔数'],money(a['应付']),money(a['应收']),'<b class="'+(a['轧差净额']<0?'neg':'pos')+'">'+money(a['轧差净额'])+'</b>',money(a['未结应付']),money(a['未结应收']),a['待确认']]}));}
  h+='</section>';
  $('gate').classList.add('hidden'); var app=$('app'); app.innerHTML=h; app.classList.remove('hidden');
}
})();
