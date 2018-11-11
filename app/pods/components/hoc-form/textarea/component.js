import Component from '@ember/component';
import PropTypeMixin, { PropTypes } from 'ember-prop-types';


let Textarea = Component.extend(PropTypeMixin, {
  propTypes: {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    textareaClass: PropTypes.string.isRequired,
  },
  classNames: ['hoc-form__input'],
  classNameBindings: ['inputClass'],
  textareaClass: null,
});

export default Textarea.reopenClass({
    positionalParams: ['value', 'placeholder', 'textareaClass']
})
