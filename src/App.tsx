import { useMemo, useState } from 'react'
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  HandHeart,
  Home,
  Menu,
  Music2,
  Search,
  TentTree,
  UsersRound,
} from 'lucide-react'

type Call = {
  id: number
  name: string
  need: string
  icon: string
}

type Study = {
  id: number
  title: string
  subtitle: string
  progress: number
}

type Track = {
  id: number
  title: string
  subtitle: string
  duration: string
}

const calls: Call[] = [
  { id: 1, name: 'Velas brancas', need: 'Precisamos de 20 unidades', icon: '🕯️' },
  { id: 2, name: 'Café', need: 'Precisamos de 2 kg', icon: '☕' },
  { id: 3, name: 'Flores brancas', need: 'Precisamos de 3 buquês', icon: '🌼' },
]

const studies: Study[] = [
  { id: 1, title: 'Ervas na Umbanda', subtitle: 'Conheça o poder e os significados das principais ervas.', progress: 72 },
  { id: 2, title: 'Os Guias da Umbanda', subtitle: '12 aulas', progress: 35 },
  { id: 3, title: 'Firmezas e seus significados', subtitle: '8 aulas', progress: 18 },
]

const tracks: Track[] = [
  { id: 1, title: 'Ponto de Caboclo', subtitle: 'Caboclo das Matas', duration: '03:28' },
  { id: 2, title: 'Ponto de Preto-Velho', subtitle: 'Vovô Cambinda', duration: '04:12' },
  { id: 3, title: 'Ponto de Exu', subtitle: 'Laroyê, Mojubá', duration: '03:55' },
]

const navItems = [
  { label: 'Início', icon: Home },
  { label: 'Estudos', icon: BookOpen },
  { label: 'Terreiro', icon: TentTree },
  { label: 'Pontos', icon: Music2 },
  { label: 'Agenda', icon: CalendarDays },
]

function App() {
  const [activeNav, setActiveNav] = useState('Início')
  const [searchOpen, setSearchOpen] = useState(false)
  const [pledged, setPledged] = useState<number[]>([])

  const pledgedSet = useMemo(() => new Set(pledged), [pledged])

  const togglePledge = (id: number) => {
    setPledged((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <img src="/brand-mark.svg" alt="" className="brand-mark" />
          <div>
            <p className="eyebrow">Tenda de Umbanda</p>
            <h1>Vida Plena</h1>
          </div>
        </div>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={activeNav === label ? 'nav-button active' : 'nav-button'}
              onClick={() => setActiveNav(label)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
          <button className="nav-button" onClick={() => setActiveNav('Doações')}>
            <HandHeart size={18} />
            <span>Doações</span>
          </button>
        </nav>

        <div className="header-actions">
          <button className="icon-button" aria-label="Pesquisar" onClick={() => setSearchOpen((v) => !v)}>
            <Search size={20} />
          </button>
          <button className="icon-button notification" aria-label="Notificações">
            <Bell size={20} />
            <span className="dot" />
          </button>
          <button className="profile-button" aria-label="Abrir perfil">
            <CircleUserRound size={28} />
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-panel">
          <Search size={18} />
          <input autoFocus placeholder="Buscar estudos, pontos, agenda..." />
        </div>
      )}

      <main className="page-content">
        <section className="welcome-row">
          <div>
            <p className="eyebrow">Bem-vindo(a)</p>
            <h2>Fé, caridade e equilíbrio para caminhar em comunidade.</h2>
          </div>
          <p className="quote">“Tradição, amor e espiritualidade caminhando juntos por uma vida mais plena.”</p>
        </section>

        <section className="hero-grid">
          <article className="hero-card">
            <div className="hero-overlay" />
            <div className="hero-content">
              <span className="pill">Próxima gira</span>
              <h3>Gira de Caboclo</h3>
              <div className="hero-meta">
                <span><CalendarDays size={17} /> Sábado • 19h</span>
                <span><TentTree size={17} /> Tenda de Umbanda Vida Plena</span>
              </div>
              <button className="primary-button">
                Ver detalhes <ChevronRight size={18} />
              </button>
            </div>
          </article>

          <aside className="quick-card">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">Acesso rápido</p>
                <h3>Seu espaço na casa</h3>
              </div>
            </div>
            <div className="quick-grid">
              {[
                ['Agenda', CalendarDays],
                ['Conteúdos', BookOpen],
                ['Doações', HandHeart],
                ['Meus estudos', BookOpen],
                ['Pontos', Music2],
                ['Comunidade', UsersRound],
              ].map(([label, Icon]) => {
                const TypedIcon = Icon as typeof CalendarDays
                return (
                  <button className="quick-action" key={label as string}>
                    <TypedIcon size={22} />
                    <span>{label as string}</span>
                  </button>
                )
              })}
            </div>
          </aside>
        </section>

        <section className="content-grid">
          <div className="main-column">
            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Comunidade</p>
                  <h3>Chamados do terreiro</h3>
                  <p>Veja o que a casa está precisando e contribua com o que for possível.</p>
                </div>
                <button className="text-button">Ver todos <ChevronRight size={16} /></button>
              </div>

              <div className="call-grid">
                {calls.map((item) => {
                  const isPledged = pledgedSet.has(item.id)
                  return (
                    <article className="call-card" key={item.id}>
                      <div className="call-visual" aria-hidden="true">{item.icon}</div>
                      <h4>{item.name}</h4>
                      <p>{item.need}</p>
                      <button
                        className={isPledged ? 'secondary-button selected' : 'secondary-button'}
                        onClick={() => togglePledge(item.id)}
                      >
                        {isPledged ? 'Vou levar ✓' : 'Vou levar'}
                      </button>
                    </article>
                  )
                })}
              </div>
            </section>

            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Música e tradição</p>
                  <h3>Pontos recentes</h3>
                </div>
                <button className="text-button">Ver todos <ChevronRight size={16} /></button>
              </div>

              <div className="track-list">
                {tracks.map((track) => (
                  <button className="track-row" key={track.id}>
                    <span className="play-button">▶</span>
                    <span className="track-copy">
                      <strong>{track.title}</strong>
                      <small>{track.subtitle}</small>
                    </span>
                    <span className="duration">{track.duration}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="side-column">
            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Estudos</p>
                  <h3>Continue estudando</h3>
                </div>
              </div>

              <div className="study-list">
                {studies.map((study, index) => (
                  <article className={index === 0 ? 'study-card featured' : 'study-card'} key={study.id}>
                    <div className="study-icon">🌿</div>
                    <div className="study-copy">
                      <strong>{study.title}</strong>
                      <small>{study.subtitle}</small>
                      <div className="progress-track">
                        <span style={{ width: `${study.progress}%` }} />
                      </div>
                    </div>
                    <span className="progress-label">{study.progress}%</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="inspiration-card">
              <span>Espiritualidade que inspira</span>
              <strong>vidas mais plenas.</strong>
            </section>
          </aside>
        </section>
      </main>

      <nav className="mobile-nav" aria-label="Navegação mobile">
        {navItems.slice(0, 4).map(({ label, icon: Icon }) => (
          <button
            key={label}
            className={activeNav === label ? 'mobile-nav-button active' : 'mobile-nav-button'}
            onClick={() => setActiveNav(label)}
          >
            <Icon size={21} />
            <span>{label}</span>
          </button>
        ))}
        <button className="mobile-nav-button" onClick={() => setActiveNav('Mais')}>
          <Menu size={21} />
          <span>Mais</span>
        </button>
      </nav>
    </div>
  )
}

export default App
