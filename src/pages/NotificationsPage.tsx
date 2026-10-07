import { Bell, CalendarDays, PackageOpen } from 'lucide-react'
import type { CallItem, HouseEvent } from '../types/domain'

type NotificationsPageProps = {
  calls: CallItem[]
  events: HouseEvent[]
}

export function NotificationsPage({ calls, events }: NotificationsPageProps) {
  const openCalls = calls.filter((call) => !call.closed && call.remaining > 0)
  const nextEvents = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3)

  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Notificações</p>
          <h1>Avisos importantes</h1>
          <p>No backend real, esta área receberá avisos automáticos. No protótipo, ela já mostra informações úteis da sessão.</p>
        </div>
      </section>

      <section className="notification-list">
        {openCalls.map((call) => (
          <article className="notification-card" key={`call-${call.id}`}>
            <div className="notification-icon"><PackageOpen size={20} /></div>
            <div>
              <strong>Chamado ainda aberto: {call.name}</strong>
              <p>Ainda faltam {call.remaining} {call.unit}.</p>
            </div>
          </article>
        ))}

        {nextEvents.map((event) => (
          <article className="notification-card" key={`event-${event.id}`}>
            <div className="notification-icon"><CalendarDays size={20} /></div>
            <div>
              <strong>{event.title}</strong>
              <p>{new Date(`${event.date}T12:00:00`).toLocaleDateString('pt-BR')} • {event.time}</p>
            </div>
          </article>
        ))}

        {!openCalls.length && !nextEvents.length && (
          <div className="admin-empty">
            <Bell size={24} />
            <strong>Nenhum aviso no momento</strong>
          </div>
        )}
      </section>
    </main>
  )
}
