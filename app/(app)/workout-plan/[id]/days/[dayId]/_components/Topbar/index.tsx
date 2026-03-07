"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface TopbarProps {
  title: string
}

export const Topbar = ({ title }: TopbarProps) => {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-background px-4">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex size-10 -ml-2 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
        aria-label="Voltar"
      >
        <ChevronLeft className="size-6" strokeWidth={2} />
      </button>
      <h1 className="flex-1 text-center font-heading text-xl font-semibold text-foreground">
        {title}
      </h1>
      <div className="w-10" />
    </header>
  )
}
