'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLoginMutation } from '@/features/auth/authApi'

// ✅ Validation Schema
const loginSchema = z.object({
  identifier: z.string().min(2, {
    message: 'Username or Email is required',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
})

export default function LoginForm() {
  const router = useRouter()
  const [login, { isLoading }] = useLoginMutation()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    const { identifier, password } = data
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)
    const payload = isEmail
      ? { email: identifier, password }
      : { username: identifier, password }

    try {
      const res = await login(payload).unwrap()

      if (res?.success) {
        // ✅ Optional: console.log or toast message
        router.push('/dashboard')
      }

      form.reset()
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <section className="max-w-md mx-auto mt-20 p-8 bg-white border rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your username or email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} placeholder="••••••••" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>
    </section>
  )
}
