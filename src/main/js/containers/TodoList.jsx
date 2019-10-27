import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Icon } from 'antd';

import Tasks from '../components/Tasks';
import { removeTask, updateTask } from '../store/Tasks';
import { openTaskEditModal } from "../store/TaskEditModal";

class TodoList extends Component {

    render() {
        const { tasks, removeTask, updateTask, openTaskEditModal } = this.props;
        const tasksProps = {
            tasks,
            removeTask,
            updateTask,
            openTaskEditModal
        };
        return (
            <Fragment>
                <Row type='flex' justify='center'>
                    <Col span={ 8 }>
                        <Button block onClick={ () => openTaskEditModal(0, '', '') }><Icon type="plus" />Добавить задачу</Button>
                    </Col>
                </Row>
                <Row type='flex' justify='center'>
                    <Col xs={ 20 } sm={ 20 } md={ 16 } lg={ 12 }>
                        <Tasks {...tasksProps} />
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ tasks }) => ({
    tasks
});

const mapDispatchToProps = dispatch => ({
    removeTask: id => dispatch(removeTask(id)),
    updateTask: (id, title, description, completed) => dispatch(updateTask(id, title, description, completed)),
    openTaskEditModal: (id, title, description, deadline) =>
        dispatch(openTaskEditModal(id, title, description, deadline)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
