import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { links } from './components/links'
import Inicio from './pages/Inicio'

const Mock = ({ titulo }: { titulo: string }) => (
  <section className="pagina">
    <header><h1>{titulo}</h1><p>Página de teste (mock).</p></header>
    <div className="card vazio">Nada por aqui ainda.</div>
  </section>
)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Inicio />} />
          {links.slice(1).map(l => <Route key={l.to} path={l.to} element={<Mock titulo={l.label} />} />)}
          <Route path="*" element={<Mock titulo="Página não encontrada" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
