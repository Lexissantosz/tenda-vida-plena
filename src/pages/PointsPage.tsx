import { useMemo, useState } from 'react'
import { ArrowLeft, ExternalLink, FileText, Search } from 'lucide-react'
import { prototypePoints } from '../data/prototypeData'
import type { PointItem } from '../types/domain'

const groups = ['Todos', 'Caboclo', 'Preto-Velho', 'Erê', 'Exu', 'Pombagira', 'Outros']

export function PointsPage() {
  const [group, setGroup] = useState('Todos')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<PointItem | null>(null)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return prototypePoints.filter((point) => {
      const matchesGroup = group === 'Todos' || point.group === group
      const matchesQuery = !q || [point.title, point.group, point.lyrics].some((value) => value.toLowerCase().includes(q))
      return matchesGroup && matchesQuery
    })
  }, [group, query])

  if (selected) {
    return (
      <main className="page-content section-page">
        <button className="back-button" onClick={() => setSelected(null)}><ArrowLeft size={17} /> Voltar aos pontos</button>
        <section className="panel point-detail">
          <span className="content-tag">{selected.group}</span>
          <h1>{selected.title}</h1>
          <p className="point-source">{selected.source}</p>

          <div className="lyrics-box">
            <h3>Letra</h3>
            <p>{selected.lyrics}</p>
            <small>Texto demonstrativo do protótipo. A letra real será adicionada somente com o material autorizado pela casa.</small>
          </div>

          <a className="reference-button" href={selected.referenceUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={17} /> Abrir link de referência
          </a>
        </section>
      </main>
    )
  }

  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Pontos</p>
          <h1>Letras e referências organizadas</h1>
          <p>Você pode pesquisar pelo nome, pela linha ou até por um trecho da letra.</p>
        </div>
        <label className="section-search">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome ou trecho da letra..." />
        </label>
      </section>

      <div className="chip-row">
        {groups.map((item) => (
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
              <p>{point.lyrics}</p>
            </div>
            <div className="point-page-actions">
              <button onClick={() => setSelected(point)}>Abrir letra</button>
              <a href={point.referenceUrl} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Link de referência</a>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
