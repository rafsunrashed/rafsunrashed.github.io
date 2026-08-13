const detail=document.querySelector(".skill-info");
const descriptions={
Automation:"Workflow design, scripting and connecting digital services to reduce repetitive manual tasks.",
Python:"Practical scripting and automation experiments.",
"API Integration":"Connecting digital services and building automated workflows.",
"Web Development":"Responsive websites and interactive browser experiences.",
"Unreal Engine":"Exploring real-time 3D scenes, visualization and creative production.",
"Data Labeling":"Structured data labeling and digital data workflows.",
"Video Editing":"Editing digital video content for presentation.",
"Social Media Marketing":"Practical digital communication and social-platform learning."
};
document.querySelectorAll(".chip").forEach(chip=>chip.addEventListener("click",()=>{
 document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));chip.classList.add("active");
 detail.innerHTML=`<small>SELECTED SKILL</small><strong>${chip.textContent}</strong><p>${descriptions[chip.textContent]||""}</p>`;
}));
const items=document.querySelectorAll(".research article,.projects article,.edu-card,.photo-wrap");
items.forEach(el=>{
 el.addEventListener("pointermove",e=>{
  if(innerWidth<900)return;
  const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
  el.style.transform=`perspective(900px) rotateX(${-py*2.5}deg) rotateY(${px*3}deg) translateY(-2px)`;
 });
 el.addEventListener("pointerleave",()=>el.style.transform="");
});
