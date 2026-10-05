import { useMemo, useState } from 'react'
import { AuthFlow } from './components/AuthFlow'
import type { AuthScreen, SessionUser } from './types/auth'
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  FileText,
  HandHeart,
  Home,
  Menu,
  Moon,
  Search,
  Settings2,
  Sun,
  TentTree,
  UsersRound,
} from 'lucide-react'

type Call = {
  id: number
  name: string
  need: string
  image: string
}

type Study = {
  id: number
  title: string
  subtitle: string
  progress: number
}

type Point = {
  id: number
  title: string
  subtitle: string
  linkLabel: string
}

const calls: Call[] = [
  { id: 1, name: 'Velas brancas', need: 'Ainda faltam 20 unidades', image: '/images/velas.svg' },
  { id: 2, name: 'Café', need: 'Ainda faltam 2 kg', image: '/images/cafe.svg' },
  { id: 3, name: 'Flores brancas', need: 'Ainda faltam 3 buquês', image: '/images/flores.svg' },
]

const studies: Study[] = [
  { id: 1, title: 'Ervas na Umbanda', subtitle: 'Você parou no capítulo 4', progress: 72 },
  { id: 2, title: 'Os Guias da Umbanda', subtitle: '12 aulas', progress: 35 },
  { id: 3, title: 'Firmezas e seus significados', subtitle: '8 aulas', progress: 18 },
]

const points: Point[] = [
  { id: 1, title: 'Ponto de Caboclo', subtitle: 'Caboclo das Matas', linkLabel: 'Ver letra e referência' },
  { id: 2, title: 'Ponto de Preto-Velho', subtitle: 'Vovô Cambinda', linkLabel: 'Ver letra e referência' },
  { id: 3, title: 'Ponto de Exu', subtitle: 'Laroyê, Mojubá', linkLabel: 'Ver letra e referência' },
]

const navItems = [
  { label: 'Início', icon: Home },
  { label: 'Estudos', icon: BookOpen },
  { label: 'Terreiro', icon: TentTree },
  { label: 'Agenda', icon: CalendarDays },
  { label: 'Pontos', icon: FileText },
]

type Theme = 'claro' | 'terra' | 'noturno'

function App() {
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login')
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null)
  const [activeNav, setActiveNav] = useState('Início')
  const [searchOpen, setSearchOpen] = useState(false)
  const [pledged, setPledged] = useState<number[]>([])
  const [theme, setTheme] = useState<Theme>('claro')

  const pledgedSet = useMemo(() => new Set(pledged), [pledged])

  const togglePledge = (id: number) => {
    setPledged((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const cycleTheme = () => {
    setTheme((current) => current === 'claro' ? 'terra' : current === 'terra' ? 'noturno' : 'claro')
  }

  const handleLogin = (user: SessionUser) => {
    setSessionUser(user)
    setAuthScreen('app')
  }

  if (authScreen !== 'app' || !sessionUser) {
    return (
      <AuthFlow
        screen={authScreen === 'app' ? 'login' : authScreen}
        onScreenChange={setAuthScreen}
        onLogin={handleLogin}
      />
    )
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <img src="/brand-mark.svg" alt="Símbolo da Tenda Vida Plena" />
          <div>
            <span>Tenda de Umbanda</span>
            <strong>Vida Plena</strong>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Navegação principal">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={activeNav === label ? 'side-link active' : 'side-link'}
              onClick={() => setActiveNav(label)}
            >
              <Icon size={19} />
              <span>{label}</span>
            </button>
          ))}
          <button className="side-link" onClick={() => setActiveNav('Doações')}>
            <HandHeart size={19} />
            <span>Doações</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button className="side-link" onClick={cycleTheme}>
            {theme === 'noturno' ? <Moon size={19} /> : <Sun size={19} />}
            <span>Tema: {theme}</span>
          </button>
          <button className="side-link">
            <Settings2 size={19} />
            <span>Configurações</span>
          </button>
        </div>
      </aside>

      <div className="page-area">
        <header className="mobile-header">
          <div className="mobile-brand">
            <img src="/brand-mark.svg" alt="" />
            <strong>Vida Plena</strong>
          </div>
          <div className="mobile-actions">
            <button className="icon-button" aria-label="Pesquisar" onClick={() => setSearchOpen((v) => !v)}>
              <Search size={20} />
            </button>
            <button className="icon-button" aria-label="Perfil">
              <CircleUserRound size={24} />
            </button>
          </div>
        </header>

        {searchOpen && (
          <div className="search-panel">
            <Search size={18} />
            <input autoFocus placeholder="Buscar estudos, pontos ou datas..." />
          </div>
        )}

        <main className="page-content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">Hoje na casa</p>
              <h1>Bem-vindo(a) à Tenda Vida Plena.</h1>
              <p className="intro-copy">Aqui você acompanha o que está acontecendo, retoma seus estudos e vê onde pode ajudar.</p>
            </div>
            <button className="profile-chip">
              <CircleUserRound size={24} />
              <span>{sessionUser.name}</span>
            </button>
          </section>

          <section className="hero-card">
            <img src="/images/gira-caboclo.svg" alt="" className="hero-image" />
            <div className="hero-shade" />
            <div className="hero-content">
              <span className="hero-kicker">Próxima gira</span>
              <h2>Gira de Caboclo</h2>
              <div className="hero-meta">
                <span><CalendarDays size={17} /> Sábado, 19h</span>
                <span><TentTree size={17} /> Tenda de Umbanda Vida Plena</span>
              </div>
              <button className="primary-button">Ver detalhes <ChevronRight size={18} /></button>
            </div>
          </section>

          <section className="panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Ajuda à casa</p>
                <h3>O terreiro está precisando</h3>
                <p>Se puder contribuir com algum item, marque aqui para ajudar na organização.</p>
              </div>
              <button className="text-button">Ver tudo <ChevronRight size={16} /></button>
            </div>

            <div className="call-grid">
              {calls.map((item) => {
                const isPledged = pledgedSet.has(item.id)
                return (
                  <article className="call-card" key={item.id}>
                    <img src={item.image} alt="" className="call-image" />
                    <div className="call-body">
                      <h4>{item.name}</h4>
                      <p>{item.need}</p>
                      <button
                        className={isPledged ? 'secondary-button selected' : 'secondary-button'}
                        onClick={() => togglePledge(item.id)}
                      >
                        {isPledged ? 'Anotado, vou levar' : 'Posso levar'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="two-column">
            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Seus estudos</p>
                  <h3>Continue de onde parou</h3>
                </div>
                <button className="text-button">Ver estudos <ChevronRight size={16} /></button>
              </div>

              <div className="study-list">
                {studies.map((study) => (
                  <article className="study-card" key={study.id}>
                    <div className="study-thumb">
                      <img src="/images/folhas-estudo.svg" alt="" />
                    </div>
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

            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Pontos</p>
                  <h3>Letras e referências</h3>
                </div>
                <button className="text-button">Ver todos <ChevronRight size={16} /></button>
              </div>

              <div className="point-list">
                {points.map((point) => (
                  <article className="point-row" key={point.id}>
                    <div>
                      <strong>{point.title}</strong>
                      <small>{point.subtitle}</small>
                    </div>
                    <button className="point-link">{point.linkLabel}</button>
                  </article>
                ))}
              </div>
            </section>
          </section>

          <section className="panel quick-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Acesso rápido</p>
                <h3>O que você quer fazer agora?</h3>
              </div>
            </div>
            <div className="quick-grid">
              <button><CalendarDays size={22} /><span>Ver agenda</span></button>
              <button><BookOpen size={22} /><span>Abrir estudos</span></button>
              <button><UsersRound size={22} /><span>Comunidade</span></button>
              <button><HandHeart size={22} /><span>Chamados</span></button>
            </div>
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
    </div>
  )
}

export default App
