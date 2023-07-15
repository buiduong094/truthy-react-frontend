import React, { useState } from 'react';
import { Col, Form } from 'antd';
import FormWrapper from 'components/FormWrapper';
import messages from 'containers/LabelCustom/messages';
import FormInputWrapper from 'components/FormInputWrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import DraftEditor from 'components/DraftEditor';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const wrapperCol = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6,
};

const useGetLabelCustomForm = ({
  responsive = false,
  formName = 'role-form',
  initialValues = {},
  device,
}) => {
  const [formInstance] = Form.useForm();
  const intl = useIntl();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [description, setDescription] = useState('');

  const onEditorStateChange = (editState) => {
    setEditorState(editState);
    if (editState.getCurrentContent()) {
      setDescription(draftToHtml(convertToRaw(editState.getCurrentContent())));
    }
  };

  const WrappedForm = ({ ...props }) => {
    <FormWrapper
      {...props}
      values={initialValues}
      formInstance={formInstance}
      layout={layout}
      device={device}
      responsive={responsive}
      name={formName}
      classname="form-ant-items"
    />;
  };

  WrappedForm.Item = Form.Item;

  function LKeyInput() {
    const lKeyInput = (
      <FormInputWrapper
        label={messages.keyLabel}
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.keyLabel} />,
          },
        ]}
        name="lkey"
        id="lkey"
        type="text"
        required
        placeholder={messages.keyLabel}
      />
    );
    return responsive ? <Col {...wrapperCol}>{lKeyInput}</Col> : lKeyInput;
  }

  function LValueInput() {
    const lValueInput = (
      <FormInputWrapper
        label={messages.valueLabel}
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.valueLabel} />,
          },
        ]}
        name="lval"
        id="lval"
        type="text"
        required
        placeholder={messages.valueLabel}
      />
    );
    return responsive ? <Col {...wrapperCol}>{lValueInput}</Col> : lValueInput;
  }

  function DescriptionInput() {
    const descriptionInput = (
      <Form.Item
        label={intl.formatMessage(messages.descriptionLabel)}
        name="description"
      >
        <DraftEditor
          invalid={formInstance.getFieldError('description').length > 0}
          onChange={onEditorStateChange}
          onEditorStateChange={onEditorStateChange}
          editorState={editorState}
        />
      </Form.Item>
    );
    return responsive ? (
      <Col {...wrapperCol}>{descriptionInput}</Col>
    ) : (
      descriptionInput
    );
  }

  return {
    form: formInstance,
    description,
    setEditorState,
    Form: WrappedForm,
    LKeyInput,
    LValueInput,
    DescriptionInput,
  };
};

export default useGetLabelCustomForm;
