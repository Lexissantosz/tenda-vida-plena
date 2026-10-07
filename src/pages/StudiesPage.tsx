import { FormEvent, useMemo, useState } from 'react'
import { ArrowLeft, BookOpen, FileText, Heart, Plus, Search } from 'lucide-react'
import { prototypePoints, prototypeStudies } from '../data/prototypeData'
import type { StudyItem } from '../types/domain'

const categories = ['Todos', 'Favoritos', 'Orixás', 'Ervas', 'História', 'Mediunidade', 'Desenvolvimento', 'Fundamentos']

export function StudiesPage({ canManage = false }: { canManage?: boolean }) {
  const [studies, setStudies] = useState(prototypeStudies)
  const [category, setCategory] = useState('Todos')
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [notes, setNotes] = useState<Record<number, string>>({})
  const [selectedStudy, setSelectedStudy] = useState<StudyItem | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [completedLessons, setCompletedLessons] = useState<Record<number, string[]>>({})

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return studies.filter((study) => {
      const matchesCategory =
        category === 'Todos' ||
        (category === 'Favoritos' && favorites.includes(study.id)) ||
        study.category === category
      const matchesQuery = !q || [study.title, study.category, study.type, study.summary, ...study.lessons]
        .some((value) => value.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [category, query, favorites, studies])

  const toggleFavorite = (id: number) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const createStudy = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const title = String(data.get('title') ?? '').trim()
    const categoryValue = String(data.get('category') ?? '').trim()
    const summary = String(data.get('summary') ?? '').trim()
    if (!title || !categoryValue || !summary) return

    setStudies((current) => [
      ...current,
      {
        id: Date.now(),
        title,
        category: categoryValue,
        type: 'Fundamento da casa',
        progress: 0,
        summary,
        lessons: ['Conteúdo inicial'],
        relatedPointIds: [],
        relatedMaterials: [],
      },
    ])
    setShowCreate(false)
    event.currentTarget.reset()
  }

  const markLessonComplete = () => {
    if (!selectedStudy || !selectedLesson) return
    setCompletedLessons((current) => {
      const existing = current[selectedStudy.id] ?? []
      if (existing.includes(selectedLesson)) return current
      const next = [...existing, selectedLesson]
      const progress = Math.round((next.length / selectedStudy.lessons.length) * 100)
      setStudies((items) => items.map((item) => item.id === selectedStudy.id ? { ...item, progress } : item))
      setSelectedStudy((current) => current ? { ...current, progress } : current)
      return { ...current, [selectedStudy.id]: next }
    })
  }

  if (selectedStudy && selectedLesson) {
    const isComplete = completedLessons[selectedStudy.id]?.includes(selectedLesson)
    return (
      <main className="page-content section-page">
        <button className="back-button" onClick={() => setSelectedLesson(null)}><ArrowLeft size={17} /> Voltar às aulas</button>
        <section className="panel lesson-detail">
          <span className={selectedStudy.type === 'Fundamento da casa' ? 'content-tag house' : 'content-tag'}>{selectedStudy.type}</span>
          <h1>{selectedLesson}</h1>
          <p>Conteúdo demonstrativo da aula de <strong>{selectedStudy.title}</strong>. O texto real será inserido depois da revisão e autorização da Tenda.</p>
          <div className="lesson-placeholder">
            <BookOpen size={28} />
            <strong>Espaço da aula</strong>
            <span>Aqui podem entrar texto, imagens, PDFs relacionados, anotações e progresso.</span>
            <button className={isComplete ? 'lesson-complete-button done' : 'lesson-complete-button'} onClick={markLessonComplete}>
              {isComplete ? 'Aula concluída' : 'Marcar como concluída'}
            </button>
          </div>
        </section>
      </main>
    )
  }

  if (selectedStudy) {
    const relatedPoints = prototypePoints.filter((point) => selectedStudy.relatedPointIds?.includes(point.id))
    return (
      <main className="page-content section-page">
        <button className="back-button" onClick={() => setSelectedStudy(null)}><ArrowLeft size={17} /> Voltar aos estudos</button>

        <section className="study-detail panel">
          <div className="study-detail-top">
            <span className={selectedStudy.type === 'Fundamento da casa' ? 'content-tag house' : 'content-tag'}>{selectedStudy.type}</span>
            <button className={favorites.includes(selectedStudy.id) ? 'favorite-button active' : 'favorite-button'} onClick={() => toggleFavorite(selectedStudy.id)}>
              <Heart size={18} />
            </button>
          </div>
          <h1>{selectedStudy.title}</h1>
          <p>{selectedStudy.summary}</p>

          <div className="lesson-list">
            {selectedStudy.lessons.map((lesson, index) => (
              <button className="lesson-row" key={lesson} onClick={() => setSelectedLesson(lesson)}>
                <span>{index + 1}</span>
                <strong>{lesson}</strong>
                <small>{completedLessons[selectedStudy.id]?.includes(lesson) ? 'Concluída' : index < Math.ceil(selectedStudy.lessons.length * selectedStudy.progress / 100) ? 'Reabrir aula' : 'Abrir aula'}</small>
              </button>
            ))}
          </div>

          <section className="study-extra-grid">
            <div className="study-note-box">
              <h3>Minha anotação</h3>
              <textarea
                value={notes[selectedStudy.id] ?? ''}
                onChange={(event) => setNotes((current) => ({ ...current, [selectedStudy.id]: event.target.value }))}
                placeholder="Anote algo que queira lembrar deste estudo..."
                rows={5}
              />
              <small>Salvo nesta sessão do protótipo.</small>
            </div>

            <div className="related-content-box">
              <h3>Conteúdos relacionados</h3>
              {relatedPoints.map((point) => <span key={point.id}>Ponto: {point.title}</span>)}
              {selectedStudy.relatedMaterials?.map((material) => <span key={material}>Material: {material}</span>)}
              {!relatedPoints.length && !selectedStudy.relatedMaterials?.length && <small>Nenhum conteúdo relacionado ainda.</small>}
            </div>
          </section>
        </section>
      </main>
    )
  }

  if (selectedMaterial) {
    return (
      <main className="page-content section-page">
        <button className="back-button" onClick={() => setSelectedMaterial(null)}><ArrowLeft size={17} /> Voltar à biblioteca</button>
        <section className="panel material-placeholder">
          <FileText size={34} />
          <h1>{selectedMaterial}</h1>
          <p>Este é o espaço do leitor de material. O arquivo real será inserido depois da validação e autorização da Tenda.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Estudos</p>
          <h1>Conteúdos para estudar no seu ritmo</h1>
          <p>Os conteúdos da casa ficam separados dos materiais gerais para evitar confusão entre referências diferentes.</p>
        </div>
        <div className="page-heading-actions">
          <label className="section-search">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar estudo, aula ou tema..." />
          </label>
          {canManage && <button className="admin-action-button" onClick={() => setShowCreate((value) => !value)}><Plus size={17} /> Novo estudo</button>}
        </div>
      </section>

      {showCreate && canManage && (
        <section className="panel inline-admin-form">
          <form onSubmit={createStudy}>
            <input name="title" placeholder="Título do estudo" required />
            <input name="category" placeholder="Categoria" required />
            <input name="summary" placeholder="Resumo" required />
            <button type="submit">Adicionar estudo</button>
          </form>
        </section>
      )}

      <div className="chip-row">
        {categories.map((item) => (
          <button key={item} className={item === category ? 'filter-chip active' : 'filter-chip'} onClick={() => setCategory(item)}>{item}</button>
        ))}
      </div>

      <section className="study-page-grid">
        {filtered.map((study) => (
          <article className="content-card" key={study.id}>
            <div className="content-card-top">
              <span className={study.type === 'Fundamento da casa' ? 'content-tag house' : 'content-tag'}>{study.type}</span>
              <button className={favorites.includes(study.id) ? 'favorite-button active' : 'favorite-button'} onClick={() => toggleFavorite(study.id)} aria-label="Favoritar"><Heart size={18} /></button>
            </div>
            <div className="content-card-icon"><BookOpen size={24} /></div>
            <h3>{study.title}</h3>
            <p>{study.summary}</p>
            <div className="content-card-progress">
              <div><span style={{ width: `${study.progress}%` }} /></div>
              <small>{study.progress}% concluído • {study.lessons.length} aulas</small>
            </div>
            <button className="content-card-action" onClick={() => setSelectedStudy(study)}>Abrir estudo</button>
          </article>
        ))}
      </section>

      <section className="panel library-panel">
        <div className="section-heading"><div><p className="eyebrow">Biblioteca</p><h3>Materiais e PDFs</h3><p>Aqui entram apostilas, documentos e arquivos autorizados pela casa.</p></div></div>
        <div className="library-list">
          {['Apostila de estudos da casa', 'Material de apoio para iniciantes'].map((title) => (
            <button className="library-row" key={title} onClick={() => setSelectedMaterial(title)}>
              <FileText size={21} />
              <span><strong>{title}</strong><small>PDF • exemplo de estrutura</small></span>
              <span className="library-open">Abrir</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
