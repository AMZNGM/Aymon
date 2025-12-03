'use client'

import useRandomColor from '@/hooks/useRandomColor'
import { personalInfo } from '@/data/personal-info'

export default function RandomColorText() {
  const randomColor = useRandomColor()

  return <span style={{ color: randomColor }}>{personalInfo.nickname}</span>
}
