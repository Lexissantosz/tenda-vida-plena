import { Check, PackageOpen, Plus, ScrollText, UsersRound, X } from 'lucide-react'
import type { UserRole } from '../types/auth'
import type { CallItem, Contribution } from '../types/domain'

type TerreiroPageProps = {
  role: UserRole
  calls: CallItem[]
  contributions: Contribution[]
  onCreateCall: () => void
  onContribute: (call: CallItem) => void
  onContributionDecision: (id: number, delivered: boolean) => void
  onOpenCommunity: () => void
  onOpenMembers: () => void
}

export function TerreiroPage({
  role,
  calls,
  contributions,
  onCreateCall,
  onContribute,
  onContributionDecision,
  onOpenCommunity,
  onOpenMembers,
}: TerreiroPageProps) {
  const canManage = role === 'house_admin' || role === 'system_admin'
  const pending = contributions.filter((item) => item.status === 'pending')
  const openCalls = calls.filter((call) => call.remaining > 0)

  return (
    <main className="page-content section-page">
      <section className="section-page-heading terreiro-page-heading">
        <div>
          <p className="eyebrow">Terreiro</p>
          <h1>O que a casa está precisando</h1>
          <p>Veja os chamados abertos, contribua com o que puder e acompanhe o que ainda falta.</p>
        </div>
        {canManage && (
          <button className="admin-action-button" onClick={onCreateCall}>
            <Plus size={17} /> Criar chamado
          </button>
        )}
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

            return (
              <article className={call.remaining === 0 ? 'management-call-card complete' : 'management-call-card'} key={call.id}>
                <img src={call.image} alt="" />
                <div className="management-call-content">
                  <div className="management-call-title">
                    <h3>{call.name}</h3>
                    {call.remaining === 0 && <span className="call-complete-badge">Concluído</span>}
                  </div>

                  <p>
                    {call.remaining > 0
                      ? `Ainda faltam ${call.remaining} de ${call.total} ${call.unit}`
                      : `Meta de ${call.total} ${call.unit} alcançada`}
                  </p>

                  <div className="progress-track">
                    <span style={{ width: `${percentage}%` }} />
                  </div>

                  <small>{delivered} {call.unit} já confirmados</small>

                  {!canManage && call.remaining > 0 && (
                    <button className="take-part-button" onClick={() => onContribute(call)}>
                      Quero levar
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
                      <button className="reject-button" onClick={() => onContributionDecision(item.id, false)}>
                        <X size={16} /> Não levou
                      </button>
                      <button className="approve-button" onClick={() => onContributionDecision(item.id, true)}>
                        <Check size={16} /> Levou
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="admin-empty">
              <Check size={24} />
              <strong>Nenhuma entrega aguardando confirmação</strong>
            </div>
          )}
        </section>
      )}

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
          <button onClick={canManage ? onOpenMembers : onOpenCommunity}>
            {canManage ? 'Gerenciar membros' : 'Ver comunidade'}
          </button>
        </article>

        {canManage && (
          <article className="terreiro-feature">
            <ScrollText size={25} />
            <span>Materiais</span>
            <strong>Entradas e saídas</strong>
            <p>Espaço reservado para histórico de doações e movimentações da casa.</p>
            <button>Em definição</button>
          </article>
        )}
      </section>
    </main>
  )
}
