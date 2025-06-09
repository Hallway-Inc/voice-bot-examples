"use client"

import { useHallwayEmbed } from "@/context/HallwayEmbed"

export function CustomMessageButton({ label, message }: { label: string, message: string }) {
  const hallwayEmbed = useHallwayEmbed()

  const onClick = async () => {
    const el = await hallwayEmbed.getDefinedElement()
    el.sendUserContent(message)
  }

  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:bg-blue-700" onClick={onClick}>
      {label}
    </button>
  )
}