import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { links } from './links'
import ThemeToggle from './ThemeToggle'

export default function Layout() {
  const [aberto, setAberto] = useState(false)
  const fechar = () => setAberto(false)

  return (
    <div className="app">
      <header className="topo">
        <button className="icone menu-btn" onClick={() => setAberto(!aberto)} aria-label="Abrir menu">
          {aberto ? <X size={18} /> : <Menu size={18} />}
        </button>
        <span className="marca"><span className="logo" />Oficina Conexão</span>
        <ThemeToggle />
        <span className="avatar">WR</span>
      </header>

      <aside className={`lateral ${aberto ? 'aberto' : ''}`}>
        <small>Menu</small>
        {links.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} end onClick={fechar}><Icon size={17} />{label}</NavLink>
        ))}
      </aside>
      {aberto && <div className="sombra" onClick={fechar} />}

      <main className="conteudo"><Outlet /></main>

      <footer className="rodape">
        {links.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} end><Icon size={18} /><span>{label}</span></NavLink>
        ))}
      </footer>
    </div>
  )
}
