import { useEffect, useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'

type Nome = { id: number; nome: string }

export default function Inicio() {
  const [nome, setNome] = useState('')
  const [nomes, setNomes] = useState<Nome[]>([])
  const [msg, setMsg] = useState('')

  const carregar = async () => {
    const { data, error } = await supabase.from('nomes').select('id, nome').order('id', { ascending: false }).limit(10)
    if (error) setMsg(`Erro: ${error.message}`)
    else setNomes(data)
  }

  useEffect(() => { carregar() }, [])

  const salvar = async (e: FormEvent) => {
    e.preventDefault()
    if (!nome.trim()) return
    const { error } = await supabase.from('nomes').insert({ nome: nome.trim() })
    setMsg(error ? `Erro: ${error.message}` : 'Nome salvo no Supabase ✅')
    if (!error) { setNome(''); carregar() }
  }

  return (
    <section>
      <h1>Início</h1>
      <form onSubmit={salvar} className="form">
        <label htmlFor="nome">Nome</label>
        <input id="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Digite um nome" maxLength={100} />
        <button type="submit">Salvar</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
      <ul className="lista">{nomes.map(n => <li key={n.id}>{n.nome}</li>)}</ul>
    </section>
  )
}
