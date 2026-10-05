import { Mail, ShieldCheck, UserRound } from 'lucide-react'
import type { SessionUser } from '../types/auth'

const roleNames = {
  member: 'Membro da casa',
  house_admin: 'Administrador da casa',
  system_admin: 'Administrador do sistema',
}

export function ProfilePage({ user }: { user: SessionUser }) {
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
    </main>
  )
}
