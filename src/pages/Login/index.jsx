import { Link } from 'react-router-dom';
import { useAuth } from '../../context';

import { Input, Button } from 'antd';
import { Container } from './styles';
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import logo from '../../assets/logo.svg';

const Login = () => {
  const { signIn } = useAuth();

  return (
    <Container>
      <img src={logo} alt="logo looplex" />
      <div>
        <h2>Faça login na sua conta</h2>

        <Input placeholder="Usuário" prefix={<UserOutlined color='#1890FF' /> } style={{ marginBottom: 24 }} />
        <Input.Password
        placeholder="Senha"
        prefix={<LockOutlined color='#1890FF' /> }
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        style={{ marginBottom: 24 }} />

        <Link to='/tasks'>
          <Button onClick={signIn} type="primary" style={{ width: 282 }}>Login</Button>
        </Link>
      </div>
    </Container>
  );
}

export default Login;