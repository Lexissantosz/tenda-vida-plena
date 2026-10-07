import { FormEvent, useState } from 'react'
import { X } from 'lucide-react'
import type { CallItem } from '../types/domain'

export type NewCall = {
  name: string
  total: number
  unit: string
  image: string
  deadline?: string
}

type CreateCallModalProps = {
  onClose: () => void
  onCreate: (call: NewCall) => void
  initialCall?: CallItem | null
}

export function CreateCallModal({ onClose, onCreate, initialCall }: CreateCallModalProps) {
  const [name, setName] = useState(initialCall?.name ?? '')
  const [total, setTotal] = useState(initialCall?.total ?? 1)
  const [unit, setUnit] = useState(initialCall?.unit ?? 'unidades')
  const [deadline, setDeadline] = useState(initialCall?.deadline ?? '')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || total <= 0) return

    onCreate({
      name: name.trim(),
      total,
      unit: unit.trim() || 'unidades',
      image: initialCall?.image ?? '/images/pedido.svg',
      deadline: deadline || undefined,
    })
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="call-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-heading">
          <div>
            <p className="eyebrow">Administração da casa</p>
            <h2>{initialCall ? 'Editar chamado' : 'Criar chamado'}</h2>
            <p>{initialCall ? 'Atualize as informações do chamado.' : 'Defina quanto a casa precisa. Os membros poderão assumir quantidades parciais.'}</p>
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

          <label>
            <span>Prazo <small>opcional</small></span>
            <input type="date" value={deadline} onChange={(event) => setDeadline(event.target.value)} />
          </label>

          <div className="modal-actions">
            <button className="modal-secondary" type="button" onClick={onClose}>Cancelar</button>
            <button className="modal-primary" type="submit">{initialCall ? 'Salvar alterações' : 'Publicar chamado'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}
