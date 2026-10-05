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
  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Configurações</p>
          <h1>Preferências do sistema</h1>
          <p>Os temas ficam aqui. Depois podemos adicionar tamanho de fonte, notificações e outras preferências.</p>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Aparência</p>
            <h3>Escolha um tema</h3>
          </div>
        </div>

        <div className="theme-grid">
          {themes.map((item) => (
            <button
              className={theme === item.id ? 'theme-card active' : 'theme-card'}
              key={item.id}
              onClick={() => onThemeChange(item.id)}
            >
              <span className={`theme-preview ${item.id}`} />
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
