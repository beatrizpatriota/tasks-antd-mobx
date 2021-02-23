import {
  Collapse,
  Popover,
  Typography
} from 'antd'

import {
  QuestionCircleTwoTone
} from '@ant-design/icons'

const { Text } = Typography
const { Panel } = Collapse

const Struct = ({ children, ...attrs }) => {
  var moreAttrs = {}

  if (attrs.help) {
    moreAttrs.extra = (
      <Popover content={<Text>{attrs.help}</Text>}>
        <QuestionCircleTwoTone />
      </Popover>
    )
  }

  return (
    <Panel {...attrs} {...moreAttrs}>
      {children}
    </Panel>
  )
}

export default Struct
