import { useState } from 'react'
import { HandHeart, PackageOpen, ReceiptText } from 'lucide-react'

export function DonationsPage({ onOpenCalls }: { onOpenCalls: () => void }) {
  const [showGuidance, setShowGuidance] = useState(false)

  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Doações</p>
          <h1>Apoio à casa</h1>
          <p>Área para organizar formas de contribuição definidas pela própria Tenda. Os dados abaixo são apenas exemplos de estrutura.</p>
        </div>
      </section>

      <section className="terreiro-grid">
        <article className="terreiro-feature">
          <HandHeart size={25} />
          <span>Contribuição</span>
          <strong>Doação financeira</strong>
          <p>Espaço reservado para Pix, instruções ou outras formas que a casa decidir divulgar.</p>
          <button onClick={() => setShowGuidance((value) => !value)}>
            {showGuidance ? 'Ocultar orientações' : 'Ver orientações'}
          </button>
        </article>
        <article className="terreiro-feature">
          <PackageOpen size={25} />
          <span>Materiais</span>
          <strong>Doar itens</strong>
          <p>Veja os chamados abertos para saber o que está fazendo falta no momento.</p>
          <button onClick={onOpenCalls}>Ver chamados</button>
        </article>
        <article className="terreiro-feature">
          <ReceiptText size={25} />
          <span>Transparência</span>
          <strong>Histórico</strong>
          <p>Área futura para informações que a gestão da casa decidir tornar visíveis aos membros.</p>
          <span className="status-note">Em definição com a Tenda</span>
        </article>
      </section>

      {showGuidance && (
        <section className="panel prototype-note">
          <p className="eyebrow">Conteúdo provisório</p>
          <h3>Orientações de doação</h3>
          <p>Este bloco será preenchido depois que a Tenda definir quais formas de contribuição deseja divulgar no sistema.</p>
        </section>
      )}
    </main>
  )
}
