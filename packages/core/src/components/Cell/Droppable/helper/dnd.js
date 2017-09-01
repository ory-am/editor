// @flow
import throttle from 'lodash.throttle'
import pathOr from 'ramda/src/pathOr'
import { NativeTypes } from 'react-dnd-html5-backend'
import { computeAndDispatchHover, computeAndDispatchInsert } from '../../../../service/hover/input'
import { delay } from '../../../../helper/throttle'
import logger from '../../../../service/logger'

import type { ComponetizedCell } from '../../../../types/editable'

let last: { hover: string, drag: string } = { hover: '', drag: '' }

const clear = (hover: ComponetizedCell, drag: string) => {
  if (hover.id === last.hover && drag === last.drag) {
    return
  }
  last = { hover: hover.id, drag }
  hover.clearHover()
}

const isNativeUrl = (monitor: Object) => {
  return monitor.getItemType() === NativeTypes.URL;
}

const mockNativeHoverItem = (plugin, monitor) => ({
  id: 123,
  rawNode: () => ({
    id: 123,
    ...plugin({
      item: monitor.getItem(),
      itemType: monitor.getItemType()
    })
  })
})

export const target = {
  hover: throttle(
    (hover: ComponetizedCell, monitor: Object, component: Object) => {
      if (isNativeUrl(monitor)) {
        const plugin = component.props.config.editor.plugins.native

        if (!plugin) {
          console.warn('Caught native event, but no native plugin was registered. Cancelling drag event.')
          hover.cancelCellDrag()
          return
        }

        monitor.internalMonitor.store.getState().dragOperation.item = {
          id: 123,
          rawNode: () => ({ id: 123 })
        }
      }

      const drag: ComponetizedCell = monitor.getItem()

      if (!drag) {
        // item undefined, happens when throttle triggers after drop
        return
      } else if (drag.id === hover.id) {
        // If hovering over itself, do nothing
        clear(hover, drag.id)
        return
      } else if (!monitor.isOver({ shallow: true })) {
        // If hovering over ancestor cell, do nothing (we are going to propagate later in the tree anyways)
        return
      } else if (hover.ancestors.indexOf(drag.id) > -1) {
        // If hovering over a child of itself
        clear(hover, drag.id)
        return
      } else if (!hover.id) {
        // If hovering over something that isn't a cell or hasn't an id, do nothing. Should be an edge case
        logger.warn('Canceled cell drop, no id given.', hover, drag)
        return
      }

      last = { hover: hover.id, drag: drag.id }
      const allowInlineNeighbours = pathOr(
        false,
        ['node', 'content', 'plugin', 'allowInlineNeighbours'],
        hover
      )
      computeAndDispatchHover(
        hover,
        monitor,
        component,
        `10x10${allowInlineNeighbours ? '' : '-no-inline'}`
      )
    },
    delay,
    { leading: false }
  ),

  canDrop: ({ id, ancestors }: ComponetizedCell, monitor: Object) => {
    const item = monitor.getItem()
    return item.id !== id && ancestors.indexOf(item.id) === -1
  },

  drop(hover: ComponetizedCell, monitor: Object, component: Object) {
    if (isNativeUrl(monitor)) {
      const plugin = component.props.config.editor.plugins.native

      if (!plugin) {
        console.warn('Caught native event, but no native plugin was registered. Cancelling drag event.')
        hover.cancelCellDrag()
        return
      }

      monitor.internalMonitor.store.getState().dragOperation.item = mockNativeHoverItem(plugin, monitor)
    }

    const drag = monitor.getItem()

    if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
      // If the item drop occurred deeper down the tree, don't do anything
      return
    } else if (drag.id === hover.id) {
      // If the item being dropped on itself do nothing
      hover.cancelCellDrag()
      return
    } else if (hover.ancestors.indexOf(drag.id) > -1) {
      // If hovering over a child of itself, don't propagate further
      hover.cancelCellDrag()
      return
    }

    last = { hover: hover.id, drag: drag.id }
    const allowInlineNeighbours = pathOr(
      false,
      ['node', 'content', 'plugin', 'allowInlineNeighbours'],
      hover
    )
    computeAndDispatchInsert(
      hover,
      monitor,
      component,
      `10x10${allowInlineNeighbours ? '' : '-no-inline'}`
    )
  }
}

export const connect = (connect: Object, monitor: Object) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true })
})
