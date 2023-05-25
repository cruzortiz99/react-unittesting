import { useCallback, useEffect, useState } from "react"

type CardProps = {
  children?: React.ReactNode
}

function Card(props: CardProps): JSX.Element{
  return <div>{props.children}</div>
}

type OnVisibleEventEmitterComponentProps = {
  children?: React.ReactNode
  onVisibleChange?: (isVisible: boolean) => void
}
function OnVisibleEventEmitterComponent(props: OnVisibleEventEmitterComponentProps):JSX.Element {
  return <div>{props.children}</div>
}
type SidebarProps = {
  menu: any[]
}
function Sidebar(props: SidebarProps): JSX.Element {
  return <>Sidebar</>
}

type PageViewProps = {
  menu: any[]
  card: React.ReactNode
}
function PageView(props: PageViewProps): JSX.Element {
  return <div>
  <Sidebar menu={props.menu} />
  <div>
    <div>
      {props.card}
    </div>
    <div>Preview</div>
  </div>
  </ div >
}
type PageProps = {
  initialMenu?: any[]
  onMenuItemsVisibilityChange?: (menuItems: any[]) => void
}
function changeMenuVisibility(menu: any[], cardKey: number, isCardVisible: boolean) {
  return menu.map((item, itemKey) => {
    if (cardKey === itemKey) {
      item.checked = isCardVisible
    }
    return item
  }).map((item, itemKey, originalArray) => {
    const lastIndexVisible = originalArray.findLastIndex((value) => value.checked)
    if (itemKey !== lastIndexVisible) {
      item.checked = false
    }
    return item
  })
}
function Page(props: PageProps): JSX.Element {
  const [menuItems, setMenuItems] = useState(props.initialMenu || ['item 1', 'item 2'])

  const setItemVisible = useCallback(
    (cardKey:number) => (isCardVisible: boolean) =>  setMenuItems((menu) => changeMenuVisibility(menu, cardKey, isCardVisible)), [setMenuItems])

  useEffect(() => {
    props.onMenuItemsVisibilityChange && props.onMenuItemsVisibilityChange(menuItems)
  }, [menuItems])

  return <PageView 
  menu={menuItems} 
  card={<>
  {menuItems.map((title, key)=> {
    return <OnVisibleEventEmitterComponent key={key} onVisibleChange={setItemVisible(key)}>
      <Card>{title}</Card>
    </OnVisibleEventEmitterComponent>
  })}
  </>} />
}