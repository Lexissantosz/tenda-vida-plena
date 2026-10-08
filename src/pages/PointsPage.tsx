import { FormEvent, useMemo, useState } from 'react'
import {
  ArrowLeft,
  BookOpen,
  Check,
  FileText,
  MessageCircle,
  MessagesSquare,
  Pencil,
  Plus,
  Search,
  Send,
  X,
} from 'lucide-react'
import { prototypePoints } from '../data/prototypeData'
import type { PointComment, PointItem, PointQuestion } from '../types/domain'

type PointsPageProps = {
  canManage?: boolean
  currentUserName: string
  comments: PointComment[]
  questions: PointQuestion[]
  onAddComment: (pointId: number, message: string) => void
  onAskQuestion: (pointId: number, message: string) => void
  onResolveQuestion: (questionId: number) => void
}

export function PointsPage({
  canManage = false,
  currentUserName,
  comments,
  questions,
  onAddComment,
  onAskQuestion,
  onResolveQuestion,
}: PointsPageProps) {
  const [points, setPoints] = useState(prototypePoints)
  const [group, setGroup] = useState('Todos')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<PointItem | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editGroup, setEditGroup] = useState('')
  const [editContent, setEditContent] = useState('')
  const [commentText, setCommentText] = useState('')
  const [questionText, setQuestionText] = useState('')
  const [commentSent, setCommentSent] = useState(false)
  const [questionSent, setQuestionSent] = useState(false)

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

  const openQuestions = questions.filter((question) => question.status === 'open')

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

  const startEdit = () => {
    if (!selected) return
    setEditTitle(selected.title)
    setEditGroup(selected.group)
    setEditContent(selected.content ?? '')
    setEditing(true)
  }

  const saveEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selected || !editTitle.trim() || !editGroup.trim()) return

    const updated: PointItem = {
      ...selected,
      title: editTitle.trim(),
      group: editGroup.trim(),
      content: editContent.trim() || undefined,
    }

    setPoints((current) => current.map((point) => point.id === selected.id ? updated : point))
    setSelected(updated)
    setEditing(false)
  }

  const submitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selected || !commentText.trim()) return
    onAddComment(selected.id, commentText)
    setCommentText('')
    setCommentSent(true)
    window.setTimeout(() => setCommentSent(false), 2200)
  }

  const submitQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selected || !questionText.trim()) return
    onAskQuestion(selected.id, questionText)
    setQuestionText('')
    setQuestionSent(true)
    window.setTimeout(() => setQuestionSent(false), 2600)
  }

  if (selected) {
    const pointComments = comments.filter((comment) => comment.pointId === selected.id)
    const pointQuestions = questions.filter((question) => question.pointId === selected.id)

    return (
      <main className="page-content section-page">
        <button className="back-button" onClick={() => {
          setSelected(null)
          setEditing(false)
          setCommentText('')
          setQuestionText('')
        }}>
          <ArrowLeft size={17} /> Voltar aos pontos
        </button>

        <section className="panel point-detail">
          <div className="point-detail-heading">
            <div>
              <span className="content-tag">{selected.group}</span>
              <h1>{selected.title}</h1>
              <p className="point-source">{selected.source}</p>
            </div>

            {canManage && (
              <button className="point-edit-button" onClick={editing ? () => setEditing(false) : startEdit}>
                {editing ? <X size={17} /> : <Pencil size={17} />}
                {editing ? 'Cancelar edição' : 'Editar conteúdo'}
              </button>
            )}
          </div>

          {editing && canManage ? (
            <form className="point-edit-form" onSubmit={saveEdit}>
              <label>
                <span>Nome</span>
                <input value={editTitle} onChange={(event) => setEditTitle(event.target.value)} required />
              </label>

              <label>
                <span>Falange/categoria</span>
                <input value={editGroup} onChange={(event) => setEditGroup(event.target.value)} required />
              </label>

              <label className="point-edit-content">
                <span>Conteúdo para leitura no sistema</span>
                <textarea
                  value={editContent}
                  onChange={(event) => setEditContent(event.target.value)}
                  rows={14}
                  placeholder="Cole aqui o conteúdo do ponto..."
                />
              </label>

              <div className="point-edit-actions">
                <button type="button" className="modal-secondary" onClick={() => setEditing(false)}>Cancelar</button>
                <button type="submit" className="modal-primary">Salvar no protótipo</button>
              </div>

              <small>Enquanto não houver backend, esta edição fica salva somente até recarregar a página.</small>
            </form>
          ) : selected.content ? (
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
                <h3>Conteúdo em cadastro</h3>
                <p>Este ponto já está catalogado. O texto será exibido aqui quando for inserido no sistema.</p>
              </div>
            </div>
          )}
        </section>

        <section className="point-social-grid">
          <section className="panel point-comments-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Comunidade</p>
                <h3>Comentários</h3>
                <p>Converse com outras pessoas da casa sobre este ponto.</p>
              </div>
              <span className="point-social-count">{pointComments.length}</span>
            </div>

            <form className="point-message-form" onSubmit={submitComment}>
              <textarea
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                placeholder="Escreva um comentário..."
                rows={3}
              />
              <button type="submit"><MessageCircle size={16} /> Comentar</button>
            </form>

            {commentSent && <p className="point-form-success">Comentário publicado.</p>}

            <div className="point-comment-list">
              {pointComments.map((comment) => (
                <article className="point-comment-card" key={comment.id}>
                  <div className="point-comment-avatar">{comment.authorName.slice(0, 1).toUpperCase()}</div>
                  <div>
                    <div className="point-comment-meta">
                      <strong>{comment.authorName}</strong>
                      <small>{comment.createdAt}</small>
                    </div>
                    <p>{comment.message}</p>
                  </div>
                </article>
              ))}

              {!pointComments.length && (
                <div className="point-social-empty">
                  <MessagesSquare size={21} />
                  <span>Ainda não há comentários. Você pode ser a primeira pessoa.</span>
                </div>
              )}
            </div>
          </section>

          <section className="panel point-question-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Dúvida ou correção</p>
                <h3>Falar com responsáveis</h3>
                <p>Envie uma mensagem privada para Pai/Mãe de Santo e administradores sobre este ponto.</p>
              </div>
            </div>

            <form className="point-message-form" onSubmit={submitQuestion}>
              <textarea
                value={questionText}
                onChange={(event) => setQuestionText(event.target.value)}
                placeholder="Ex.: Acho que este trecho está diferente do que usamos na casa..."
                rows={4}
              />
              <button type="submit"><Send size={16} /> Enviar aos responsáveis</button>
            </form>

            {questionSent && (
              <p className="point-form-success">Mensagem enviada aos responsáveis.</p>
            )}

            {canManage && (
              <div className="point-admin-questions">
                <h4>Mensagens sobre este ponto</h4>
                {pointQuestions.map((question) => (
                  <article className={question.status === 'resolved' ? 'point-question-card resolved' : 'point-question-card'} key={question.id}>
                    <div>
                      <strong>{question.authorName}</strong>
                      <small>{question.createdAt}</small>
                      <p>{question.message}</p>
                    </div>
                    {question.status === 'open' ? (
                      <button onClick={() => onResolveQuestion(question.id)}>
                        <Check size={15} /> Marcar resolvida
                      </button>
                    ) : (
                      <span className="resolved-label"><Check size={14} /> Resolvida</span>
                    )}
                  </article>
                ))}

                {!pointQuestions.length && (
                  <div className="point-social-empty">
                    <Check size={21} />
                    <span>Nenhuma dúvida enviada sobre este ponto.</span>
                  </div>
                )}
              </div>
            )}
          </section>
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

      {canManage && openQuestions.length > 0 && (
        <section className="panel point-inbox-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Caixa de entrada</p>
              <h3>Dúvidas pendentes dos pontos</h3>
              <p>Mensagens enviadas por membros para Pai/Mãe de Santo e administradores.</p>
            </div>
            <span className="point-social-count">{openQuestions.length}</span>
          </div>

          <div className="point-inbox-list">
            {openQuestions.map((question) => {
              const point = points.find((item) => item.id === question.pointId)
              return (
                <article className="point-inbox-row" key={question.id}>
                  <button className="point-inbox-main" onClick={() => point && setSelected(point)}>
                    <strong>{point?.title ?? 'Ponto'}</strong>
                    <span>{question.authorName}: {question.message}</span>
                    <small>{question.createdAt}</small>
                  </button>
                  <button className="point-inbox-resolve" onClick={() => onResolveQuestion(question.id)}>
                    <Check size={15} /> Resolver
                  </button>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {showCreate && canManage && (
        <section className="panel inline-admin-form point-create-form">
          <form onSubmit={createPoint}>
            <input name="title" placeholder="Nome do ponto" required />
            <input name="group" placeholder="Falange/categoria" required />
            <textarea name="content" placeholder="Conteúdo para leitura no sistema" rows={5} />
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
        {visible.map((point) => {
          const commentCount = comments.filter((comment) => comment.pointId === point.id).length
          return (
            <article className="point-page-card" key={point.id}>
              <div className="point-page-icon"><FileText size={23} /></div>
              <div className="point-page-copy">
                <span className="content-tag">{point.group}</span>
                <h3>{point.title}</h3>
                <p>{point.content ? 'Disponível para leitura' : 'Catalogado na Tenda'}</p>
                <small className="point-comment-count"><MessageCircle size={13} /> {commentCount} comentário{commentCount === 1 ? '' : 's'}</small>
              </div>
              <div className="point-page-actions">
                <button onClick={() => setSelected(point)}>
                  {point.content ? 'Abrir ponto' : 'Ver ponto'}
                </button>
              </div>
            </article>
          )
        })}
      </section>

      {!visible.length && (
        <section className="panel prototype-note">
          <FileText size={22} />
          <p>Nenhum ponto encontrado com esse filtro.</p>
        </section>
      )}

      <p className="points-session-note">Sessão atual: {currentUserName}</p>
    </main>
  )
}
