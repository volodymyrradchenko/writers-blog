import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';

let Input = Component.extend({
  classNames: ['hoc-form__input'],
  classNameBindings: ['inputClass'],
  inputClass: null,
  uid: computed(function() {
    return `input-${guidFor(this)}`
  })
});

export default Input.reopenClass({
    positionalParams: ['value', 'label', 'placeholder']
})
