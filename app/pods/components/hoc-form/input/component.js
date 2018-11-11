import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import PropTypeMixin, { PropTypes } from 'ember-prop-types';


let Input = Component.extend(PropTypeMixin, {
  propTypes: {
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    inputClass: PropTypes.string.isRequired,
  },
  classNames: ['hoc-form__input'],
  classNameBindings: ['inputClass'],
  inputClass: null,
  uid: computed(function() {
    return `input-${guidFor(this)}`
  })
});

export default Input.reopenClass({
    positionalParams: ['value', 'label', 'placeholder', 'inputClass']
})
