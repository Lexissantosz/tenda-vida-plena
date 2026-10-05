import type { SessionUser, UserRole } from '../types/auth'

type RolePreviewProps = {
  onSelect: (user: SessionUser) => void
}

const roleCopy: Record<UserRole, { title: string; description: string }> = {
  member: {
    title: 'Membro da casa',
    description: 'Estudos, agenda, chamados, pontos e conteúdos.',
  },
  house_admin: {
    title: 'Pai/Mãe de Santo',
    description: 'Administração da casa, membros, conteúdos e chamados.',
  },
  system_admin: {
    title: 'Administrador do sistema',
    description: 'Configuração e manutenção técnica da plataforma.',
  },
}

export function RolePreview({ onSelect }: RolePreviewProps) {
  const openAs = (role: UserRole) => {
    const names: Record<UserRole, string> = {
      member: 'Membro de teste',
      house_admin: 'Responsável da casa',
      system_admin: 'Equipe do sistema',
    }

    onSelect({
      name: names[role],
      email: `${role}@demo.local`,
      role,
    })
  }

  return (
    <div className="prototype-access">
      <div>
        <strong>Modo de protótipo</strong>
        <span>Use estes acessos apenas para testar o que cada perfil verá.</span>
      </div>

      <div className="prototype-role-grid">
        {(Object.keys(roleCopy) as UserRole[]).map((role) => (
          <button type="button" key={role} onClick={() => openAs(role)}>
            <strong>{roleCopy[role].title}</strong>
            <span>{roleCopy[role].description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
