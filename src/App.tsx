import { useState, useEffect } from 'react'
import { supabase } from './supabase'

// Tipagem do TypeScript para os serviços
interface Servico {
  id: string
  nome: string
  preco: number
  duracao_minutos: number
  foto_url: string
}

export default function App() {
  const [step, setStep] = useState(1)
  const [selectedDay, setSelectedDay] = useState('')
  
  // Novos estados para guardar os dados do banco e o status de carregamento
  const [servicos, setServicos] = useState<Servico[]>([])
  const [carregando, setCarregando] = useState(false)

  // O useEffect roda automaticamente quando a tela abre
  useEffect(() => {
    async function buscarServicos() {
      setCarregando(true)
      
      // Consulta ao banco de dados ordenando do menor para o maior preço
      const { data, error } = await supabase
        .from('servicos')
        .select('*')
        .order('preco', { ascending: true })

      if (error) {
        console.error("Erro ao buscar serviços:", error)
      } else if (data) {
        setServicos(data)
      }
      
      setCarregando(false)
    }

    buscarServicos()
  }, [])

  const handleSelectDay = (day: string) => {
    setSelectedDay(day)
    setStep(2)
  }

  return (
    <div className="bg-neutral-900 flex items-center justify-center min-h-screen p-4 font-sans">
      <div className="relative w-full max-w-[380px] h-[812px] bg-[#0a0a0a] rounded-[2.5rem] shadow-2xl shadow-blue-900/20 overflow-hidden border-[6px] border-neutral-800">
        
        {/* PASSO 1: ESCOLHA DO DIA */}
        {step === 1 && (
          <div className="h-full flex flex-col animate-[fadeIn_0.3s_ease-in-out]">
            <div className="pt-16 pb-8 px-6 text-center">
              <div className="w-20 h-20 bg-neutral-800 rounded-full mx-auto mb-6 flex items-center justify-center border border-white/10 shadow-lg shadow-blue-500/20">
                <span className="text-3xl">✂️</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-wide uppercase">Cokis Corte</h1>
              <p className="text-xs text-blue-500 tracking-[0.2em] font-medium mt-1">BEM-VINDO</p>
              <h2 className="text-lg text-neutral-300 mt-6 font-medium">Qual dia deseja agendar?</h2>
            </div>

            <div className="px-6 space-y-3 overflow-y-auto pb-10">
              <button 
                onClick={() => handleSelectDay('Hoje, 10 Out')}
                className="w-full bg-blue-600 hover:bg-blue-500 text-left p-4 rounded-2xl flex justify-between items-center transition shadow-lg shadow-blue-600/20 border border-blue-500/50"
              >
                <div>
                  <p className="font-bold text-white text-lg">Hoje</p>
                  <p className="text-blue-200 text-sm">10 de Outubro</p>
                </div>
                <span className="text-white">→</span>
              </button>

              <button 
                onClick={() => handleSelectDay('Amanhã, 11 Out')}
                className="w-full bg-neutral-900 border border-white/5 hover:bg-neutral-800 text-left p-4 rounded-2xl flex justify-between items-center transition"
              >
                <div>
                  <p className="font-bold text-white text-lg">Amanhã</p>
                  <p className="text-neutral-400 text-sm">11 de Outubro</p>
                </div>
                <span className="text-neutral-500">→</span>
              </button>
            </div>
          </div>
        )}

        {/* PASSO 2: ESCOLHA DO SERVIÇO */}
        {step === 2 && (
          <div className="h-full flex flex-col animate-[fadeIn_0.3s_ease-in-out]">
            <div className="pt-12 pb-4 px-6 border-b border-white/5 flex items-center gap-4">
              <button 
                onClick={() => setStep(1)}
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-white hover:bg-neutral-700 transition"
              >
                ←
              </button>
              <div>
                <h2 className="text-white font-bold text-lg">{selectedDay}</h2>
                <p className="text-blue-500 text-xs font-medium uppercase tracking-wider">Escolha o serviço</p>
              </div>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto pb-24">
              {carregando ? (
                <p className="text-neutral-400 text-center py-10 animate-pulse">A carregar serviços...</p>
              ) : (
                servicos.map((servico) => (
                  <div key={servico.id} className="bg-neutral-900/80 border border-white/5 rounded-2xl p-3 flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-xl bg-neutral-800 flex-shrink-0 overflow-hidden">
                      <img src={servico.foto_url} alt={servico.nome} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-base">{servico.nome}</h3>
                      <p className="text-blue-400 font-bold text-sm mt-1">
                        R$ {servico.preco.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2 px-4 rounded-xl transition">
                      Agendar
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}