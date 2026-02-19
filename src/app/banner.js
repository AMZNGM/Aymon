'use client'

import { useEffect } from 'react'

const banner = `
      ▌    ▌
▛▛▌▀▌▛▌█▌  ▛▌▌▌
▌▌▌█▌▙▌▙▖  ▙▌▙▌
             ▄▌

███  ██  ▄████  ██▄  ▄██
██ ▀▄██ ██  ▄▄▄ ██ ▀▀ ██
██   ██  ▀███▀  ██    ██
`

export default function Banner() {
  useEffect(() => {
    console.log(`%c${banner}`, 'color:#fa2a11')
  }, [])

  return null
}
