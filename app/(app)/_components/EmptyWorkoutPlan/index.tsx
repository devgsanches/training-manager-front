import Link from 'next/link'

import { CalendarPlus, Dumbbell } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const EmptyWorkoutPlan = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <div className="flex size-24 items-center justify-center rounded-full bg-muted">
        <Dumbbell className="size-12 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Você ainda não tem um plano de treino ativo
        </h2>
        <p className="max-w-xs text-sm text-muted-foreground">
          Crie seu primeiro plano de treino personalizado e comece a transformar sua rotina de exercícios.
        </p>
      </div>
      <Button asChild size="lg" className="gap-2 rounded-full font-semibold">
        <Link
          href={`/?chat_open=true&chat_initial_message=${encodeURIComponent('Monte meu plano de treino')}`}
        >
          <CalendarPlus className="size-5" />
          Criar plano de treino
        </Link>
      </Button>
    </main>
  )
}
