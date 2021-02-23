import { useState } from 'react'

import UploadModal from '../../components/UploadModal'
import DocumentHighlighter from '../../components/DocumentModal/DocumentHighlighter'
import questionaryMock from '../../mock/questionary'

import {
  Row,
  Col,
  Card,
  Collapse,
  Button,
  Image,
  Modal,
  Typography,
  Space,
  DatePicker,
  Radio,
  Input,
  Form
} from 'antd'
import {
  EyeOutlined,
  UnorderedListOutlined,
  ProfileOutlined,
  FileDoneOutlined,
  UsergroupAddOutlined,
  BulbOutlined,
  FormOutlined,
  GlobalOutlined,
  WarningOutlined,
  RobotOutlined,
  ExportOutlined,
  SearchOutlined,
  HistoryOutlined,
  RocketOutlined
} from '@ant-design/icons'

import LawtexStruct from '../../components/Lawtex/Struct.js'
import LawtexString from '../../components/Lawtex/String.js'
import LawtexListaAtomica from '../../components/Lawtex/ListaAtomica.js'

import preview from '../../assets/preview.png'

const { Title, Text, Link } = Typography

const questionary = {
  items: questionaryMock
}

const { Panel } = Collapse

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

function PageActionButton ({ icon, text }) {
  return (
    <Space align='center' direction='vertical'>
      <Button type='primary' shape='circle' icon={icon} size='large' />
      <Link>{text}</Link>
    </Space>
  )
}

const Construction = () => {
  const [isDocumentModalVisible, setIsDocumentModalVisible] = useState(false)
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false)

  function callback (key) {
    console.log(key)
  }

  function handleUploadModal () {
    setIsUploadModalVisible(true)
  }

  function handleDocumentOk () {
    setIsDocumentModalVisible(false)
  }

  function handleDocumentCancel () {
    setIsDocumentModalVisible(false)
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={2}>
          <Space align='center' direction='vertical' size='large'>
            <PageActionButton icon={<EyeOutlined />} text='Modo Foco' />
            <PageActionButton icon={<ProfileOutlined />} text='Fechar Campos' />
            <PageActionButton icon={<FileDoneOutlined />} text='Carregar Respostas' />
            <PageActionButton icon={<UsergroupAddOutlined />} text='Compartilhar Edição' />
            <PageActionButton icon={<BulbOutlined />} text='Feedback' />
          </Space>
        </Col>
        <Col span={12}>
          <Card
            title={
              <Space>
                <FormOutlined />
                <span>Documento em construção</span>
              </Space>
            }
            extra={
              <Space>
                <GlobalOutlined />
                <WarningOutlined />
              </Space>
            }
          >

            <Form layout='vertical'>

              <Collapse>
                <LawtexStruct
                  header='Informações da parte'
                  help='Exemplo de help do lawtex'
                >
                  <LawtexString
                    name='variableId'
                    request='Nome do projeto'
                    help='O nome do projeto identifica Jacaré'
                  />
                  <LawtexListaAtomica
                    request='Lista Atômica'
                    help='É um select'
                    lista={['eu']}
                  />
                </LawtexStruct>
              </Collapse>

              <Button
                type='primary'
                icon={<RobotOutlined />}
                onClick={handleUploadModal}
              >
              Iniciar análise
              </Button>

            </Form>

          </Card>
        </Col>
        <Col span={8}>
          <Card title='Circleup'>
            <Image src={preview} />
          </Card>
        </Col>
        <Col span={2}>
          <Space align='center' direction='vertical' size='large'>
            <PageActionButton icon={<ExportOutlined />} text='Exportar' />
            <PageActionButton icon={<GlobalOutlined />} text='Traduzir Documento' />
            <PageActionButton icon={<SearchOutlined />} text='Expandir' />
            <PageActionButton icon={<HistoryOutlined />} text='Histórico' />
            <PageActionButton icon={<RocketOutlined />} text='Ações' />
          </Space>
        </Col>
      </Row>

      <Modal
        title='Carregue o documento abaixo'
        visible={isUploadModalVisible}
        closable
        centered
        onOk={() => {
          setIsDocumentModalVisible(true)
          setIsUploadModalVisible(false)
        }}
        onCancel={() => { setIsUploadModalVisible(false) }}
      >
        <UploadModal />
      </Modal>

      <Modal
        title='Documento analisado: Formulário de Referência'
        width='70vw'
        visible={isDocumentModalVisible}
        onOk={handleDocumentOk}
        cancelText='Pular'
        okText='Confirmar e continuar entrevista'
        onCancel={handleDocumentCancel}
        centered
      >
        <DocumentHighlighter questionary={questionary} />
      </Modal>
    </>
  )
}

export default Construction
