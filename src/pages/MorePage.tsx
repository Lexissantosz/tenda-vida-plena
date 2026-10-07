import {
  Bell,
  CalendarDays,
  CircleUserRound,
  HandHeart,
  Settings2,
  ShieldCheck,
} from 'lucide-react'
import type { UserRole } from '../types/auth'

type MorePageProps = {
  role: UserRole
  onNavigate: (view: string) => void
}

export function MorePage({ role, onNavigate }: MorePageProps) {
  const canManage = role === 'house_admin' || role === 'system_admin'

  const items = [
    { label: 'Agenda', description: 'Calendário e próximas atividades', icon: CalendarDays, view: 'Agenda' },
    { label: 'Doações', description: 'Formas de apoio e chamados', icon: HandHeart, view: 'Doações' },
    { label: 'Notificações', description: 'Avisos e novidades da casa', icon: Bell, view: 'Notificações' },
    { label: 'Perfil', description: 'Dados e tipo de acesso', icon: CircleUserRound, view: 'Perfil' },
    { label: 'Configurações', description: 'Tema e preferências', icon: Settings2, view: 'Configurações' },
  ]

  if (canManage) {
    items.unshift({
      label: 'Administração',
      description: 'Painel da casa e controles',
      icon: ShieldCheck,
      view: 'Administração',
    })
  }

  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Mais</p>
          <h1>Outras áreas do sistema</h1>
          <p>Atalhos que não precisam ocupar a barra principal do celular o tempo inteiro.</p>
        </div>
      </section>

      <section className="more-grid">
        {items.map(({ label, description, icon: Icon, view }) => (
          <button className="more-card" key={view} onClick={() => onNavigate(view)}>
            <Icon size={23} />
            <span>
              <strong>{label}</strong>
              <small>{description}</small>
            </span>
          </button>
        ))}
      </section>
    </main>
  )
}
