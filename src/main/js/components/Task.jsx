import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Icon, Typography } from 'antd';

const { Text } = Typography;

const Task = ({ id, completed, title, description, removeTask, completeTask, openTaskEditModal }) => {
    const buttons = [];
    if (completed) {
        buttons.push(<Button icon='undo' onClick={ () => completeTask(id) }/>);
    }
    else {
        buttons.push(<Button icon='check' onClick={ () => completeTask(id) }/>);
        buttons.push(<Button type='primary' icon='edit' onClick={ () => openTaskEditModal(id, title, description) }/>);
    }
    buttons.push(<Button type='danger' icon='delete' onClick={ () => removeTask(id) }/>);
    return (
        <List.Item actions={ buttons }>
            { completed?
                <Icon type="check-square" onClick={ () => completeTask(id) } style={{ cursor: 'pointer', fontSize: 24, marginRight: 16 }} />:
                <Icon type="border" onClick={ () => completeTask(id) } style={{ cursor: 'pointer', fontSize: 24, marginRight: 16 }} />
            }
            <List.Item.Meta
                title={
                    <Text delete={ completed }>{ title }</Text>
                }
                description={ description }
            />
        </List.Item>
    );
};

Task.propTypes = {
    id: PropTypes.number,
    completed: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    removeTask: PropTypes.func,
    completeTask: PropTypes.func,
    openTaskEditModal: PropTypes.func
};

Task.defaultProps = {
    id: 0,
    completed: false,
    title: '',
    description: '',
    removeTask: () => {},
    completeTask: () => {},
    openTaskEditModal: () => {}
};

export default Task;
