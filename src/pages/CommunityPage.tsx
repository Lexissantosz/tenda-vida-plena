import { MessageCircle, UserRound, UsersRound } from 'lucide-react'

export function CommunityPage() {
  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Comunidade</p>
          <h1>A casa também é feita de pessoas</h1>
          <p>Espaço em definição para informações e formas de contato que a Tenda decidir compartilhar.</p>
        </div>
      </section>

      <section className="terreiro-grid">
        <article className="terreiro-feature">
          <UsersRound size={25} />
          <span>Comunidade</span>
          <strong>Membros da casa</strong>
          <p>Diretório opcional, respeitando o que cada pessoa autorizar compartilhar.</p>
          <button>Em construção</button>
        </article>
        <article className="terreiro-feature">
          <MessageCircle size={25} />
          <span>Avisos</span>
          <strong>Comunicados da casa</strong>
          <p>Área futura para recados e orientações dos responsáveis.</p>
          <button>Em construção</button>
        </article>
        <article className="terreiro-feature">
          <UserRound size={25} />
          <span>Perfil</span>
          <strong>Seus dados</strong>
          <p>Acesse suas informações e o nível de permissão da sua conta.</p>
          <button>Ver perfil</button>
        </article>
      </section>
    </main>
  )
}
