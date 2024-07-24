import { toast } from 'sonner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { RegisterForm } from '@/features/auth/components/register-form'

export const RegisterRoute = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  // usually I wouldn't abstract this into a separate component
  // but I'd like to keep routes as clean as possible
  return (
    <RegisterForm
      onSuccess={() => {
        toast.success('Account created successfully!')
        // TODO: redirect to main page until login is implemented
        navigate(`${redirectTo ? `${redirectTo}` : '/'}`, {
          replace: true,
        })
      }}
    />
  )
}
