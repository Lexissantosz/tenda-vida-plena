import { FormEvent, useMemo, useState } from 'react'
import { ArrowLeft, ExternalLink, FileText, Plus, Search } from 'lucide-react'
import { prototypePoints } from '../data/prototypeData'
import type { PointItem } from '../types/domain'

const groups = ['Todos', 'Caboclo', 'Preto-Velho', 'Erê', 'Exu', 'Pombagira', 'Outros']

export function PointsPage({ canManage = false }: { canManage?: boolean }) {
  const [points, setPoints] = useState(prototypePoints)
  const [group, setGroup] = useState('Todos')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<PointItem | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return points.filter((point) => {
      const matchesGroup = group === 'Todos' || point.group === group
      const matchesQuery = !q || [point.title, point.group, point.lyrics].some((value) => value.toLowerCase().includes(q))
      return matchesGroup && matchesQuery
    })
  }, [group, query, points])

  const createPoint = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const title = String(data.get('title') ?? '').trim()
    const pointGroup = String(data.get('group') ?? '').trim()
    const lyrics = String(data.get('lyrics') ?? '').trim()
    if (!title || !pointGroup || !lyrics) return
    setPoints((current) => [...current, {
      id: Date.now(),
      title,
      group: pointGroup,
      source: 'Adicionado no protótipo',
      lyrics,
      referenceUrl: String(data.get('referenceUrl') ?? ''),
    }])
    setShowCreate(false)
    event.currentTarget.reset()
  }

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
            <small>Texto demonstrativo do protótipo. A letra real será adicionada somente com material autorizado pela casa.</small>
          </div>
          {selected.referenceUrl ? (
            <a className="reference-button" href={selected.referenceUrl} target="_blank" rel="noreferrer"><ExternalLink size={17} /> Abrir link de referência</a>
          ) : <span className="status-note">Sem link de referência</span>}
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
          <p>Pesquise pelo nome, pela linha ou por um trecho da letra.</p>
        </div>
        <div className="page-heading-actions">
          <label className="section-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome ou trecho da letra..." /></label>
          {canManage && <button className="admin-action-button" onClick={() => setShowCreate((value) => !value)}><Plus size={17} /> Novo ponto</button>}
        </div>
      </section>

      {showCreate && canManage && (
        <section className="panel inline-admin-form">
          <form onSubmit={createPoint}>
            <input name="title" placeholder="Nome do ponto" required />
            <input name="group" placeholder="Linha/categoria" required />
            <input name="lyrics" placeholder="Letra ou trecho" required />
            <input name="referenceUrl" placeholder="Link de referência" />
            <button type="submit">Adicionar ponto</button>
          </form>
        </section>
      )}

      <div className="chip-row">{groups.map((item) => <button key={item} className={item === group ? 'filter-chip active' : 'filter-chip'} onClick={() => setGroup(item)}>{item}</button>)}</div>

      <section className="points-page-list">
        {visible.map((point) => (
          <article className="point-page-card" key={point.id}>
            <div className="point-page-icon"><FileText size={23} /></div>
            <div className="point-page-copy"><span className="content-tag">{point.group}</span><h3>{point.title}</h3><p>{point.lyrics}</p></div>
            <div className="point-page-actions">
              <button onClick={() => setSelected(point)}>Abrir letra</button>
              {point.referenceUrl && <a href={point.referenceUrl} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Link de referência</a>}
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
