import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Home from './pages/Home';
import Arena from './pages/Arena';

const { Header, Content } = Layout;

const App = () => (
    <Router>
        <Layout>
            <Header>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/arena">Arena</Link></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '2rem' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/arena" element={<Arena />} />
                </Routes>
            </Content>
        </Layout>
    </Router>
);

export default App;
