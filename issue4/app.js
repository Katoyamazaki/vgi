(function(){
  const chart=[["The Legend of Zelda: Ocarina of Time","ns2",96],["Phantom Blade Zero","ps5",88],["Gears of War: E-Day","xsx",87],["Call of Duty: Modern Warfare 4","ps5 · xsx · ns2",85],["Castlevania: Belmont's Curse","ps5 · xsx · ns",83],["Silent Hill: Townfall","ps5",79],["Marvel's Wolverine","ps5",75]];
  const c=document.getElementById('chart');
  c.innerHTML=chart.map((r,i)=>`<div class="row"><div class="pos">${i+1}</div><div><div class="t">${r[0]}</div><div class="p">${r[1]}</div><div class="bar-s"><i style="width:${(r[2]-60)/40*100}%"></i></div></div><div class="sc">${r[2]}</div></div>`).join('');

  const spreads=[...document.querySelectorAll('.spread')];
  const ranges=spreads.map(s=>s.dataset.pages.split('-').map(Number));
  let cur=0;
  const counter=document.getElementById('counter'),prev=document.getElementById('prev'),next=document.getElementById('next');
  const mobile=()=>window.matchMedia('(max-width:760px)').matches;
  function show(i){
    cur=Math.max(0,Math.min(spreads.length-1,i));
    spreads.forEach((s,k)=>s.classList.toggle('active',k===cur));
    const r=ranges[cur];counter.textContent=(r.length>1?r[0]+'–'+r[1]:r[0])+' / '+document.querySelectorAll('.page').length;
    prev.disabled=cur===0;next.disabled=cur===spreads.length-1;
  }
  function goPage(n){
    if(mobile()){const el=document.getElementById('p'+n);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});return;}
    const i=ranges.findIndex(r=>n>=r[0]&&n<=(r[1]||r[0]));if(i>=0)show(i);
  }
  prev.onclick=()=>show(cur-1);next.onclick=()=>show(cur+1);
  document.addEventListener('click',e=>{const a=e.target.closest('[data-go]');if(a){e.preventDefault();goPage(+a.dataset.go);}});
  document.addEventListener('keydown',e=>{if(mobile())return;if(e.key==='ArrowRight'||e.key==='PageDown')show(cur+1);if(e.key==='ArrowLeft'||e.key==='PageUp')show(cur-1);if(e.key==='Home')show(0);if(e.key==='End')show(spreads.length-1);});
  // swipe
  let x0=null;document.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});
  document.addEventListener('touchend',e=>{if(x0===null||mobile())return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>60)show(cur+(dx<0?1:-1));x0=null});
  show(0);
})();
