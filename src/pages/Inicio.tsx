import { useEffect, useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'

type Nome = { id: number; nome: string }

export default function Inicio() {
  const [nome, setNome] = useState('')
  const [nomes, setNomes] = useState<Nome[]>([])
  const [msg, setMsg] = useState<{ erro: boolean; texto: string } | null>(null)
  const [salvando, setSalvando] = useState(false)

  const carregar = async () => {
    const { data, error } = await supabase.from('nomes').select('id, nome').order('id', { ascending: false }).limit(10)
    if (error) setMsg({ erro: true, texto: error.message })
    else setNomes(data)
  }

  useEffect(() => { carregar() }, [])

  const salvar = async (e: FormEvent) => {
    e.preventDefault()
    if (!nome.trim()) return
    setSalvando(true)
    const { error } = await supabase.from('nomes').insert({ nome: nome.trim() })
    setSalvando(false)
    setMsg(error ? { erro: true, texto: error.message } : { erro: false, texto: 'Nome salvo.' })
    if (!error) { setNome(''); carregar() }
  }

  return (
    <section className="pagina">
      <header>
        <h1>Início</h1>
        <p>Cadastre um nome para testar a conexão com o Supabase.</p>
      </header>

      <form onSubmit={salvar} className="card form">
        <label htmlFor="nome">Nome</label>
        <div className="linha">
          <input id="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex.: Maria Silva" maxLength={100} autoComplete="off" />
          <button type="submit" disabled={salvando || !nome.trim()}>{salvando ? 'Salvando…' : 'Salvar'}</button>
        </div>
        {msg && <p className={`msg ${msg.erro ? 'erro' : ''}`}>{msg.texto}</p>}
      </form>

      {nomes.length > 0 && (
        <div className="card">
          <h2>Últimos nomes</h2>
          <ul className="lista">{nomes.map(n => <li key={n.id}>{n.nome}</li>)}</ul>
        </div>
      )}
    </section>
  )
}
