const sidebar=document.querySelector('.sidebar');
const modal=document.getElementById('noteModal');
const toast=document.getElementById('toast');
const noteGrid=document.getElementById('noteGrid');
const emptyState=document.getElementById('emptyState');
const searchInput=document.getElementById('searchInput');

document.getElementById('mobileMenu').addEventListener('click',()=>sidebar.classList.toggle('open'));
document.getElementById('newNoteButton').addEventListener('click',()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.getElementById('noteTitle').focus()});
modal.addEventListener('click',e=>{if(e.target.dataset.close){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open');if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();searchInput.focus()}});

document.querySelectorAll('.modal-tags button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.modal-tags button').forEach(item=>item.classList.remove('selected'));button.classList.add('selected')}));
document.querySelectorAll('.star').forEach(button=>button.addEventListener('click',()=>{button.classList.toggle('active');button.textContent=button.classList.contains('active')?'★':'☆'}));

function updateTasks(){const tasks=[...document.querySelectorAll('#taskList input')];document.getElementById('doneCount').textContent=tasks.filter(task=>task.checked).length}
document.getElementById('taskList').addEventListener('change',updateTasks);

function filterCards(type='all'){
  const query=searchInput.value.trim().toLowerCase();let visible=0;
  document.querySelectorAll('.note-card').forEach(card=>{const matchType=type==='all'||card.dataset.type===type;const matchQuery=!query||card.dataset.search.toLowerCase().includes(query)||card.textContent.toLowerCase().includes(query);card.style.display=matchType&&matchQuery?'':'none';if(matchType&&matchQuery)visible++});
  emptyState.style.display=visible?'none':'block';noteGrid.style.display=visible?'grid':'none';
}
searchInput.addEventListener('input',()=>filterCards(document.querySelector('.nav-item.active')?.dataset.filter||'all'));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(item=>item.classList.remove('active'));button.classList.add('active');filterCards(button.dataset.filter);sidebar.classList.remove('open')}));
document.getElementById('viewAll').addEventListener('click',()=>{searchInput.value='';document.querySelectorAll('[data-filter]').forEach(item=>item.classList.remove('active'));document.querySelector('[data-filter="all"]').classList.add('active');filterCards()});

document.getElementById('noteForm').addEventListener('submit',e=>{
  e.preventDefault();const title=document.getElementById('noteTitle').value;const content=document.getElementById('noteContent').value||'一段刚刚记录下来的新想法。';const tag=document.querySelector('.modal-tags .selected').textContent;
  const article=document.createElement('article');article.className='note-card';article.dataset.type='note';article.dataset.search=`${title} ${content} ${tag}`;article.innerHTML=`<div class="note-body"><div class="note-meta"><span class="tag idea">${tag}</span><time>刚刚</time></div><h3>${title.replace(/[<>]/g,'')}</h3><p>${content.replace(/[<>]/g,'')}</p><div class="note-footer"><span>☷ 新笔记</span><button class="star" aria-label="收藏">☆</button></div></div>`;
  noteGrid.prepend(article);article.querySelector('.star').addEventListener('click',e=>{e.currentTarget.classList.toggle('active');e.currentTarget.textContent=e.currentTarget.classList.contains('active')?'★':'☆'});modal.classList.remove('open');e.target.reset();toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200);filterCards();
});
