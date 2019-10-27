import React from 'react';
import PropTypes from 'prop-types';
import { List, Empty, Row, Col, Button, Typography } from 'antd';

import Task from './Task';

const { Text } = Typography;

const Tasks = ({ tasks, removeTask, updateTask, openTaskEditModal }) => {
    const taskActions = {
        removeTask,
        updateTask,
        openTaskEditModal
    };
    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);
    const removeCompletedTasks = () => {
        tasks.forEach(task => { if (task.completed) removeTask(task.id) });
    };
    return (
        <List
            itemLayout='horizontal'
            dataSource={[
                ...activeTasks,
                ...completedTasks
            ]}
            locale={{
                emptyText: <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } description='Все задачи выполнены!' />
            }}
            footer={
                tasks.length > 0 &&
                <Row>
                    <Col span={ 12 }>
                        <Text>Осталось задач: </Text>
                        <Text strong>{ tasks.filter(task => !task.completed).length }</Text>
                    </Col>
                    {
                        completedTasks.length > 0 &&
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <Button type='link' onClick={ removeCompletedTasks }>Удалить завершённые</Button>
                        </Col>
                    }
                </Row>
            }
            renderItem={ task => (
                <Task {...task} {...taskActions}/>
            )}
        />
    );
};

Tasks.propTypes = {
    tasks: PropTypes.array,
    removeTask: PropTypes.func,
    updateTask: PropTypes.func,
    removeCompletedTasks: PropTypes.func,
    openTaskEditModal: PropTypes.func
};

Tasks.defaultProps = {
    tasks: [],
    removeTask: () => {},
    updateTask: () => {},
    removeCompletedTasks: () => {},
    openTaskEditModal: () => {}
};

export default Tasks;
