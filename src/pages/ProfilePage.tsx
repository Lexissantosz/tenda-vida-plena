import { LogOut, Mail, ShieldCheck, UserRound } from 'lucide-react'
import type { SessionUser } from '../types/auth'

const roleNames = {
  member: 'Membro da casa',
  house_admin: 'Administrador da casa',
  system_admin: 'Administrador do sistema',
}

export function ProfilePage({ user, onSwitchProfile }: { user: SessionUser; onSwitchProfile: () => void }) {
  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Perfil</p>
          <h1>Seu espaço no sistema</h1>
          <p>Dados básicos da conta e o tipo de acesso atualmente liberado.</p>
        </div>
      </section>

      <section className="profile-card panel">
        <div className="profile-avatar"><UserRound size={40} /></div>
        <div>
          <h2>{user.name}</h2>
          <p><Mail size={16} /> {user.email}</p>
          <p><ShieldCheck size={16} /> {roleNames[user.role]}</p>
        </div>
      </section>

      <section className="panel prototype-switch-panel">
        <p className="eyebrow">Somente no protótipo</p>
        <h3>Trocar perfil de teste</h3>
        <p>Use isto para simular o fluxo entre membro e administração sem apagar os chamados e entregas pendentes desta sessão.</p>
        <button onClick={onSwitchProfile}><LogOut size={17} /> Voltar para seleção de perfil</button>
      </section>
    </main>
  )
}
