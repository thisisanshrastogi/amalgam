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
