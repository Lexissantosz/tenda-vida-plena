import { useMemo, useState } from 'react'
import { ExternalLink, FileText, Search } from 'lucide-react'

const pointGroups = ['Todos', 'Caboclo', 'Preto-Velho', 'Erê', 'Exu', 'Pombagira', 'Outros']

const points = [
  { id: 1, title: 'Ponto de Caboclo', group: 'Caboclo', source: 'Referência a cadastrar pela casa', hasLyrics: true },
  { id: 2, title: 'Ponto de Preto-Velho', group: 'Preto-Velho', source: 'Referência a cadastrar pela casa', hasLyrics: true },
  { id: 3, title: 'Ponto de Erê', group: 'Erê', source: 'Referência a cadastrar pela casa', hasLyrics: false },
]

export function PointsPage() {
  const [group, setGroup] = useState('Todos')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return points.filter((point) => {
      const matchesGroup = group === 'Todos' || point.group === group
      const matchesQuery = !q || [point.title, point.group].some((value) => value.toLowerCase().includes(q))
      return matchesGroup && matchesQuery
    })
  }, [group, query])

  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Pontos</p>
          <h1>Letras e referências organizadas</h1>
          <p>O sistema pode guardar a letra autorizada pela casa e apontar para um link externo quando houver áudio ou vídeo de referência.</p>
        </div>
        <label className="section-search">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar ponto..." />
        </label>
      </section>

      <div className="chip-row">
        {pointGroups.map((item) => (
          <button key={item} className={item === group ? 'filter-chip active' : 'filter-chip'} onClick={() => setGroup(item)}>
            {item}
          </button>
        ))}
      </div>

      <section className="points-page-list">
        {visible.map((point) => (
          <article className="point-page-card" key={point.id}>
            <div className="point-page-icon"><FileText size={23} /></div>
            <div className="point-page-copy">
              <span className="content-tag">{point.group}</span>
              <h3>{point.title}</h3>
              <p>{point.source}</p>
            </div>
            <div className="point-page-actions">
              <button>{point.hasLyrics ? 'Abrir letra' : 'Adicionar letra'}</button>
              <button><ExternalLink size={16} /> Link de referência</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
