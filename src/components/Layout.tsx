import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { links } from './links'

export default function Layout() {
  const [aberto, setAberto] = useState(false)
  const fechar = () => setAberto(false)

  return (
    <div className="app">
      <header className="topo">
        <button className="menu-btn" onClick={() => setAberto(!aberto)} aria-label="Abrir menu">☰</button>
        <strong>Oficina Conexão</strong>
        <span className="avatar">WR</span>
      </header>

      <aside className={`lateral ${aberto ? 'aberto' : ''}`}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end onClick={fechar}>{l.icon} {l.label}</NavLink>
        ))}
      </aside>
      {aberto && <div className="sombra" onClick={fechar} />}

      <main className="conteudo"><Outlet /></main>

      <footer className="rodape">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end><span>{l.icon}</span>{l.label}</NavLink>
        ))}
      </footer>
    </div>
  )
}
