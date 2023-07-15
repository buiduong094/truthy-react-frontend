import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useIntl } from 'react-intl';
import messages from 'containers/LabelCustom/messages';
import commonMessage from 'common/messages';
import PropTypes from 'prop-types';
import {
  clearFormAction,
  setFormValues,
  submitFormAction,
} from 'containers/LabelCustom/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeErrorSelector,
  makeInitiateCleanFieldSelector,
  makeIsLoadingSelector,
} from 'containers/LabelCustom/selectors';
import { makeDeviceSelector } from 'containers/App/selectors';
import useGetLabelCustomForm from 'containers/LabelCustom/hooks/useGetLabelCustomForm';

const stateSelector = createStructuredSelector({
  errors: makeErrorSelector(),
  device: makeDeviceSelector(),
  initiateClean: makeInitiateCleanFieldSelector(),
  isLoading: makeIsLoadingSelector(),
});

function CreateLabelCustomModal({ onCancel, visible }) {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { errors, device, initiateClean, isLoading } =
    useSelector(stateSelector);

  const { Form, form, description, LKeyInput, LValueInput, DescriptionInput } =
    useGetLabelCustomForm({
      formName: 'create-label-custom',
      device,
    });

  const onSubmitCreateForm = async () => {
    await form.validateFields();
    dispatch(setFormValues({ ...form.getFieldsValue(), description }));
    dispatch(submitFormAction());
  };

  const onCancelModal = () => {
    onCancel();
    form.resetFields();
  };

  useEffect(() => {
    if (initiateClean) {
      dispatch(clearFormAction());
      if (form) {
        form.resetFields();
      }
      onCancel();
    }
  }, [initiateClean]);

  useEffect(() => {
    if (errors?.length) {
      form.setFields(errors);
    }
  }, [errors]);

  return (
    <Modal
      confirmLoading={isLoading}
      title={intl.formatMessage(messages.addTitle)}
      visible={visible}
      onOk={onSubmitCreateForm}
      onCancel={onCancelModal}
      width={1000}
      okText={intl.formatMessage(commonMessage.okLabel)}
      cancelText={intl.formatMessage(commonMessage.cancel)}
    >
      <Form>
        <LKeyInput />
        <LValueInput />
        <DescriptionInput />
      </Form>
    </Modal>
  );
}

CreateLabelCustomModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default CreateLabelCustomModal;
