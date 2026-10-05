import { PackageOpen, Plus, ScrollText, UsersRound } from 'lucide-react'
import type { UserRole } from '../types/auth'

type TerreiroPageProps = {
  role: UserRole
  onCreateCall: () => void
}

export function TerreiroPage({ role, onCreateCall }: TerreiroPageProps) {
  const canManage = role === 'house_admin' || role === 'system_admin'

  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Terreiro</p>
          <h1>Rotina e organização da casa</h1>
          <p>Uma visão simples do que está acontecendo e do que precisa de atenção.</p>
        </div>
        {canManage && <button className="admin-action-button" onClick={onCreateCall}><Plus size={17} /> Criar chamado</button>}
      </section>

      <section className="terreiro-grid">
        <article className="terreiro-feature">
          <PackageOpen size={25} />
          <span>Chamados</span>
          <strong>3 necessidades abertas</strong>
          <p>Membros podem indicar quando conseguem levar um item.</p>
          <button>Ver chamados</button>
        </article>

        <article className="terreiro-feature">
          <UsersRound size={25} />
          <span>Comunidade</span>
          <strong>{canManage ? 'Cadastros e membros' : 'Membros da casa'}</strong>
          <p>{canManage ? 'Aprove novos acessos e acompanhe os cadastros.' : 'Área para informações que a casa decidir compartilhar.'}</p>
          <button>{canManage ? 'Gerenciar membros' : 'Ver comunidade'}</button>
        </article>

        {canManage && (
          <article className="terreiro-feature">
            <ScrollText size={25} />
            <span>Materiais</span>
            <strong>Entradas e saídas</strong>
            <p>Espaço reservado para histórico de doações, materiais e movimentações da casa.</p>
            <button>Ver histórico</button>
          </article>
        )}
      </section>

      <section className="panel prototype-note">
        <p className="eyebrow">Para validar com o Pai/Mãe de Santo</p>
        <h3>O que realmente precisa ser controlado aqui?</h3>
        <p>Chamados, estoque, doações, entradas e saídas, avisos ou outras rotinas. A estrutura está preparada, mas o conteúdo final deve seguir a forma como a própria casa trabalha.</p>
      </section>
    </main>
  )
}
