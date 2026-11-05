import { useEffect, useState } from 'react'

export type Tema = 'light' | 'dark' | 'system'
const CHAVE = 'tema'
const mq = window.matchMedia('(prefers-color-scheme: dark)')

const ler = (): Tema => {
  try { return (localStorage.getItem(CHAVE) as Tema) || 'system' } catch { return 'system' }
}

const aplicar = (t: Tema) => {
  const escuro = t === 'dark' || (t === 'system' && mq.matches)
  document.documentElement.dataset.theme = escuro ? 'dark' : 'light'
}

export function useTema() {
  const [tema, setTema] = useState<Tema>(ler)

  useEffect(() => {
    aplicar(tema)
    try { localStorage.setItem(CHAVE, tema) } catch { /* sem storage */ }
    if (tema !== 'system') return
    const ouvir = () => aplicar('system')
    mq.addEventListener('change', ouvir)
    return () => mq.removeEventListener('change', ouvir)
  }, [tema])

  return [tema, setTema] as const
}
