import React from 'react'

export const HighlightText = ({text}) => {
  return (
    <span className='text-transparent font-bold bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
        {text}
    </span>
  )
}
