import { Divided } from './styles'
import { Row, Col, Button, Input, Collapse, Divider, Tag } from 'antd'
import { PlusOutlined, SearchOutlined, RobotOutlined, UserOutlined, LockOutlined, CheckOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import LawtexStruct from '../../components/Lawtex/Struct.js'
import { TaskStore } from '../../Models/TaskStore'
import { Table, Sorter } from '../../components/Table.jsx'

const store = TaskStore.create({
  tasks: [
    {
      key: '1',
      tarefa: 'Criar documento 1',
      documento: 'Documento 1',
      status: 'Em execução',
      responsavel: 'Fabio Nagao',
      dataCriacao: '12/02/2021',
      dataPrevisao: '12/05/2021',
      dataConclusao: '12/05/2021',
      tags: ['Bancária', 'Concluído'],
    },
    {
      key: '2',
      tarefa: 'Criar documento 2',
      documento: 'Documento 2',
      status: 'Aguardando execução',
      responsavel: 'Robô Looplex',
      dataCriacao: '12/02/2021',
      dataPrevisao: '12/05/2021',
      dataConclusao: '12/05/2021',
      tags: ['Bancária', 'Concluído'],
    },
    {
      key: '3',
      tarefa: 'Criar documento 3',
      documento: 'Documento 3',
      status: 'Em breve',
      responsavel: 'Angelo Caldeira',
      dataCriacao: '12/02/2021',
      dataPrevisao: '12/05/2021',
      dataConclusao: '12/05/2021',
      tags: ['Bancária', 'Concluído'],
    },
    {
      key: '4',
      tarefa: 'Criar documento 4',
      documento: 'Documento 4',
      status: 'Em breve',
      responsavel: 'Robô Looplex',
      dataCriacao: '12/02/2021',
      dataPrevisao: '12/05/2021',
      dataConclusao: '12/05/2021',
      tags: ['Bancária', 'Concluído'],
    },
    {
      key: '5',
      tarefa: 'Criar documento 5',
      documento: 'Documento 5',
      status: 'Finalizada',
      responsavel: 'Robô Looplex',
      dataCriacao: '12/02/2021',
      dataPrevisao: '12/05/2021',
      dataConclusao: '12/05/2021',
      tags: ['Bancária', 'Concluído'],
    },
    {
      key: '6',
      tarefa: 'Criar documento 6',
      documento: 'Documento 6',
      status: 'Finalizada',
      responsavel: 'Robô Looplex',
      dataCriacao: '12/02/2021',
      dataPrevisao: '12/05/2021',
      dataConclusao: '12/05/2021',
      tags: ['Bancária', 'Concluído'],
    },
  ]
})

const columns = [
  {
    title: 'Tarefa',
    dataIndex: 'tarefa',
    onFilter: (value, record) => record.tarefa.indexOf(value) === 0,
    sorter: { compare: Sorter.DEFAULT },
  },
  {
    title: 'Documento',
    dataIndex: 'documento',
    sorter: { compare: Sorter.DEFAULT },
    render: documento => <Button type='link'>{documento}</Button>
  },
  {
    title: 'Status da tarefa',
    dataIndex: 'status',
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    sorter: { compare: Sorter.DEFAULT },
    render: status => renderStatus(status)
  },
  {
    title: 'Responsável',
    dataIndex: 'responsavel',
    onFilter: (value, record) => record.responsavel.indexOf(value) === 0,
    sorter: { compare: Sorter.DEFAULT },
    render: responsavel => renderResponsible(responsavel)
  },
  {
    title: 'Criada em',
    dataIndex: 'dataCriacao',
    sorter: { compare: Sorter.DATE }
  },
  {
    title: 'Prevista para',
    dataIndex: 'dataPrevisao',
    sorter: { compare: Sorter.DATE }
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    render: tags => renderTags(tags)
  },
  {
    title: 'Opções',
    render: () => <Button type='link'>Finalizar</Button>
  }
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

function renderResponsible(responsavel) {
  return (
    <> {responsavel === 'Robô Looplex' ? <><RobotOutlined /> {responsavel} </>
      : <><UserOutlined /> {responsavel}</>}</>
  )
}

function renderStatus(status) {
  if (status === 'Em execução') return <><LockOutlined /> {status} </>
  else if (status === 'Finalizada') return <><CheckOutlined /> {status} </>
  else return <>{status}</>

}

function renderTags(tags) {
  return (
    <> {tags.map(tag => {
      let color
      switch (tag) {
        case 'Confidencialidade':
          color = 'purple'
          break
        case 'Não concluído':
          color = 'volcano'
          break
        case 'Trabalhista':
          color = 'geekblue'
          break
        case 'Concluído':
          color = 'green'
          break
        case 'Bancária':
          color = 'gold'
          break
        default:
          color = 'geekblue'
      }
      return <Tag color={color} key={tag}>{tag}</Tag>
    })}
    </>
  )
}


const Tasks = observer(() => {

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Divider orientation="left">Tarefas</Divider>
        </Col>
        <Col span={19}>
          <Input placeholder="Buscar tarefas" suffix={<SearchOutlined />} />
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          <Button type="primary" icon={<PlusOutlined />}>Solicitar criação de documento</Button>
        </Col>
        <Col span={24}>
          <Collapse ghost>
            <LawtexStruct header='Em execução e aguardando execução'>
              <Table columns={columns} pagination={false} dataSource={store.getAguardandoTasks()} onChange={onChange} />
            </LawtexStruct>
          </Collapse>
          <Divided />
        </Col>
        <Col span={24}>
          <Collapse ghost>
            <LawtexStruct header='Em breve'>
              <Table columns={columns} pagination={false} dataSource={store.getEmBreveTasks()} onChange={onChange} />
            </LawtexStruct>
          </Collapse>
          <Divided />
        </Col>
        <Col span={24}>
          <Collapse ghost>
            <LawtexStruct header='Finalizado'>
              <Table columns={columns} pagination={false} dataSource={store.getFinalizadaTasks()} onChange={onChange} />
            </LawtexStruct>
          </Collapse>
          <Divided />
        </Col>
      </Row>

    </>
  )
})

export default Tasks
