import React from 'react'
import {
    Form,
    Select
} from 'antd'

const { Item } = Form
const { Option } = Select;
  
  function ListaAtomica (attrs) {
    var request = attrs.request || attrs.name
    var options = [attrs.lista]

    return (
        <Item label={request} tooltip={attrs.help ? attrs.help : false}>
        <Select     
        labelInValue
        defaultValue={{ value: 'Selecione' }}>
        {options.map(item => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
 </Select>
 </Item>
    )
  }

export default ListaAtomica