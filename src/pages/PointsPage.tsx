import { FormEvent, useMemo, useState } from 'react'
import { ArrowLeft, BookOpen, FileText, Plus, Search } from 'lucide-react'
import { prototypePoints } from '../data/prototypeData'
import type { PointItem } from '../types/domain'

export function PointsPage({ canManage = false }: { canManage?: boolean }) {
  const [points, setPoints] = useState(prototypePoints)
  const [group, setGroup] = useState('Todos')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<PointItem | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  const groups = useMemo(
    () => ['Todos', ...Array.from(new Set(points.map((point) => point.group)))],
    [points],
  )

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return points.filter((point) => {
      const matchesGroup = group === 'Todos' || point.group === group
      const matchesQuery = !q || [point.title, point.group, point.source]
        .some((value) => value.toLowerCase().includes(q))
      return matchesGroup && matchesQuery
    })
  }, [group, query, points])

  const createPoint = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const title = String(data.get('title') ?? '').trim()
    const pointGroup = String(data.get('group') ?? '').trim()
    const pointContent = String(data.get('content') ?? '').trim()
    if (!title || !pointGroup) return

    setPoints((current) => [
      ...current,
      {
        id: Date.now(),
        title,
        group: pointGroup,
        source: 'Acervo interno da Tenda',
        content: pointContent || undefined,
      },
    ])
    setShowCreate(false)
    event.currentTarget.reset()
  }

  if (selected) {
    return (
      <main className="page-content section-page">
        <button className="back-button" onClick={() => setSelected(null)}>
          <ArrowLeft size={17} /> Voltar aos pontos
        </button>

        <section className="panel point-detail">
          <span className="content-tag">{selected.group}</span>
          <h1>{selected.title}</h1>
          <p className="point-source">{selected.source}</p>

          {selected.content ? (
            <div className="internal-point-content">
              <BookOpen size={28} />
              <div>
                <h3>Leitura do ponto</h3>
                <p>{selected.content}</p>
              </div>
            </div>
          ) : (
            <div className="internal-point-content pending">
              <FileText size={28} />
              <div>
                <h3>Conteúdo ainda não publicado</h3>
                <p>Este ponto já está catalogado no sistema. A leitura será exibida aqui quando o conteúdo autorizado pela Tenda for inserido.</p>
              </div>
            </div>
          )}
        </section>
      </main>
    )
  }

  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Pontos</p>
          <h1>Pontos da casa</h1>
          <p>Consulte os pontos diretamente no sistema, organizados por falange.</p>
        </div>

        <div className="page-heading-actions">
          <label className="section-search">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nome do ponto ou falange..."
            />
          </label>

          {canManage && (
            <button className="admin-action-button" onClick={() => setShowCreate((value) => !value)}>
              <Plus size={17} /> Novo ponto
            </button>
          )}
        </div>
      </section>

      {showCreate && canManage && (
        <section className="panel inline-admin-form point-create-form">
          <form onSubmit={createPoint}>
            <input name="title" placeholder="Nome do ponto" required />
            <input name="group" placeholder="Falange/categoria" required />
            <textarea name="content" placeholder="Conteúdo autorizado para leitura no sistema" rows={5} />
            <button type="submit">Adicionar ponto</button>
          </form>
        </section>
      )}

      <div className="chip-row">
        {groups.map((item) => (
          <button
            key={item}
            className={item === group ? 'filter-chip active' : 'filter-chip'}
            onClick={() => setGroup(item)}
          >
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
              <p>{point.content ? 'Disponível para leitura' : 'Catalogado • conteúdo a publicar'}</p>
            </div>
            <div className="point-page-actions">
              <button onClick={() => setSelected(point)}>
                {point.content ? 'Abrir leitura' : 'Ver detalhes'}
              </button>
            </div>
          </article>
        ))}
      </section>

      {!visible.length && (
        <section className="panel prototype-note">
          <FileText size={22} />
          <p>Nenhum ponto encontrado com esse filtro.</p>
        </section>
      )}
    </main>
  )
}
