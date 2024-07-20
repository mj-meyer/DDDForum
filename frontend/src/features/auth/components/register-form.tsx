import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterInput, registerInputSchema, useRegister } from '@/lib/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { Spinner } from '@/components/ui/spinner'
import { useSearchParams } from 'react-router-dom'

type RegisterFormProps = {
  onSuccess: () => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerInputSchema),
  })

  const registering = useRegister()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-sm">
        <form
          onSubmit={handleSubmit(values =>
            registering.mutate(values, {
              onSuccess,
            })
          )}
          className="space-y-4"
        >
          <CardHeader className="text-center">
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Levelup your DDD skills!</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Input
                {...register('email')}
                placeholder="Email"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register('username')}
                placeholder="Username"
                className={errors.username ? 'border-red-500' : ''}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register('firstName')}
                placeholder="First Name"
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register('lastName')}
                placeholder="Last Name"
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              disabled={registering.isPending}
              className="w-full disabled:opacity-60"
            >
              {registering.isPending ? (
                <span className="flex gap-2 items-center">
                  <Spinner size="sm" />
                  Regsitering...
                </span>
              ) : (
                'Register'
              )}
            </Button>
            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to={`/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
                className="text-orange-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
