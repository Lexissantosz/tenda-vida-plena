import { FormEvent, useState } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from 'lucide-react'
import type { AuthScreen, SessionUser } from '../types/auth'

type AuthFlowProps = {
  screen: Exclude<AuthScreen, 'app'>
  onScreenChange: (screen: Exclude<AuthScreen, 'app'>) => void
  onLogin: (user: SessionUser) => void
}

export function AuthFlow({ screen, onScreenChange, onLogin }: AuthFlowProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPhone, setRegisterPhone] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirm, setRegisterConfirm] = useState('')
  const [registerError, setRegisterError] = useState('')

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') ?? '')

    onLogin({
      name: 'Irmão(ã) da casa',
      email,
      role: 'member',
    })
  }

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (registerPassword.length < 6) {
      setRegisterError('A senha precisa ter pelo menos 6 caracteres.')
      return
    }

    if (registerPassword !== registerConfirm) {
      setRegisterError('As senhas não conferem.')
      return
    }

    setRegisterError('')
    onScreenChange('pending')
  }

  if (screen === 'pending') {
    return (
      <main className="auth-page">
        <section className="auth-visual" aria-hidden="true">
          <div className="auth-visual-content">
            <img src="/brand-mark.svg" alt="" />
            <p>Tenda de Umbanda</p>
            <h1>Vida Plena</h1>
            <span>Fé, caridade e equilíbrio espiritual.</span>
          </div>
        </section>

        <section className="auth-panel pending-panel">
          <div className="pending-icon">
            <CheckCircle2 size={34} />
          </div>
          <p className="auth-kicker">Cadastro recebido</p>
          <h2>Agora é só aguardar a aprovação.</h2>
          <p className="auth-description">
            Seu pedido de acesso foi enviado para os responsáveis da Tenda Vida Plena.
            Quando o cadastro for aprovado, você poderá entrar normalmente com seu e-mail e senha.
          </p>

          <div className="pending-summary">
            <span>Perfil solicitado</span>
            <strong>Membro da casa</strong>
            <small>Perfis administrativos são liberados somente por responsáveis autorizados.</small>
          </div>

          <button className="auth-primary" type="button" onClick={() => onScreenChange('login')}>
            Voltar para o login
          </button>
        </section>
      </main>
    )
  }

  if (screen === 'register') {
    return (
      <main className="auth-page">
        <section className="auth-visual" aria-hidden="true">
          <div className="auth-visual-content">
            <img src="/brand-mark.svg" alt="" />
            <p>Tenda de Umbanda</p>
            <h1>Vida Plena</h1>
            <span>Um espaço para aprender, acompanhar e colaborar com a casa.</span>
          </div>
        </section>

        <section className="auth-panel">
          <button className="auth-back" type="button" onClick={() => onScreenChange('login')}>
            <ArrowLeft size={17} />
            Voltar
          </button>

          <div className="auth-heading">
            <p className="auth-kicker">Solicitar acesso</p>
            <h2>Crie seu cadastro</h2>
            <p>Preencha seus dados. O acesso será liberado por um responsável da casa.</p>
          </div>

          <form className="auth-form" onSubmit={handleRegister}>
            <label>
              <span>Nome completo</span>
              <div className="auth-input">
                <UserRound size={18} />
                <input
                  required
                  value={registerName}
                  onChange={(event) => setRegisterName(event.target.value)}
                  placeholder="Como você quer ser identificado"
                  autoComplete="name"
                />
              </div>
            </label>

            <label>
              <span>E-mail</span>
              <div className="auth-input">
                <Mail size={18} />
                <input
                  required
                  type="email"
                  value={registerEmail}
                  onChange={(event) => setRegisterEmail(event.target.value)}
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                />
              </div>
            </label>

            <label>
              <span>Telefone <small>opcional</small></span>
              <div className="auth-input">
                <Phone size={18} />
                <input
                  value={registerPhone}
                  onChange={(event) => setRegisterPhone(event.target.value)}
                  placeholder="(61) 99999-9999"
                  autoComplete="tel"
                />
              </div>
            </label>

            <div className="auth-form-grid">
              <label>
                <span>Senha</span>
                <div className="auth-input">
                  <LockKeyhole size={18} />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={registerPassword}
                    onChange={(event) => setRegisterPassword(event.target.value)}
                    placeholder="Mínimo de 6 caracteres"
                    autoComplete="new-password"
                  />
                </div>
              </label>

              <label>
                <span>Confirmar senha</span>
                <div className="auth-input">
                  <LockKeyhole size={18} />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={registerConfirm}
                    onChange={(event) => setRegisterConfirm(event.target.value)}
                    placeholder="Repita a senha"
                    autoComplete="new-password"
                  />
                </div>
              </label>
            </div>

            <button
              className="password-toggle"
              type="button"
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              {showPassword ? 'Ocultar senhas' : 'Mostrar senhas'}
            </button>

            {registerError && <p className="auth-error">{registerError}</p>}

            <button className="auth-primary" type="submit">
              Solicitar acesso
            </button>

            <p className="auth-help">
              Não é necessário escolher um cargo. Todo novo cadastro entra como membro e passa por aprovação.
            </p>
          </form>
        </section>
      </main>
    )
  }

  return (
    <main className="auth-page">
      <section className="auth-visual" aria-hidden="true">
        <div className="auth-visual-content">
          <img src="/brand-mark.svg" alt="" />
          <p>Tenda de Umbanda</p>
          <h1>Vida Plena</h1>
          <span>Fé, caridade e equilíbrio espiritual.</span>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-heading">
          <p className="auth-kicker">Acesso à casa</p>
          <h2>Bem-vindo(a) de volta</h2>
          <p>Entre para acompanhar estudos, agenda, chamados e conteúdos da Tenda.</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <label>
            <span>E-mail</span>
            <div className="auth-input">
              <Mail size={18} />
              <input
                required
                type="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                autoComplete="email"
              />
            </div>
          </label>

          <label>
            <span>Senha</span>
            <div className="auth-input">
              <LockKeyhole size={18} />
              <input
                required
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Sua senha"
                autoComplete="current-password"
              />
              <button
                className="input-action"
                type="button"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <button className="forgot-link" type="button">
            Esqueci minha senha
          </button>

          <button className="auth-primary" type="submit">
            Entrar
          </button>
        </form>

        <div className="auth-divider">
          <span />
          <p>Primeiro acesso?</p>
          <span />
        </div>

        <button className="auth-secondary" type="button" onClick={() => onScreenChange('register')}>
          Criar cadastro
        </button>

        <p className="auth-footnote">
          O acesso é destinado aos membros e responsáveis vinculados à Tenda Vida Plena.
        </p>
      </section>
    </main>
  )
}
