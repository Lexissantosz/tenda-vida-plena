import { FormEvent, useState } from 'react'
import { X } from 'lucide-react'
import type { CallItem } from '../types/domain'

type ContributionModalProps = {
  call: CallItem
  onClose: () => void
  onConfirm: (quantity: number) => void
}

export function ContributionModal({ call, onClose, onConfirm }: ContributionModalProps) {
  const [quantity, setQuantity] = useState(Math.min(1, call.remaining))

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (quantity <= 0 || quantity > call.remaining) return
    onConfirm(quantity)
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="call-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-heading">
          <div>
            <p className="eyebrow">Contribuir com o chamado</p>
            <h2>{call.name}</h2>
            <p>Ainda faltam {call.remaining} {call.unit}. Você pode assumir apenas uma parte.</p>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar"><X size={20} /></button>
        </div>

        <form className="call-form" onSubmit={submit}>
          <label>
            <span>Quanto você consegue levar?</span>
            <input
              type="number"
              min="1"
              max={call.remaining}
              step={call.unit === 'kg' ? '0.5' : '1'}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              required
            />
            <small>O valor só será descontado quando um responsável confirmar que o item foi entregue.</small>
          </label>

          <div className="modal-actions">
            <button className="modal-secondary" type="button" onClick={onClose}>Cancelar</button>
            <button className="modal-primary" type="submit">Confirmar que vou levar</button>
          </div>
        </form>
      </section>
    </div>
  )
}
