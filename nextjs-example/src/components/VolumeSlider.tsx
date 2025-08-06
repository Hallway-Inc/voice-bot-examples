"use client"

import { useHallwayEmbed } from "@/context/HallwayEmbed"

export function VolumeSlider() {
  const { volume, setVolume } = useHallwayEmbed()

  return (
    <div className="mt-6">
      <p className="mb-4 text-lg">Volume Control:</p>
      <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <span className="text-xl">🔊</span>
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        <span className="min-w-12 text-right text-sm font-medium text-gray-700">
          {Math.round(volume * 100)}%
        </span>
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
          }

          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: none;
          }
        `}</style>
      </div>
    </div>
  )
}