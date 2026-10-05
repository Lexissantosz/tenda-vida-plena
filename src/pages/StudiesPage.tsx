import { useMemo, useState } from 'react'
import { ArrowLeft, BookOpen, FileText, Heart, Search } from 'lucide-react'
import { prototypeStudies } from '../data/prototypeData'
import type { StudyItem } from '../types/domain'

const categories = ['Todos', 'Orixás', 'Ervas', 'História', 'Mediunidade', 'Desenvolvimento', 'Fundamentos']

export function StudiesPage() {
  const [category, setCategory] = useState('Todos')
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedStudy, setSelectedStudy] = useState<StudyItem | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return prototypeStudies.filter((study) => {
      const matchesCategory = category === 'Todos' || study.category === category
      const matchesQuery = !q || [study.title, study.category, study.type, study.summary, ...study.lessons]
        .some((value) => value.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const toggleFavorite = (id: number) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  if (selectedStudy && selectedLesson) {
    return (
      <main className="page-content section-page">
        <button className="back-button" onClick={() => setSelectedLesson(null)}>
          <ArrowLeft size={17} /> Voltar às aulas
        </button>

        <section className="panel lesson-detail">
          <span className={selectedStudy.type === 'Fundamento da casa' ? 'content-tag house' : 'content-tag'}>
            {selectedStudy.type}
          </span>
          <h1>{selectedLesson}</h1>
          <p>
            Conteúdo demonstrativo da aula de <strong>{selectedStudy.title}</strong>. O texto real será inserido
            depois da revisão e autorização da Tenda.
          </p>
          <div className="lesson-placeholder">
            <BookOpen size={28} />
            <strong>Espaço da aula</strong>
            <span>Aqui podem entrar texto, imagens, PDFs relacionados, anotações e progresso.</span>
          </div>
        </section>
      </main>
    )
  }

  if (selectedStudy) {
    return (
      <main className="page-content section-page">
        <button className="back-button" onClick={() => setSelectedStudy(null)}>
          <ArrowLeft size={17} /> Voltar aos estudos
        </button>

        <section className="study-detail panel">
          <span className={selectedStudy.type === 'Fundamento da casa' ? 'content-tag house' : 'content-tag'}>
            {selectedStudy.type}
          </span>
          <h1>{selectedStudy.title}</h1>
          <p>{selectedStudy.summary}</p>

          <div className="lesson-list">
            {selectedStudy.lessons.map((lesson, index) => (
              <button className="lesson-row" key={lesson} onClick={() => setSelectedLesson(lesson)}>
                <span>{index + 1}</span>
                <strong>{lesson}</strong>
                <small>{index < Math.ceil(selectedStudy.lessons.length * selectedStudy.progress / 100) ? 'Reabrir aula' : 'Abrir aula'}</small>
              </button>
            ))}
          </div>
        </section>
      </main>
    )
  }

  if (selectedMaterial) {
    return (
      <main className="page-content section-page">
        <button className="back-button" onClick={() => setSelectedMaterial(null)}>
          <ArrowLeft size={17} /> Voltar à biblioteca
        </button>
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
        <label className="section-search">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar estudo, aula ou tema..." />
        </label>
      </section>

      <div className="chip-row" aria-label="Categorias de estudo">
        {categories.map((item) => (
          <button key={item} className={item === category ? 'filter-chip active' : 'filter-chip'} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>

      <section className="study-page-grid">
        {filtered.map((study) => (
          <article className="content-card" key={study.id}>
            <div className="content-card-top">
              <span className={study.type === 'Fundamento da casa' ? 'content-tag house' : 'content-tag'}>{study.type}</span>
              <button className={favorites.includes(study.id) ? 'favorite-button active' : 'favorite-button'} onClick={() => toggleFavorite(study.id)} aria-label="Favoritar">
                <Heart size={18} />
              </button>
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
        <div className="section-heading">
          <div>
            <p className="eyebrow">Biblioteca</p>
            <h3>Materiais e PDFs</h3>
            <p>Aqui entram apostilas, documentos e arquivos autorizados pela casa.</p>
          </div>
        </div>
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
