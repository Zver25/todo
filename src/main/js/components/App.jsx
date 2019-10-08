import React from 'react';
import { ConfigProvider, Layout, Typography } from 'antd';
import locale from 'antd/lib/locale-provider/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';

import TodoList from "../containers/TodoList";
import TaskEditModal from "../containers/TaskEditModal";

moment.locale('ru');

const { Header, Content } = Layout;
const { Title } = Typography;

const App = () => (
    <ConfigProvider locale={ locale }>
        <Layout style={{ height: '100vh' }}>
            <Header>
                <Title style={{ color: '#fff' }}>To-Do!</Title>
            </Header>
            <Content style={{ padding: 24 }}>
                <TodoList />
                <TaskEditModal/>
            </Content>
        </Layout>
    </ConfigProvider>
);

export default App;
