"use client"

import { FaTrash, FaCopy } from "react-icons/fa"
import { Menu, Item, Separator, Submenu } from "react-contexify"
import "react-contexify/ReactContexify.css"

interface ContextMenuProps {
  handleItemClick: any
  isSameUser: boolean
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  handleItemClick,
  isSameUser,
}) => {
  return (
    <Menu id={"blabla"}>
      <Item id="copy" onClick={handleItemClick}>
        <div className="flex justify-start items-center gap-2 w-full">
          <FaCopy />
          <span>Copy</span>
        </div>
      </Item>
      <Item id="remove" onClick={handleItemClick} disabled={!isSameUser}>
        <div className="flex justify-start items-center gap-2 w-full">
          <FaTrash />
          <span>Remove</span>
        </div>
      </Item>
      <Separator />
      <Item disabled>Disabled</Item>
      <Separator />
      <Submenu label="Foobar">
        <Item id="reload" onClick={handleItemClick}>
          Reload
        </Item>
        <Item id="something" onClick={handleItemClick}>
          Do something else
        </Item>
      </Submenu>
    </Menu>
  )
}

export default ContextMenu
