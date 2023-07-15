import { createSelector } from 'reselect';
import { initialState } from 'containers/LabelCustom/reducer';

/**
 * Direct selector to the LabelCustom state domain
 */

const selectLabelCustomDomain = (state) => state.labelCustom || initialState;

/**
 * Other specific selectors
 */

const makeIsLoadingSelector = () =>
  createSelector(selectLabelCustomDomain, (substate) => substate.isLoading);

const makeKeywordsSelector = () =>
  createSelector(selectLabelCustomDomain, (substate) => substate.keywords);

const makeFormMethodSelector = () =>
  createSelector(selectLabelCustomDomain, (substate) => substate.formMethod);

const makeUpdateIdSelector = () =>
  createSelector(selectLabelCustomDomain, (substate) => substate.id);

const makeTemplateEditedBodySelector = () =>
  createSelector(selectLabelCustomDomain, (substate) => substate.editedBody);

const makePageNumberSelector = () =>
  createSelector(selectLabelCustomDomain, (substate) => substate.pageNumber);

const makeLimitSelector = () =>
  createSelector(selectLabelCustomDomain, (substate) => substate.pageSize);

const makeTemplatesSelector = () =>
  createSelector(selectLabelCustomDomain, (substate) => substate.templates);

const makeErrorSelector = () =>
  createSelector(selectLabelCustomDomain, (substate) => substate.errors);

const makeInitiateCleanFieldSelector = () =>
  createSelector(selectLabelCustomDomain, (substate) => substate.initiateClean);

const makeFormValuesSelector = () =>
  createSelector(selectLabelCustomDomain, (substate) => substate.formValues);

const makeInitialValuesSelector = () =>
  createSelector(selectLabelCustomDomain, (substate) => substate.initialValues);

export {
  makeInitialValuesSelector,
  makeInitiateCleanFieldSelector,
  makeFormValuesSelector,
  makeLimitSelector,
  makeTemplateEditedBodySelector,
  makeKeywordsSelector,
  makeUpdateIdSelector,
  makeFormMethodSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makePageNumberSelector,
  makeTemplatesSelector,
};
