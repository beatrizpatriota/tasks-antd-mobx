import { Divided } from './styles'
import { Row, Col, Button, Input, Collapse, Divider, Table, Tag} from 'antd'
import { PlusOutlined, SearchOutlined, RobotOutlined, UserOutlined, LockOutlined, CheckOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import LawtexStruct from '../../components/Lawtex/Struct.js'
import { TaskStore } from '../../Models/TaskStore'

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
      tags: [{nome:'Bancária', color:'gold'}, {nome:'Concluído', color:'green'}],
      opcoes: 'Finalizar',
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
      tags: [{nome:'Bancária', color:'gold'}, {nome:'Concluído', color:'green'}],
      opcoes: 'Finalizar',
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
      tags: [{nome:'Bancária', color:'gold'}, {nome:'Concluído', color:'green'}],
      opcoes: 'Finalizar',
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
      tags: [{nome:'Bancária', color:'gold'}, {nome:'Concluído', color:'green'}],
      opcoes: 'Finalizar',
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
      tags: [{nome:'Bancária', color:'gold'}, {nome:'Concluído', color:'green'}],
      opcoes: 'Finalizar',
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
      tags: [{nome:'Bancária', color:'gold'}, {nome:'Concluído', color:'green'}],
      opcoes: 'Finalizar',
    },
  ]
})

 function getColumnFilters (column) {
   var filters = []
  return filters = column.filter((c, i) => column.indexOf(c) === i)
}

function getColumns (columns) {
  return 
}

const columns = [
  {
    title: 'Tarefa',
    dataIndex: 'tarefa',
    filters: () => getColumnFilters('tarefa'),
    onFilter: (value, record) => record.tarefa.indexOf(value) === 0,
    sorter: (a, b) => a.tarefa.length - b.tarefa.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Documento',
    dataIndex: 'documento',
    sorter: (a, b) => a.documento - b.documento,
    sortDirections: ['descend', 'ascend'],
    render: documento => <Button type='link'>{documento}</Button>
  },
  {
    title: 'Status da tarefa',
    dataIndex: 'status',
    filters: [
      {
        text: 'Em execução',
        value: 'Em execução',
      },
      {
        text: 'Aguardando execução',
        value: 'Aguardando execução',
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    sorter: (a, b) => a.status.length - b.status.length,
    sortDirections: ['descend', 'ascend'],
    render: status => 
       { if (status === 'Em execução') return <><LockOutlined/> {status} </>
       else if(status === 'Finalizada') return <><CheckOutlined/> {status} </>
      else return <>{status}</> }
  },
  {
    title: 'Responsável',
    dataIndex: 'responsavel',
    filters: [
      {
        text: 'Angelo Caldeira',
        value: 'Angelo Caldeira',
      },
      {
        text: 'Fabio Nagao',
        value: 'Fabio Nagao',
      },
      {
        text: 'Robô Looplex',
        value: 'Robô Looplex',
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.responsavel.indexOf(value) === 0,
    sorter: (a, b) => a.responsavel.length - b.responsavel.length,
    sortDirections: ['descend', 'ascend'],
    render: responsavel => 
    <>
    {responsavel === 'Robô Looplex' 
    ? <><RobotOutlined/> {responsavel} </>
    : <><UserOutlined/> {responsavel}</> }
  </>
  },
  {
    title: 'Criada em',
    dataIndex: 'dataCriacao',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) => a.documento - b.documento,
  },
  {
    title: 'Prevista para',
    dataIndex: 'dataPrevisao',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) => a.documento - b.documento,
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          return (
            <Tag color={tag.color} key={tag.nome}>
              {tag.nome}
            </Tag>
          );
        })}
      </>
  )},
  {
    title: 'Opções',
    key: 'opcoes',
    dataIndex: 'opcoes',
    render: opcoes => (
        <Button type='link'>{opcoes}</Button>
    ),
  }
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
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
            <Table columns={columns} pagination={false} dataSource={store.getEmBreveTasks()}  onChange={onChange} />
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
