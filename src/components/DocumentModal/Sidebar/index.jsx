import { useState } from 'react';

import { Card, Typography, Menu, Dropdown } from 'antd';

import { QuestionaryItem } from './styles';
import { DownOutlined } from '@ant-design/icons';

const { Text, Title } = Typography

const updateHash = highlight => {
  document.location.hash = `highlight-${highlight.id}`;
};

function Sidebar({ questionary, highlights }) {
  const [selectedItem, setSelectedItem] = useState('');
  const newObj = {
    content: selectedItem
  }

  function groupBy(array, f) {
    let groups = {};
    array.forEach(o => {
      const group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });

    return Object.keys(groups).map(group => groups[group]);
  }

  const groups = groupBy(questionary.items, item => {
    return [item.section];
  });

  console.log(groups);

  function handleSelectedItems(param) {
    const teste = questionary.items.find(item => item.id == param.key);

    setSelectedItem(teste);
  }

  const menu = (
    <Menu onClick={handleSelectedItems}>
      {groups.map(group => (
        <Menu.ItemGroup key={group[0].section} title={group[0].section}>
          {group.map(item => (
            <Menu.Item key={item.id}>{item.content}</Menu.Item>
          ))}
        </Menu.ItemGroup>
      ))}
    </Menu>
  );

  let sectionCounter = 0;

  return (
    <Card
      title="Análise de input de documento"
      style={{
        marginLeft: '16px',
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.15)',
        width: "33vw",
        height: '80vh',
        overflow: 'auto'
      }}
    >
      <Title level={3}>Classificação do item circulado</Title>

      <Title level={4}>Selecione o tipo de informação circulada/solicitada</Title>

      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Opções <DownOutlined />
        </a>
      </Dropdown>

      {/* <form>
        {questionary.items.map(item => (
          <QuestionaryItem key={item.id}>
            <span>{item.content}</span>
            <Text type="success">{item.answer?.content.text}</Text>
          </QuestionaryItem>
        ))}
      </form> */}

      <Title level={5}>{selectedItem?.content}</Title>

      <Title level={4}>Selecione o título/item de contexto</Title>

      <Text type="success">{highlights.slice().reverse()[0]?.content.text}</Text>

      <div>
        {highlights.slice().reverse().map((highlight, index) => {
          if (index < 1) return null;
          return (

          <div key={index}
            className="sidebar__highlight"
            onClick={() => {
              updateHash(highlight);
            }}>
            <strong>{highlight.comment.text}</strong>
            {highlight.content.text ? (
              <blockquote style={{ marginTop: "0.5rem" }}>
                {`${highlight.content.text.trim()}`}
              </blockquote>
            ) : null}
            {highlight.content.image ? (
              <div
                className="highlight__image"
                style={{ marginTop: "0.5rem" }}
              >
                <img src={highlight.content.image} alt={"Screenshot"} />
              </div>
            ) : null}
            <strong dangerouslySetInnerHTML={{ __html: `${highlight.position.pageNumber}&#${64 + index};` }} className="highlight__location">
            </strong>
          </div>
        )})}
      </div>
    </Card>
  );
}

export default Sidebar;
