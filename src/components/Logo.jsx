import somneangLogo from '../assets/somneag_logo.png';

export default function Logo({ size = 40 }) {
  return (
    <img
      src={somneangLogo}
      alt="Somneang Logo"
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
    />
  );
}
