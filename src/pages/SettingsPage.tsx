import { useState } from 'react'
import { Bell, BellOff } from 'lucide-react'

type Theme = 'claro' | 'terra' | 'noturno'

type SettingsPageProps = {
  theme: Theme
  onThemeChange: (theme: Theme) => void
}

const themes: { id: Theme; title: string; description: string }[] = [
  { id: 'claro', title: 'Claro', description: 'Creme, dourado suave e tons naturais.' },
  { id: 'terra', title: 'Terra', description: 'Bege quente, madeira e tons terrosos.' },
  { id: 'noturno', title: 'Noturno', description: 'Fundo escuro com contraste suave.' },
]

export function SettingsPage({ theme, onThemeChange }: SettingsPageProps) {
  const [notifications, setNotifications] = useState({ events: true, calls: true, studies: false })

  const toggle = (key: keyof typeof notifications) => {
    setNotifications((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Configurações</p>
          <h1>Preferências do sistema</h1>
          <p>Temas e preferências ficam centralizados aqui.</p>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading"><div><p className="eyebrow">Aparência</p><h3>Escolha um tema</h3></div></div>
        <div className="theme-grid">
          {themes.map((item) => (
            <button className={theme === item.id ? 'theme-card active' : 'theme-card'} key={item.id} onClick={() => onThemeChange(item.id)}>
              <span className={`theme-preview ${item.id}`} />
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="panel settings-notifications">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Notificações</p>
            <h3>O que você quer acompanhar</h3>
            <p>Preferências demonstrativas. As notificações reais dependem do backend/PWA.</p>
          </div>
        </div>
        {[
          ['events', 'Próximas giras e eventos'],
          ['calls', 'Novos chamados e itens faltando'],
          ['studies', 'Novos conteúdos de estudo'],
        ].map(([key, label]) => {
          const enabled = notifications[key as keyof typeof notifications]
          return (
            <button className="setting-toggle-row" key={key} onClick={() => toggle(key as keyof typeof notifications)}>
              {enabled ? <Bell size={19} /> : <BellOff size={19} />}
              <span><strong>{label}</strong><small>{enabled ? 'Ativado' : 'Desativado'}</small></span>
              <span className={enabled ? 'toggle-pill active' : 'toggle-pill'} />
            </button>
          )
        })}
      </section>
    </main>
  )
}
