import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useIntl } from 'react-intl';
import messages from 'containers/LabelCustom/messages';
import PropTypes from 'prop-types';
import {
  clearFormAction,
  getTemplateByIdAction,
  setFormValues,
  submitFormAction,
} from 'containers/LabelCustom/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeErrorSelector,
  makeInitialValuesSelector,
  makeInitiateCleanFieldSelector,
  makeIsLoadingSelector,
  makeUpdateIdSelector,
} from 'containers/LabelCustom/selectors';
import { makeDeviceSelector } from 'containers/App/selectors';
import useGetLabelCustomForm from 'containers/LabelCustom/hooks/useGetLabelCustomForm';
import htmlToDraft from 'html-to-draftjs';
import { ContentState, EditorState } from 'draft-js';
import commonMessage from 'common/messages';

const stateSelector = createStructuredSelector({
  errors: makeErrorSelector(),
  device: makeDeviceSelector(),
  initiateClean: makeInitiateCleanFieldSelector(),
  isLoading: makeIsLoadingSelector(),
  initialValues: makeInitialValuesSelector(),
  id: makeUpdateIdSelector(),
});

function EditLabelCustomModal({ onCancel, visible }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { errors, device, initiateClean, isLoading, initialValues, id } =
    useSelector(stateSelector);

  const {
    Form,
    form,
    description,
    setEditorState,
    LKeyInput,
    LValueInput,
    DescriptionInput,
  } = useGetLabelCustomForm({
    formName: 'edit-label-custom',
    device,
    initialValues,
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
    if (id) {
      dispatch(getTemplateByIdAction(id));
    }
  }, [id]);

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
    if (form && errors?.length) {
      form.setFields(errors);
    }
  }, [errors]);

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (initialValues.description) {
        const contentBlock = htmlToDraft(initialValues.description);
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
        );
        const editorDataState = EditorState.createWithContent(contentState);
        setEditorState(editorDataState);
      }
    }
  }, [initialValues]);

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

EditLabelCustomModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default EditLabelCustomModal;
