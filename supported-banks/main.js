(function(){
  var t=document.getElementById('navToggle'),l=document.getElementById('navLinks');
  if(t&&l){t.addEventListener('click',function(){
    var o=l.classList.toggle('open');t.setAttribute('aria-expanded',o?'true':'false');});}
  var rail=document.querySelectorAll('.rail a[data-sec]');
  var fill=document.getElementById('railFill'),pct=document.getElementById('railPct');
  if(rail.length||fill){
    var secs=[].slice.call(document.querySelectorAll('section[id]'));
    var sync=function(){
      var d=document.documentElement,max=d.scrollHeight-d.clientHeight;
      var p=max>0?Math.min(100,Math.round(d.scrollTop/max*100)):0;
      if(fill)fill.style.width=p+'%';
      if(pct)pct.textContent='Read '+p+'%';
      var cur=secs.length?secs[0].id:'';
      secs.forEach(function(s){if(s.getBoundingClientRect().top<=150)cur=s.id;});
      rail.forEach(function(a){a.classList.toggle('on',a.getAttribute('data-sec')===cur);});
    };
    sync();window.addEventListener('scroll',sync,{passive:true});window.addEventListener('resize',sync);
  }
})();

(function(){
 var q=document.getElementById('q'),tb=document.getElementById('tbody'),
     c=document.getElementById('count'),e=document.getElementById('empty'),ty='All';
 var rows=[].slice.call(tb.querySelectorAll('tr'));
 function run(){
   var s=(q.value||'').trim().toLowerCase(),n=0;
   rows.forEach(function(r){
     var ok=(ty==='All'||r.dataset.type===ty)&&(!s||r.dataset.name.indexOf(s)>-1);
     r.hidden=!ok; if(ok)n++;
   });
   c.textContent=n+' of '+rows.length;
   e.hidden=n>0; tb.parentNode.hidden=n===0;
 }
 q.addEventListener('input',run);
 document.getElementById('ftypes').addEventListener('click',function(ev){
   var b=ev.target.closest('.ftype'); if(!b)return;
   ty=b.dataset.t;
   [].forEach.call(this.querySelectorAll('.ftype'),function(x){
     x.setAttribute('aria-pressed',x===b?'true':'false');});
   run();
 });
})();
