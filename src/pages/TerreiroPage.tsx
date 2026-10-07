import { CalendarDays, Check, PackageOpen, Plus, ScrollText, UsersRound, X } from 'lucide-react'
import type { UserRole } from '../types/auth'
import type { CallItem, Contribution, HouseEvent } from '../types/domain'

type TerreiroPageProps = {
  role: UserRole
  calls: CallItem[]
  contributions: Contribution[]
  events: HouseEvent[]
  onCreateCall: () => void
  onContribute: (call: CallItem) => void
  onContributionDecision: (id: number, delivered: boolean) => void
  onToggleCallClosed: (id: number) => void
  onOpenCommunity: () => void
  onOpenMembers: () => void
  onOpenMaterials: () => void
}

export function TerreiroPage({
  role,
  calls,
  contributions,
  events,
  onCreateCall,
  onContribute,
  onContributionDecision,
  onToggleCallClosed,
  onOpenCommunity,
  onOpenMembers,
  onOpenMaterials,
}: TerreiroPageProps) {
  const canManage = role === 'house_admin' || role === 'system_admin'
  const pending = contributions.filter((item) => item.status === 'pending')
  const openCalls = calls.filter((call) => !call.closed && call.remaining > 0)
  const nextEvents = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3)

  return (
    <main className="page-content section-page">
      <section className="section-page-heading terreiro-page-heading">
        <div>
          <p className="eyebrow">Terreiro</p>
          <h1>O que a casa está precisando</h1>
          <p>Veja chamados, próximas atividades e áreas de organização da casa.</p>
        </div>
        {canManage && <button className="admin-action-button" onClick={onCreateCall}><Plus size={17} /> Criar chamado</button>}
      </section>

      <section className="panel calls-primary-panel" id="chamados">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Chamados do terreiro</p>
            <h3>{openCalls.length} necessidades abertas</h3>
            <p>Você não precisa levar tudo. Pode escolher apenas a quantidade que consegue ajudar.</p>
          </div>
        </div>

        <div className="call-management-grid">
          {calls.map((call) => {
            const delivered = call.total - call.remaining
            const percentage = call.total > 0 ? (delivered / call.total) * 100 : 0
            const pendingForCall = contributions.some((item) => item.callId === call.id && item.status === 'pending')
            const status = call.closed || call.remaining === 0 ? 'Resolvido' : pendingForCall || delivered > 0 ? 'Em andamento' : 'Precisando'

            return (
              <article className={status === 'Resolvido' ? 'management-call-card complete' : 'management-call-card'} key={call.id}>
                <img src={call.image} alt="" />
                <div className="management-call-content">
                  <div className="management-call-title">
                    <h3>{call.name}</h3>
                    <span className={`call-status ${status === 'Resolvido' ? 'resolved' : status === 'Em andamento' ? 'progress' : 'needed'}`}>{status}</span>
                  </div>

                  <p>{call.remaining > 0 ? `Ainda faltam ${call.remaining} de ${call.total} ${call.unit}` : `Meta de ${call.total} ${call.unit} alcançada`}</p>
                  {call.deadline && <small>Prazo: {new Date(`${call.deadline}T12:00:00`).toLocaleDateString('pt-BR')}</small>}

                  <div className="progress-track"><span style={{ width: `${percentage}%` }} /></div>
                  <small>{delivered} {call.unit} já confirmados</small>

                  {!canManage && !call.closed && call.remaining > 0 && (
                    <button className="take-part-button" onClick={() => onContribute(call)}>Quero levar</button>
                  )}

                  {canManage && (
                    <button className="call-manage-button" onClick={() => onToggleCallClosed(call.id)}>
                      {call.closed ? 'Reabrir chamado' : 'Encerrar chamado'}
                    </button>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {canManage && (
        <section className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Confirmação de entrega</p>
              <h3>Quem disse que vai levar</h3>
              <p>Só confirme “Levou” depois da entrega real. Aí o chamado é abatido automaticamente.</p>
            </div>
          </div>

          {pending.length ? (
            <div className="delivery-list">
              {pending.map((item) => {
                const call = calls.find((candidate) => candidate.id === item.callId)
                return (
                  <article className="delivery-row" key={item.id}>
                    <div>
                      <strong>{item.memberName}</strong>
                      <span>{item.quantity} {call?.unit} de {call?.name}</span>
                    </div>
                    <div>
                      <button className="reject-button" onClick={() => onContributionDecision(item.id, false)}><X size={16} /> Não levou</button>
                      <button className="approve-button" onClick={() => onContributionDecision(item.id, true)}><Check size={16} /> Levou</button>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="admin-empty"><Check size={24} /><strong>Nenhuma entrega aguardando confirmação</strong></div>
          )}
        </section>
      )}

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Próximas atividades</p>
            <h3>O que vem pela frente</h3>
          </div>
        </div>
        <div className="upcoming-house-list">
          {nextEvents.map((event) => (
            <article key={event.id}>
              <CalendarDays size={19} />
              <div><strong>{event.title}</strong><span>{new Date(`${event.date}T12:00:00`).toLocaleDateString('pt-BR')} • {event.time}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="terreiro-grid terreiro-secondary-grid">
        <article className="terreiro-feature">
          <PackageOpen size={25} />
          <span>Chamados</span>
          <strong>{openCalls.length} necessidades abertas</strong>
          <p>Acompanhe rapidamente o que ainda falta para a casa.</p>
          <a href="#chamados">Voltar aos chamados</a>
        </article>

        <article className="terreiro-feature">
          <UsersRound size={25} />
          <span>Comunidade</span>
          <strong>{canManage ? 'Cadastros e membros' : 'Membros da casa'}</strong>
          <p>{canManage ? 'Aprove novos acessos e acompanhe os cadastros.' : 'Veja o espaço da comunidade.'}</p>
          <button onClick={canManage ? onOpenMembers : onOpenCommunity}>{canManage ? 'Gerenciar membros' : 'Ver comunidade'}</button>
        </article>

        {canManage && (
          <article className="terreiro-feature">
            <ScrollText size={25} />
            <span>Materiais</span>
            <strong>Entradas e saídas</strong>
            <p>Registre doações, consumo e outras movimentações de materiais da casa.</p>
            <button onClick={onOpenMaterials}>Abrir histórico</button>
          </article>
        )}
      </section>
    </main>
  )
}
