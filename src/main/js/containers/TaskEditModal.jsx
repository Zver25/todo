import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input } from 'antd';

import { changeFieldTaskEditModal, closeTaskEditModal } from '../store/TaskEditModal';
import { addTask, updateTask } from '../store/Tasks';

class TaskEditModal extends Component {

    handleAcceptTask = () => {
        const { taskEditModal: { id }, addTask, updateTask, close, form } = this.props;
        form.validateFields((err, values) => {
            if (err) return;
            if (id) {
                console.log(`updateTask id = ${id}, title = ${values.title}, description = ${values.description}`);
                updateTask(id, values.title, values.description);
            }
            else {
                addTask(values.title, values.description);
            }
            close();
        });
    };

    render() {
        const { taskEditModal, close, form } = this.props;
        const { getFieldDecorator } = form;
        const { isOpen, id } = taskEditModal;
        const errors = form.getFieldsError();
        return (
            <Modal
                title={ id ? 'Редактирование задачи' : 'Добавление задачи' }
                visible={ isOpen }
                okText={ id ? 'Изменить' : 'Добавить' }
                cancelText='Отменить'
                okButtonProps={{ disabled: errors && errors.title && errors.title.length > 0 }}
                onCancel={ close }
                onOk={ this.handleAcceptTask }
            >
                <Form layout='vertical'>
                    <Form.Item label="Заголовок">
                        {
                            getFieldDecorator('title', {
                                rules: [
                                    {
                                        required: true,
                                        message: "Введите заголовок!"
                                    }
                                ]
                            })(<Input placeholder='Заголовок задачи' />)
                        }
                    </Form.Item>
                    <Form.Item label='Описание задачи'>
                        {getFieldDecorator('description')(<Input.TextArea placeholder='Описание задачи' />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedTaskEditModal = Form.create({
    name: 'task-edit-modal-form',
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            title: Form.createFormField(props.taskEditModal.title),
            description: Form.createFormField(props.taskEditModal.description)
        };
    }
})(TaskEditModal);

const mapStateToProps = ({ taskEditModal }) => ({
    taskEditModal
});

const mapDispatchToProps = dispatch => ({
    close: () => dispatch(closeTaskEditModal()),
    addTask: (title, description) => dispatch(addTask(title, description)),
    updateTask: (id, title, description) => dispatch(updateTask(id, title, description, false)),
    onChange: (field, value) => dispatch(changeFieldTaskEditModal(field, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedTaskEditModal);
