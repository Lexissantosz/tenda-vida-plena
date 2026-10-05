import { FormEvent, useState } from 'react'
import { X } from 'lucide-react'

export type NewCall = {
  name: string
  total: number
  unit: string
  image: string
}

type CreateCallModalProps = {
  onClose: () => void
  onCreate: (call: NewCall) => void
}

export function CreateCallModal({ onClose, onCreate }: CreateCallModalProps) {
  const [name, setName] = useState('')
  const [total, setTotal] = useState(1)
  const [unit, setUnit] = useState('unidades')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || total <= 0) return

    onCreate({
      name: name.trim(),
      total,
      unit: unit.trim() || 'unidades',
      image: '/images/pedido.svg',
    })
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="call-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-heading">
          <div>
            <p className="eyebrow">Administração da casa</p>
            <h2>Criar chamado</h2>
            <p>Defina quanto a casa precisa. Os membros poderão assumir quantidades parciais.</p>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar"><X size={20} /></button>
        </div>

        <form className="call-form" onSubmit={submit}>
          <label>
            <span>Item ou necessidade</span>
            <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex.: Velas brancas" />
          </label>

          <div className="call-form-split">
            <label>
              <span>Quantidade total</span>
              <input type="number" min="1" step="0.5" required value={total} onChange={(event) => setTotal(Number(event.target.value))} />
            </label>
            <label>
              <span>Unidade</span>
              <input required value={unit} onChange={(event) => setUnit(event.target.value)} placeholder="unidades, kg, pacotes..." />
            </label>
          </div>

          <div className="modal-actions">
            <button className="modal-secondary" type="button" onClick={onClose}>Cancelar</button>
            <button className="modal-primary" type="submit">Publicar chamado</button>
          </div>
        </form>
      </section>
    </div>
  )
}
