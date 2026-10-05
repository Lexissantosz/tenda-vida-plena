import { useMemo, useState } from 'react'
import {
  Check,
  Clock3,
  Mail,
  Phone,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react'

type PendingMember = {
  id: number
  name: string
  email: string
  phone: string
  requestedAt: string
}

type ActiveMember = {
  id: number
  name: string
  email: string
  role: 'Membro da casa' | 'Administrador da casa'
}

const initialPending: PendingMember[] = [
  {
    id: 1,
    name: 'Mariana Alves',
    email: 'mariana@example.com',
    phone: '(61) 99912-3344',
    requestedAt: 'Hoje, 14:32',
  },
  {
    id: 2,
    name: 'João Henrique',
    email: 'joao@example.com',
    phone: '(61) 99811-2200',
    requestedAt: 'Ontem, 20:15',
  },
  {
    id: 3,
    name: 'Cláudia Nascimento',
    email: 'claudia@example.com',
    phone: '(61) 99102-7788',
    requestedAt: '03 out, 18:40',
  },
]

const activeMembers: ActiveMember[] = [
  { id: 1, name: 'Ana Paula', email: 'ana@example.com', role: 'Membro da casa' },
  { id: 2, name: 'Carlos Mendes', email: 'carlos@example.com', role: 'Membro da casa' },
  { id: 3, name: 'Pai Rafael', email: 'rafael@example.com', role: 'Administrador da casa' },
]

export function MemberApprovalPanel() {
  const [pending, setPending] = useState(initialPending)
  const [history, setHistory] = useState<string[]>([])
  const [query, setQuery] = useState('')

  const filteredMembers = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return activeMembers
    return activeMembers.filter((member) =>
      [member.name, member.email, member.role].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    )
  }, [query])

  const decide = (person: PendingMember, decision: 'approved' | 'rejected') => {
    setPending((current) => current.filter((item) => item.id !== person.id))
    setHistory((current) => [
      `${person.name} foi ${decision === 'approved' ? 'aprovado(a)' : 'recusado(a)'} agora.`,
      ...current,
    ])
  }

  return (
    <main className="page-content admin-page">
      <section className="welcome-row admin-welcome">
        <div>
          <p className="eyebrow">Administração da casa</p>
          <h1>Membros e acessos</h1>
          <p className="intro-copy">
            Aprove novos cadastros e acompanhe quem já possui acesso ao sistema.
          </p>
        </div>

        <div className="admin-summary">
          <span><Clock3 size={18} /> {pending.length} aguardando</span>
          <span><ShieldCheck size={18} /> {activeMembers.length} ativos</span>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Novos cadastros</p>
            <h3>Aguardando aprovação</h3>
            <p>Confira os dados antes de liberar o acesso como membro da casa.</p>
          </div>
        </div>

        {pending.length === 0 ? (
          <div className="admin-empty">
            <Check size={24} />
            <strong>Nenhum cadastro pendente</strong>
            <span>Quando alguém solicitar acesso, aparecerá aqui.</span>
          </div>
        ) : (
          <div className="approval-list">
            {pending.map((person) => (
              <article className="approval-card" key={person.id}>
                <div className="approval-avatar">
                  <UserRound size={24} />
                </div>

                <div className="approval-person">
                  <strong>{person.name}</strong>
                  <span><Mail size={14} /> {person.email}</span>
                  <span><Phone size={14} /> {person.phone}</span>
                  <small>Solicitado: {person.requestedAt}</small>
                </div>

                <div className="approval-role">
                  <span>Perfil ao aprovar</span>
                  <strong>Membro da casa</strong>
                </div>

                <div className="approval-actions">
                  <button className="reject-button" onClick={() => decide(person, 'rejected')}>
                    <X size={17} /> Recusar
                  </button>
                  <button className="approve-button" onClick={() => decide(person, 'approved')}>
                    <Check size={17} /> Aprovar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="panel">
        <div className="section-heading members-heading">
          <div>
            <p className="eyebrow">Cadastros ativos</p>
            <h3>Membros da casa</h3>
          </div>

          <label className="member-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar membro..."
            />
          </label>
        </div>

        <div className="member-table">
          <div className="member-row member-row-head">
            <span>Nome</span>
            <span>E-mail</span>
            <span>Perfil</span>
          </div>

          {filteredMembers.map((member) => (
            <div className="member-row" key={member.id}>
              <strong>{member.name}</strong>
              <span>{member.email}</span>
              <span className={member.role === 'Administrador da casa' ? 'role-badge admin' : 'role-badge'}>
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {history.length > 0 && (
        <section className="panel decision-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Nesta sessão</p>
              <h3>Alterações recentes</h3>
            </div>
          </div>
          <div className="decision-history">
            {history.map((item, index) => <p key={`${item}-${index}`}>{item}</p>)}
          </div>
        </section>
      )}
    </main>
  )
}
