import Component from '@ember/component';
import PropTypeMixin, { PropTypes } from 'ember-prop-types';

let Button = Component.extend(PropTypeMixin, {
  propTypes: {
    type: PropTypes.string,
    value: PropTypes.string,
    buttonClass: PropTypes.string.isRequired,
  },
    tagName: 'input',
    classNames: ['hoc-form__button'],
    classNameBindings: ['buttonClass'],
    buttonClass: null,
    attributeBindings: ['type', 'value'],
});

export default Button.reopenClass({
    positionalParams: ['type', 'value', 'buttonClass']
})
