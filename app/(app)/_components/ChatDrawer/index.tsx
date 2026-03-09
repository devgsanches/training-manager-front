'use client'

import { useEffect, useRef } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useRouter } from 'next/navigation'
import {
  parseAsBoolean,
  parseAsString,
  useQueryState,
} from 'nuqs'
import { Streamdown } from 'streamdown'
import { Send, Sparkles } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const SUGGESTED_ACTIONS = [
  'Monte meu plano de treino',
  'Alterar plano de treino',
  'Atualizar dados',
] as const

function getMessageText(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((p): p is { type: string; text: string } => p.type === 'text' && p.text != null)
    .map((p) => p.text)
    .join('')
}

export function ChatDrawer() {
  const router = useRouter()
  const [chatOpen, setChatOpen] = useQueryState(
    'chat_open',
    parseAsBoolean.withDefault(false),
  )
  const [chatInitialMessage, setChatInitialMessage] = useQueryState(
    'chat_initial_message',
    parseAsString,
  )

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/ai',
      credentials: 'include',
    }),
  })

  const hasSentInitialRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, status])

  useEffect(() => {
    if (chatOpen && chatInitialMessage && !hasSentInitialRef.current) {
      hasSentInitialRef.current = true
      sendMessage({ text: chatInitialMessage })
      setChatInitialMessage(null)
    }
    if (!chatOpen) {
      hasSentInitialRef.current = false
    }
  }, [chatOpen, chatInitialMessage, sendMessage, setChatInitialMessage])

  const handleSuggestionClick = (text: string) => {
    sendMessage({ text })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const input = form.querySelector<HTMLInputElement>('input[name="message"]')
    const text = input?.value?.trim()
    if (text && input) {
      sendMessage({ text })
      input.value = ''
    }
  }

  const isLoading = status === 'submitted' || status === 'streaming'

  return (
    <Sheet
      open={chatOpen}
      onOpenChange={(open) => {
        setChatOpen(open)
        if (!open) {
          router.refresh()
        }
      }}
    >
      <SheetContent
        side="bottom"
        className="flex h-[85dvh] max-h-[85dvh] w-full flex-col rounded-t-3xl border-0 bg-white shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-t-3xl"
      >
        <SheetTitle></SheetTitle>
        {/* Header: ícone, Coach AI, Online, X (sheet tem botão close absoluto) */}
        <div className="flex items-start justify-between gap-3 p-4 pb-2 pr-14">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15">
              <Sparkles className="size-5 text-primary" strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-0.5">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Coach AI
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-online" />
                <span className="text-sm font-normal text-primary">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Área de mensagens */}
        <div className="flex flex-1 flex-col gap-4 overflow-hidden">
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-2">
            {messages.length === 0 ? (
              <div
                className={cn(
                  'max-w-[80%] self-start rounded-2xl rounded-tl-sm px-4 py-3',
                  'bg-muted/80',
                )}
              >
                <p className="text-sm text-foreground">
                  Olá! Sou sua IA personal. Como posso ajudar com seu treino hoje?
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-3 w-fit',
                    msg.role === 'user'
                      ? 'ml-auto rounded-tr-sm bg-primary text-primary-foreground'
                      : 'mr-auto rounded-tl-sm bg-muted/80 text-muted-foreground',
                  )}
                >
                  {msg.role === 'user' ? (
                    <p className="text-sm">{getMessageText(msg.parts)}</p>
                  ) : (
                    <Streamdown
                      mode="streaming"
                      className="prose prose-sm prose-invert max-w-none dark:prose-invert [&_p]:m-0"
                    >
                      {getMessageText(msg.parts) || ''}
                    </Streamdown>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Botões de sugestão */}
          <div className="flex flex-wrap gap-2 px-4">
            {SUGGESTED_ACTIONS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleSuggestionClick(label)}
                disabled={isLoading}
                className="rounded-full bg-primary/15 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Input + botão enviar */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 px-4 pb-6 pt-2"
          >
            <input
              name="message"
              type="text"
              placeholder="Digite sua mensagem"
              disabled={isLoading}
              className="flex-1 rounded-full bg-muted px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 text-black"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <Send className="size-5" strokeWidth={2} />
              <span className="sr-only">Enviar</span>
            </button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
