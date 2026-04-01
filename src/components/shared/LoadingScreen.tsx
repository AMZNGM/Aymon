import LoadingOverlay from '@/components/shared/LoadingOverlay'

export default function LoadingScreen() {
  return (
    <div className="z-9999 fixed inset-0 bg-text">
      <LoadingOverlay />
    </div>
  )
}
