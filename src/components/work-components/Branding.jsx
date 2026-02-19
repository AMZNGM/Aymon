'use client'

import BaseWorkLayout from '@/components/work-components/BaseWorkLayout'
import { getWorkFilter } from '@/lib/getWork'

export default function Branding({ hasButton = false }) {
  return <BaseWorkLayout title1="Branding" title2="Design" filterFn={getWorkFilter('branding')} hasButton={hasButton} />
}
