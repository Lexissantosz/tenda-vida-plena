import { FormEvent, useState } from 'react'
import { X } from 'lucide-react'

export type NewCall = {
  name: string
  need: string
  image: string
}

type CreateCallModalProps = {
  onClose: () => void
  onCreate: (call: NewCall) => void
}

export function CreateCallModal({ onClose, onCreate }: CreateCallModalProps) {
  const [name, setName] = useState('')
  const [need, setNeed] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onCreate({
      name: name.trim(),
      need: need.trim(),
      image: '/images/pedido.svg',
    })
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="call-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-call-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-heading">
          <div>
            <p className="eyebrow">Administração da casa</p>
            <h2 id="new-call-title">Criar chamado</h2>
            <p>Cadastre algo que a Tenda está precisando no momento.</p>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        <form className="call-form" onSubmit={submit}>
          <label>
            <span>Item ou necessidade</span>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex.: Velas brancas"
            />
          </label>

          <label>
            <span>O que está faltando?</span>
            <textarea
              required
              value={need}
              onChange={(event) => setNeed(event.target.value)}
              placeholder="Ex.: Ainda faltam 3 pacotes"
              rows={4}
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="modal-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="modal-primary">
              Publicar chamado
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
