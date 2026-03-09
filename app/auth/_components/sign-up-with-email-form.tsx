'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { authClient } from '@/app/_lib/auth-client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'O nome deve ter pelo menos 2 caracteres.',
  }),
  email: z.string().email({
    message: 'Digite um e-mail válido.',
  }),
  password: z.string().min(8, {
    message: 'A senha deve ter pelo menos 8 caracteres.',
  }),
})

type FormValues = z.infer<typeof formSchema>

export function SignUpWithEmailForm() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null)
    const callbackURL = process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/`
      : '/'

    const { error } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
      callbackURL,
    })

    if (error) {
      setSubmitError(error.message ?? 'Erro ao criar conta. Tente novamente.')
    } else {
      router.push('/')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-sm flex-col gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-foreground">Nome</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Seu nome"
                  className="border-primary-foreground/30 bg-background/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-primary-foreground/90" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-foreground">E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@example.com"
                  className="border-primary-foreground/30 bg-background/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-primary-foreground/90" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-foreground">Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="border-primary-foreground/30 bg-background/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-primary-foreground/90" />
            </FormItem>
          )}
        />
        {submitError && (
          <p className="text-sm text-destructive">{submitError}</p>
        )}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="cursor-pointer rounded-full bg-primary-foreground font-semibold text-primary hover:bg-primary-foreground/90"
        >
          {form.formState.isSubmitting ? 'Criando conta...' : 'Criar conta'}
        </Button>
      </form>
    </Form>
  )
}
