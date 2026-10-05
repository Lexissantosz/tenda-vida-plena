import { useMemo, useState } from 'react'
import { BookOpen, FileText, Heart, Search } from 'lucide-react'

const categories = ['Todos', 'Orixás', 'Ervas', 'História', 'Mediunidade', 'Desenvolvimento', 'Fundamentos']

const studies = [
  { id: 1, title: 'Ervas na Umbanda', category: 'Ervas', type: 'Material geral', progress: 72, summary: 'Conteúdo introdutório para organizar o estudo sobre usos e significados.' },
  { id: 2, title: 'Linhas de trabalho', category: 'Fundamentos', type: 'Fundamento da casa', progress: 30, summary: 'Estrutura que será revisada e preenchida com a orientação da Tenda.' },
  { id: 3, title: 'História da Umbanda', category: 'História', type: 'Material geral', progress: 10, summary: 'Base histórica para leitura e discussão em grupo.' },
  { id: 4, title: 'Desenvolvimento mediúnico', category: 'Desenvolvimento', type: 'Fundamento da casa', progress: 0, summary: 'Área reservada para material validado pelos responsáveis da casa.' },
]

const library = [
  { id: 1, title: 'Apostila de estudos da casa', meta: 'PDF • exemplo de estrutura' },
  { id: 2, title: 'Material de apoio para iniciantes', meta: 'PDF • exemplo de estrutura' },
]

export function StudiesPage() {
  const [category, setCategory] = useState('Todos')
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return studies.filter((study) => {
      const matchesCategory = category === 'Todos' || study.category === category
      const matchesQuery = !q || [study.title, study.category, study.type, study.summary].some((value) => value.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const toggleFavorite = (id: number) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
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
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar estudo..." />
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
              <span className={study.type === 'Fundamento da casa' ? 'content-tag house' : 'content-tag'}>
                {study.type}
              </span>
              <button className={favorites.includes(study.id) ? 'favorite-button active' : 'favorite-button'} onClick={() => toggleFavorite(study.id)} aria-label="Favoritar">
                <Heart size={18} />
              </button>
            </div>
            <div className="content-card-icon"><BookOpen size={24} /></div>
            <h3>{study.title}</h3>
            <p>{study.summary}</p>
            <div className="content-card-progress">
              <div><span style={{ width: `${study.progress}%` }} /></div>
              <small>{study.progress}% concluído</small>
            </div>
            <button className="content-card-action">Abrir estudo</button>
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
          {library.map((item) => (
            <button className="library-row" key={item.id}>
              <FileText size={21} />
              <span><strong>{item.title}</strong><small>{item.meta}</small></span>
              <span className="library-open">Abrir</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
