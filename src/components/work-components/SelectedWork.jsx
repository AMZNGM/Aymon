'use client'

import { getWorkFilter } from '@/lib/getWork'
import BaseWorkLayout from '@/components/work-components/BaseWorkLayout'

export default function SelectedWork({ hasButton = true }) {
  return <BaseWorkLayout title1="Selected" title2="Work" filterFn={getWorkFilter('selected')} hasButton={hasButton} />
}
