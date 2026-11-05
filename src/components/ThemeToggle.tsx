import { Monitor, Moon, Sun } from 'lucide-react'
import { useTema, type Tema } from '../lib/theme'

const opcoes: { valor: Tema; label: string; Icon: typeof Sun }[] = [
  { valor: 'light', label: 'Tema claro', Icon: Sun },
  { valor: 'dark', label: 'Tema escuro', Icon: Moon },
  { valor: 'system', label: 'Tema do sistema', Icon: Monitor },
]

export default function ThemeToggle() {
  const [tema, setTema] = useTema()
  return (
    <div className="tema" role="group" aria-label="Tema">
      {opcoes.map(({ valor, label, Icon }) => (
        <button key={valor} aria-label={label} title={label} aria-pressed={tema === valor} onClick={() => setTema(valor)}>
          <Icon size={15} />
        </button>
      ))}
    </div>
  )
}
