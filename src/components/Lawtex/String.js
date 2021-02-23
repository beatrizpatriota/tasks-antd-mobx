import {
  Form,
  Input
} from 'antd'

const { Item } = Form

function String (attrs) {
  var request = attrs.request || attrs.name
  return (
    <Item label={request} tooltip={attrs.help ? attrs.help : false}>
      <Input />
    </Item>
  )
}

export default String
