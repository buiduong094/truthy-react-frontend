import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'containers/LabelCustom/messages';
import commonMessages from 'common/messages';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPageNumberAction,
  setPageSizeAction,
} from 'containers/LabelCustom/actions';
import { Modal, Table } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { createStructuredSelector } from 'reselect';
import { makeLoggedInUserSelector } from 'containers/App/selectors';
import { checkPermissionForComponent } from 'utils/permission';
import PropTypes from 'prop-types';
import { DELETE, PUT } from 'utils/constants';
import {
  makeIsLoadingSelector,
  makeTemplatesSelector,
} from 'containers/LabelCustom/selectors';
import ToolTipButtonWrapper from 'components/ToolTipButtonWrapper';

const stateSelector = createStructuredSelector({
  isLoading: makeIsLoadingSelector(),
  templates: makeTemplatesSelector(),
  user: makeLoggedInUserSelector(),
});

// const CreateRoutePermission = {
//   resource: 'labelCustoms',
//   method: POST,
//   path: '/label-customs',
// };
const EditRoutePermission = {
  resource: 'labelCustoms',
  method: PUT,
  path: '/label-customs/:id',
};

const DeleteRoutePermission = {
  resource: 'labelCustoms',
  method: DELETE,
  path: '/label-customs/:id',
};

function LabelCustomTable(props) {
  const { onEdit, onDelete } = props;
  const { templates, user, isLoading } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const intl = useIntl();

  const paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: (_, pageSize) => {
      dispatch(setPageSizeAction(pageSize));
    },
    onChange: (page) => {
      dispatch(setPageNumberAction(page));
    },
    pageSizeOptions: [5, 10, 20, 30, 50, 100],
    total: templates.totalItems,
    showTotal: (total, range) => {
      <FormattedMessage
        {...commonMessages.pagination}
        values={{ start: range[0], end: range[1], total }}
      />;
    },
  };

  return (
    <Table
      loading={isLoading}
      pagination={paginationOptions}
      rowKey="id"
      dataSource={templates.results}
      scroll={{ x: 500 }}
    >
      <Table.Column
        title={intl.formatMessage(messages.keyLabel)}
        dataIndex="lkey"
        key="title"
        width={100}
      />
      <Table.Column
        title={intl.formatMessage(messages.valueLabel)}
        dataIndex="lval"
        key="subject"
        width={100}
      />
      <Table.Column
        title={intl.formatMessage(messages.descriptionLabel)}
        dataIndex="description"
        key="sender"
        width={100}
      />
      <Table.Column
        title={intl.formatMessage(messages.actionLabel)}
        width={200}
        dataIndex="id"
        key="action"
        align="center"
        render={(_, { id }) => (
          <>
            {checkPermissionForComponent(user.role, EditRoutePermission) ? (
              <ToolTipButtonWrapper
                title={commonMessages.editLabel}
                clickEvent={() => onEdit(id)}
              >
                <EditOutlined />
              </ToolTipButtonWrapper>
            ) : null}
            {checkPermissionForComponent(user.role, DeleteRoutePermission) ? (
              <ToolTipButtonWrapper
                danger
                color="#f44336"
                title={commonMessages.removeLabel}
                clickEvent={() => {
                  Modal.confirm({
                    okText: intl.formatMessage(commonMessages.yesLabel),
                    okType: 'danger',
                    cancelText: intl.formatMessage(commonMessages.noLabel),
                    icon: <ExclamationCircleOutlined />,
                    title: intl.formatMessage(
                      commonMessages.confirmationMessage,
                    ),
                    onOk: (close) => onDelete(id) && close(),
                  });
                }}
              >
                <DeleteOutlined />
              </ToolTipButtonWrapper>
            ) : null}
          </>
        )}
      />
    </Table>
  );
}

LabelCustomTable.propTypes = {
  // onCreate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LabelCustomTable;
