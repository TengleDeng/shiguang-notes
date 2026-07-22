"use client";

import { FormEvent, useMemo, useState } from "react";

type NoteType = "note" | "task" | "image";

type Note = {
  id: number;
  type: NoteType;
  tag: string;
  tagClass: string;
  time: string;
  title: string;
  content: string;
  footer: string;
  visual?: "seaside" | "photos";
  tasks?: { label: string; done: boolean }[];
};

const initialNotes: Note[] = [
  { id: 1, type: "note", tag: "旅行", tagClass: "travel", time: "2 小时前", title: "盛夏去海边", content: "想去一个有风的地方，早起看海，傍晚在橘色的日落里散步……", footer: "☷ 6 分钟阅读", visual: "seaside" },
  { id: 2, type: "note", tag: "阅读", tagClass: "reading", time: "昨天", title: "《微习惯》的三个启发", content: "从小得不可思议的动作开始。重要的不是一次做多少，而是让行动自然发生。", footer: "☷ 4 分钟阅读" },
  { id: 3, type: "task", tag: "生活", tagClass: "life", time: "今天", title: "周末采购清单", content: "", footer: "1 / 3 已完成", tasks: [{ label: "燕麦奶和咖啡豆", done: true }, { label: "一束白色洋桔梗", done: false }, { label: "补充厨房香料", done: false }] },
  { id: 4, type: "image", tag: "灵感", tagClass: "idea", time: "7 月 20 日", title: "城市散步 · 光影收藏", content: "把路过的颜色与影子留在这里。", footer: "▧ 12 张图片", visual: "photos" },
];

const initialTasks = [
  { id: 1, title: "整理项目会议笔记", meta: "09:30 · 工作", done: true },
  { id: 2, title: "回复小林的邮件", meta: "11:00 · 工作", done: true },
  { id: 3, title: "阅读 30 分钟", meta: "18:30 · 阅读", done: false },
  { id: 4, title: "整理旅行照片", meta: "20:00 · 生活", done: false },
  { id: 5, title: "记录今天的三个瞬间", meta: "睡前 · 日记", done: false },
];

export default function Home() {
  const [filter, setFilter] = useState<"all" | NoteType>("all");
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState(initialNotes);
  const [tasks, setTasks] = useState(initialTasks);
  const [favorites, setFavorites] = useState<number[]>([1, 4]);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(false);

  const visibleNotes = useMemo(() => notes.filter((note) => {
    const matchesType = filter === "all" || note.type === filter;
    const text = `${note.title} ${note.content} ${note.tag}`.toLowerCase();
    return matchesType && text.includes(query.trim().toLowerCase());
  }), [filter, notes, query]);

  function addNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "未命名笔记");
    const content = String(form.get("content") || "一段刚刚记录下来的新想法。");
    setNotes((current) => [{ id: Date.now(), type: "note", tag: "灵感", tagClass: "idea", time: "刚刚", title, content, footer: "☷ 新笔记" }, ...current]);
    setModalOpen(false);
    event.currentTarget.reset();
    setToast(true);
    window.setTimeout(() => setToast(false), 2200);
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`} aria-label="主导航">
        <div className="brand"><span className="brand-mark">拾</span><span>拾光笔记</span></div>
        <button className="new-note" onClick={() => setModalOpen(true)}><span>＋</span> 新建笔记</button>
        <nav className="nav-list">
          {[
            ["all", "⌂", "首页", "12"], ["note", "▤", "所有笔记", "28"], ["task", "✓", "待办任务", "5"], ["image", "▧", "图片收藏", "16"],
          ].map(([value, icon, label, count]) => (
            <button key={value} className={`nav-item ${filter === value ? "active" : ""}`} onClick={() => { setFilter(value as "all" | NoteType); setMenuOpen(false); }}>
              <span>{icon}</span>{label}<span className={`count ${value === "task" ? "accent" : ""}`}>{count}</span>
            </button>
          ))}
        </nav>
        <p className="nav-label">资料库</p>
        <nav className="nav-list compact">
          <button className="nav-item"><i className="dot green" />工作</button>
          <button className="nav-item"><i className="dot orange" />生活</button>
          <button className="nav-item"><i className="dot blue" />阅读</button>
          <button className="nav-item"><i className="dot pink" />灵感</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="storage-row"><span>本地空间</span><span>68%</span></div>
          <div className="storage-track"><i /></div>
          <div className="profile"><div className="avatar">范</div><div><strong>小范</strong><small>保持好奇，持续记录</small></div><button aria-label="更多">•••</button></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-label="打开菜单">☰</button>
          <div className="search-wrap"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="搜索笔记、标签或内容..." aria-label="搜索笔记" /><kbd>⌘ K</kbd></div>
          <div className="top-actions"><button aria-label="通知">♧<i /></button><button aria-label="帮助">?</button></div>
        </header>

        <section className="welcome">
          <div><p className="eyebrow">2026 年 7 月 22 日 · 星期三</p><h1>下午好，小范 <span>✦</span></h1><p>把脑海里的微光，慢慢收集成属于你的星河。</p></div>
          <div className="weather"><span>☀</span><div><strong>27°C</strong><small>上海 · 晴朗</small></div></div>
        </section>

        <section className="stats-grid">
          <article className="stat-card sage"><div className="stat-icon">▤</div><div><small>本周笔记</small><strong>12</strong><span>比上周多 4 篇 ↗</span></div><div className="mini-bars">{Array.from({ length: 7 }).map((_, index) => <i key={index} />)}</div></article>
          <article className="stat-card peach"><div className="stat-icon">✓</div><div><small>任务完成</small><strong>{tasks.filter((task) => task.done).length}<em>/5</em></strong><span>今天再完成 2 项</span></div><div className="progress-ring"><span>{Math.round(tasks.filter((task) => task.done).length / tasks.length * 100)}%</span></div></article>
          <article className="quote-card"><span className="quote-mark">“</span><p>真正的发现之旅，不在于寻找新的风景，而在于拥有新的眼睛。</p><footer>— 马塞尔·普鲁斯特</footer></article>
        </section>

        <div className="content-grid">
          <section className="notes-section">
            <div className="section-heading"><div><h2>最近笔记</h2><p>继续书写未完成的想法</p></div><button onClick={() => { setFilter("all"); setQuery(""); }}>查看全部 →</button></div>
            {visibleNotes.length ? <div className="note-grid">
              {visibleNotes.map((note) => <article className={`note-card ${note.visual === "seaside" ? "featured" : ""}`} key={note.id}>
                {note.visual === "seaside" && <div className="cover seaside"><span>旅行手记</span><div className="sun" /><div className="wave one" /><div className="wave two" /></div>}
                {note.visual === "photos" && <div className="photo-mosaic"><div className="photo warm"><span>午后</span></div><div className="photo architecture" /><div className="photo shadow" /></div>}
                <div className="note-body"><div className="note-meta"><span className={`tag ${note.tagClass}`}>{note.tag}</span><time>{note.time}</time></div><h3>{note.title}</h3>
                  {note.content && <p>{note.content}</p>}
                  {note.tasks && <div className="mini-tasks">{note.tasks.map((task) => <label key={task.label}><input type="checkbox" defaultChecked={task.done} /><span>{task.label}</span></label>)}</div>}
                  <div className="note-footer"><span>{note.footer}</span><button className={`star ${favorites.includes(note.id) ? "active" : ""}`} onClick={() => setFavorites((current) => current.includes(note.id) ? current.filter((id) => id !== note.id) : [...current, note.id])} aria-label="收藏">{favorites.includes(note.id) ? "★" : "☆"}</button></div>
                </div>
              </article>)}
            </div> : <div className="empty-state" style={{ display: "block" }}><span>⌕</span><h3>没有找到相关内容</h3><p>换一个关键词试试看吧。</p></div>}
          </section>

          <aside className="right-panel">
            <section className="today-card"><div className="section-heading small"><div><h2>今日待办</h2><p>{tasks.filter((task) => task.done).length} / {tasks.length} 已完成</p></div><button aria-label="新增任务">＋</button></div><div className="task-list">
              {tasks.map((task) => <label key={task.id}><input type="checkbox" checked={task.done} onChange={() => setTasks((current) => current.map((item) => item.id === task.id ? { ...item, done: !item.done } : item))} /><i /><span><strong>{task.title}</strong><small>{task.meta}</small></span></label>)}
            </div><button className="all-tasks">查看全部任务 <span>→</span></button></section>
            <section className="inspiration-card"><div className="section-heading small"><div><h2>灵感拼贴</h2><p>最近收藏的美好</p></div><button>•••</button></div><div className="moodboard"><div className="mood coffee"><span>slow<br />morning</span></div><div className="mood leaf" /><div className="mood paper"><span>在日常里<br />寻找诗意</span></div><div className="mood sky" /><div className="tape" /></div><div className="mood-tags"><span>#松弛感</span><span>#自然</span><span>#日常美学</span></div></section>
          </aside>
        </div>
      </main>

      {modalOpen && <div className="modal open" aria-hidden="false"><div className="modal-backdrop" onClick={() => setModalOpen(false)} /><form className="modal-card" onSubmit={addNote}><div className="modal-header"><div><p>捕捉此刻</p><h2>新建一篇笔记</h2></div><button type="button" onClick={() => setModalOpen(false)} aria-label="关闭">×</button></div><label>标题<input name="title" required placeholder="给这篇笔记起个名字" /></label><label>内容<textarea name="content" rows={5} placeholder="写下你的想法..." /></label><div className="modal-tags"><button type="button" className="selected">灵感</button><button type="button">生活</button><button type="button">阅读</button><button type="button">工作</button></div><div className="modal-actions"><button type="button" onClick={() => setModalOpen(false)}>取消</button><button type="submit">保存笔记</button></div></form></div>}
      <div className={`toast ${toast ? "show" : ""}`}>笔记已保存到本地 ✦</div>
    </div>
  );
}
