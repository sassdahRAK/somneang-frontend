import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #4a0080, #9b30d0)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      {/* Logo */}
      <div style={{ marginBottom: '12px', fontSize: '48px' }}>🎵</div>
      <h1 style={{ color: 'white', fontSize: '28px', marginBottom: '4px' }}>Welcome</h1>
      <p style={{ color: '#ddd', marginBottom: '24px' }}>Log in to Continue to Somneang</p>

      {/* Card */}
      <div style={{
        background: 'rgba(60, 0, 100, 0.7)',
        borderRadius: '16px',
        padding: '32px',
        width: '100%',
        maxWidth: '440px'
      }}>
        {/* Email */}
        <label style={{ color: 'white', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%', padding: '12px 16px', borderRadius: '8px',
            border: 'none', background: 'rgba(255,255,255,0.15)',
            color: 'white', marginBottom: '16px', boxSizing: 'border-box', fontSize: '14px'
          }}
        />

        {/* Password */}
        <label style={{ color: 'white', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Password</label>
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%', padding: '12px 40px 12px 16px', borderRadius: '8px',
              border: 'none', background: 'rgba(255,255,255,0.15)',
              color: 'white', boxSizing: 'border-box', fontSize: '14px'
            }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#ccc' }}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        {/* Login Button */}
        <button
          onClick={() => navigate('/home')}
          style={{
            width: '100%', padding: '14px', borderRadius: '30px',
            border: 'none', background: 'rgba(255,255,255,0.25)',
            color: 'white', fontWeight: 'bold', fontSize: '16px',
            cursor: 'pointer', marginBottom: '12px'
          }}
        >
          Log in
        </button>

        {/* Forgot password */}
        <p style={{ textAlign: 'center', color: '#f5a623', cursor: 'pointer', marginBottom: '16px' }}
           onClick={() => navigate('/forgot-password')}>
          Forgot password?
        </p>

        <div style={{ textAlign: 'center', color: '#ccc' }}>— or —</div>

        <p style={{ textAlign: 'center', color: '#ccc', marginTop: '16px' }}>
          Don't have an account?{' '}
          <span style={{ color: '#f5a623', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => navigate('/signup')}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginPage