import { useState } from 'react'
import { AuthFlow } from './components/AuthFlow'
import { MemberApprovalPanel } from './components/MemberApprovalPanel'
import { ContributionModal } from './components/ContributionModal'
import { CreateCallModal, type NewCall } from './components/CreateCallModal'
import { StudiesPage } from './pages/StudiesPage'
import { CalendarPage } from './pages/CalendarPage'
import { PointsPage } from './pages/PointsPage'
import { TerreiroPage } from './pages/TerreiroPage'
import { ProfilePage } from './pages/ProfilePage'
import { DonationsPage } from './pages/DonationsPage'
import { SettingsPage } from './pages/SettingsPage'
import { CommunityPage } from './pages/CommunityPage'
import { initialCalls, prototypePoints, prototypeStudies } from './data/prototypeData'
import type { AuthScreen, SessionUser } from './types/auth'
import type { CallItem, Contribution } from './types/domain'
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  FileText,
  HandHeart,
  Home,
  Menu,
  Search,
  Settings2,
  ShieldCheck,
  TentTree,
  UsersRound,
} from 'lucide-react'

type Theme = 'claro' | 'terra' | 'noturno'
type View =
  | 'Início'
  | 'Estudos'
  | 'Terreiro'
  | 'Agenda'
  | 'Pontos'
  | 'Doações'
  | 'Comunidade'
  | 'Perfil'
  | 'Configurações'
  | 'Membros'

const navItems = [
  { label: 'Início' as const, icon: Home },
  { label: 'Estudos' as const, icon: BookOpen },
  { label: 'Terreiro' as const, icon: TentTree },
  { label: 'Agenda' as const, icon: CalendarDays },
  { label: 'Pontos' as const, icon: FileText },
]

function App() {
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login')
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null)
  const [activeView, setActiveView] = useState<View>('Início')
  const [searchOpen, setSearchOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>('claro')
  const [calls, setCalls] = useState<CallItem[]>(initialCalls)
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [callModalOpen, setCallModalOpen] = useState(false)
  const [contributionCall, setContributionCall] = useState<CallItem | null>(null)

  const canManageHouse =
    sessionUser?.role === 'house_admin' || sessionUser?.role === 'system_admin'

  const handleLogin = (user: SessionUser) => {
    setSessionUser(user)
    setActiveView('Início')
    setAuthScreen('app')
  }

  const navigate = (view: View) => {
    setActiveView(view)
    setSearchOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const createCall = (newCall: NewCall) => {
    setCalls((current) => [
      ...current,
      {
        id: Date.now(),
        name: newCall.name,
        total: newCall.total,
        remaining: newCall.total,
        unit: newCall.unit,
        image: newCall.image,
      },
    ])
    setCallModalOpen(false)
  }

  const pledgeContribution = (quantity: number) => {
    if (!contributionCall || !sessionUser) return

    setContributions((current) => [
      ...current,
      {
        id: Date.now(),
        callId: contributionCall.id,
        memberName: sessionUser.name,
        quantity,
        status: 'pending',
      },
    ])
    setContributionCall(null)
  }

  const decideContribution = (contributionId: number, delivered: boolean) => {
    const contribution = contributions.find((item) => item.id === contributionId)
    if (!contribution || contribution.status !== 'pending') return

    setContributions((current) =>
      current.map((item) =>
        item.id === contributionId
          ? { ...item, status: delivered ? 'delivered' : 'not_delivered' }
          : item,
      ),
    )

    if (delivered) {
      setCalls((current) =>
        current.map((call) =>
          call.id === contribution.callId
            ? {
                ...call,
                remaining: Math.max(0, call.remaining - contribution.quantity),
              }
            : call,
        ),
      )
    }
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

  const homeStudies = prototypeStudies.slice(0, 3)
  const homePoints = prototypePoints.slice(0, 3)

  const renderContent = () => {
    if (activeView === 'Membros' && canManageHouse) return <MemberApprovalPanel />

    if (activeView === 'Estudos') return <StudiesPage />
    if (activeView === 'Agenda') return <CalendarPage />
    if (activeView === 'Pontos') return <PointsPage />
    if (activeView === 'Doações') return <DonationsPage onOpenCalls={() => navigate('Terreiro')} />
    if (activeView === 'Comunidade') return <CommunityPage onOpenProfile={() => navigate('Perfil')} />
    if (activeView === 'Perfil') return (
      <ProfilePage
        user={sessionUser}
        onSwitchProfile={() => {
          setSessionUser(null)
          setAuthScreen('login')
        }}
      />
    )
    if (activeView === 'Configurações') {
      return <SettingsPage theme={theme} onThemeChange={setTheme} />
    }
    if (activeView === 'Terreiro') {
      return (
        <TerreiroPage
          role={sessionUser.role}
          calls={calls}
          contributions={contributions}
          onCreateCall={() => setCallModalOpen(true)}
          onContribute={setContributionCall}
          onContributionDecision={decideContribution}
          onOpenCommunity={() => navigate('Comunidade')}
          onOpenMembers={() => navigate('Membros')}
        />
      )
    }

    return (
      <main className="page-content">
        <section className="welcome-row">
          <div>
            <p className="eyebrow">Hoje na casa</p>
            <h1>Bem-vindo(a) à Tenda Vida Plena.</h1>
            <p className="intro-copy">
              Aqui você acompanha o que está acontecendo, retoma seus estudos e vê onde pode ajudar.
            </p>
          </div>
          <button className="profile-chip" onClick={() => navigate('Perfil')}>
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
            <button className="primary-button" onClick={() => navigate('Agenda')}>
              Ver detalhes <ChevronRight size={18} />
            </button>
          </div>
        </section>

        <section className="panel calls-highlight-panel">
          <div className="section-heading calls-heading">
            <div>
              <p className="eyebrow">Ajuda à casa</p>
              <h3>O terreiro está precisando</h3>
              <p>Veja os chamados abertos e escolha quanto consegue levar. A quantidade só baixa depois que um responsável confirma a entrega.</p>
              <span className="open-calls-count">{calls.filter((call) => call.remaining > 0).length} chamados abertos</span>
            </div>
            {canManageHouse ? (
              <button className="admin-action-button" onClick={() => setCallModalOpen(true)}>
                Criar chamado
              </button>
            ) : (
              <button className="text-button" onClick={() => navigate('Terreiro')}>
                Ver tudo <ChevronRight size={16} />
              </button>
            )}
          </div>

          <div className="call-grid">
            {calls.slice(0, 3).map((item) => (
              <article className="call-card" key={item.id}>
                <img src={item.image} alt="" className="call-image" />
                <div className="call-body">
                  <h4>{item.name}</h4>
                  <p>
                    Faltam {item.remaining} de {item.total} {item.unit}
                  </p>
                  {item.remaining > 0 ? (
                    canManageHouse ? (
                      <button className="secondary-button" onClick={() => navigate('Terreiro')}>
                        Gerenciar chamado
                      </button>
                    ) : (
                      <button className="secondary-button" onClick={() => setContributionCall(item)}>
                        Posso levar uma parte
                      </button>
                    )
                  ) : (
                    <button className="secondary-button selected" disabled>
                      Chamado concluído
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>

          <button className="calls-footer-button" onClick={() => navigate('Terreiro')}>
            Ver todos os chamados <ChevronRight size={17} />
          </button>
        </section>

        <section className="two-column">
          <section className="panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Seus estudos</p>
                <h3>Continue de onde parou</h3>
              </div>
              <button className="text-button" onClick={() => navigate('Estudos')}>
                Ver estudos <ChevronRight size={16} />
              </button>
            </div>

            <div className="study-list">
              {homeStudies.map((study) => (
                <button className="study-card clickable-card" key={study.id} onClick={() => navigate('Estudos')}>
                  <div className="study-thumb">
                    <img src="/images/folhas-estudo.svg" alt="" />
                  </div>
                  <div className="study-copy">
                    <strong>{study.title}</strong>
                    <small>{study.lessons.length} aulas</small>
                    <div className="progress-track">
                      <span style={{ width: `${study.progress}%` }} />
                    </div>
                  </div>
                  <span className="progress-label">{study.progress}%</span>
                </button>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Pontos</p>
                <h3>Letras e referências</h3>
              </div>
              <button className="text-button" onClick={() => navigate('Pontos')}>
                Ver pontos <ChevronRight size={16} />
              </button>
            </div>

            <div className="point-list">
              {homePoints.map((point) => (
                <article className="point-row" key={point.id}>
                  <div>
                    <strong>{point.title}</strong>
                    <small>{point.group}</small>
                  </div>
                  <button className="point-link" onClick={() => navigate('Pontos')}>
                    Ver letra e referência
                  </button>
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
            <button onClick={() => navigate('Agenda')}><CalendarDays size={22} /><span>Ver agenda</span></button>
            <button onClick={() => navigate('Estudos')}><BookOpen size={22} /><span>Abrir estudos</span></button>
            <button onClick={() => navigate('Comunidade')}><UsersRound size={22} /><span>Comunidade</span></button>
            <button onClick={() => navigate('Terreiro')}><HandHeart size={22} /><span>Chamados</span></button>
          </div>
        </section>
      </main>
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
              className={activeView === label ? 'side-link active' : 'side-link'}
              onClick={() => navigate(label)}
            >
              <Icon size={19} />
              <span>{label}</span>
            </button>
          ))}

          <button className={activeView === 'Doações' ? 'side-link active' : 'side-link'} onClick={() => navigate('Doações')}>
            <HandHeart size={19} />
            <span>Doações</span>
          </button>

          {canManageHouse && (
            <button className={activeView === 'Membros' ? 'side-link active' : 'side-link'} onClick={() => navigate('Membros')}>
              <ShieldCheck size={19} />
              <span>Membros e acessos</span>
            </button>
          )}
        </nav>

        <div className="sidebar-bottom">
          <button className={activeView === 'Perfil' ? 'side-link active' : 'side-link'} onClick={() => navigate('Perfil')}>
            <CircleUserRound size={19} />
            <span>Perfil</span>
          </button>
          <button className={activeView === 'Configurações' ? 'side-link active' : 'side-link'} onClick={() => navigate('Configurações')}>
            <Settings2 size={19} />
            <span>Configurações</span>
          </button>
        </div>
      </aside>

      {callModalOpen && canManageHouse && (
        <CreateCallModal onClose={() => setCallModalOpen(false)} onCreate={createCall} />
      )}

      {contributionCall && !canManageHouse && (
        <ContributionModal
          call={contributionCall}
          onClose={() => setContributionCall(null)}
          onConfirm={pledgeContribution}
        />
      )}

      <div className="page-area">
        <header className="mobile-header">
          <div className="mobile-brand">
            <img src="/brand-mark.svg" alt="" />
            <strong>Vida Plena</strong>
          </div>
          <div className="mobile-actions">
            <button className="icon-button" aria-label="Pesquisar" onClick={() => setSearchOpen((current) => !current)}>
              <Search size={20} />
            </button>
            <button className="icon-button" aria-label="Perfil" onClick={() => navigate('Perfil')}>
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

        {renderContent()}

        <nav className="mobile-nav" aria-label="Navegação mobile">
          {navItems.slice(0, 4).map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={activeView === label ? 'mobile-nav-button active' : 'mobile-nav-button'}
              onClick={() => navigate(label)}
            >
              <Icon size={21} />
              <span>{label}</span>
            </button>
          ))}
          <button className="mobile-nav-button" onClick={() => navigate('Configurações')}>
            <Menu size={21} />
            <span>Mais</span>
          </button>
        </nav>
      </div>
    </div>
  )
}

export default App
