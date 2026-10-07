import { FormEvent, useState } from 'react'
import { ArrowDownToLine, ArrowUpFromLine, PackageOpen } from 'lucide-react'
import type { MaterialMovement } from '../types/domain'

const initialMovements: MaterialMovement[] = [
  { id: 1, item: 'Velas brancas', quantity: 10, unit: 'unidades', type: 'entrada', note: 'Doação recebida', createdAt: '07/10/2026' },
  { id: 2, item: 'Café', quantity: 1, unit: 'kg', type: 'saida', note: 'Uso na casa', createdAt: '06/10/2026' },
]

export function MaterialsPage() {
  const [movements, setMovements] = useState(initialMovements)
  const [item, setItem] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState('unidades')
  const [type, setType] = useState<'entrada' | 'saida'>('entrada')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!item.trim() || quantity <= 0) return

    setMovements((current) => [
      {
        id: Date.now(),
        item: item.trim(),
        quantity,
        unit,
        type,
        note: type === 'entrada' ? 'Entrada registrada no protótipo' : 'Saída registrada no protótipo',
        createdAt: new Date().toLocaleDateString('pt-BR'),
      },
      ...current,
    ])
    setItem('')
    setQuantity(1)
  }

  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Materiais</p>
          <h1>Entradas e saídas</h1>
          <p>Histórico simples para validar quais movimentações a casa realmente precisa acompanhar.</p>
        </div>
      </section>

      <section className="panel material-register">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Novo movimento</p>
            <h3>Registrar material</h3>
          </div>
        </div>

        <form className="material-form" onSubmit={submit}>
          <input value={item} onChange={(event) => setItem(event.target.value)} placeholder="Item" required />
          <input type="number" min="0.1" step="0.1" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} required />
          <input value={unit} onChange={(event) => setUnit(event.target.value)} placeholder="Unidade" required />
          <select value={type} onChange={(event) => setType(event.target.value as 'entrada' | 'saida')}>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
          <button type="submit">Registrar</button>
        </form>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Histórico</p>
            <h3>Movimentações recentes</h3>
          </div>
        </div>

        <div className="movement-list">
          {movements.map((movement) => (
            <article className="movement-row" key={movement.id}>
              <div className={movement.type === 'entrada' ? 'movement-icon incoming' : 'movement-icon outgoing'}>
                {movement.type === 'entrada' ? <ArrowDownToLine size={19} /> : <ArrowUpFromLine size={19} />}
              </div>
              <div>
                <strong>{movement.item}</strong>
                <span>{movement.quantity} {movement.unit} • {movement.note}</span>
              </div>
              <small>{movement.createdAt}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="panel prototype-note">
        <PackageOpen size={22} />
        <p>Depois da validação, podemos transformar isso em estoque real, se a Tenda realmente precisar desse nível de controle.</p>
      </section>
    </main>
  )
}
