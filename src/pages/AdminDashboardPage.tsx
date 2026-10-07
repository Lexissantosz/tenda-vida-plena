import { BookOpen, CalendarDays, FileText, PackageOpen, ShieldCheck, UsersRound } from 'lucide-react'
import type { CallItem, Contribution, HouseEvent } from '../types/domain'

type AdminDashboardProps = {
  calls: CallItem[]
  contributions: Contribution[]
  events: HouseEvent[]
  onNavigate: (view: string) => void
}

export function AdminDashboardPage({ calls, contributions, events, onNavigate }: AdminDashboardProps) {
  const pendingDeliveries = contributions.filter((item) => item.status === 'pending').length
  const openCalls = calls.filter((call) => !call.closed && call.remaining > 0).length

  const shortcuts = [
    { label: 'Chamados', value: `${openCalls} abertos`, icon: PackageOpen, view: 'Terreiro' },
    { label: 'Entregas', value: `${pendingDeliveries} pendentes`, icon: ShieldCheck, view: 'Terreiro' },
    { label: 'Membros', value: 'Aprovar acessos', icon: UsersRound, view: 'Membros' },
    { label: 'Agenda', value: `${events.length} eventos`, icon: CalendarDays, view: 'Agenda' },
    { label: 'Estudos', value: 'Gerenciar conteúdo', icon: BookOpen, view: 'Estudos' },
    { label: 'Pontos', value: 'Letras e referências', icon: FileText, view: 'Pontos' },
  ]

  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Administração</p>
          <h1>Painel da casa</h1>
          <p>Uma visão rápida para responsáveis e administradores encontrarem o que precisa de atenção.</p>
        </div>
      </section>

      <section className="admin-dashboard-grid">
        {shortcuts.map(({ label, value, icon: Icon, view }) => (
          <button key={label} className="admin-dashboard-card" onClick={() => onNavigate(view)}>
            <Icon size={24} />
            <strong>{label}</strong>
            <span>{value}</span>
          </button>
        ))}
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Materiais da casa</p>
            <h3>Entradas e saídas</h3>
            <p>Registre e consulte movimentações de materiais no protótipo.</p>
          </div>
          <button className="admin-action-button" onClick={() => onNavigate('Materiais')}>Abrir histórico</button>
        </div>
      </section>
    </main>
  )
}
