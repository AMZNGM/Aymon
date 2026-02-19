import { getWorkFilter } from '@/lib/getWork'
import BaseWorkLayout from '@/components/work-components/BaseWorkLayout'

export default function ShortFormContent({ hasButton = false }) {
  return <BaseWorkLayout title1="Short Form" title2="Content" filterFn={getWorkFilter('short-form')} hasButton={hasButton} />
}
