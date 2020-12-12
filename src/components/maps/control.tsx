import React from 'react'
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

/**
 * @see https://react-leaflet.js.org/docs/example-react-control
 */

// Classes used by Leaflet to position controls.
const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
} as const

export const Control = (props: ControlProps): JSX.Element => {
  const { position, containerProps, children } = props
  return (
    <div className={POSITION_CLASSES[position]}>
      <div className="leaflet-control leaflet-bar" {...containerProps}>
        {children}
      </div>
    </div>
  )
}

export type ControlProps = {
  position: keyof typeof POSITION_CLASSES
  containerProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  children: ReactNode
}

Control.defaultProps = {
  position: 'topleft' as ControlProps['position'],
  containerProps: {},
  children: null,
}

export default Control
