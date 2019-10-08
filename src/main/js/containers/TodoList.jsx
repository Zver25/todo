import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Icon } from 'antd';

import Tasks from '../components/Tasks';
import { removeTask, completeTask, removeCompletedTasks } from '../store/Tasks';

class TodoList extends Component {

    render() {
        const { tasks, removeTask, completeTask, removeCompletedTasks, openTaskEditModal } = this.props;
        const tasksProps = {
            tasks,
            removeTask,
            completeTask,
            removeCompletedTasks,
            openTaskEditModal
        };
        return (
            <Fragment>
                <Row type='flex' justify='center'>
                    <Col span={ 8 }>
                        <Button block onClick={ () => openTaskEditModal('', '', '') }><Icon type="plus" />Добавить задачу</Button>
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
    completeTask: id => dispatch(completeTask(id)),
    removeCompletedTasks: () => dispatch(removeCompletedTasks()),
    openTaskEditModal: (id, title, description, deadline) =>
        dispatch(openTaskEditModal(id, title, description, deadline)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
